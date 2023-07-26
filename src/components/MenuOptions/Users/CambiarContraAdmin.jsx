import { useState, useEffect, Fragment } from "react";
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

export default function CambiarContraAdmin({ id_user }) {
  const [openAlert, setOpenAlert] = useState(false);
  const hadleAlert = () => setOpenAlert(!openAlert);
  const [openAlerterror, setOpenAlerterror] = useState(false);
  const hadleAlerterror = () => setOpenAlerterror(!openAlert);
  const [error, setError] = useState([]);
  const [area, setArea] = useState({
    contra_nueva: "",
    contra_nueva1: "",
    id: id_user,
  });
  // llenar automaticamente los datos del area a medida que se escribe en los txt
  const HandleChange = (e) => {
    setArea({ ...area, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  };
  const HandleSUbumit = async () => {
    try {
      const result = await axios.post(
        "http://localhost:4000/api/user/Actualizar_Contra_admin",
        area,
        {
          withCredentials: true,
        }
      );
      hadleAlert();
      console.log(result);
    } catch (error) {
      console.log(error);
      setError(error.response.data);
      hadleAlerterror();
    }
  };
  return (
    <div>
      <div className="mb-9">
        <Alert
          color="green"
          onClose={() => setOpenAlert(false)}
          open={openAlert}
        >
          Contrasena actualizada
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
              Cambiar contraseña (Modo administrador)
            </Typography>
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
            <div className=" w-full">
              <Input
                variant="outlined"
                color="black"
                label="Repetir Contraseña"
                name="contra_nueva1"
                type="password"
                onChange={HandleChange}
              />
            </div>
          </CardHeader>
          <CardBody className="justify-items-end">
            <div className="justify-end justify-items-end">
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
}
