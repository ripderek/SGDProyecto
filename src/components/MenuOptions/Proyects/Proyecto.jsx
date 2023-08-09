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
} from "@material-tailwind/react";

import DocumentosAreas from "./DocumentosAreas";
import GuiasProyecto from "./GuiasProyecto";
import CrearFlujoProyecto from "./CrearFlujoProyecto";
import Lottie from "lottie-react";
import anim_settings from "../../../../public/Anim/proyects_anim.json";
import VerFlujo_Proyecto from "./VerFlujo_Proyecto";
import BorradoresProyecto from "./BorradoresProyecto";
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
      process.env.NEXT_PUBLIC_ACCESLINK + "proyects/roles_proyecto",
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
                if (value == "Documentos") {
                  if (areasdata.p_subir) {
                    return (
                      <Tab key={label} value={value}>
                        {label}
                      </Tab>
                    );
                  }
                } else if (value == "Editor de Texto") {
                  if (!areasdata.p_subir) {
                    return (
                      <Tab key={label} value={value}>
                        {label}
                      </Tab>
                    );
                  }
                } else if (value == "Flujo") {
                  if (areasdata.p_flujo) {
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
                } else if (value == "Configuracion") {
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
                    <DocumentosAreas id={idproyecto} rol={areasdata.p_rol} />
                  </TabPanel>
                );
              } else if (value === "Editor de Texto") {
                return (
                  <TabPanel key={value} value={value} className="py-0">
                    Aqui debe de abrir una pequena interfaz que sirve como
                    intermediario para abrir el editor de texto en otra pestana
                  </TabPanel>
                );
              } else if (value === "Guias") {
                return (
                  <TabPanel key={value} value={value} className="py-0">
                    <GuiasProyecto id={idproyecto} rol={areasdata.p_rol} />
                  </TabPanel>
                );
              } else if (value === "Definir Flujo") {
                return (
                  <TabPanel key={value} value={value} className="py-0">
                    <CrearFlujoProyecto
                      idproyecto={idproyecto}
                      idarea={idarea}
                    />
                  </TabPanel>
                );
              } else if (value === "Definir Flujo") {
                return (
                  <TabPanel key={value} value={value} className="py-0">
                    <CrearFlujoProyecto
                      idproyecto={idproyecto}
                      idarea={idarea}
                    />
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
