import { React, Fragment, useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Avatar,
  IconButton,
  Typography,
  Card,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { HeartIcon, ShareIcon } from "@heroicons/react/24/solid";
import UsersAreas from "../Areas/UsersAreas";
import { UserPlusIcon, PencilIcon } from "@heroicons/react/24/solid";

//prueba para dibujar el arbol
import Arbol from "../Areas/VerArbol";
import OpProyectos from "../Proyects/OpProyectos";

export default function OPArea(idArea) {
  const [openUsers, setOpenUsers] = useState(false);
  const handleUsers = () => {
    setOpenUsers(!openUsers);
    setOpenAreas(false);
    setOpenJerarquia(false);
    setFondo(openUsers ? true : false);
    setOpenProyectos(false);
  };
  //estado para abrir la opcion de areas
  const [openAreas, setOpenAreas] = useState(false);
  const handleAreas = () => {
    setOpenAreas(!openAreas);
    setOpenUsers(false);
  };
  //estado para abrir la opcion de jerarquia de area
  const [openJerarquia, setOpenJerarquia] = useState(false);
  const handleJeraquia = () => {
    setOpenUsers(false);
    setOpenAreas(false);
    setOpenJerarquia(!openJerarquia);
    setOpenProyectos(false);
    setFondo(openJerarquia ? true : false);
  };
  //estado para abrir la opcion de proyectos de area
  const [openProyectos, setOpenProyectos] = useState(false);
  const handleProyectos = () => {
    setOpenUsers(false);
    setOpenAreas(false);
    setOpenProyectos(!openProyectos);
    setOpenJerarquia(false);
    setFondo(openProyectos ? true : false);
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
                  <ListItem className="border-b-2 border-black rounded-none">
                    <ListItemPrefix></ListItemPrefix>
                    Editar Datos
                  </ListItem>
                </List>
              </div>
              <div className="row-span-2  w-full h-auto col-span-12 ">
                {openUsers ? <UsersAreas id={idArea.idArea} /> : ""}
                {openJerarquia ? <Arbol idarea={idArea.idArea} /> : ""}
                {openProyectos ? <OpProyectos id={idArea.idArea} /> : ""}

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
