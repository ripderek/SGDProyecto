import { Fragment, useState, useEffect } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
//importar opcion de users
import Users from "../MenuOptions/Users/Users";
import Areas from "../MenuOptions/Areas/Areas";
import Empresa_Datos from "../MenuOptions/Empresa/Empresa_Datos";
import OpCategorias from "./Categorias/OpCategorias";
export default function AdminOptions() {
  //Estados para abrir las opciones del menu
  //estado para abrir la opcion de usuarios
  const [openUsers, setOpenUsers] = useState(false);
  const handleUsers = () => {
    setOpenUsers(!openUsers);
    setOpenAreas(false);
    setOpenEmpresa(false);
    setOpenCategoria(false);
  };
  //estado para abrir la opcion de areas
  const [openAreas, setOpenAreas] = useState(false);
  const handleAreas = () => {
    setOpenAreas(!openAreas);
    setOpenUsers(false);
    setOpenEmpresa(false);
    setOpenCategoria(false);
  };
  //estado para abrir la opcion de empresa
  const [openEmpresa, setOpenEmpresa] = useState(false);
  const handleEmpresa = () => {
    setOpenAreas(false);
    setOpenUsers(false);
    setOpenEmpresa(!openEmpresa);
    setOpenCategoria(false);
  };
  //estado para categoria
  const [openCategoria, setOpenCategoria] = useState(false);
  const handleCategoria = () => {
    setOpenAreas(false);
    setOpenUsers(false);
    setOpenEmpresa(false);
    setOpenCategoria(!openCategoria);
  };
  //Retornar interfaz
  return (
    <Fragment>
      <div className="bg-white mb-20">
        <div className="bg-white">
          <Typography
            variant="h4"
            color="black"
            className=" Titulo mr-4 ml-2 py-1.5"
          >
            Opciones de Administrador General
          </Typography>
        </div>
        <div className="grid grid-flow-col">
          <div className="row-span-2 w-28 h-80 ">
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
                onClick={handleAreas}
              >
                <ListItemPrefix></ListItemPrefix>
                Areas
              </ListItem>
            </List>
            <List>
              <ListItem className="border-b-2 border-black rounded-none">
                <ListItemPrefix></ListItemPrefix>
                Documentos
              </ListItem>
            </List>
            <List>
              <ListItem className="border-b-2 border-black rounded-none">
                <ListItemPrefix></ListItemPrefix>
                Proyectos
              </ListItem>
            </List>
            <List>
              <ListItem
                className="border-b-2 border-black rounded-none"
                onClick={handleEmpresa}
              >
                <ListItemPrefix></ListItemPrefix>
                Empresa
              </ListItem>
            </List>
            <List>
              <ListItem
                className="border-b-2 border-black rounded-none"
                onClick={handleCategoria}
              >
                <ListItemPrefix></ListItemPrefix>
                Categorias
              </ListItem>
            </List>
          </div>
          <div className="row-span-2  w-full h-full col-span-12 bg-white">
            {openUsers ? <Users /> : ""}
            {openAreas ? <Areas /> : ""}
            {openEmpresa ? <Empresa_Datos /> : ""}
            {openCategoria ? <OpCategorias /> : ""}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
