import { Fragment, useState } from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
  Collapse,
  Card,
  CardBody,
  Drawer,
  Badge,
  List,
  ListItem,
  ListItemPrefix,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  PowerIcon,
  HomeIcon,
  UserIcon,
  PresentationChartBarIcon,
  CogIcon,
  Square2StackIcon,
} from "@heroicons/react/24/solid";

import { FaSearch, FaAlignLeft } from "react-icons/fa";
import { AiOutlineNotification } from "react-icons/ai";
import Router from "next/router"; //Rutas para redireccionar a otra pagina
import CardsNotification from "./Dashboard/CardsNotification";

export default function Navbar2() {
  const [open, setOpen] = useState(false);
  const [openM, setOpenM] = useState(false);

  const openDrawer = () => setOpen(true);
  const openDrawerM = () => setOpenM(true);

  const closeDrawer = () => setOpen(false);
  const closeDrawerM = () => setOpenM(false);

  const [openc, setOpenc] = useState(false);
  const toggleOpen = () => setOpenc((cur) => !cur);

  const [openS, setOpenS] = useState(false);

  const handleOpen = () => setOpenS(!openS);

  return (
    <Fragment>
      <Navbar className=" rounded-none shadow-none w-full  bg-gray-900  p-4 border-none mx-auto ">
        <div className="flex flex-wrap items-center justify-between gap-y-4 text-blue-gray-900">
          <Button
            onClick={openDrawerM}
            className="ml-0 flex gap-1 md:mr-0 rounded-none md:ml-0 w-auto bg-yellow-900 h-11"
          >
            <FaAlignLeft size="20px" />
          </Button>

          <Typography
            as="a"
            href="#"
            variant="h3"
            color="white"
            className="mr-4 ml-2 cursor-pointer py-1.5"
          >
            SGD
          </Typography>

          <div className="relative flex w-full gap-4 md:w-96 ml-auto ">
            <Input
              className="pr-20"
              label=""
              variant="standard"
              placeholder="Busca documentos"
              color="white"
              containerProps={{
                className: "min-w-[350px]",
              }}
            />
          </div>
          <Button
            onClick={toggleOpen}
            className="ml-0 flex gap-1 md:mr-0 rounded-none md:ml-0  bg-light-green-900 h-11"
          >
            <FaSearch size="1.9em" />
          </Button>

          <Fragment>
            <Badge content="2" placement="top-end">
              <Button
                onClick={openDrawer}
                className="ml-auto flex gap-1 md:mr-4 rounded-none md:ml-6 bg-yellow-800 h-11"
              >
                <AiOutlineNotification size="25px" />
                <p className="mt-1">Notificaciones</p>
              </Button>
            </Badge>{" "}
          </Fragment>
        </div>
      </Navbar>
      <Fragment>
        <Drawer
          open={open}
          onClose={closeDrawer}
          className="p-4"
          placement="right"
        >
          <div className="mb-6 flex items-center justify-between mt-6">
            <Typography variant="h3" color="blue-gray">
              Notificaciones
            </Typography>
          </div>
          <CardsNotification />
          <CardsNotification />
        </Drawer>
      </Fragment>
      <Fragment>
        <Collapse open={openc}>
          <Card className="my-4 mx-auto w-11/12 ">
            <CardBody>
              <Typography>Resultados de la búsqueda</Typography>
            </CardBody>
          </Card>
        </Collapse>
      </Fragment>
      <Fragment>
        <Drawer
          open={openM}
          onClose={closeDrawerM}
          className="p-4"
          placement="left"
        >
          <div className="mb-2 flex items-center justify-between p-4">
            <Typography variant="h3" color="blue-gray">
              Menu
            </Typography>
            <IconButton variant="text" color="blue-gray" onClick={closeDrawerM}>
              <XMarkIcon strokeWidth={2} className="h-5 w-5" />
            </IconButton>
          </div>
          <div className="flex justify-center">
            <img
              className="ml-5 h-40 w-40 rounded-full border-4 border-yellow-600 "
              src="/img/Home/photo-1633332755192-727a05c4013d.jpg"
              alt="User image"
            />
          </div>
          <div className="mb-2 flex items-center justify-center p-4">
            <Typography variant="h5" color="blue-gray">
              Nombre usuario
            </Typography>
          </div>
          <List>
            <ListItem onClick={handleOpen}>
              <ListItemPrefix>
                <HomeIcon className="h-5 w-5" />
              </ListItemPrefix>
              Inicio
            </ListItem>
            <ListItem onClick={handleOpen}>
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              Proyectos
            </ListItem>
            <ListItem onClick={handleOpen}>
              <ListItemPrefix>
                <UserIcon className="h-5 w-5" />
              </ListItemPrefix>
              Perfil
            </ListItem>
            <ListItem onClick={handleOpen}>
              <ListItemPrefix>
                <Square2StackIcon className="h-5 w-5" />
              </ListItemPrefix>
              Opciones de Area
            </ListItem>
            <ListItem onClick={handleOpen}>
              <ListItemPrefix>
                <CogIcon className="h-5 w-5" />
              </ListItemPrefix>
              Opciones de Admin
            </ListItem>
            <ListItem onClick={handleOpen}>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Salir
            </ListItem>
          </List>
        </Drawer>
      </Fragment>
      <Fragment>
        <Dialog open={openS} handler={handleOpen}>
          <DialogHeader>¿Esta seguro que desea salir?</DialogHeader>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancelar</span>
            </Button>
            <Button
              variant="gradient"
              color="green"
              onClick={() => Router.push("/home/")}
            >
              <span>Confirmar</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </Fragment>
    </Fragment>
  );
}
