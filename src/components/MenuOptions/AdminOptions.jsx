import { Fragment, useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Tabs,
  Tab,
  TabsHeader,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";
//importar opcion de users
import Users from "../MenuOptions/Users/Users";
import Areas from "../MenuOptions/Areas/Areas";
import Empresa_Datos from "../MenuOptions/Empresa/Empresa_Datos";
import OpCategorias from "./Categorias/OpCategorias";
import Niveles from "./Flujo/Niveles";
import Lottie from "lottie-react";
import anim_settings from "../../../public/Anim/proyects_anim.json";
export default function AdminOptions() {
  const data = [
    {
      label: "Usuarios",
      value: "Usuarios",
    },
    {
      label: "Areas",
      value: "Areas",
    },
    {
      label: "Documentos",
      value: "Documentos",
    },
    {
      label: "Proyectos",
      value: "Proyectos",
    },
    {
      label: "Niveles Flujo",
      value: "Niveles Flujo",
    },
    {
      label: "Empresa",
      value: "Empresa",
    },
    {
      label: "Categorias",
      value: "Categorias",
    },
    {
      label: "Html",
      value: "Html",
    },
  ];
  //Estados para abrir las opciones del menu
  //estado para abrir la opcion de usuarios
  const [openUsers, setOpenUsers] = useState(false);
  const handleUsers = () => {
    setOpenUsers(!openUsers);
    setOpenAreas(false);
    setOpenEmpresa(false);
    setOpenCategoria(false);
    setOpenNiveles(false);
  };
  //estado para abrir la opcion de areas
  const [openAreas, setOpenAreas] = useState(false);
  const handleAreas = () => {
    setOpenAreas(!openAreas);
    setOpenUsers(false);
    setOpenEmpresa(false);
    setOpenCategoria(false);
    setOpenNiveles(false);
  };
  //estado para abrir la opcion de empresa
  const [openEmpresa, setOpenEmpresa] = useState(false);
  const handleEmpresa = () => {
    setOpenAreas(false);
    setOpenUsers(false);
    setOpenEmpresa(!openEmpresa);
    setOpenNiveles(false);
    setOpenCategoria(false);
  };
  //estado para categoria
  const [openCategoria, setOpenCategoria] = useState(false);
  const handleCategoria = () => {
    setOpenAreas(false);
    setOpenUsers(false);
    setOpenEmpresa(false);
    setOpenNiveles(false);
    setOpenCategoria(!openCategoria);
  };
  //Estado para abrir los niveles
  const [openNiveles, setOpenNiveles] = useState(false);
  const handleNiveles = () => {
    setOpenAreas(false);
    setOpenUsers(false);
    setOpenEmpresa(false);
    setOpenCategoria(false);
    setOpenNiveles(!openNiveles);
  };
  //Retornar interfaz
  return (
    <Fragment>
      <div className="bg-white mb-20">
        <div className="bg-white text-lg font-semibold ml-4">
          Opciones de Administrador General
        </div>
        <div className="p-4">
          <Tabs value="Html" orientation="vertical">
            <TabsHeader className="w-32">
              {data.map(({ label, value }) => {
                if (value != "Html") {
                  return (
                    <Tab key={label} value={value}>
                      {label}
                    </Tab>
                  );
                }
              })}
            </TabsHeader>
            <TabsBody>
              {data.map(({ value }) => {
                if (value === "Usuarios") {
                  return (
                    <TabPanel key={value} value={value} className="py-0">
                      <Users />
                    </TabPanel>
                  );
                } else if (value === "Areas") {
                  return (
                    <TabPanel key={value} value={value} className="py-0">
                      <Areas />
                    </TabPanel>
                  );
                } else if (value === "Empresa") {
                  return (
                    <TabPanel key={value} value={value} className="py-0">
                      <Empresa_Datos />
                    </TabPanel>
                  );
                } else if (value === "Categorias") {
                  return (
                    <TabPanel key={value} value={value} className="py-0">
                      <OpCategorias />
                    </TabPanel>
                  );
                } else if (value === "Niveles Flujo") {
                  return (
                    <TabPanel key={value} value={value} className="py-0">
                      <Niveles />
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
        </div>
      </div>
    </Fragment>
  );
}
