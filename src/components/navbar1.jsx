import { Fragment, useState } from "react";
import {
  Navbar,
  Typography,
  Button,
  Input,
  Collapse,
  Card,
  CardBody,
  Drawer,
  Alert,
} from "@material-tailwind/react";
import { UserIcon } from "@heroicons/react/24/solid";
import { FaSearch } from "react-icons/fa";
import Router from "next/router"; //Rutas para redireccionar a otra pagina
import axios from "axios";
import Cookies from "universal-cookie";

export default function Navbar1() {
  //Estados para el diseno
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const [openc, setOpenc] = useState(false);
  const toggleOpen = () => setOpenc((cur) => !cur);
  //Estado para abrir la alerta de inicio de sesion
  const [openAlert, setOpenAlert] = useState(false);
  //Estado para almacenar el error y mostrarlo en el alert
  const [errorAlert, seterrorAlert] = useState("");

  //variables para el inicio de sesion
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  //Evento click para verificar el inicio de sesion y obtener el token y guardalo en una cookie
  const HandleSUbumit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        "http://localhost:4000/api/auth/Login",
        user,
        {
          withCredentials: true,
        }
      );
      //Recibir los datos y almacenarlos en cookies
      const cookies = new Cookies();
      //Cookie para el token
      cookies.set("myTokenName", result.data.token, { path: "/" }); //enviar cokiee y almacenarla
      //Cookie para el id del usuario
      cookies.set("id_user", result.data.id, { path: "/" });
      //Cookie bool para saber si el usuario es Admin General
      cookies.set("AD", result.data.AD, { path: "/" });
      //Redirigir al Dashboard para consumir las cookies
      Router.push("/Dashboard");

      console.log(result.data);
      //console.log(user);
      //Router.push("/task/tasklist/");
    } catch (error) {
      //En caso de haber error en el inicio de sesion abrir el alert
      let errpars = error.response.data.error;
      console.log(errpars);
      //Mostrar el error mediante un alert
      seterrorAlert(error.response.data.error);
      setOpenAlert(true);
    }
  };
  const HandleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  };

  return (
    <Fragment>
      <Navbar className=" rounded-none shadow-none w-full  bg-gray-900  p-4 border-none mx-auto ">
        <div className="flex flex-wrap items-center justify-between gap-y-4 ">
          <Typography
            as="a"
            href="#"
            variant="h3"
            color="white"
            className="mr-4 ml-2 cursor-pointer py-1.5"
          >
            Sistema de documentación
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
            <Button
              onClick={openDrawer}
              className="ml-auto flex gap-1 md:mr-4 rounded-none md:ml-6 bg-yellow-800 h-11"
            >
              <p className="mt-1">Iniciar Sesion</p>
            </Button>{" "}
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
          <form onSubmit={HandleSUbumit}>
            <div className="mb-6 flex items-center justify-between mt-6">
              <Typography variant="h3" color="blue-gray">
                Iniciar Sesion
              </Typography>
            </div>
            <div className="flex justify-center mb-4">
              <img
                className="h-2/5 w-2/5 rounded-full "
                src="/img/Home/1487716857-user_81635.png"
                alt="User image"
              />
            </div>

            <Typography color="gray" className="mb-8 pr-4 font-normal">
              Por favor ingrese sus credenciales:
            </Typography>
            <Input
              onChange={HandleChange}
              name="correo"
              className="pr-20"
              variant="standard"
              placeholder="Correo"
              color="black"
              containerProps={{
                className: "min-w-[30px]",
              }}
            />
            <Input
              name="contra"
              onChange={HandleChange}
              className="pr-20"
              variant="standard"
              placeholder="Contraseña"
              color="black"
              containerProps={{
                className: "min-w-[30px] mt-4 mb-6 ",
              }}
            />
            <div className="flex gap-2 justify-center">
              <Button
                size="sm"
                className="bg-light-green-900 w-full rounded-none"
                type="submit"
              >
                Iniciar Sesion
              </Button>
            </div>
            <div className="flex justify-center mt-3">
              <Button
                size="sm"
                variant="text"
                color="green"
                className="w-full rounded-none"
              >
                Recuperar cuenta
              </Button>
            </div>
          </form>
          <Fragment>
            <Alert
              color="red"
              variant="gradient"
              open={openAlert}
              onClose={() => setOpenAlert(false)}
              animate={{
                mount: { y: 0 },
                unmount: { y: 100 },
              }}
            >
              {errorAlert}
            </Alert>
          </Fragment>
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
    </Fragment>
  );
}
