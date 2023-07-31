import { React, Fragment, useState, useEffect } from "react";
import {
  DialogHeader,
  DialogBody,
  DialogFooter,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import UsersAreas from "../Areas/UsersAreas";

//prueba para dibujar el arbol
import Arbol from "../Areas/VerArbol";
import OpProyectos from "../Proyects/OpProyectos";
import EditarArea from "./EditarArea";
import CambiarFoto from "./CambiarFoto";
import CrearUsuarioArea from "./CrearUsuarioArea";
export default function OPArea(idArea) {
  const [openUsers, setOpenUsers] = useState(false);
  const handleUsers = () => {
    setOpenUsers(true);
    setOpenAreas(false);
    setOpenJerarquia(false);
    setOpenEditrArea(false);
    setOpenCambiarFoto(false);
    setOpenCrearUsuario(false);
    setFondo(false);

    setOpenProyectos(false);
  };
  //estado para abrir la opcion de areas
  const [openAreas, setOpenAreas] = useState(false);
  const handleAreas = () => {
    setOpenAreas(true);
    setOpenEditrArea(false);
    setOpenUsers(false);
    setOpenCambiarFoto(false);
    setOpenCrearUsuario(false);
    setFondo(false);
  };
  //estado para abrir la opcion de jerarquia de area
  const [openJerarquia, setOpenJerarquia] = useState(false);
  const handleJeraquia = () => {
    setOpenUsers(false);
    setOpenAreas(false);
    setOpenJerarquia(true);
    setOpenProyectos(false);
    setOpenEditrArea(false);
    setOpenCambiarFoto(false);
    setOpenCrearUsuario(false);
    setFondo(false);
  };
  //estado para abrir la opcion de proyectos de area
  const [openProyectos, setOpenProyectos] = useState(false);
  const handleProyectos = () => {
    setOpenUsers(false);
    setOpenAreas(false);
    setOpenProyectos(true);
    setOpenJerarquia(false);
    setOpenEditrArea(false);
    setOpenCrearUsuario(false);
    setFondo(openProyectos ? true : false);
    setOpenCambiarFoto(false);
    setFondo(false);
  };

  const [openEditarArea, setOpenEditrArea] = useState(false);
  const handleEditar = () => {
    setOpenUsers(false);
    setOpenAreas(false);
    setOpenProyectos(false);
    setOpenEditrArea(true);
    setOpenCambiarFoto(false);
    setOpenJerarquia(false);
    setOpenCrearUsuario(false);
    setFondo(false);
  };
  const [openCambiarFoto, setOpenCambiarFoto] = useState(false);
  const handleCambiarFoto = () => {
    setOpenUsers(false);
    setOpenAreas(false);
    setOpenProyectos(false);
    setOpenEditrArea(false);
    setOpenCambiarFoto(true);
    setOpenJerarquia(false);
    setOpenCrearUsuario(false);
    setFondo(false);
  };
  const [openCrearUsuario, setOpenCrearUsuario] = useState(false);
  const handleCrearUsuario = () => {
    setOpenUsers(false);
    setOpenAreas(false);
    setOpenProyectos(false);
    setOpenEditrArea(false);
    setOpenCambiarFoto(false);
    setOpenJerarquia(false);
    setOpenCrearUsuario(true);
    setFondo(false);
  };
  const [fondo, setFondo] = useState(true);
  const [UserAreaData, setUserAreaData] = useState([]);

  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    try {
      const resultdata = await fetch(
        "http://localhost:4000/api/area/data_area_id/" + idArea.idArea,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const dataU = await resultdata.json();
      setUserAreaData(dataU);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-white h-auto">
      <DialogHeader className="justify-between">
        <div className="flex items-center gap-3">
          <div className="-mt-px flex flex-col">{UserAreaData.nombrearea}</div>
        </div>
      </DialogHeader>
      <DialogBody divider={true}>
        <Fragment>
          <div className="bg-white">
            <div className="grid grid-flow-col">
              <div className="row-span-2 h-80 ">
                <List>
                  <ListItem
                    className="border-b-2 border-black rounded-none"
                    onClick={handleUsers}
                  >
                    <ListItemPrefix></ListItemPrefix>
                    Usuarios
                  </ListItem>
                </List>
                <List>
                  <ListItem
                    className="border-b-2 border-black rounded-none"
                    onClick={handleCrearUsuario}
                  >
                    <ListItemPrefix></ListItemPrefix>
                    Crear Usuario
                  </ListItem>
                </List>
                <List>
                  <ListItem
                    className="border-b-2 border-black rounded-none"
                    onClick={handleProyectos}
                  >
                    <ListItemPrefix></ListItemPrefix>
                    Proyectos
                  </ListItem>
                </List>
                <List>
                  <ListItem
                    className="border-b-2 border-black rounded-none"
                    onClick={handleJeraquia}
                  >
                    <ListItemPrefix></ListItemPrefix>
                    Jerarquia
                  </ListItem>
                </List>
                <List>
                  <ListItem
                    className="border-b-2 border-black rounded-none"
                    onClick={handleEditar}
                  >
                    <ListItemPrefix></ListItemPrefix>
                    Editar Datos
                  </ListItem>
                </List>
                <List>
                  <ListItem
                    className="border-b-2 border-black rounded-none"
                    onClick={handleCambiarFoto}
                  >
                    <ListItemPrefix></ListItemPrefix>
                    Cambiar foto
                  </ListItem>
                </List>
              </div>
              <div className="row-span-2  w-full h-auto col-span-12 ">
                {openUsers ? <UsersAreas id={idArea.idArea} /> : ""}
                {openJerarquia ? <Arbol idarea={idArea.idArea} /> : ""}
                {openProyectos ? <OpProyectos id={idArea.idArea} /> : ""}
                {openEditarArea ? <EditarArea id_user={idArea.idArea} /> : ""}
                {openCambiarFoto ? <CambiarFoto id_user={idArea.idArea} /> : ""}
                {openCrearUsuario ? (
                  <CrearUsuarioArea id_user={idArea.idArea} />
                ) : (
                  ""
                )}

                {fondo ? (
                  <div>
                    <div className="flex justify-center mt-7">
                      <img
                        className="ml-5 h-80 w-80 rounded-full border-4 border-yellow-600 center opacity-30"
                        src={
                          "http://localhost:4000/api/area/Areaimagen/" +
                          idArea.idArea
                        }
                        alt="User image"
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </Fragment>
      </DialogBody>
      <DialogFooter className="justify-between"></DialogFooter>
    </div>
  );
}
