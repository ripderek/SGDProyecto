import {
  CardHeader,
  Input,
  Button,
  CardBody,
  CardFooter,
  Typography,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  Alert,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useState, useRef } from "react";
import axios from "axios";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { AiOutlineUpload } from "react-icons/ai";
import Loading from "@/components/loading";
import Lottie from "lottie-react";
import anim_error from "../../../../public/Anim/error_anim.json";
import anim_check from "../../../../public/Anim/check_anim.json";
export default function CrearUsuarioArea({ id_user, ver_listado }) {
  const [loading, setLoading] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);
  const hadleAlert = () => setOpenAlert(!openAlert);

  const [file, setFile] = useState(null);
  //img preview
  const [fileP, setFileP] = useState();

  //mensaje de error
  const [error, setError] = useState();
  const [tipoidentificacion, setTipoIdentificacion] = useState(
    "Tipo identificacion"
  );
  //Dataos del usuario que se va a crear
  const [user, setUser] = useState({
    nombres: "",
    tipo_identificacion: "",
    identificacion: "",
    correo1: "",
    correo2: "",
    celular: "",
    firma: "",
  });
  const [open1, setOpen1] = useState(false);
  const [animacion, setanimacion] = useState(false);
  const handleOpen1 = () => {
    setOpen1(!open1);
  };
  // llenar automaticamente los datos del usuario a medida que se escribe en los txt
  const ImagePreview = (e) => {
    try {
      setFile(e.target.files[0]);
      setFileP(URL.createObjectURL(e.target.files[0]));
    } catch (error) {
      console.log(error);
    }
  };
  const HandleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
    // setUser({ ...user, tipo_identificacion: tipoidentificacion });
  };
  const HandleSUbumit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      //setUser({ tipo_identificacion: tipoidentificacion });
      //setUser({ ...user, tipo_identificacion: tipoidentificacion });

      console.log("datos del usuario para enviar");
      console.log(user);

      //Verificar si no se esta enviando lo mismo que esta en el combobox xd
      if (tipoidentificacion === "Tipo identificacion") {
        setError("Escoja un tipo de identificacion");
        setanimacion(false);
        setOpenAlert(true);
      } else {
        console.log("ddd");
        const form = new FormData();
        form.set("file", file);
        form.set("nombres", user.nombres);
        form.set("tipo_identificacion", user.tipo_identificacion);
        form.set("identificacion", user.identificacion);
        form.set("correo1", user.correo1);
        form.set("correo2", user.correo2);
        form.set("celular", user.celular);
        form.set("firma", user.firma);
        form.set("id_area", id_user);

        const result = await axios.post(
          process.env.NEXT_PUBLIC_ACCESLINK + "user/crear_usuario_area",
          form,
          {
            withCredentials: true,
          }
        );
        setanimacion(true);
        setError("Se creó el usuario");
        setOpenAlert(true);
        setLoading(false);
        //enviar una funcion para que se habra la lista de usuarios cada vez que se anade un nuevo usuario xd skere
        ver_listado(true);
      }
    } catch (error) {
      setError(error.response.data.message);
      setanimacion(false);
      console.log(error);
      setOpenAlert(true);
      setLoading(false);
    }
  };

  //esto es para activar el boton de tipo file personalizado xdxd skere modo diablo
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Activa el input de tipo "file"
    }
  };
  return (
    <div>
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        ""
      )}
      <Dialog open={openAlert} handler={() => setOpenAlert(false)} size="sm">
        <DialogBody>
          <div className="mx-auto text-center font-semibold text-black text-xl">
            {error}
            <Lottie
              animationData={animacion ? anim_check : anim_error}
              className="w-40 mx-auto"
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            color="green"
            onClick={() => setOpenAlert(false)}
          >
            <span>Aceptar</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <Card className="w-full max-w-[40rem] mx-auto bg-white shadow-none rounded-none">
        <CardHeader></CardHeader>
        <CardBody>
          <div className="flex justify-center mb-5">
            <img
              className="ml-5 h-40 w-40 rounded-full border-4 border-yellow-600 cursor-pointer"
              src={
                !fileP
                  ? "/img/Home/photo-1633332755192-727a05c4013d.jpg"
                  : fileP
              }
              alt="User image"
            />
          </div>
          <Card
            color="transparent"
            shadow={false}
            className="w-full items-center"
          >
            <form className=" sm:w-full" onSubmit={HandleSUbumit}>
              <div className="mb-4 flex flex-col gap-6">
                <div className="mx-auto bg-yellow-800 p-2 rounded-xl">
                  <label htmlFor="fileInput" className="text-black ">
                    Subir Foto:
                  </label>
                  <input
                    type="file"
                    id="fileInput"
                    onChange={ImagePreview}
                    accept="image/png, .jpeg"
                    className="hidden"
                    ref={fileInputRef}
                  />
                  <Button
                    className="ml-3  rounded-xl  bg-white h-11"
                    onClick={handleButtonClick}
                  >
                    <AiOutlineUpload size="25px" color="black" />
                  </Button>
                </div>
                <Input
                  size="lg"
                  name="nombres"
                  variant="standard"
                  color="black"
                  placeholder="Nombres y Apellidos"
                  onChange={HandleChange}
                  required
                />
                <div className="my-4 flex items-center gap-4">
                  <Accordion
                    open={open === 1}
                    icon={
                      <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`mx-auto h-4 w-4 transition-transform ${
                          open === 1 ? "rotate-180" : ""
                        }`}
                      />
                    }
                  >
                    <ListItem className="p-0">
                      <AccordionHeader
                        onClick={() => handleOpen1()}
                        className="border-b-0 p-3 bg-yellow-900"
                      >
                        <ListItemPrefix></ListItemPrefix>
                        <Typography
                          color="white"
                          className="mr-auto font-normal"
                        >
                          {tipoidentificacion}
                        </Typography>
                      </AccordionHeader>
                    </ListItem>

                    {open1 ? (
                      <List className="p-0 absolute z-10 bg-white">
                        <ListItem
                          onClick={() => {
                            setTipoIdentificacion("Cedula");
                            setUser({
                              ...user,
                              tipo_identificacion: "Cedula",
                            });
                            handleOpen1();
                          }}
                        >
                          Cedula
                        </ListItem>
                        <ListItem
                          onClick={() => {
                            setTipoIdentificacion("Ruc");
                            setUser({
                              ...user,
                              tipo_identificacion: "Ruc",
                            });
                            handleOpen1();
                          }}
                        >
                          Ruc
                        </ListItem>
                        <ListItem
                          onClick={() => {
                            setTipoIdentificacion("Pasaporte");
                            setUser({
                              ...user,
                              tipo_identificacion: "Pasaporte",
                            });
                            handleOpen1();
                          }}
                        >
                          Pasaporte
                        </ListItem>
                      </List>
                    ) : (
                      ""
                    )}
                  </Accordion>

                  <Input
                    size="lg"
                    name="identificacion"
                    variant="standard"
                    maxLength={13}
                    color="black"
                    placeholder="Numero de identificacion"
                    onChange={HandleChange}
                    required
                  />
                </div>
                <Input
                  size="lg"
                  name="correo1"
                  variant="standard"
                  color="black"
                  placeholder="Correo Personal"
                  onChange={HandleChange}
                  required
                />
                <Input
                  size="lg"
                  name="correo2"
                  variant="standard"
                  color="black"
                  placeholder="Correo Institucional"
                  onChange={HandleChange}
                  required
                />
                <Input
                  size="lg"
                  name="celular"
                  variant="standard"
                  maxLength={10}
                  color="black"
                  placeholder="Numero Celular"
                  onChange={HandleChange}
                  required
                />
                <Input
                  size="lg"
                  name="firma"
                  variant="standard"
                  color="black"
                  placeholder="Nombres para la firma"
                  onChange={HandleChange}
                  required
                />
              </div>
              <Button
                className="mt-6 rounded-none"
                fullWidth
                color="green"
                type="submit"
              >
                Crear
              </Button>
            </form>
          </Card>
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
