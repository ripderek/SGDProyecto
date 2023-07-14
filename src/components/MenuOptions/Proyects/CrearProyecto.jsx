import {
  DialogHeader,
  DialogBody,
  Typography,
  Alert,
  Button,
  Input,
  Drawer,
  Card,
  List,
  ListItem,
} from "@material-tailwind/react";
import { useState, React } from "react";
import ListaCategorias from "../Categorias/ListaCategorias";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

import axios from "axios";

export default function CrearProyecto({ id, openDiv }) {
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlerterror, setOpenAlerterror] = useState(false);
  const hadleAlerterror = () => setOpenAlerterror(!openAlert);
  const [selector, setSelector] = useState(true);
  const [selector2, setSelector2] = useState(false);

  const handleSelector = () => {
    setSelector(true);
    setUser({
      ...user,
      p_subir_docs: true,
    });
    setSelector2(false);
  };
  const handleSelector2 = () => {
    setSelector2(true);
    setUser({
      ...user,
      p_subir_docs: false,
    });
    setSelector(false);
  };
  const [error, setError] = useState([]);

  ///---------------------------------------------------------------------------
  //estado creados exclusivamente para esta clase
  /* p_titulo --->  enviar input
    p_id_area --->id
    p_id_categoria ---->seleccionar con un menu
    p_prefijo_proyecto  ---->enviar input
  */
  const [user, setUser] = useState({
    p_titulo: "",
    p_id_area: id,
    p_id_categoria: "",
    p_prefijo_proyecto: "",
    p_subir_docs: true,
  });
  const HandleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  };
  const [openCat, setOpenCat] = useState(false);
  const [idCat, setidCat] = useState("");
  const [nombreCat, setnombreCat] = useState("");
  const id_categoria = (idc) => {
    setUser({
      ...user,
      p_id_categoria: idc,
    });
    setidCat(idc);
  };
  const nombre_categoria = (name) => {
    setnombreCat(name);
  };
  const cerrar = (value) => {
    setOpenCat(false);
  };
  const HandleSUbumit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:4000/api/proyects/crear_proyecto",
        user,
        {
          withCredentials: true,
        }
      );

      console.log(result);
      console.log(user);
      openDiv(false);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      hadleAlerterror();
    }
  };
  return (
    <div className="h-auto mb-5 ">
      <Drawer
        open={openCat}
        onClose={() => setOpenCat(false)}
        className="p-4 overflow-y-scroll"
        placement="right"
      >
        <div className="mb-6  items-center justify-between mt-6">
          <Typography variant="h3" color="blue-gray">
            Seleccionar área
          </Typography>
          <Button
            color="red"
            variant="text"
            size="md"
            className="!absolute top-3 right-3"
            onClick={() => setOpenCat(false)}
          >
            <Typography variant="h5" color="blue-gray">
              X
            </Typography>
          </Button>
        </div>
        <div>
          <ListaCategorias
            id_categoria={id_categoria}
            nombre_categoria={nombre_categoria}
            cerrar={cerrar}
          />
        </div>
      </Drawer>

      <DialogHeader className="justify-between">
        <Typography variant="h5" color="blue-gray" className="ml-4 mt-3 ">
          Crear Proyecto
        </Typography>
        <Button
          color="red"
          variant="text"
          size="md"
          className="!absolute top-3 right-3"
          onClick={() => openDiv(false)}
        >
          <Typography variant="h5" color="blue-gray">
            X
          </Typography>
        </Button>
      </DialogHeader>
      <Alert
        color="yellow"
        onClose={() => setOpenAlert(false)}
        open={openAlert}
      >
        Se creo el proyecto
      </Alert>
      <Alert
        color="red"
        onClose={() => setOpenAlerterror(false)}
        open={openAlerterror}
      >
        {error}
      </Alert>
      <DialogBody divider={false}>
        <form className=" sm:w-full" onSubmit={HandleSUbumit}>
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              name="p_titulo"
              variant="standard"
              color="black"
              placeholder="Titulo"
              onChange={HandleChange}
              required
            />
            <Input
              size="lg"
              name="p_prefijo_proyecto"
              variant="standard"
              color="black"
              placeholder="Prefijo para el proyecto"
              onChange={HandleChange}
              required
            />
            <Input
              size="lg"
              name="p_id_categoria"
              variant="standard"
              color="black"
              placeholder="Categoria"
              value={nombreCat}
              required
              disabled
            />
            <Button
              className="mt-6 rounded-none mx-auto p-3 w-52"
              fullWidth
              color="green"
              onClick={() => setOpenCat(true)}
            >
              Seleccionar categoria
            </Button>
            <Card className="w-96 mx-auto bg-blue-gray-50">
              <List>
                <ListItem onClick={handleSelector}>
                  Subir Documentos (PDF)
                  {selector ? <PlusCircleIcon className="ml-4 h-5 w-5" /> : ""}
                </ListItem>
                <ListItem onClick={handleSelector2}>
                  Trabajar con el editor de texto
                  {selector2 ? <PlusCircleIcon className="ml-4 h-5 w-5" /> : ""}
                </ListItem>
              </List>
            </Card>
          </div>

          <Button
            className="mt-6 rounded-none  "
            fullWidth
            color="yellow"
            type="submit"
          >
            Crear
          </Button>
        </form>
      </DialogBody>
    </div>
  );
}
