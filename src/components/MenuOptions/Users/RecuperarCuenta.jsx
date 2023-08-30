import { Fragment, useState, useEffect } from "react";
import {
  Navbar,
  Typography,
  Button,
  Input,
  Collapse,
  Card,
  CardBody,
  Drawer,
  Alert,
} from "@material-tailwind/react";
import { FaSearch } from "react-icons/fa";

const EmailPopup = ({ onClose, onSend }) => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSendClick = () => {
    onSend(email);
    onClose();
  };

  return (
    <div className="popup">
      <Input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={handleEmailChange}
      />
      <div className="flex justify-center mt-3">
        <Button
          size="sm"
          className="bg-light-green-900 rounded-none"
          onClick={handleSendClick}
        >Enviar
        </Button>
      </div>
    </div>
  );
};

export default EmailPopup;
