import { Fragment, useState, useEffect } from "react";
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
import { FaSearch } from "react-icons/fa";
import Router from "next/router"; //Rutas para redireccionar a otra pagina
import axios from "axios";
import Cookies from "universal-cookie";
import Loading from "@/components/loading";
import EmailPopup from "../components/MenuOptions/Users/RecuperarCuenta";

//-------------NUEVO-------------------------------------------------
import { GoogleLogin } from "@react-oauth/google";
//import { GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useGoogleLogin } from "@react-oauth/google";

//-------------NUEVO-------------------------------------------------

export default function Navbar1() {
  const [loading, setLoading] = useState(false);
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
  //Borrar cookies en caso de existir alguna
  useEffect(() => {
    const cookies = new Cookies();
    cookies.remove("id_user");
    cookies.remove("AD");
  }, []);
  const [inicio, setincio] = useState(false);

  //Evento click para verificar el inicio de sesion y obtener el token y guardalo en una cookie
  const HandleSUbumit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "auth/Login",
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
      setLoading(true);
      setincio(true);
    } catch (error) {
      //En caso de haber error en el inicio de sesion abrir el alert
      let errpars = error.response.data.error;
      console.log(errpars);
      //Mostrar el error mediante un alert
      seterrorAlert(error.response.data.error);
      setOpenAlert(true);
      setLoading(false);
    }
  };

  //Envento clik para iniciar con google
  const login = useGoogleLogin({
    onSuccess: async (respose) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${respose.access_token}`,
            },
          }
        );

        console.log(res.data);

        //Aqui va para sacar el token ty sacar el mail del token que te regresa google
        const email = res.data.email;
        console.log(email);

        //Llama al metodo pasandole el mail
        GoogleLogin(email);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const GoogleLogin = async (email) => {
    try {
      console.log(email);
      const result = await axios.post(
        "http://localhost:4000/api/authgoogle/LoginG",
        { email },
        {
          withCredentials: true,
        }
      );
      console.log("asdas", result);

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

  //Nuevo----------------------------------------

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Cerrar o abrir la ventana emergente
  const handleTogglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleRecuContra = async (email) => {
    try {
      // Lógica para enviar el correo al backend
      console.log(email);

      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "public/Recuperar_cuenta",
        { correo: email },
        {
          withCredentials: true,
        }
      );

      seterrorAlert(result.data.message);
      setOpenAlert(true);

      // Cerrar la ventana emergente después de enviar el correo
      handleTogglePopup();
    } catch (error) {
      // Manejar el error
      let errpars = error.response?.data?.error || "Error desconocido";
      console.log(errpars);
      console.log(error);
      seterrorAlert(errpars);
      setOpenAlert(true);
    }
  };

  //Nuevo----------------------------------------

  const HandleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  };

  return (
    <Fragment>
      <Navbar className=" rounded-none shadow-none w-full  bg-gray-900  p-4 border-none mx-auto ">
        <div className="flex flex-wrap items-center justify-between gap-y-4  ">
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
          className="p-4 "
          placement="right"
        >
          {loading ? (
            <div>
              <Loading />
            </div>
          ) : (
            ""
          )}

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
              type="password"
              containerProps={{
                className: "min-w-[30px] mt-4 mb-6 ",
              }}
            />
            <div className="flex gap-2 justify-center">
              {inicio ? (
                <Button
                  size="sm"
                  className="bg-light-green-900 w-full rounded-none"
                  disabled
                >
                  Iniciar Sesion
                </Button>
              ) : (
                <Button
                  size="sm"
                  className="bg-light-green-900 w-full rounded-none"
                  type="submit"
                >
                  Iniciar Sesion
                </Button>
              )}
            </div>
            {/*<div className="flex justify-center mt-3">
              <Button
                size="sm"
                variant="text"
                color="green"
                className="w-full rounded-none"
                onClick={handleOpenPopup} // llamar al metodo para que abra la ventana donde recuperar la contra
              >
                Recuperar cuenta
              </Button>
              </div>*/}

            <div className="tu-componente">
              <div className="flex justify-center mt-3">
                <Button
                  size="sm"
                  variant="text"
                  color="green"
                  className="w-full rounded-none"
                  onClick={handleTogglePopup}
                >
                  {isPopupOpen ? "Cancelar" : "Recuperar cuenta"}
                </Button>
              </div>
              {isPopupOpen && (
                <EmailPopup
                  onClose={handleTogglePopup}
                  onSend={handleRecuContra}
                />
              )}
            </div>

            <div className="h-auto bg-gray-300  border-4 border-yellow-200  shadow-2xl flex mt-4 cursor-pointer">
              <div className="flex p-4">
                <img
                  className=" h-7 w-7 rounded-full "
                  src="/img/Home/Google.png"
                  alt="User image"
                />
              </div>
              <div className="flex justify-center mt-3">
                <Button
                  size="sm"
                  onClick={login} // Llama a la función handleGoogleLogin
                  variant="text"
                  color="green"
                  className="w-full rounded-none"
                >
                  Continuar con Google
                </Button>
              </div>
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
