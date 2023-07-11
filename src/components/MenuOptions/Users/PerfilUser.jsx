import { Fragment, useState, useEffect } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import MiPerfi from "../Users/MiPerfi";
export default function PerfilUser(iduser) {
  //Estados para abrir las opciones del menu
  //estado para abrir la opcion de usuarios
  const [openUsers, setOpenUsers] = useState(false);
  const handleUsers = () => {
    setOpenUsers(!openUsers);
    setOpenAreas(false);
    setOpenEmpresa(false);
  };
  //estado para abrir la opcion de areas
  const [openAreas, setOpenAreas] = useState(false);
  const handleAreas = () => {
    setOpenAreas(!openAreas);
    setOpenUsers(false);
    setOpenEmpresa(false);
  };
  //estado para abrir la opcion de empresa
  const [openEmpresa, setOpenEmpresa] = useState(false);
  const handleEmpresa = () => {
    setOpenAreas(false);
    setOpenUsers(false);
    setOpenEmpresa(!openEmpresa);
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
              <ListItem className="border-b-2 border-black rounded-none">
                <ListItemPrefix></ListItemPrefix>
                Cambiar foto
              </ListItem>
            </List>
            <List>
              <ListItem className="border-b-2 border-black rounded-none">
                <ListItemPrefix></ListItemPrefix>
                Cambiar Contraseña
              </ListItem>
            </List>
          </div>
          <div className="row-span-2  w-full h-full col-span-12 bg-white">
            {openUsers ? <MiPerfi iduser={iduser.iduser} /> : ""}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
