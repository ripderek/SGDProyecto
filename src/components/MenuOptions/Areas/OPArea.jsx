import { React, Fragment, useState, useEffect } from "react";
import {
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tab,
  TabsBody,
  Tabs,
  TabsHeader,
} from "@material-tailwind/react";
import UsersAreas from "../Areas/UsersAreas";
import Loading from "@/components/loading";

//prueba para dibujar el arbol
import Arbol from "../Areas/VerArbol";
import OpProyectos from "../Proyects/OpProyectos";
import EditarArea from "./EditarArea";
import CambiarFoto from "./CambiarFoto";
import CrearUsuarioArea from "./CrearUsuarioArea";
export default function OPArea(idArea) {
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const resultdata = await fetch(
        process.env.NEXT_PUBLIC_ACCESLINK +
          "area/data_area_id/" +
          idArea.idArea,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const dataU = await resultdata.json();
      setUserAreaData(dataU);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  //funcion que se activa cada vez que se anade un nuevo usuario para ver el listado
  const ver_listado = (valor) => {
    if (valor) handleUsers();
  };
  return (
    <div className="bg-white h-auto">
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        ""
      )}
      <DialogHeader className="justify-between">
        <div className="flex items-center gap-3">
          <div className="-mt-px flex flex-col">{UserAreaData.nombrearea}</div>
        </div>
      </DialogHeader>
      <DialogBody divider={true}>
        <Fragment>
          <div className="bg-white">
            <Tabs orientation="vertical" className="p-3">
              <TabsHeader className="w-32">
                <Tab onClick={handleUsers} key={"Usuarios"} value={"Usuarios"}>
                  Usuarios
                </Tab>
                <Tab
                  onClick={handleCrearUsuario}
                  key={"Crear Usuario"}
                  value={"Crear Usuario"}
                >
                  Crear Usuario
                </Tab>
                <Tab
                  onClick={handleProyectos}
                  key={"Proyectos"}
                  value={"Proyectos"}
                >
                  Proyectos
                </Tab>
                <Tab
                  onClick={handleJeraquia}
                  key={"Jerarquia"}
                  value={"Jerarquia"}
                >
                  Jerarquia
                </Tab>
                <Tab
                  onClick={handleEditar}
                  key={"Editar Datos"}
                  value={"Editar Datos"}
                >
                  Editar Datos
                </Tab>
                <Tab
                  onClick={handleCambiarFoto}
                  key={"Cambiar foto"}
                  value={"Cambiar foto"}
                >
                  Cambiar foto
                </Tab>
              </TabsHeader>
              <TabsBody className="overflow-x-auto">
                {openUsers ? <UsersAreas id={idArea.idArea} /> : ""}
                {openJerarquia ? <Arbol idarea={idArea.idArea} /> : ""}
                {openProyectos ? <OpProyectos id={idArea.idArea} /> : ""}
                {openEditarArea ? <EditarArea id_user={idArea.idArea} /> : ""}
                {openCambiarFoto ? <CambiarFoto id_user={idArea.idArea} /> : ""}
                {openCrearUsuario ? (
                  <CrearUsuarioArea
                    id_user={idArea.idArea}
                    ver_listado={ver_listado}
                  />
                ) : (
                  ""
                )}
                {fondo ? (
                  <div>
                    <div className="flex justify-center mt-7">
                      <img
                        className="ml-5 h-80 w-80 rounded-full border-4 border-yellow-600 center opacity-30"
                        src={
                          process.env.NEXT_PUBLIC_ACCESLINK +
                          "area/Areaimagen/" +
                          idArea.idArea
                        }
                        alt="User image"
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </TabsBody>
            </Tabs>
          </div>
        </Fragment>
      </DialogBody>
      <DialogFooter className="justify-between"></DialogFooter>
    </div>
  );
}
