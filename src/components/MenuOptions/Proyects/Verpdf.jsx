import { React, Fragment, useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

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

export default function Verpdf({ link }) {
  return (
    <div className="bg-white h-auto">
      <DialogHeader className="justify-between">
        <div className="flex items-center gap-3">Opciones del proyecto</div>
      </DialogHeader>
      <DialogBody divider={true}>
        <Fragment>
          <div className="bg-white">
            <div className="grid grid-flow-col">
              <div className="row-span-2 h-80 ">
                <List>
                  <ListItem className="border-b-2 border-black rounded-none">
                    <ListItemPrefix></ListItemPrefix>
                    Revision
                  </ListItem>
                </List>

                <List>
                  <ListItem className="border-b-2 border-black rounded-none">
                    <ListItemPrefix></ListItemPrefix>
                    Comentarios
                  </ListItem>
                </List>

                <List>
                  <ListItem className="border-b-2 border-black rounded-none">
                    <ListItemPrefix></ListItemPrefix>
                    Niveles
                  </ListItem>
                </List>

                <List>
                  <ListItem className="border-b-2 border-black rounded-none">
                    <ListItemPrefix></ListItemPrefix>
                    Editar
                  </ListItem>
                </List>
                <List>
                  <ListItem className="border-b-2 border-black rounded-none">
                    <ListItemPrefix></ListItemPrefix>
                    Historial
                  </ListItem>
                </List>
              </div>
              <div className="row-span-2  w-full h-auto col-span-12 ">
                <iframe
                  src={link}
                  height="100%"
                  width="100%"
                  className="h-screen"
                />
              </div>
            </div>
          </div>
        </Fragment>
      </DialogBody>
      <DialogFooter className="justify-between"></DialogFooter>
    </div>
  );
}
