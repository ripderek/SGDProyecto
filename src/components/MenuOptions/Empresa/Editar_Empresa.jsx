import { useState, useEffect } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";

import axios from "axios";

function Editar_Empresa({ id_empresa }) {
  const [users, setUsers] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const hadleAlert = () => setOpenAlert(!openAlert);
  const [openAlerterror, setOpenAlerterror] = useState(false);
  const hadleAlerterror = () => setOpenAlerterror(!openAlert);
  const [error, setError] = useState([]);
  useEffect(() => {
    load();
  }, []);
  const HandleChange = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };
  const HandleSUbumit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:4000/api/empresa/Editar/" + id_empresa,
        users,
        {
          withCredentials: true,
        }
      );
      hadleAlert();
    } catch (error) {
      setError(error.response.data);
      hadleAlerterror();
    }
  };
  const load = async () => {
    //Cargar la lista de guias
    const result = await fetch(
      "http://localhost:4000/api/public/Datos_Empresa",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    console.log(result);
    const data = await result.json();
    setUsers(data);
    console.log(data);
  };
  return (
    <Card color="transparent" shadow={false} className="items-center">
      <Alert color="green" onClose={() => setOpenAlert(false)} open={openAlert}>
        Datos actualizados
      </Alert>
      <Alert
        color="red"
        onClose={() => setOpenAlerterror(false)}
        open={openAlerterror}
      >
        {error.message}
      </Alert>
      <Typography variant="h4" color="blue-gray">
        Datos a editar
      </Typography>
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={HandleSUbumit}
      >
        <div className="mb-4 flex flex-col gap-6">
          <Input
            size="lg"
            label="Nombre"
            value={users.nombres_empresa}
            type="text"
            onChange={HandleChange}
            name="nombres_empresa"
          />
          <Input
            size="lg"
            label="Dirección"
            value={users.direccion_empresa}
            type="text"
            onChange={HandleChange}
            name="direccion_empresa"
          />
          <Input
            size="lg"
            label="Celular"
            value={users.celular_empresa}
            type="text"
            onChange={HandleChange}
            name="celular_empresa"
            maxLength={10}
          />
          <Input
            size="lg"
            label="Correo"
            value={users.correo_empresa}
            type="text"
            onChange={HandleChange}
            name="correo_empresa"
          />
        </div>

        <Button
          className="mt-6 rounded-none"
          color="green"
          fullWidth
          type="submit"
        >
          Guardar Cambios
        </Button>
      </form>
    </Card>
  );
}

export default Editar_Empresa;
