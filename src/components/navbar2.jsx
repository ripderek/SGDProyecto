import { Fragment, useState, useEffect } from "react";
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
import axios from "axios";

import { FaSearch, FaAlignLeft } from "react-icons/fa";
import { AiOutlineNotification } from "react-icons/ai";
import Router from "next/router"; //Rutas para redireccionar a otra pagina
import CardsNotification from "./Dashboard/CardsNotification";
import Cookies from "universal-cookie";

//importar las ventanas para las opciones
import AdminOptions from "./MenuOptions/AdminOptions";

export default function Navbar2() {
  //Estados para el diseno del layout
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

  //Estados para abrir las opciones del menu
  //opcion Admin
  const [openAdminOptions, setOpenAdmin] = useState(false);
  const handleAdmin = () => {
    setOpenAdmin(!openAdminOptions);
    setOpenM(false);
  };

  //Estado para almacenar la data del usuario
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
  //loading
  const [loading, setLoading] = useState(false);

  //Crear un effect cuando cargue la paguina para hacer una consulta sobre el usuario que inicio sesion
  useEffect(() => {
    load();
  }, []);
  const cookies = new Cookies();

  //Funcion para obtener cookies y almacenarlas en estados para los datos del usuario
  const load = async () => {
    try {
      //obtener el id mediante cookies
      setLoading(true);
      const result = await axios.get(
        "http://localhost:4000/api/user/User/" + cookies.get("id_user"),
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
      setLoading(false);
    } catch (error) {
      //Mostrar algun error por consola
      console.log(error);
    }
  };

  //Metodo para cerrar la sesion y eliminar las cookies
  const CerrarSesion = () => {
    cookies.remove("myTokenName");
    cookies.remove("id_user");
    cookies.remove("AD");
    //Redireccionar al home
    Router.push("/home/");
  };
  //SI el estado esta cargando devolver un spinner load
  if (loading) return "Cargando UI";
  //si ya cargo renderizar
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
              {dataUser.nombres_user}
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
            {dataUser.isadmin_user ? (
              <ListItem onClick={handleAdmin}>
                <ListItemPrefix>
                  <CogIcon className="h-5 w-5" />
                </ListItemPrefix>
                Opciones de Admin
              </ListItem>
            ) : (
              ""
            )}
            <ListItem onClick={handleOpen}>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Cerrar Sesion
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
            <Button variant="gradient" color="green" onClick={CerrarSesion}>
              <span>Confirmar</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </Fragment>
      <Fragment>
        {openAdminOptions ? <AdminOptions></AdminOptions> : ""}
      </Fragment>
    </Fragment>
  );
}
