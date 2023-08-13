import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import 'quill/dist/quill.snow.css';
import { Box } from '@mui/material';
import io from 'socket.io-client';

const socket = io('http://localhost:9000'); // Reemplaza con la URL y el puerto de tu servidor

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']  
];

const Editor = () => {
  const [quillInitialized, setQuillInitialized] = useState(false);
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });
  
    return () => {
      socket.off('connect');
    };
  }, []);
  

  useEffect(() => {
    setQuillInitialized(true);

    socket.on('load-document', (data) => {
      setEditorContent(data);
    });

    socket.on('receive-changes', (delta) => {
      console.log('Received changes:', delta);
      applyDeltaToEditor(delta);
    });

    return () => {
      socket.off('load-document');
      socket.off('receive-changes');
    };
  }, []);

  const handleTextChange = (content) => {
    setEditorContent(content);
    socket.emit('send-changes', content);
  };

  const applyDeltaToEditor = (delta) => {
    setEditorContent(delta); // Actualiza el contenido del editor con el delta recibido
  };

  return (
    <Box className="bg-blue-gray-500">
      {quillInitialized && (
        <div className="container">
          <div>
            <QuillNoSSRWrapper theme="snow"modules={{ toolbar: toolbarOptions }} value={editorContent} onChange={handleTextChange}/>
          </div>
        </div>
      )}
    </Box>
  );
}
export default Editor;


