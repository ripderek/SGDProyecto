import React, { useEffect, useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Box,Button  } from "@mui/material";
import { io } from "socket.io-client";
import Delta from "quill-delta";
import jsPDF from "jspdf";


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

  useEffect(() => {
    const socketServer = io("http://localhost:9000");
    setSocket(socketServer);

    socketServer.emit("join-room", id_proyecto);

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

  const handleQuillChange = (content, delta, source, editor) => {
    if (source === "user" && socket) {
      socket.emit("send-changes", { id_proyecto,delta,content });
    }
    setEditorContent(editor.getContents());
  };
  const handleGeneratePDF = () => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4", // Tamaño A4
    });
    const title = "Contenido del Editor";

    // Obtener el ancho del PDF
    const pdfWidth = pdf.internal.pageSize.getWidth();

    // Obtener el ancho del título
    const titleWidth = pdf.getStringUnitWidth(title) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;

    // Calcular la posición horizontal centrada
    const centerX = (pdfWidth - titleWidth) / 2;

    // Colocar el título centrado
    pdf.text(title, centerX, 10);

    // Convertir el contenido del editor a texto y agregarlo al PDF
    const editorText = editorContent.ops.map(op => (typeof op.insert === 'string' ? op.insert : '')).join('');
    pdf.text(editorText, 10, 20);

    // Descargar el PDF
    pdf.save("editor_content.pdf");
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
                 <Button onClick={handleGeneratePDF} variant="contained" color="primary">
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
