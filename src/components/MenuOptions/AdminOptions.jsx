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

export default function AdminOptions() {
  //Estados para abrir las opciones del menu
  //estado para abrir la opcion de usuarios
  const [openUsers, setOpenUsers] = useState(false);
  const handleUsers = () => {
    setOpenUsers(!openUsers);
    setOpenAreas(false);
  };
  //estado para abrir la opcion de areas
  const [openAreas, setOpenAreas] = useState(false);
  const handleAreas = () => {
    setOpenAreas(!openAreas);
    setOpenUsers(false);
  };
  //Retornar interfaz
  return (
    <Fragment>
      <div className="bg-white">
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
          </div>
          <div className="row-span-2  w-full h-full col-span-12 bg-blue-gray-50">
            {openUsers ? <Users></Users> : ""}
            {openAreas ? <Areas></Areas> : ""}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
