import { React, Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Avatar,
  IconButton,
  Typography,
  Card,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { HeartIcon, ShareIcon } from "@heroicons/react/24/solid";
import UsersAreas from "../Areas/UsersAreas";
import { UserPlusIcon, PencilIcon } from "@heroicons/react/24/solid";

export default function OPArea(idArea, asdasda) {
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
  return (
    <div>
      <DialogHeader className="justify-between">
        <div className="flex items-center gap-3">
          <div className="-mt-px flex flex-col">{asdasda.nameArea}</div>
        </div>
      </DialogHeader>
      <DialogBody divider={true}>
        <Fragment>
          <div className="bg-white">
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
                  <ListItem className="border-b-2 border-black rounded-none">
                    <ListItemPrefix></ListItemPrefix>
                    Proyectos
                  </ListItem>
                </List>
              </div>
              <div className="row-span-2  w-full h-full col-span-12 ">
                {openUsers ? <UsersAreas id={idArea.idArea} /> : ""}
              </div>
            </div>
          </div>
        </Fragment>
      </DialogBody>
      <DialogFooter className="justify-between"></DialogFooter>
    </div>
  );
}
