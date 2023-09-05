import React, { useEffect, useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Box,Button  } from "@mui/material";
import { io } from "socket.io-client";
import Delta from "quill-delta";
import jsPDF from "jspdf";
import axios from "axios";

import { renderToString } from 'react-dom/server';



const Component = styled.div`
  background: #f5f5f5;
`;

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      
  [{ 'indent': '-1'}, { 'indent': '+1' }],          
  [{ 'direction': 'rtl' }],                         

  [{ 'size': ['small', false, 'large', 'huge'] }],  
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']  
];

const DynamicQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function Editor({ id_proyecto, nombre }) {
  const [socket, setSocket] = useState(null);
  const [editorContent, setEditorContent] = useState(new Delta());
  const [editorDelta, setEditorDelta] = useState(new Delta());
  const [typingUser, setTypingUser] = useState("");
  const [userCount, setUserCount] = useState(0);
  const [noteContent, setNoteContent] = useState("");
  const [receivedNotes, setReceivedNotes] = useState([]);
  const [initialContent, setInitialContent] = useState(new Delta());
  const [generatingPDF, setGeneratingPDF] = useState(false);


  useEffect(() => {
    const socketServer = io("http://localhost:9000");
    setSocket(socketServer);

    socketServer.on("connect", async () => {
      socketServer.emit("join-room", id_proyecto);
    });
    socketServer.on("document-content", (content) => {
      console.log(content); 
      // Establecer el contenido en el estado editorContent para mostrarlo en el editor
      setEditorContent(content);
  
      // Resto del código...
    });

    socketServer.on("user-count", (count) => {
      setUserCount(count);
    });
    return () => {
      socketServer.disconnect();
      setUserCount(0);
    };
  }, [id_proyecto]);

  const handleNoteChange = (event) => {
    setNoteContent(event.target.value);
  };
  useEffect(() => {
    if (socket === null) return;

    socket.on("receive-note", ({ nombre, note }) => {
      setReceivedNotes((prevNotes) => [...prevNotes, { nombre, note }]);
    });

    return () => {
      socket.off("receive-note");
    };
  }, [socket]);

  const handleNoteSubmit = (event) => {
    if (event.key === 'Enter' && noteContent.trim() !== '') {
      if (socket) {
        socket.emit("send-note", { id_proyecto, nombre, note: noteContent });
      }
      setReceivedNotes(prevNotes => [...prevNotes, { nombre, note: noteContent }]);
      setNoteContent('');
    }
  };
  const handleTyping = () => {
    if (socket) {
      socket.emit("typing", { id_proyecto, nombre });
    }
  };
const handleGeneratePDF = () => {
  // Si ya se está generando un PDF, no hacer nada
  if (generatingPDF) {
    return;
  }

  setGeneratingPDF(true);

  if (!editorContent || !editorContent.ops) {
    console.error("editorContent no está definido o no tiene ops");
    setGeneratingPDF(false);
    return;
  }

  // Función para justificar un grupo de líneas
  function justificarLineas(lineas, longitudMaxima) {
    const espaciosTotales =
      longitudMaxima -
      lineas.reduce((longitud, linea) => longitud + linea.length, 0);
    const espacioPromedio = espaciosTotales / (lineas.length - 1);

    return lineas.map((linea, index) => {
      if (index === lineas.length - 1) {
        // Última línea, no se necesita espacio adicional
        return linea;
      } else {
        const espacioExtra =
          linea.length < longitudMaxima
            ? " ".repeat(Math.abs(Math.ceil(espacioPromedio * (index + 1))))
            : "                                       ";
        return linea + espacioExtra;
      }
    });
  }

  const editorContentText = editorContent.ops
    .map((op) => (typeof op.insert === "string" ? op.insert : ""))
    .join("");

  // Crear el documento PDF con jsPDF
  const { jsPDF } = require("jspdf");
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "A4",
  });

  const margin = 15;
  const pageWidth = pdf.internal.pageSize.getWidth() - 2 * margin + 1;
  const pageHeight = pdf.internal.pageSize.getHeight() - 2 * margin;

  const fontSize = 10;
  pdf.setFontSize(fontSize);

  // Justificar el texto y agregarlo al PDF
  const lineas = editorContentText.split("\n");
  const textoJustificado = justificarLineas(lineas, lineas[0].length);

  // Agregar espacio en blanco al principio del PDF
  const espacioEnBlanco = "\n\n\n\n\n"; // 5 líneas en blanco
  pdf.text(margin, margin, espacioEnBlanco);

  // Agregar el texto justificado después del espacio en blanco
  pdf.text(margin, margin + 4 * fontSize, textoJustificado.join("\n"), {
    maxWidth: pageWidth,
    align: "justify",
  });

  const UrlDocumento = "Nombre" + Date.now() + ".pdf";
  pdf.save(UrlDocumento);

  // Después de generar el PDF, habilitar el botón nuevamente después de un tiempo (opcional)
  setTimeout(() => {
    setGeneratingPDF(false);
  }, 5000); // Cambia este valor según tus necesidades
};


  //fucion para enviar el pdf y crearlo en la API
  
  const HandleSUbumit = async (arrayB) => {

    try {
      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "proyects/Convertir_pdf",
        {id_proyecto:id_proyecto,array_buffer:arrayB},
        {
          withCredentials: true,
        }
      );

      console.log(result);
        alert("Se envio el PDF");
      //console.log(result);
    } catch (error) {
      console.log(error);
      alert("Error");
    }
  };

  const handleQuillChange = (content, delta, source, editor) => {
    if (source === "user" && socket) {
      socket.emit("send-changes", { id_proyecto,delta,content });
    }
    setEditorContent(editor.getContents());
  };

  useEffect(() => {
    if (socket === null) return;

    socket.on("receive-changes", (delta) => {
      setEditorDelta(new Delta(delta));
    });
    

    socket.on("typing", ({ id_proyecto: proyecto, nombre: user }) => {
      if (proyecto === id_proyecto && user !== nombre) {
        setTypingUser(`${user} está escribiendo...`);
        
        setTimeout(() => {
          setTypingUser("");
        }, 5000); // Cambia este valor según tus necesidades
      }
    });

    return () => {
      socket.off("receive-changes");
      socket.off("typing");
    };
  }, [socket, id_proyecto, nombre]);

  useEffect(() => {
    if (!editorContent || !editorDelta.ops.length) return;
  
    const updatedContent = new Delta(editorContent).compose(new Delta(editorDelta));
    setEditorContent(updatedContent); // Actualizar el contenido del editor con los cambios aplicados
  }, [editorDelta]);

  useEffect(() => {
    if (socket) {
      socket.on("user-count", (count) => {
        setUserCount(count);
      });
    }
  }, [socket]);
  

  return (
    <Component>
      <Box className="container" id="editor-container">
        {typeof window !== "undefined" && (
          <>
            <div className="editor-and-notes">
              <div className="editor">
                <div>{typingUser}</div>
                <div>Usuarios conectados: {userCount}</div>
                <DynamicQuill
                  theme="snow"
                  modules={{ toolbar: toolbarOptions }}
                  value={editorContent}
                  onChange={handleQuillChange}
                  onFocus={handleTyping}
                />
                 <Button onClick={handleGeneratePDF} variant="contained" color="primary" disabled={generatingPDF}>
                  Generar PDF
                </Button>
              </div>
              <div className="notes">
                <textarea
                  value={noteContent}
                  onChange={handleNoteChange}
                  onKeyDown={handleNoteSubmit}
                  placeholder="Escribe una nota..."
                />
                <div className="received-notes">
                  {receivedNotes.map((note, index) => (
                    <div key={index}>
                      <strong>{note.nombre}:</strong> {note.note}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </Box>
    </Component>
  );
}
