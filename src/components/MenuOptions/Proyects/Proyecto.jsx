import { React, useState, useEffect, Fragment } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import {
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
  Button,
  Dialog,
  Typography,
  Chip,
  Input,
} from "@material-tailwind/react";

import AlcanceProyecto from "./AlcanceProyecto";
import DocumentosAreas from "./DocumentosAreas";
import GuiasProyecto from "./GuiasProyecto";
import CrearFlujoProyecto from "./CrearFlujoProyecto";
import Lottie from "lottie-react";
import anim_settings from "../../../../public/Anim/proyects_anim.json";
import VerFlujo_Proyecto from "./VerFlujo_Proyecto";
import BorradoresProyecto from "./BorradoresProyecto";
import NivelesProyecto from "./NivelesProyecto";
import SubirNivel from "./SubirNivel";
import ConfigurarProyecto from "./ConfigurarProyecto";
import Editor from "./EditorTexto";
import Loading from "@/components/loading";
import Historial from "./Historial";
import Participantes from "./Participantes";
//props {idproyecto, nombrearea, idarea}
export default function Proyecto({
  idproyecto,
  nombrearea,
  idarea,
  adminDELAREA,
  tipop,
}) {
  const [fondo, setFondo] = useState(true);
  const cookies = new Cookies();
  const [areasdata, setAreasData] = useState([]);
  const [openD, setOpenD] = useState(false);
  const [users2, setUsers2] = useState([]);
  const [proyectoEdit, setProyectoEdit] = useState(true);
  const [RolUser, setRolUser] = useState([]);
  const [dataUser, setDataUser] = useState({
    correo_institucional_user: "",
    correo_personal_user: "",
    estado_user: "",
    identi: "",
    isadmin_user: "",
    nombre_firma_user: "",
    nombres_user: "",
    numero_celular_user: "",
    tip_iden: "",
    url_foto_user: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
  }, []);
  // cookies.get("id_user")
  const load = async () => {
    setLoading(true);

    //Cargar el rol del usario en ese proyecto
    try {
      const user_data = {
        idu: cookies.get("id_user"),
        p_id_proyecto: idproyecto,
        p_id_area: idarea,
      };

      const result3 = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "user/User_rol",
        user_data,
        {
          withCredentials: true,
        }
      );
      setRolUser(result3.data);
      console.log(result3.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

    //Cargar la lista de las areas
    const user = {
      p_id_user: cookies.get("id_user"),
      p_id_proyect: idproyecto,
    };
    const result = await axios.post(
      process.env.NEXT_PUBLIC_ACCESLINK + "proyects/roles_proyecto",
      user,
      {
        withCredentials: true,
      }
    );

    setAreasData(result.data);
    console.log(result.data);
    try {
      //obtener el id mediante cookies
      const result = await axios.get(
        process.env.NEXT_PUBLIC_ACCESLINK +
          "user/User/" +
          cookies.get("id_user"),
        {
          withCredentials: true,
        }
      );
      //console.log(result.data.rows[0]);
      console.log("");
      console.log("Result data");
      //console.log(result.data);
      const data = result.data;
      setDataUser({
        correo_institucional_user: data.correo_institucional_user,
        correo_personal_user: data.correo_personal_user,
        estado_user: data.estado_user,
        identi: data.identi,
        isadmin_user: data.isadmin_user,
        nombre_firma_user: data.nombre_firma_user,
        nombres_user: data.nombres_user,
        numero_celular_user: data.numero_celular_user,
        tip_iden: data.tip_iden,
        url_foto_user: data.url_foto_user,
      });
      console.log(dataUser);
    } catch (error) {
      //Mostrar algun error por consola
      console.log(error);
      setLoading(false);

      //setLoading(false);
    }
    //obtener los niveles del proyecto
    const result2 = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK +
        "proyects/estados_niveles/" +
        idproyecto,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    const data2 = await result2.json();
    setUsers2(data2);
    //si el proyecto tiene mas de 1 estado nivel no se debe permitir entrar a su configuracion ni dejar subir documentos nuevos.
    setProyectoEdit(data2.length >= 2 ? false : true);
    setLoading(false);
  };

  const Recargar = (valor) => {
    if (valor) {
      load();
      //aqui se tiene que habilitar para ver el fondoup xdxd skere modo diablo
      setOpenDefinir(false);
      setFondo(true);
      setOpenConfiguracion(false);
    }
  };
  //todas estan siguientes constantes son para abrir las opciones del submenu xd skere modo diablo;
  const [openDocumentos, setOpenDocumentos] = useState(false);
  const HandleDocumentos = () => {
    setOpenDocumentos(true);
    setOpenD(false);
    setOpenAlcance(false);
    setOpenGuias(false);
    setOpenFlujo(false);
    setOpenDefinir(false);
    setOpenSubir(false);
    setOpenRevisiones(false);
    setOpenComentarios(false);
    setOpenBorradores(false);
    setOpenParticipantes(false);
    setOpenConfiguracion(false);
    setOpenHistorial(false);
    setFondo(false);
  };
  const [openAlcance, setOpenAlcance] = useState(false);
  const HandleAlcance = () => {
    setOpenAlcance(true);
    setOpenD(false);
    setOpenDocumentos(false);
    setOpenGuias(false);
    setOpenFlujo(false);
    setOpenDefinir(false);
    setOpenSubir(false);
    setOpenRevisiones(false);
    setOpenComentarios(false);
    setOpenParticipantes(false);
    setOpenBorradores(false);
    setOpenConfiguracion(false);
    setOpenHistorial(false);
    setFondo(false);
  };
  const [openGuias, setOpenGuias] = useState(false);
  const HandleGuias = () => {
    setOpenGuias(true);
    setOpenAlcance(false);
    setOpenD(false);
    setOpenDocumentos(false);
    setOpenFlujo(false);
    setOpenDefinir(false);
    setOpenSubir(false);
    setOpenRevisiones(false);
    setOpenComentarios(false);
    setOpenParticipantes(false);
    setOpenBorradores(false);
    setOpenConfiguracion(false);
    setOpenHistorial(false);
    setFondo(false);
  };
  const [openFlujo, setOpenFlujo] = useState(false);
  const HandleFlujo = () => {
    setOpenFlujo(true);
    setOpenGuias(false);
    setOpenAlcance(false);
    setOpenD(false);
    setOpenDocumentos(false);
    setOpenDefinir(false);
    setOpenSubir(false);
    setOpenRevisiones(false);
    setOpenComentarios(false);
    setOpenParticipantes(false);
    setOpenBorradores(false);
    setOpenConfiguracion(false);
    setOpenHistorial(false);
    setFondo(false);
  };
  const [openDefinir, setOpenDefinir] = useState(false);
  const HandlerDefinir = () => {
    setOpenDefinir(true);
    setOpenFlujo(false);
    setOpenGuias(false);
    setOpenAlcance(false);
    setOpenD(false);
    setOpenDocumentos(false);
    setOpenSubir(false);
    setOpenRevisiones(false);
    setOpenComentarios(false);
    setOpenParticipantes(false);
    setOpenBorradores(false);
    setOpenConfiguracion(false);
    setOpenHistorial(false);
    setFondo(false);
  };
  const [openSubir, setOpenSubir] = useState(false);
  const HandlerSubir = () => {
    setOpenSubir(true);
    setOpenDefinir(false);
    setOpenFlujo(false);
    setOpenGuias(false);
    setOpenAlcance(false);
    setOpenD(false);
    setOpenDocumentos(false);
    setOpenRevisiones(false);
    setOpenComentarios(false);
    setOpenParticipantes(false);
    setOpenBorradores(false);
    setOpenConfiguracion(false);
    setOpenHistorial(false);
    setFondo(false);
  };
  const [openRevisiones, setOpenRevisiones] = useState(false);
  const HandlerRevisiones = () => {
    setOpenRevisiones(true);
    setOpenSubir(false);
    setOpenDefinir(false);
    setOpenFlujo(false);
    setOpenGuias(false);
    setOpenAlcance(false);
    setOpenD(false);
    setOpenDocumentos(false);
    setOpenComentarios(false);
    setOpenParticipantes(false);
    setOpenBorradores(false);
    setOpenConfiguracion(false);
    setOpenHistorial(false);
    setFondo(false);
  };
  const [openComentarios, setOpenComentarios] = useState(false);
  const HandleComentarios = () => {
    setOpenComentarios(true);
    setOpenRevisiones(false);
    setOpenSubir(false);
    setOpenDefinir(false);
    setOpenFlujo(false);
    setOpenGuias(false);
    setOpenAlcance(false);
    setOpenD(false);
    setOpenDocumentos(false);
    setOpenParticipantes(false);
    setOpenBorradores(false);
    setOpenConfiguracion(false);
    setOpenHistorial(false);
    setFondo(false);
  };
  const [openParticipantes, setOpenParticipantes] = useState(false);
  const HandleParticipantes = () => {
    setOpenParticipantes(true);
    setOpenComentarios(false);
    setOpenRevisiones(false);
    setOpenSubir(false);
    setOpenDefinir(false);
    setOpenFlujo(false);
    setOpenGuias(false);
    setOpenAlcance(false);
    setOpenD(false);
    setOpenDocumentos(false);
    setOpenBorradores(false);
    setOpenConfiguracion(false);
    setOpenHistorial(false);
    setFondo(false);
  };
  const [openBorradores, setOpenBorradores] = useState(false);
  const HandlerBorradores = () => {
    setOpenBorradores(true);
    setOpenParticipantes(false);
    setOpenComentarios(false);
    setOpenRevisiones(false);
    setOpenSubir(false);
    setOpenDefinir(false);
    setOpenFlujo(false);
    setOpenGuias(false);
    setOpenAlcance(false);
    setOpenD(false);
    setOpenDocumentos(false);
    setOpenConfiguracion(false);
    setOpenHistorial(false);
    setFondo(false);
  };
  const [openConfiguracion, setOpenConfiguracion] = useState(false);
  const HandlerConfiguracion = () => {
    setOpenConfiguracion(true);
    setOpenBorradores(false);
    setOpenParticipantes(false);
    setOpenComentarios(false);
    setOpenRevisiones(false);
    setOpenSubir(false);
    setOpenDefinir(false);
    setOpenFlujo(false);
    setOpenGuias(false);
    setOpenAlcance(false);
    setOpenD(false);
    setOpenDocumentos(false);
    setOpenHistorial(false);
    setFondo(false);
  };
  const [openHistorial, setOpenHistorial] = useState(false);
  const HandlerHistorial = () => {
    setOpenHistorial(true);
    setOpenConfiguracion(false);
    setOpenBorradores(false);
    setOpenParticipantes(false);
    setOpenComentarios(false);
    setOpenRevisiones(false);
    setOpenSubir(false);
    setOpenDefinir(false);
    setOpenFlujo(false);
    setOpenGuias(false);
    setOpenAlcance(false);
    setOpenD(false);
    setOpenDocumentos(false);
    setFondo(false);
  };
  return (
    <div className="bg-white h-full mb-10">
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        ""
      )}

      <Dialog
        size="xxl"
        open={openD}
        handler={() => setOpenD(false)}
        className="overflow-y-scroll"
      >
        <DialogHeader className="bg-light-green-900 text-white">
          Editor de Texto
          <Button
            color="red"
            variant="text"
            size="md"
            className="!absolute top-3 right-3"
            onClick={() => setOpenD(false)}
          >
            <Typography variant="h5" color="white">
              X
            </Typography>
          </Button>
        </DialogHeader>
        <Editor id_proyecto={idproyecto} nombre={dataUser.nombres_user} />
      </Dialog>
      <DialogHeader className="justify-between">
        <div className="w-full text-2xl text-black font-bold overflow-hidden">
          {areasdata.p_titulo}
        </div>
      </DialogHeader>
      <div className="ml-6">
        <div className="flex gap-3 w-max">
          <div className="-mt-px flex flex-col">
            <Chip color="green" value={areasdata.p_codigo} />
          </div>
          <div className="-mt-px flex flex-col">
            <Chip color="amber" value={RolUser.rol_user} />
          </div>
          {areasdata.p_reforma ? (
            <div className="-mt-px flex flex-col">
              <Chip color="blue" value="Reforma" />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <DialogBody className="shadow-none">
        <Fragment>
          <div className="bg-white">
            <Tabs orientation="vertical" className="p-3">
              <TabsHeader className="w-32">
                <Tab
                  key={"Documento"}
                  value={"Documento"}
                  onClick={HandleDocumentos}
                >
                  Documento
                </Tab>
                <Tab
                  key={"Editor de Texto"}
                  value={"Editor de Texto"}
                  onClick={() => setOpenD(true)}
                >
                  Editor de Texto
                </Tab>
                {areasdata.p_reforma ? (
                  <Tab
                    key={"Alcance"}
                    value={"Alcance"}
                    onClick={HandleAlcance}
                  >
                    Alcance
                  </Tab>
                ) : (
                  ""
                )}

                <Tab key={"Guias"} value={"Guias"} onClick={HandleGuias}>
                  Guias
                </Tab>
                {areasdata.p_flujo ? (
                  <Tab key={"Flujo"} value={"Flujo"} onClick={HandleFlujo}>
                    Flujo
                  </Tab>
                ) : (
                  ""
                )}
                {areasdata.p_rol === "Admin" && !areasdata.p_flujo ? (
                  <Tab
                    key={"Definir Flujo"}
                    value={"Definir Flujo"}
                    onClick={HandlerDefinir}
                  >
                    Definir Flujo
                  </Tab>
                ) : (
                  ""
                )}
                {areasdata.p_rol === "Admin" && users2.length === 1 ? (
                  <Tab
                    key={"Subir Nivel"}
                    value={"Subir Nivel"}
                    onClick={HandlerSubir}
                  >
                    Subir Nivel
                  </Tab>
                ) : (
                  ""
                )}
                {areasdata.p_flujo ? (
                  <Tab
                    key={"Revisiones"}
                    value={"Revisiones"}
                    onClick={HandlerRevisiones}
                  >
                    Revisiones
                  </Tab>
                ) : (
                  ""
                )}

                <Tab
                  key={"Comentarios"}
                  value={"Comentarios"}
                  onClick={HandleComentarios}
                >
                  Comentarios
                </Tab>
                <Tab
                  key={"Participantes"}
                  value={"Participantes"}
                  onClick={HandleParticipantes}
                >
                  Participantes
                </Tab>
                <Tab
                  key={"Historial de borradores"}
                  value={"Historial de borradores"}
                  onClick={HandlerBorradores}
                >
                  Historial de borradores
                </Tab>
                {areasdata.p_rol === "Admin" && proyectoEdit ? (
                  <Tab
                    key={"Configuracion"}
                    value={"Configuracion"}
                    onClick={HandlerConfiguracion}
                  >
                    Configuracion
                  </Tab>
                ) : (
                  ""
                )}

                <Tab
                  key={"Historial"}
                  value={"Historial"}
                  onClick={HandlerHistorial}
                >
                  Historial
                </Tab>
              </TabsHeader>
              <TabsBody className="overflow-x-auto">
                {openDocumentos ? (
                  <DocumentosAreas
                    id={idproyecto}
                    rol={areasdata.p_rol}
                    editproyecto={
                      users2.length >= 2 || RolUser.rol_user === "Revisor"
                        ? false
                        : true
                    }
                  />
                ) : (
                  ""
                )}
                {openAlcance ? <AlcanceProyecto id={idproyecto} /> : ""}
                {openGuias ? (
                  <GuiasProyecto
                    id={idproyecto}
                    rol={areasdata.p_rol}
                    editproyecto={
                      users2.length >= 2 && RolUser.rol_user !== "Admin"
                        ? false
                        : true
                    }
                    permitesubir={RolUser.rol_user === "Admin" ? true : false}
                  />
                ) : (
                  ""
                )}
                {openFlujo ? <VerFlujo_Proyecto idproyecto={idproyecto} /> : ""}
                {openDefinir ? (
                  <CrearFlujoProyecto
                    idproyecto={idproyecto}
                    idarea={idarea}
                    Recargar={Recargar}
                  />
                ) : (
                  ""
                )}
                {openSubir ? <SubirNivel id_proyect={idproyecto} /> : ""}
                {openRevisiones ? <NivelesProyecto id={idproyecto} /> : ""}
                {openParticipantes ? (
                  <Participantes
                    idproyecto={idproyecto}
                    idarea={idarea}
                    agregarRevisores={true}
                    permite_agregar={
                      RolUser.rol_user === "Admin" ? true : false
                    }
                  />
                ) : (
                  ""
                )}
                {openBorradores ? <BorradoresProyecto id={idproyecto} /> : ""}
                {openConfiguracion ? (
                  <ConfigurarProyecto
                    eliminarFlujo={areasdata.p_flujo ? true : false}
                    id_proyecto={idproyecto}
                    Recargar={Recargar}
                  />
                ) : (
                  ""
                )}
                {openHistorial ? <Historial id={idproyecto} /> : ""}
                {fondo ? (
                  <Lottie
                    animationData={anim_settings}
                    className="w-80 md:w-2/5 mx-auto"
                  />
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
