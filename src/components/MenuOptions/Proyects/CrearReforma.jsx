import { React, useState, useEffect, Fragment } from "react";

import {
  Card,
  Input,
  Button,
  Typography,
  Drawer,
  CardBody,
  Avatar,
  CardFooter,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Cookies from "universal-cookie";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

export default function CrearReforma({ id_proyecto, titulo_proyecto, accion }) {
  //para enviar el documento
  const [file, setFile] = useState(null);
  //para abrir el drawle con las areas para poder seleccionar el id de una xd
  const [abrirArea, setOpenAbrirAreas] = useState(false);
  const [areasdata, setAreasData] = useState([]);
  const cookies = new Cookies();
  const [openModalArea, setOpenModalArea] = useState(false);
  const HandleModalArea = () => {
    setOpenModalArea(false);
  };
  const ImagePreview = (e) => {
    try {
      setFile(e.target.files[0]);
    } catch (error) {
      console.log(error);
    }
  };
  //listar las areas que administra mediante el id del user
  useEffect(() => {
    load();
  }, []);
  //para abrir el dialog con el mensaje si se confirma la reforma o se rechaza por algun error xdxd skere modo diablos
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [tituloMensaje, setTiuloMensjae] = useState("");
  const [descripcionAccion, setDescripcionAccion] = useState("");
  const load = async () => {
    //Cargar la lista de las areas
    const result = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK +
        "area/Areasadmin/" +
        cookies.get("id_user"),
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    const data = await result.json();
    setAreasData(data);
  };
  const [error, setError] = useState(false);
  //aqui enviar los datos para empezar las reformas
  //connstante para almacenar la descripcion
  const [descripcion, setDescripcion] = useState("");
  //constante para almacenar el id del area seleccionada
  const [id_areaReforma, setIDArearefroma] = useState(0);
  //constante apra almacenar el titulo del area seleccionada
  const [NombreArea, SetNOmbreArea] = useState("");
  const HandleSUbumit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.set("id_proyecto", id_proyecto);
      form.set("file", file);
      form.set("p_id_area_reforma", id_areaReforma);
      form.set("descripcion", descripcion);
      setFile("");
      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "proyects/reformar_proyecto",
        form,
        {
          withCredentials: true,
        }
      );
      setTiuloMensjae("Tarea exitosa");
      setDescripcionAccion(result.data.message);
      handleOpen();
      setError(false);
      //aqui enviar una funcion para cierre el dialog y cargue de nuevo la data xdxd skere modo diablo skere skere skere
    } catch (error) {
      setTiuloMensjae("Error");
      setDescripcionAccion(error.response.data.message);
      handleOpen();
      setError(true);
    }
  };

  const cerrarventana = () => {
    accion(error);
    handleOpen();
  };
  return (
    <div>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>{tituloMensaje}</DialogHeader>
        <DialogBody divider>{descripcionAccion}</DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="green" onClick={cerrarventana}>
            <span>Aceptar</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          {titulo_proyecto}
        </Typography>

        {NombreArea.length != 0 ? (
          <Typography color="gray" className="mt-1 font-thin">
            El area {NombreArea} realizara la reforma del proyecto{" "}
            {titulo_proyecto}
          </Typography>
        ) : (
          ""
        )}
        <form className="">
          <div className="mb-4 flex flex-col gap-6 mt-3">
            <input
              type="file"
              accept=".pdf"
              onChange={ImagePreview}
              className="mx-auto items-center"
            />
            <Input
              size="lg"
              label="Descripcion del documento"
              required
              onChange={(e) => setDescripcion(e.target.value)}
              value={descripcion}
            />
          </div>
          <Button
            className="mt-6 rounded-none"
            fullWidth
            color="yellow"
            onClick={() => setOpenModalArea(true)}
          >
            Seleccionar Area
          </Button>
          <Button
            className="mt-6 rounded-none"
            fullWidth
            color="green"
            onClick={HandleSUbumit}
          >
            Aceptar
          </Button>
        </form>
      </Card>

      <Drawer
        open={openModalArea}
        onClose={HandleModalArea}
        className="p-4 overflow-y-scroll"
        placement="right"
      >
        <div className="mb-6  items-center justify-between mt-6">
          <Typography variant="h3" color="blue-gray">
            Seleccionar área
          </Typography>
          <div className="flex w-auto">
            <Input
              label=""
              variant="standard"
              placeholder="Buscar"
              color="black"
            />
            <Button className="flex gap-1 rounded-none bg-light-green-900 h-auto w-auto">
              <FaSearch size="1.9em" />
            </Button>
          </div>
        </div>
        {areasdata.map((task) => (
          <Card className="mt-6 w- h-auto bg-blue-gray-50 shadow-2xl">
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {task.nombrearea}
              </Typography>
              <div className="text-center">
                <Avatar
                  src={
                    process.env.NEXT_PUBLIC_ACCESLINK +
                    "area/Areaimagen/" +
                    task.area_id
                  }
                  alt={task.logoarea}
                  size="xl"
                  className="mt-3"
                />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                className="bg-yellow-900"
                onClick={() => (
                  SetNOmbreArea(task.nombrearea),
                  setIDArearefroma(task.area_id),
                  HandleModalArea()
                )}
              >
                Seleccionar 2
              </Button>
            </CardFooter>
          </Card>
        ))}
      </Drawer>
    </div>
  );
}
