import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tab,
  TabsBody,
  Tabs,
  TabsHeader,
} from "@material-tailwind/react";
import axios from "axios";

import MiPerfi from "../Users/MiPerfi";
import CambiarFoto from "./CambiarFoto";
import CambiarContra from "./CambiarContra";
import CambiarContraAdmin from "./CambiarContraAdmin";
import Lottie from "lottie-react";
import anim from "../../../../public/Anim/perfil_anim.json";
export default function PerfilUser({
  iduser,
  isadmin,
  isadminarea,
  idarea,
  admin,
  relacionarea,
}) {
  //Estados para abrir las opciones del menu
  //estado para abrir la opcion de usuarios
  const [openUsers, setOpenUsers] = useState(false);
  const handleUsers = () => {
    setOpenUsers(true);
    setOpenAreas(false);
    setOpenEmpresa(false);
    setOpenContraAdmin(false);
    setOpenCambiarEstadoAPP(false);
    setOpenCambiarEstado(false);
    setOpenCambiarROL(false);
    setOpenFondo(false);
  };
  //estado para abrir la opcion de areas
  const [openAreas, setOpenAreas] = useState(false);
  const handleAreas = () => {
    setOpenAreas(true);
    setOpenUsers(false);
    setOpenEmpresa(false);
    setOpenContraAdmin(false);
    setOpenCambiarEstadoAPP(false);
    setOpenCambiarROL(false);
    setOpenCambiarEstado(false);
    setOpenFondo(false);
  };
  //estado para abrir la opcion de empresa
  const [openEmpresa, setOpenEmpresa] = useState(false);
  const handleEmpresa = () => {
    setOpenAreas(false);
    setOpenUsers(false);
    setOpenEmpresa(true);
    setOpenContraAdmin(false);
    setOpenCambiarEstadoAPP(false);
    setOpenCambiarROL(false);
    setOpenCambiarEstado(false);
    setOpenFondo(false);
  };
  //estado para abrir la opcion de cambiar la contrasena mediante admin
  const [openContraAdmin, setOpenContraAdmin] = useState(false);
  const handleContraAdmin = () => {
    setOpenAreas(false);
    setOpenUsers(false);
    setOpenEmpresa(false);
    setOpenCambiarEstado(false);
    setOpenCambiarEstadoAPP(false);
    setOpenCambiarROL(false);
    setOpenContraAdmin(true);
    setOpenFondo(false);
  };
  //estado para cambiar el (estado de un usario dentro de un area)
  const [openCambiarEstado, setOpenCambiarEstado] = useState(false);
  const handleCambiarEstado = () => {
    setOpenAreas(false);
    setOpenUsers(false);
    setOpenEmpresa(false);
    setOpenContraAdmin(false);
    setOpenCambiarEstadoAPP(false);
    setOpenCambiarROL(false);
    setOpenCambiarEstado(true);
    setOpenFondo(false);
  };
  //estado para cambiar el rol de un usuario dentro de un area (ejemplo si usuario normal cambia a admin y viceversa)
  const [openCambiarROl, setOpenCambiarROL] = useState(false);
  const handleCambiarROL = () => {
    setOpenAreas(false);
    setOpenUsers(false);
    setOpenEmpresa(false);
    setOpenContraAdmin(false);
    setOpenCambiarEstadoAPP(false);
    setOpenCambiarEstado(false);
    setOpenCambiarROL(true);
    setOpenFondo(false);
  };
  //estado deshabilitar usuario de toda la app
  const [openCambiarEstadoAPP, setOpenCambiarEstadoAPP] = useState(false);
  const handleCambiarEstadoAPP = () => {
    setOpenAreas(false);
    setOpenUsers(false);
    setOpenEmpresa(false);
    setOpenContraAdmin(false);
    setOpenCambiarEstado(false);
    setOpenCambiarROL(false);
    setOpenCambiarEstadoAPP(true);
    setOpenFondo(false);
  };
  const [openFondo, setOpenFondo] = useState(true);

  //Cambiar el estado del usuario en el area
  const HandleSUbumit = async () => {
    try {
      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "area/Deshabilitar_usuario_area",
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
        process.env.NEXT_PUBLIC_ACCESLINK + "user/Deshabilitar/" + iduser,
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

  //Submit para cambiar el rol del usuario dentro del area
  const HandleSUbumitAreaRol = async () => {
    try {
      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "area/CambiarRol",
        { p_id_relacion: relacionarea },
        {
          withCredentials: true,
        }
      );
      console.log(result);
      alert(result.data.message);

      handleCambiarROL();
    } catch (error) {
      alert(error.response.data.message);
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
        <Dialog open={openCambiarROl} handler={handleCambiarROL}>
          <DialogHeader> Cambiar rol de area </DialogHeader>
          <DialogBody divider>
            Si este usuario tiene el rol de "usuario normal", entonces cambiará
            a "administrador de area" como todos los permisos activos, de lo
            contrario se le quitarán los permisos de administrador de area
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleCambiarROL}
              className="mr-1"
            >
              <span>Cancelar</span>
            </Button>
            <Button
              variant="gradient"
              color="green"
              onClick={HandleSUbumitAreaRol}
            >
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
        <Tabs orientation="vertical" className="p-3">
          <TabsHeader className="w-32">
            <Tab onClick={handleUsers} key={"Mi perfil"} value={"Mi perfil"}>
              Mi perfil
            </Tab>
            <Tab
              onClick={handleAreas}
              key={"Cambiar foto"}
              value={"Cambiar foto"}
            >
              Cambiar foto
            </Tab>
            <Tab
              onClick={handleEmpresa}
              key={"Cambiar Contraseña"}
              value={"Cambiar Contraseña"}
            >
              Cambiar Contraseña
            </Tab>
            {isadmin || isadminarea ? (
              <Tab
                onClick={handleContraAdmin}
                key={"Cambiar Contraseña (Admin)"}
                value={"Cambiar Contraseña (Admin)"}
              >
                Cambiar Contraseña (Admin)
              </Tab>
            ) : (
              ""
            )}
            {isadmin ? (
              <Tab
                onClick={handleCambiarEstadoAPP}
                key={"Cambiar Estado"}
                value={"Cambiar Estado"}
              >
                Cambiar Estado
              </Tab>
            ) : (
              ""
            )}
            {isadminarea ? (
              <Tab
                onClick={handleCambiarEstado}
                key={"Expulsar de area"}
                value={"Expulsar de area"}
              >
                Expulsar de area
              </Tab>
            ) : (
              ""
            )}
            {isadminarea ? (
              <Tab
                onClick={handleCambiarROL}
                key={"Cambiar rol de area"}
                value={"Cambiar rol de area"}
              >
                Cambiar rol de area
              </Tab>
            ) : (
              ""
            )}
          </TabsHeader>
          <TabsBody className="overflow-x-auto">
            {openUsers ? <MiPerfi iduser={iduser} admin={admin} /> : ""}
            {openAreas ? <CambiarFoto id_user={iduser} /> : ""}
            {openEmpresa ? <CambiarContra id_user={iduser} /> : ""}
            {openContraAdmin ? <CambiarContraAdmin id_user={iduser} /> : ""}
            {openFondo ? (
              <div className="mx-auto">
                <Lottie
                  animationData={anim}
                  className="w-80 md:w-2/5 mx-auto"
                />
              </div>
            ) : (
              ""
            )}
          </TabsBody>
        </Tabs>
      </div>
    </Fragment>
  );
}
