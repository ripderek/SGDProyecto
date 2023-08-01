import {
  Card,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
  Alert,
  Checkbox,
} from "@material-tailwind/react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Crear_Nivel({ handlerOpen }) {
  const [openAlert, setOpenAlert] = useState(false);
  const hadleAlert = () => setOpenAlert(!openAlert);
  const [openAlerterror, setOpenAlerterror] = useState(false);
  const hadleAlerterror = () => setOpenAlerterror(!openAlert);
  const [error, setError] = useState([]);
  const [users, setUsers] = useState({
    p_titulo: "",
    p_descripcion: "",
    p_cardinalidad: false,
  });
  const HandleChange = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };
  //Enviar los datos
  const HandleSUbumit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:4000/api/flujo/CrearNivel",
        users,
        {
          withCredentials: true,
        }
      );
      hadleAlert();
      setError(result.data);
    } catch (error) {
      setError(error.response.data);
      hadleAlerterror();
    }
  };
  return (
    <Dialog size="sm" open={true} className="rounded-none">
      <DialogHeader className="bg-gray-200">
        Crear Nivel
        <Button
          color="red"
          variant="text"
          size="sm"
          className="!absolute top-3 right-3"
          onClick={() => handlerOpen(false)}
        >
          <Typography variant="h5" color="blue-gray">
            X
          </Typography>
        </Button>
      </DialogHeader>
      <DialogBody>
        <Alert
          color="green"
          onClose={() => setOpenAlert(false)}
          open={openAlert}
        >
          {error.message}
        </Alert>
        <Alert
          color="red"
          onClose={() => setOpenAlerterror(false)}
          open={openAlerterror}
        >
          {error.message}
        </Alert>
        <Card
          color="transparent"
          shadow={false}
          className="mx-auto items-center"
        >
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={HandleSUbumit}
          >
            <div className="mb-4 flex flex-col gap-6">
              <Input
                size="lg"
                label="Titulo"
                name="p_titulo"
                onChange={HandleChange}
              />
              <Input
                size="lg"
                label="Descripcion"
                name="p_descripcion"
                onChange={HandleChange}
              />
              <Checkbox
                name="p_cardinalidad"
                onChange={(e) =>
                  setUsers({ ...users, [e.target.name]: e.target.checked })
                }
                label={
                  <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center font-normal"
                  >
                    ¿Este nivel admite más de un area?
                  </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
              />
            </div>
            <Button
              className="mt-6 rounded-none"
              fullWidth
              color="green"
              type="submit"
            >
              Guardar
            </Button>
          </form>
        </Card>
      </DialogBody>
    </Dialog>
  );
}
