import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon, ArchiveBoxIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Alert,
  Chip,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
} from "@material-tailwind/react";
import axios from "axios";
import OPArea from "../Areas/OPArea";
import { useState, useEffect, Fragment } from "react";
import { FaSearch } from "react-icons/fa";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Loading from "@/components/loading";

export default function EditUserM({ openEditUser, userID }) {
  //Estado para cargar los datos que se van a editar segun el id que se recibe xd jijiij ja
  const [UserData, setUserData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [MensajeError, setMensajeError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  const [tipoidentificacion, setTipoIdentificacion] = useState(
    "Tipo identificacion"
  );
  //Dataos del usuario que se va a crear
  const [user, setUser] = useState({
    correo1: "",
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
    setLoading(true);
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
      // setUserData(dataU);
      setUser({
        ...user,
        correo1: dataU.u_correopersonal,
        celular: dataU.u_numero_celular,
        firma: dataU.u_nombre_firma,
      });

      setLoading(false);
    } catch (error) {
      //setMensajeError(error);
      //setOpenAlert(true);
      setLoading(false);
    }
  };
  //funcion para enviar los datos a la API
  const HandleSUbumit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      console.log("datos del usuario para enviar");
      console.log(user);

      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "user/EditarNotAdmin/" + userID,
        user,
        {
          withCredentials: true,
        }
      );
      console.log(result);
      openEditUser(false);
      setLoading(false);
    } catch (error) {
      setMensajeError(error.response.data.message);
      setOpenAlert(true);
      console.log(error);
      setLoading(false);
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
      <div className="w-auto">
        <Dialog
          open={true}
          className="w-auto    overflow-y-scroll rounded-none"
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
                    name="correo1"
                    variant="standard"
                    color="black"
                    placeholder="Correo Personal"
                    value={user.correo1}
                    onChange={HandleChange}
                    required
                  />

                  <Input
                    size="lg"
                    name="celular"
                    variant="standard"
                    color="black"
                    placeholder="Celular"
                    value={user.celular}
                    onChange={HandleChange}
                    maxLength={10}
                    required
                  />
                  <Input
                    size="lg"
                    name="firma"
                    variant="standard"
                    color="black"
                    placeholder="Firma"
                    value={user.firma}
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
