import { React, Fragment, useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";

import DocumentosAreas from "./DocumentosAreas";
import GuiasProyecto from "./GuiasProyecto";
import CrearFlujoProyecto from "./CrearFlujoProyecto";

//props {idproyecto, nombrearea, idarea}
export default function Proyecto({ idproyecto, nombrearea, idarea }) {
  const [fondo, setFondo] = useState(true);
  const cookies = new Cookies();
  //abrir la opcion documentos para ver los documentos que se han subido y tambien para subirlos en caso de ser admin
  const [openDocuments, setOpenDocuments] = useState(false);
  const handleDocuments = () => {
    setOpenDocuments(!openDocuments);
    setOpenGuias(false);
    setOpenDefinirFlujo(false);
    setFondo(openDocuments ? true : false);
  };
  //abrir la opcion de guias del proyecto
  const [openGuias, setOpenGuias] = useState(false);
  const handleGuias = () => {
    setOpenDocuments(false);
    setOpenGuias(!openGuias);
    setOpenDefinirFlujo(false);
    setFondo(openGuias ? true : false);
  };
  //abrir la opcion definir flujo
  const [openDefinirFlujo, setOpenDefinirFlujo] = useState(false);
  const handlerDefinifir = () => {
    setOpenDocuments(false);
    setOpenGuias(false);
    setOpenDefinirFlujo(!openDefinirFlujo);
    setFondo(openDefinirFlujo ? true : false);
  };
  //abrir el editor de texto
  const [openEditor, SetOpenEditor] = useState(false);
  //cargar los datos del usuario para mostrar las opciones
  //si es admin puede hacer de todo
  //si es editor solo puede subir archivos
  //si es revisor solo puede ver los archivos
  //las opciones que tienen en comun son: ver flujo, comentarios, y documentos y editor de texto
  //obtener el dato de si el proyecto permite subir documentos o se usa el editor de texto
  const [areasdata, setAreasData] = useState([]);

  //    setOpenDocument(1);

  useEffect(() => {
    load();
  }, []);
  // cookies.get("id_user")
  const load = async () => {
    //Cargar la lista de las areas
    const user = {
      p_id_user: cookies.get("id_user"),
      p_id_proyect: idproyecto,
    };
    const result = await axios.post(
      "http://localhost:4000/api/proyects/roles_proyecto",
      user,
      {
        withCredentials: true,
      }
    );

    setAreasData(result.data);
    console.log(result.data);
  };
  return (
    <div className="bg-white h-full mb-10">
      <Dialog
        size="xxl"
        open={openEditor}
        handler={() => SetOpenEditor(false)}
        className="overflow-y-scroll"
      >
        <button onClick={() => SetOpenEditor(false)} className="bg-yellow-900">
          <Typography variant="h2" color="white">
            Cerrar Editor de texto
          </Typography>
        </button>
        Abrir el editor de texto
      </Dialog>
      <DialogHeader className="justify-between">
        <div className="flex items-center gap-3">
          <div className="-mt-px flex flex-col">{areasdata.p_titulo}</div>
        </div>
      </DialogHeader>
      <DialogBody className="shadow-none">
        <Fragment>
          <div className="bg-white">
            <div className="grid grid-flow-col">
              <div className="row-span-2 h-80 ">
                {areasdata.p_subir ? (
                  <List onClick={handleDocuments}>
                    <ListItem className="border-b-2 border-black rounded-none">
                      <ListItemPrefix></ListItemPrefix>
                      Documentos
                    </ListItem>
                  </List>
                ) : (
                  <List onClick={() => SetOpenEditor(true)}>
                    <ListItem className="border-b-2 border-black rounded-none">
                      <ListItemPrefix></ListItemPrefix>
                      Editor de Texto
                    </ListItem>
                  </List>
                )}
                <List onClick={handleGuias}>
                  <ListItem className="border-b-2 border-black rounded-none">
                    <ListItemPrefix></ListItemPrefix>
                    Guias
                  </ListItem>
                </List>
                <List>
                  <ListItem className="border-b-2 border-black rounded-none">
                    <ListItemPrefix></ListItemPrefix>
                    Flujo
                  </ListItem>
                </List>
                {areasdata.p_rol === "Admin" ? (
                  <List onClick={handlerDefinifir}>
                    <ListItem className="border-b-2 border-black rounded-none">
                      <ListItemPrefix></ListItemPrefix>
                      Definir Flujo
                    </ListItem>
                  </List>
                ) : (
                  ""
                )}

                <List>
                  <ListItem className="border-b-2 border-black rounded-none">
                    <ListItemPrefix></ListItemPrefix>
                    Comentarios
                  </ListItem>
                </List>
                <List>
                  <ListItem className="border-b-2 border-black rounded-none">
                    <ListItemPrefix></ListItemPrefix>
                    Participantes
                  </ListItem>
                </List>
                <List>
                  <ListItem className="border-b-2 border-black rounded-none">
                    <ListItemPrefix></ListItemPrefix>
                    Historial de borradores
                  </ListItem>
                </List>
              </div>
              <div className="row-span-2  w-full h-full col-span-12 border-0 border-x-0 border-white">
                {openDocuments ? (
                  <DocumentosAreas id={idproyecto} rol={areasdata.p_rol} />
                ) : (
                  ""
                )}
                {openGuias ? (
                  <GuiasProyecto id={idproyecto} rol={areasdata.p_rol} />
                ) : (
                  ""
                )}
                {openDefinirFlujo ? (
                  <CrearFlujoProyecto idproyecto={idproyecto} idarea={idarea} />
                ) : (
                  ""
                )}
                {fondo ? (
                  <div>
                    <div className="flex justify-center mt-7 ">
                      <img
                        className="ml-5 h-80 w-80 rounded-full border-4 border-yellow-600 center opacity-30"
                        src={
                          "http://localhost:4000/api/area/Areaimagen/" + idarea
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
