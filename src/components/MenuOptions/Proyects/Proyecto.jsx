import { React, useState, useEffect } from "react";
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
  const data = [
    {
      label: "Documentos",
      value: "Documentos",
    },
    {
      label: "Editor de Texto",
      value: "Editor de Texto",
    },
    {
      label: "Alcance",
      value: "Alcance",
    },
    {
      label: "Guias",
      value: "Guias",
    },
    {
      label: "Flujo",
      value: "Flujo",
    },
    {
      label: "Definir Flujo",
      value: "Definir Flujo",
    },
    {
      label: "Revisiones",
      value: "Revisiones",
    },
    {
      label: "Subir Nivel",
      value: "Subir Nivel",
    },
    {
      label: "Comentarios",
      value: "Comentarios",
    },
    {
      label: "Participantes",
      value: "Participantes",
    },
    {
      label: "Historial de borradores",
      value: "Historial de borradores",
    },
    {
      label: "Configuracion",
      value: "Configuracion",
    },
    {
      label: "Historial",
      value: "Historial",
    },
    {
      label: "Html",
      value: "Html",
    },
  ];
  const cookies = new Cookies();
  const [areasdata, setAreasData] = useState([]);
  const [openD, setOpenD] = useState(false);
  const [users2, setUsers2] = useState([]);
  const [proyectoEdit, setProyectoEdit] = useState(true);
  const [RolUser,setRolUser] = useState([]);
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
  useEffect(() => {
    load();
  }, []);
  // cookies.get("id_user")
  const load = async () => {
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
  };

  const Recargar = (valor) => {
    if (valor) {
      load();
    }
  };

  return (
    <div className="bg-white h-full mb-10">
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
        <div className="flex items-center gap-3">
          <div className="-mt-px flex flex-col">{areasdata.p_titulo}</div>
        </div>
      </DialogHeader>
      <DialogBody className="shadow-none">
        <Tabs value="Html" orientation="vertical">
          <TabsHeader className="w-32">
            {data.map(({ label, value }) => {
              if (value !== "Html") {
                if (value == "Flujo") {
                  if (areasdata.p_flujo) {
                    return (
                      <Tab key={label} value={value}>
                        {label}
                      </Tab>
                    );
                  }
                } else if (value == "Documentos") {
                  if (areasdata.p_rol === "Admin" || RolUser.rol_user === "Editor" || RolUser.rol_user === "Revisor") {
                    return (
                      <Tab key={label} value={value}>
                        {label}
                      </Tab>
                    );
                  }
                } else if (value == "Editor de Texto") {
                  if (areasdata.p_rol === "Admin" || RolUser.rol_user === "Editor") {
                    return (
                      <Tab key={label} value={value}>
                        {label}
                      </Tab>
                    );
                  }
                } else if (value == "Guias") {
                  if (areasdata.p_rol === "Admin" || RolUser.rol_user === "Editor" || RolUser.rol_user === "Revisor") {
                    return (
                      <Tab key={label} value={value}>
                        {label}
                      </Tab>
                    );
                  }
                } else if (value == "Definir Flujo") {
                  if (areasdata.p_rol === "Admin" && !areasdata.p_flujo) {
                    return (
                      <Tab key={label} value={value}>
                        {label}
                      </Tab>
                    );
                  }
                } else if (value === "Subir Nivel") {
                  if (areasdata.p_rol === "Admin" && users2.length === 1)
                    if (users2[0].r_estado) {
                      return (
                        <Tab key={label} value={value}>
                          {label}
                        </Tab>
                      );
                    }
                } else if (value == "Flujo") {
                  if (areasdata.p_rol === "Admin" || RolUser.rol_user === "Editor" || RolUser.rol_user === "Revisor") {
                    return (
                      <Tab key={label} value={value}>
                        {label}
                      </Tab>
                    );
                  }
                } else if (value == "Revisiones") {
                  if (areasdata.p_flujo) {
                    if (areasdata.p_rol === "Admin" || RolUser.rol_user === "Editor" ||RolUser.rol_user === "Revisor"){
                    return (
                      <Tab key={label} value={value}>
                        {label}
                      </Tab>
                    );
                    }
                  }
                } else if (value == "Configuracion") {
                  if (areasdata.p_rol === "Admin" && proyectoEdit) {
                    return (
                      <Tab key={label} value={value}>
                        {label}
                      </Tab>
                    );
                  }
                } else if (value == "Alcance") {
                  if (areasdata.p_reforma && (areasdata.p_rol === "Admin" || RolUser.rol_user === "Editor"|| RolUser.rol_user === "Revisor")) {
                    return (
                      <Tab key={label} value={value}>
                        {label}
                      </Tab>
                    );
                  }
                } else if (value == "Historial de borradores") {
                  if (areasdata.p_rol === "Admin" || RolUser.rol_user === "Editor" || RolUser.rol_user === "Revisor") {
                    return (
                      <Tab key={label} value={value}>
                        {label}
                      </Tab>
                    );
                  }
                } else if (value == "Historial") {
                  if (areasdata.p_rol === "Admin" || RolUser.rol_user === "Editor"|| RolUser.rol_user === "Revisor") {
                    return (
                      <Tab key={label} value={value}>
                        {label}
                      </Tab>
                    );
                  }
                } else if (value == "Participantes") {
                  if (areasdata.p_rol === "Admin") {
                    return (
                      <Tab key={label} value={value}>
                        {label}
                      </Tab>
                    );
                  }
                } else {
                  return (
                    <Tab key={label} value={value}>
                      {label}
                    </Tab>
                  );
                }
              }
            })}
          </TabsHeader>
          <TabsBody>
            {data.map(({ value }) => {
              if (value === "Documentos") {
                return (
                  <TabPanel key={value} value={value} className="py-0">
                    <DocumentosAreas
                      id={idproyecto}
                      rol={areasdata.p_rol}
                      editproyecto = {(users2.length >= 2 || RolUser.rol_user === "Revisor") ? false : true }
                    />
                  </TabPanel>
                );
              } else if (value === "Alcance") {
                return (
                  <TabPanel key={value} value={value} className="py-0">
                    {<AlcanceProyecto
                      id={idproyecto}
                    />}
                  </TabPanel>
                );
              } else if (value === "Editor de Texto") {
                return (
                  <TabPanel key={value} value={value} className="py-0">
                    Aqui debe de abrir una pequena interfaz que sirve como
                    intermediario para abrir el editor de texto en otra pestana
                    <Button onClick={() => setOpenD(true)}>Abrir Editor</Button>
                  </TabPanel>
                );
              } else if (value === "Guias") {
                return (
                  <TabPanel key={value} value={value} className="py-0">
                    <GuiasProyecto
                      id={idproyecto}
                      rol={areasdata.p_rol}
                      editproyecto={(users2.length >= 2 || RolUser.rol_user === "Revisor"|| RolUser.rol_user === "Editor") ? false : true}
                    />
                  </TabPanel>
                );
              } else if (value === "Revisiones") {
                return (
                  <TabPanel key={value} value={value} className="py-0">
                    <NivelesProyecto id={idproyecto} />
                  </TabPanel>
                );
              } else if (value === "Definir Flujo") {
                return (
                  <TabPanel key={value} value={value} className="py-0">
                    <CrearFlujoProyecto
                      idproyecto={idproyecto}
                      idarea={idarea}
                      Recargar={Recargar}
                    />
                  </TabPanel>
                );
              } else if (value === "Configuracion") {
                return (
                  <TabPanel key={value} value={value} className="py-0">
                    <ConfigurarProyecto
                      eliminarFlujo={areasdata.p_flujo ? true : false}
                      id_proyecto={idproyecto}
                    />
                  </TabPanel>
                );
              } else if (value === "Subir Nivel") {
                return (
                  <TabPanel key={value} value={value} className="py-0">
                    <SubirNivel id_proyect={idproyecto} />
                  </TabPanel>
                );
              } else if (value === "Flujo") {
                return (
                  <TabPanel key={value} value={value} className="py-0">
                    <VerFlujo_Proyecto idproyecto={idproyecto} />
                  </TabPanel>
                );
              } else if (value === "Historial de borradores") {
                return (
                  <TabPanel key={value} value={value} className="py-0">
                    <BorradoresProyecto id={idproyecto} />
                  </TabPanel>
                );
              } else if (value === "Historial") {
                return (
                  <TabPanel key={value} value={value} className="py-0">
                    <Historial id={idproyecto} />
                  </TabPanel>
                );
              } else if (value === "Participantes") {
                return (
                  <TabPanel key={value} value={value} className="py-0">
                    <Participantes
                      idproyecto={idproyecto}
                      idarea={idarea}
                      agregarRevisores={true}
                    />
                  </TabPanel>
                );
              } else {
                return (
                  <TabPanel key={value} value={value} className="py-0">
                    <Lottie
                      animationData={anim_settings}
                      className="w-80 md:w-2/5 mx-auto"
                    />
                  </TabPanel>
                );
              }
            })}
          </TabsBody>
        </Tabs>
      </DialogBody>
      <DialogFooter className="justify-between"></DialogFooter>
    </div>
  );
}
