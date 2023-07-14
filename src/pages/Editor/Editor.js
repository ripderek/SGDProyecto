import { useState, useRef, useMemo } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Avatar,
  IconButton,
  Typography,
  Card,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import dynamic from 'next/dynamic';
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

function Editor() {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        onChange={(newContent) => setContent(newContent)}
      />
    </div>
  );
}

export default Editor;
