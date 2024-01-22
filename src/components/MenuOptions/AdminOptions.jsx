import { Fragment, useState } from "react";
import {
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
import { ListaSubCategorias } from "@/components/MenuOptions/SubCategorias";
//esto hay que borrar xq se reemplazara por una funcion mas optima xd
export default function AdminOptions() {
  //Estados para abrir las opciones del menu
  //estado para abrir la opcion de usuarios
  const [options, setOptions] = useState({
    users: false,
    areas: false,
    empresa: false,
    categoria: false,
    niveles: false,
    proyects: false,
    subcategoria: false,
    fondo: true,
  });

  const handleOption = (option) => {
    setOptions({
      users: option === "users",
      areas: option === "areas",
      empresa: option === "empresa",
      categoria: option === "categoria",
      niveles: option === "niveles",
      proyects: option === "proyects",
      subcategoria: option === "subcategoria",
      fondo: false,
    });
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
              <Tab
                key={"Usera"}
                value={"Users"}
                onClick={() => handleOption("users")}
              >
                Usuarios
              </Tab>
              <Tab
                key={"Areas"}
                value={"Areas"}
                onClick={() => handleOption("areas")}
              >
                Areas
              </Tab>
              <Tab
                key={"Empresa"}
                value={"Empresa"}
                onClick={() => handleOption("empresa")}
              >
                Empresa
              </Tab>
              <Tab
                key={"Categorias"}
                value={"Categorias"}
                onClick={() => handleOption("categoria")}
              >
                Categorias
              </Tab>
              <Tab
                key={"Sub Categorias"}
                value={"Sub Categorias"}
                onClick={() => handleOption("subcategoria")}
              >
                Sub Categorias
              </Tab>
              <Tab
                key={"Niveles"}
                value={"Niveles"}
                onClick={() => handleOption("niveles")}
              >
                Niveles Flujo
              </Tab>
              <Tab
                key={"Proyectos"}
                value={"Proyectos"}
                onClick={() => handleOption("proyects")}
              >
                Proyectos
              </Tab>
            </TabsHeader>
            <TabsBody>
              {options.users ? <Users /> : ""}
              {options.areas ? <Areas /> : ""}
              {options.empresa ? <Empresa_Datos /> : ""}
              {options.categoria ? <OpCategorias /> : ""}
              {options.niveles ? <Niveles /> : ""}
              {options.subcategoria ? <ListaSubCategorias /> : ""}

              {options.fondo ? (
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
      </div>
    </Fragment>
  );
}
