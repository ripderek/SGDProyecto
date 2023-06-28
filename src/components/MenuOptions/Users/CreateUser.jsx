import {
  Card,
  Input,
  Button,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import axios from "axios";

export default function CreateUser() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
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
  // llenar automaticamente los datos del usuario a medida que se escribe en los txt
  const HandleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
    // setUser({ ...user, tipo_identificacion: tipoidentificacion });
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
        "http://localhost:4000/api/user/crear_usuario",
        user,
        {
          withCredentials: true,
        }
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="row-span-2  w-auto  rounded-none">
        <div className="flex justify-center mb-5">
          <img
            className="ml-5 h-40 w-40 rounded-full border-4 border-yellow-600 cursor-pointer"
            src="/img/Home/photo-1633332755192-727a05c4013d.jpg"
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
              <Input
                size="lg"
                name="nombres"
                variant="standard"
                color="black"
                placeholder="Nombres y Apellidos"
                onChange={HandleChange}
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
                      <Typography color="white" className="mr-auto font-normal">
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
                            tipo_identificacion: "Cedula",
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
                            tipo_identificacion: "Ruc",
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
                            tipo_identificacion: "Pasaporte",
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
                  placeholder="Numero de identificacion"
                  onChange={HandleChange}
                />
              </div>
              <Input
                size="lg"
                name="correo1"
                variant="standard"
                color="black"
                placeholder="Correo Personal"
                onChange={HandleChange}
              />
              <Input
                size="lg"
                name="correo2"
                variant="standard"
                color="black"
                placeholder="Correo Institucional"
                onChange={HandleChange}
              />
              <Input
                size="lg"
                name="celular"
                variant="standard"
                color="black"
                placeholder="Numero Celular"
                onChange={HandleChange}
              />
              <Input
                size="lg"
                name="firma"
                variant="standard"
                color="black"
                placeholder="Nombres para la firma"
                onChange={HandleChange}
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
      </div>
      <div className="row-span-2  w-auto h-full col-span-12 "></div>
    </div>
  );
}
