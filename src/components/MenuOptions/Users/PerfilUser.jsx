import { Fragment, useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";

import MiPerfi from "../Users/MiPerfi";
import CambiarFoto from "./CambiarFoto";
import CambiarContra from "./CambiarContra";
import CambiarContraAdmin from "./CambiarContraAdmin";
export default function PerfilUser({ iduser, isadmin, isadminarea, idarea }) {
  //Estados para abrir las opciones del menu
  //estado para abrir la opcion de usuarios
  const [openUsers, setOpenUsers] = useState(false);
  const handleUsers = () => {
    setOpenUsers(!openUsers);
    setOpenAreas(false);
    setOpenEmpresa(false);
    setOpenContraAdmin(false);
    setOpenCambiarEstadoAPP(false);

    setOpenCambiarEstado(false);
  };
  //estado para abrir la opcion de areas
  const [openAreas, setOpenAreas] = useState(false);
  const handleAreas = () => {
    setOpenAreas(!openAreas);
    setOpenUsers(false);
    setOpenEmpresa(false);
    setOpenContraAdmin(false);
    setOpenCambiarEstadoAPP(false);

    setOpenCambiarEstado(false);
  };
  //estado para abrir la opcion de empresa
  const [openEmpresa, setOpenEmpresa] = useState(false);
  const handleEmpresa = () => {
    setOpenAreas(false);
    setOpenUsers(false);
    setOpenEmpresa(!openEmpresa);
    setOpenContraAdmin(false);
    setOpenCambiarEstadoAPP(false);

    setOpenCambiarEstado(false);
  };
  //estado para abrir la opcion de cambiar la contrasena mediante admin
  const [openContraAdmin, setOpenContraAdmin] = useState(false);
  const handleContraAdmin = () => {
    setOpenAreas(false);
    setOpenUsers(false);
    setOpenEmpresa(false);
    setOpenCambiarEstado(false);
    setOpenCambiarEstadoAPP(false);

    setOpenContraAdmin(!openContraAdmin);
  };
  //estado para cambiar el (estado de un usario dentro de un area)
  const [openCambiarEstado, setOpenCambiarEstado] = useState(false);
  const handleCambiarEstado = () => {
    setOpenAreas(false);
    setOpenUsers(false);
    setOpenEmpresa(false);
    setOpenContraAdmin(false);
    setOpenCambiarEstadoAPP(false);
    setOpenCambiarEstado(!openCambiarEstado);
  };
  //estado deshabilitar usuario de toda la app
  const [openCambiarEstadoAPP, setOpenCambiarEstadoAPP] = useState(false);
  const handleCambiarEstadoAPP = () => {
    setOpenAreas(false);
    setOpenUsers(false);
    setOpenEmpresa(false);
    setOpenContraAdmin(false);
    setOpenCambiarEstado(false);
    setOpenCambiarEstadoAPP(!openCambiarEstadoAPP);
  };
  //Cambiar el estado del usuario en el area
  const HandleSUbumit = async () => {
    try {
      const result = await axios.post(
        "http://localhost:4000/api/area/Deshabilitar_usuario_area",
        { p_id_area: idarea, p_id_user: iduser },
        {
          withCredentials: true,
        }
      );
      handleCambiarEstado();
    } catch (error) {
      console.log(error);
    }
  };

  const HandleSUbumit1 = async () => {
    try {
      const result = await axios.post(
        "http://localhost:4000/api/user/Deshabilitar/" + iduser,
        {},
        {
          withCredentials: true,
        }
      );
      handleCambiarEstadoAPP();
    } catch (error) {
      console.log(error);
    }
  };
  //Retornar interfaz
  return (
    <Fragment>
      <Fragment>
        <Dialog open={openCambiarEstadoAPP} handler={handleCambiarEstadoAPP}>
          <DialogHeader> Cambiar estado usuario </DialogHeader>
          <DialogBody divider>
            Si este usuario esta activo se deshabilitara, por consecuencia no
            podra iniciar sesion ni ser agregado a una actividad. De lo
            contrario se activira su registro.
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleCambiarEstadoAPP}
              className="mr-1"
            >
              <span>Cancelar</span>
            </Button>
            <Button variant="gradient" color="green" onClick={HandleSUbumit1}>
              <span>Confirmar</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </Fragment>
      <Fragment>
        <Dialog open={openCambiarEstado} handler={handleCambiarEstado}>
          <DialogHeader> Deshabilitar usuario para esta area</DialogHeader>
          <DialogBody divider>
            Al realizar esta accion estara expulsando al usuario de esta area
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleCambiarEstado}
              className="mr-1"
            >
              <span>Cancelar</span>
            </Button>
            <Button variant="gradient" color="green" onClick={HandleSUbumit}>
              <span>Confirmar</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </Fragment>
      <div className="bg-white">
        <div className="bg-white">
          <Typography
            variant="h4"
            color="black"
            className=" Titulo mr-4 ml-2 py-1.5"
          >
            Opciones del Perfil
          </Typography>
        </div>
        <div className="grid grid-flow-col">
          <div className="row-span-2 w-48 h-80 ">
            <List>
              <ListItem
                className="border-b-2 border-black rounded-none"
                onClick={handleUsers}
              >
                <ListItemPrefix></ListItemPrefix>
                Mi perfil
              </ListItem>
            </List>

            <List>
              <ListItem
                className="border-b-2 border-black rounded-none"
                onClick={handleAreas}
              >
                <ListItemPrefix></ListItemPrefix>
                Cambiar foto
              </ListItem>
            </List>
            <List>
              <ListItem
                className="border-b-2 border-black rounded-none"
                onClick={handleEmpresa}
              >
                <ListItemPrefix></ListItemPrefix>
                Cambiar Contraseña
              </ListItem>
            </List>
            {isadmin || isadminarea ? (
              <List>
                <ListItem
                  className="border-b-2 border-black rounded-none"
                  onClick={handleContraAdmin}
                >
                  <ListItemPrefix></ListItemPrefix>
                  Cambiar Contraseña (Admin)
                </ListItem>
              </List>
            ) : (
              ""
            )}
            {isadmin ? (
              <List>
                <ListItem
                  className="border-b-2 border-black rounded-none"
                  onClick={handleCambiarEstadoAPP}
                >
                  <ListItemPrefix></ListItemPrefix>
                  Cambiar Estado
                </ListItem>
              </List>
            ) : (
              ""
            )}
            {isadminarea ? (
              <List>
                <ListItem
                  className="border-b-2 border-black rounded-none"
                  onClick={handleCambiarEstado}
                >
                  <ListItemPrefix></ListItemPrefix>
                  Expulsar de area (Admin)
                </ListItem>
              </List>
            ) : (
              ""
            )}
          </div>
          <div className="row-span-2  w-full h-full col-span-12 bg-white">
            {openUsers ? <MiPerfi iduser={iduser} /> : ""}
            {openAreas ? <CambiarFoto id_user={iduser} /> : ""}
            {openEmpresa ? <CambiarContra id_user={iduser} /> : ""}
            {openContraAdmin ? <CambiarContraAdmin id_user={iduser} /> : ""}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
