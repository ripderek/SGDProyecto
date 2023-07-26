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
export default function EditarArea({ id_user }) {
  const [openAlert, setOpenAlert] = useState(false);
  const hadleAlert = () => setOpenAlert(!openAlert);
  const [openAlerterror, setOpenAlerterror] = useState(false);
  const hadleAlerterror = () => setOpenAlerterror(!openAlert);
  const [error, setError] = useState([]);
  const [area, setArea] = useState({
    p_nombre_area: "",
    p_prefijo_area: "",
    id: id_user,
  }); // llenar automaticamente los datos del area a medida que se escribe en los txt
  const HandleChange = (e) => {
    setArea({ ...area, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  };
  const HandleSUbumit = async () => {
    try {
      //aqui mandar a editar los datos del area
      const result = await axios.post(
        "http://localhost:4000/api/area/Editar_datos_area",
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
          Datos actualizados
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
            className="bg-gray-50 m-0 grid place-items-center rounded-none py-8 px-4 text-center"
          >
            <Typography variant="h3" color="black" className="mb-4">
              Cambiar Datos
            </Typography>
            <div className="mb-4 w-full">
              <Input
                variant="outlined"
                color="black"
                label="Nombre del area"
                name="p_nombre_area"
                onChange={HandleChange}
              />
            </div>
            <div className=" w-full">
              <Input
                variant="outlined"
                color="black"
                label="Prefijo"
                name="p_prefijo_area"
                onChange={HandleChange}
              />
            </div>
          </CardHeader>
          <CardBody className="items-end ">
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
