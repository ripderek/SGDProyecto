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
import OPArea from "../components/MenuOptions/Areas/OPArea";
import AreasAdmin from "../components/MenuOptions/Areas/AreasAdmin";
import { FaSearch, FaAlignLeft } from "react-icons/fa";
import { AiOutlineNotification } from "react-icons/ai";
import Router from "next/router"; //Rutas para redireccionar a otra pagina
import CardsNotification from "./Dashboard/CardsNotification";
import Cookies from "universal-cookie";

//importar las ventanas para las opciones
import AdminOptions from "./MenuOptions/AdminOptions";
//importa la venta del area_usuario
import User_area from "./MenuOptions/Areas/User_area";
//importar la opcion PerfilUser
import PerfilUser from "./MenuOptions/Users/PerfilUser";
//importar la opcion de proyectos de areas
import ProyectosAreas from "./MenuOptions/Proyects/ProyectosAreas";
//importar la opcion para ver el proyecto
import Proyecto from "./MenuOptions/Proyects/Proyecto";
import { comment } from "postcss";
import RevisarP from "./MenuOptions/Proyects/RevisarP";
import Publicacion from "./MenuOptions/Proyects/Publicacion";

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
  const [userImage, setUserImage] = useState("");
  const [nameArea, setNameArea] = useState("");
  //Estado para el user data area
  const [OpenAreaADmin, setOpenAreaADmin] = useState(false);
  const [UserAreaData, setUserAreaData] = useState([]);
  const [idA, setIDa] = useState("");
  const id_area = (id) => {
    setIDa(id);
    if (id) {
      if (opProyects) {
        setOpenProyects1(true);
        setUserArea(false);
        setAbrirProyecto(false);
      } else {
        setOpenAreaADmin(true);
        setUserArea(false);
        setAbrirProyecto(false);
      }
    } else {
      setOpenAreaADmin(false);
      setOpenProyects1(false);
      setAbrirProyecto(false);
    }
  };
  const [idProyecto, setIdProyecto] = useState("");
  const [abrirProyecto, setAbrirProyecto] = useState(false);
  const addIDP = (id) => {
    //guardar el id del proyecto y preguntar si existe el id para abrir las opciones del proyecto
    if (id) {
      setIdProyecto(id);
      setAbrirProyecto(true);
      setOpenProyects1(false);
      setUserArea(false);
      setOpenAreaADmin(false);
    }
  };

  //funcion para tomar el tipo de proyecto
  //-->1:Elaboracion
  //-->2:Revision
  //-->3:Publicacion
  //tipo_proyecto
  const [tipop, setTipop] = useState(0);
  const tipo_proyecto = (value) => {
    setTipop(value);
  };
  //guardar el nombre del area seleccionada
  const [Areaname, setAreaName] = useState("");
  const nombre_area = (n) => {
    setAreaName(n);
  };
  const [adminArea, setAdminArea] = useState("");
  const rolarea = (n) => {
    setAdminArea(n);
  };
  //Estados para abrir las opciones del menu
  //opcion Admin
  const [openAdminOptions, setOpenAdmin] = useState(false);
  const handleAdmin = () => {
    setOpenAdmin(true);
    setOpenM(false);
    setUserArea(false);
    setOpPerfil(false);
    setOpenAreaADmin(false);
    setOpenProyects(false);
    setOpenProyects1(false);
    setAbrirProyecto(false);
  };
  //Estado para abrir la opcion de proyectos
  const [opProyects, setOpenProyects] = useState(false);
  const [opProyects1, setOpenProyects1] = useState(false);

  //Estado para el area data
  const [UserArea, setUserArea] = useState(false);
  const handleArea = () => {
    setA(true);
    setUserArea(true);
    setOpenAreaADmin(false);
    setOpenM(false);
    setOpenAdmin(false);
    setOpPerfil(false);
    setOpenProyects(false);
    setOpenProyects1(false);
    setAbrirProyecto(false);
  };
  //Estado para abrir la opcion perfil
  const [opPerfil, setOpPerfil] = useState(false);
  const HandleOpenPerfil = () => {
    setOpPerfil(true);
    setUserArea(false);
    setOpenM(false);
    setOpenAdmin(false);
    setOpenAreaADmin(false);
    setOpenProyects(false);
    setOpenProyects1(false);
    setAbrirProyecto(false);
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
  const [a, setA] = useState(false);
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
        process.env.NEXT_PUBLIC_ACCESLINK +
          "user/User/" +
          cookies.get("id_user"),
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

      //almacenar datos del usuario con respecto al area para que ingrese a las opciones de usuario administrador de area
      //y para mostrar opciones
      const resultdata = await fetch(
        process.env.NEXT_PUBLIC_ACCESLINK +
          "area/data_area_user/" +
          cookies.get("id_user"),
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      setUserImage(
        process.env.NEXT_PUBLIC_ACCESLINK +
          "user/foto/" +
          cookies.get("id_user")
      );
      const dataU = await resultdata.json();
      setUserAreaData(dataU);
      setLoading(false);
      console.log(UserAreaData);
    } catch (error) {
      //Mostrar algun error por consola
      console.log(error);
      setLoading(false);
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
            variant="h4"
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
          className="p-4 overflow-y-scroll"
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
              src={userImage}
              alt="User image"
            />
          </div>
          <div className="mb-2 flex items-center justify-center p-4">
            <Typography variant="h5" color="blue-gray" className="text-center">
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
            <ListItem
              onClick={() => (handleArea(), setOpenProyects(true), setA(false))}
            >
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              Proyectos
            </ListItem>
            <ListItem onClick={HandleOpenPerfil}>
              <ListItemPrefix>
                <UserIcon className="h-5 w-5" />
              </ListItemPrefix>
              Perfil
            </ListItem>
            {UserAreaData.r_isadmin_area ? (
              <ListItem onClick={handleArea}>
                <ListItemPrefix>
                  <Square2StackIcon className="h-5 w-5" />
                </ListItemPrefix>
                Opciones de Area
              </ListItem>
            ) : (
              ""
            )}

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
      <div className="mb-7 border-0 border-x-white">
        {openAdminOptions ? <AdminOptions /> : ""}
        {UserArea ? (
          <AreasAdmin
            id_area={id_area}
            nombre_area={nombre_area}
            isadmin={a}
            rolarea={rolarea}
          />
        ) : (
          ""
        )}
        {opPerfil ? (
          <PerfilUser
            iduser={cookies.get("id_user")}
            admin={dataUser.isadmin_user}
          />
        ) : (
          ""
        )}
        {OpenAreaADmin ? <OPArea idArea={idA} /> : ""}
        {opProyects1 ? (
          <ProyectosAreas
            idarea={idA}
            nombrearea={Areaname}
            addIDP={addIDP}
            adminA={adminArea}
            tipo_proyecto={tipo_proyecto}
          />
        ) : (
          ""
        )}
        {abrirProyecto ? (
          tipop === 2 ? (
            <RevisarP idproyecto={idProyecto} idarea={idA} />
          ) : tipop === 3 ? (
            <Publicacion idproyecto={idProyecto} idarea={idA} />
          ) : (
            <Proyecto
              idproyecto={idProyecto}
              nombrearea={Areaname}
              idarea={idA}
              adminDELAREA={adminArea}
              tipop={tipop}
            />
          )
        ) : (
          ""
        )}
      </div>
    </Fragment>
  );
}
