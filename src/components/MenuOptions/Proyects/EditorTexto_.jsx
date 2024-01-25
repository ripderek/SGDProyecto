import React, { useEffect, useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Box, Button } from "@mui/material";
import { io } from "socket.io-client";
import Delta from "quill-delta";
import jsPDF from "jspdf";
import axios from "axios";
const pdfMake = require("pdfmake/build/pdfmake");
const vfsFonts = require("pdfmake/build/vfs_fonts");



const Component = styled.div`
  background: #f5f5f5;
`;

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],
  [{ 'indent': '-1' }, { 'indent': '+1' }],
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
  const [editorHeight, setEditorHeight] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageHeight, setPageHeight] = useState(0);


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
  const addNewPage = () => {
    setPageNumber(pageNumber + 1);
    setPageHeight(0);
  };

  // ... (código anterior)
  const handleGeneratePDF = () => {
    if (generatingPDF) {
      return;
    }

    setGeneratingPDF(true);

    if (!editorContent || !editorContent.ops) {
      console.error("editorContent no está definido o no tiene ops");
      setGeneratingPDF(false);
      return;
    }

    const { vfs } = vfsFonts.pdfMake;
    pdfMake.vfs = vfs;

    const content = [];

    editorContent.ops.forEach((op) => {
      if (op.insert && op.insert.image) {
        // Si es una imagen, agrega un bloque de imagen
        const imageDefinition = {
          image: op.insert.image,
          width: op.insert.width, // El tamaño debe coincidir con el registrado en el editor
          height: op.insert.height, // El tamaño debe coincidir con el registrado en el editor
          margin: [0, 10], // Ajusta el margen según sea necesario
        };
        content.push(imageDefinition);
      } else if (typeof op.insert === "string") {
        // Si es texto, agrega un bloque de texto
        content.push({
          text: op.insert,
          fontSize: 10, // Puedes ajustar el tamaño de fuente según sea necesario
          // Agrega más propiedades de estilo según sea necesario, como 'bold', 'italic', etc.
        });
      }
    });

    const sections = [];

    // Divide el contenido en secciones, cada una con un espacio en blanco al principio
    const itemsPerPage = 45; // Estimación de líneas por página
    for (let i = 0; i < content.length; i += itemsPerPage) {
      const sectionContent = content.slice(i, i + itemsPerPage);
      // Agrega un espacio en blanco al principio de la sección
      sectionContent.unshift({ text: "\n\n\n\n\n\n\n\n" });
      sections.push(sectionContent);
    }

    const docDefinition = {
      content: sections,
      pageSize: "A4",
      pageMargins: [40, 40, 40, 40], // Márgenes de 15 en todas las direcciones
      defaultStyle: {
        fontSize: 10,
      },
    };

    /*
    const pdfDocument = pdfMake.createPdf(docDefinition);
  
    pdfDocument.getDataUrl((dataUrl) => {
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "Nombre" + Date.now() + ".pdf";
      link.click();
  
      setTimeout(() => {
        setGeneratingPDF(false);
      }, 5000);
    });
    */

    const pdfDocument = pdfMake.createPdf(docDefinition);

    pdfDocument.getDataUrl(async (dataUrl) => {
      // Crear un objeto FormData para enviar el archivo PDF y otros datos al backend
      const formData = new FormData();
      formData.append('file', dataUrlToBlob(dataUrl),'Nombre.pdf'); // Convierte la URL en Blob
      formData.append('nombre', `Nombre${Date.now()}.pdf`); // Nombre del archivo

      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_ACCESLINK + "proyects/guardar_pdf_editor",
          {
            method: 'POST',
            body: formData,
            withCredentials: true,
            credentials: "include",
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          console.log('PDF guardado en:', responseData.filePath);
          alert('PDF guardado con éxito');
        } else {
          console.error('Error al guardar el PDF en el servidor.');
          alert('Error al guardar el PDF en el servidor.');
        }
      } catch (error) {
        console.error('Error de red:', error);
        alert('Error de red al guardar el PDF.');
      } finally {
        setGeneratingPDF(false);
      }
    });
  };

  // Función para convertir una URL en Blob
  const dataUrlToBlob = (dataUrl) => {
    const parts = dataUrl.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const byteCharacters = atob(parts[1]);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  };

  /*
    //fucion para enviar el pdf y crearlo en la API
    const HandleSUbumit = async (arrayB) => {
  
      try {
        const result = await axios.post(
          process.env.NEXT_PUBLIC_ACCESLINK + "proyects/Convertir_pdf",
          { id_proyecto: id_proyecto, array_buffer: arrayB },
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
  */

  const handleQuillChange = (content, delta, source, editor) => {
    if (source === "user" && socket) {
      socket.emit("send-changes", { id_proyecto, delta, content });
    }
    setEditorContent(editor.getContents());

    const editorElement = document.querySelector(".ql-editor");
    if (editorElement) {
      const height = editorElement.scrollHeight;
      setEditorHeight(height);

      // Si se inserta una línea horizontal, agrega una nueva página
      const hrElements = editorElement.querySelectorAll("hr");
      if (hrElements.length > 0) {
        addNewPage();
      }
    }
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
