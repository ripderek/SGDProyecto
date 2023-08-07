import {
  Card,
  Input,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Alert,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
} from "@material-tailwind/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function EditUser({ openEditUser, userID }) {
  //Estado para cargar los datos que se van a editar segun el id que se recibe xd jijiij ja
  const [UserData, setUserData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [MensajeError, setMensajeError] = useState("");
  const handleOpen = () => {
    setOpen(!open);
  };
  const [tipoidentificacion, setTipoIdentificacion] = useState(
    "Tipo identificacion"
  );
  //Dataos del usuario que se va a crear
  const [user, setUser] = useState({
    nombres: "",
    tipoidentifiacion: "",
    identificacion: "",
    correo1: "",
    correo2: "",
    celular: "",
    firma: "",
  });
  //constante para guardar los nuevos datos
  const HandleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
    // setUser({ ...user, tipo_identificacion: tipoidentificacion });
  };
  //useffect para cargarlo
  useEffect(() => {
    load();
  }, []);
  //funcion para effect

  const load = async () => {
    try {
      const resultdata = await fetch(
        process.env.NEXT_PUBLIC_ACCESLINK + "user/Datos/" + userID,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const dataU = await resultdata.json();
      setUserData(dataU);
    } catch (error) {
      //setMensajeError(error);
      //setOpenAlert(true);
    }
  };
  //funcion para enviar los datos a la API
  const HandleSUbumit = async (e) => {
    e.preventDefault();
    try {
      //setUser({ tipo_identificacion: tipoidentificacion });
      //setUser({ ...user, tipo_identificacion: tipoidentificacion });

      console.log("datos del usuario para enviar");
      console.log(user);

      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "user/Editar/" + userID,
        user,
        {
          withCredentials: true,
        }
      );
      console.log(result);
      openEditUser(false);
    } catch (error) {
      setMensajeError(error.response.data.message);
      setOpenAlert(true);
      console.log(error);
    }
  };
  return (
    <div>
      <div className="w-auto">
        <Dialog
          open={true}
          className="w-auto h-5/6   overflow-y-scroll rounded-none"
        >
          <DialogHeader>
            Editar Usuario
            <Button
              color="red"
              variant="text"
              size="md"
              className="!absolute top-3 right-3"
              onClick={() => openEditUser(false)}
            >
              <Typography variant="h5" color="blue-gray">
                X
              </Typography>
            </Button>
          </DialogHeader>
          <DialogBody>
            <Alert
              color="red"
              onClose={() => setOpenAlert(false)}
              open={openAlert}
            >
              Mensaje de error {MensajeError}
            </Alert>

            <Card
              color="transparent"
              shadow={false}
              className="w-full items-center"
            >
              <form className=" sm:w-full" onSubmit={HandleSUbumit}>
                <div className="mb-4 flex flex-col gap-6">
                  <Input
                    size="lg"
                    name="nombres"
                    variant="standard"
                    color="black"
                    placeholder="Nombres"
                    label={UserData.u_nombres}
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
                          onClick={() => handleOpen()}
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

                      {open ? (
                        <List className="p-0 absolute z-10 bg-white">
                          <ListItem
                            onClick={() => {
                              setTipoIdentificacion("Cedula");
                              setUser({
                                ...user,
                                tipoidentifiacion: "Cedula",
                              });
                              handleOpen();
                            }}
                          >
                            Cedula
                          </ListItem>
                          <ListItem
                            onClick={() => {
                              setTipoIdentificacion("Ruc");
                              setUser({
                                ...user,
                                tipoidentifiacion: "Ruc",
                              });
                              handleOpen();
                            }}
                          >
                            Ruc
                          </ListItem>
                          <ListItem
                            onClick={() => {
                              setTipoIdentificacion("Pasaporte");
                              setUser({
                                ...user,
                                tipoidentifiacion: "Pasaporte",
                              });
                              handleOpen();
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
                      color="black"
                      placeholder="Identificacion"
                      label={UserData.u_identificacion}
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
                    label={UserData.u_correopersonal}
                    onChange={HandleChange}
                    required
                  />
                  <Input
                    size="lg"
                    name="correo2"
                    variant="standard"
                    color="black"
                    placeholder="Correo Institucional"
                    label={UserData.u_correo_institucional}
                    onChange={HandleChange}
                    required
                  />
                  <Input
                    size="lg"
                    name="celular"
                    variant="standard"
                    color="black"
                    placeholder="Celular"
                    label={UserData.u_numero_celular}
                    onChange={HandleChange}
                    required
                  />
                  <Input
                    size="lg"
                    name="firma"
                    variant="standard"
                    color="black"
                    placeholder="Firma"
                    label={UserData.u_nombre_firma}
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
                  Aceptar
                </Button>
              </form>
            </Card>
          </DialogBody>
          <DialogFooter></DialogFooter>
        </Dialog>
      </div>
    </div>
  );
}
