
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
  Alert,
  Input,
} from "@material-tailwind/react";
import axios from "axios";


export default function ResetPasswordToken () {

  const router = useRouter();
  const {token} = router.query;
  const [email, setEmail] = useState('');
  const [actualToken, setActualToken] = useState('');

  const [openAlert, setOpenAlert] = useState(false);
  const hadleAlert = () => setOpenAlert(!openAlert);
  const [openAlerterror, setOpenAlerterror] = useState(false);
  const hadleAlerterror = () => setOpenAlerterror(!openAlert);
  const [error, setError] = useState([]);
  const [respuesta,setRespuesta] = useState([]);
  

  useEffect(() => {
    // Aquí accedemos al token después de que el componente se haya actualizado
    if (token) {
      const [parsedEmail, tokenPart] = token.split('*');
      setEmail(parsedEmail); // Establecer el correo electrónico
      
      setActualToken(tokenPart); // Establecer la parte del token
    }
    
  }, [token]);

  const [area, setArea] = useState({
    contra_nueva: "",
    contra_nueva1: "",
    email1: "",
    aToken: ""
  });

  const HandleChange  = (e) => {
    setArea({ ...area, [e.target.name]: e.target.value });
  };
  const HandleSUbumit = async () => {
    try {

            
      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "public/Recuperar_cuenta_contrasena",
        {
          contra1: area.contra_nueva,
          contra2: area.contra_nueva1,
          correo: email,
          tokena: actualToken
        },
        {
          withCredentials: true,
        }
      );
      
      setRespuesta(result.data);
      hadleAlert();
    } catch (error) {
      setError(error.response.data);
      hadleAlerterror();
    }
  };
  return (
    <div className="flex justify-center mt-9">
      <div className="mb-9">
        <Alert
          color="green"
          onClose={() => setOpenAlert(false)}
          open={openAlert}
        >
          {respuesta.message}
        </Alert>
        <Alert
          color="red"
          onClose={() => setOpenAlerterror(false)}
          open={openAlerterror}
        >
          {error.message}
        </Alert>
        <Card className="w-full max-w-[24rem] mx-auto bg-blue-gray-100 rounded-none shadow-2xl">
          <CardHeader
            color="white"
            floated={false}
            shadow={false}
            className="m-0 grid place-items-center rounded-none py-8 px-4 text-center"
          >
            <Typography variant="h3" color="black" className="mb-4">
              Recuperación de la cuenta
            </Typography>
            <h1>Por favor ingrese su nueva Contraseña</h1>
            <div className="mb-4 w-full">
              
            </div>
            <div className="mb-4 w-full">
              <Input
                variant="outlined"
                color="black"
                label="Nueva Contraseña"
                name="contra_nueva"
                type="password"
                onChange={HandleChange}
              />
            </div>
            <div className="mb-4 w-full">
              <Input
                variant="outlined"
                color="black"
                label="Repetir Contraseña"
                name="contra_nueva1"
                type="password"
                onChange={HandleChange}
              />
            </div>
            <div className=" w-full">
              <Input
                variant="outlined"
                color="black"
                name="email1"
                type="email"
                label="Correo"
                value={email}
                readOnly
              />
            </div>
          </CardHeader>
          <CardBody className="justify-items-end">
            <div className="flex justify-center ">
              <Button
                className="bg-green-700 p-3 justify-items-end rounded-none"
                onClick={HandleSUbumit}
              >
                <Typography variant="h6" color="white">
                  Guardar Cambios
                </Typography>
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

