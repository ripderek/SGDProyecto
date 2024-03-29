import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon, PencilIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import {
  CardHeader,
  Input,
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
  Typography,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  Alert,
} from "@material-tailwind/react";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import PerfilUser from "../Users/PerfilUser";
import Loading from "@/components/loading";

const TABS = [
  {
    label: "Todos",
    value: "Todos",
  },
  {
    label: "Inhabilitados",
    value: "Inhabilitados",
  },
  {
    label: "Admins",
    value: "Admins de Area",
  },
];

const TABLE_HEAD = [
  "",
  "Datos",
  "Identificacion",
  "Celular",
  "Estado",
  "Editar",
];

export default function Users() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [TotalPag, setTotalPag] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const hadleAlert = () => setOpenAlert(!openAlert);
  const [openAlerterror, setOpenAlerterror] = useState(false);
  const hadleAlerterror = () => setOpenAlerterror(!openAlert);
  //para enviar la foto de perfil
  const [file, setFile] = useState(null);
  //img preview
  const [fileP, setFileP] = useState();
  //mensaje de error
  const [error, setError] = useState();
  ///constante para guardar el id del usuario a editar
  const [userID, setUserID] = useState();
  //abrir la modal para editar el user
  const [openArea, setOpenArea] = useState(false);
  const handleOpenArea = () => setOpenArea(!openArea);
  const [clave, setClave] = useState("");
  useEffect(() => {
    load();
  }, []);

  const pag = 1;

  const load = async () => {
    setLoading(true);
    const result = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK + "user/Userdata/" + pag,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    const response = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK + "user/Userdatapag",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    const data2 = await response.json();
    const totalPag = data2.totalPaginas;
    console.log(totalPag);
    setTotalPag(totalPag);
    const data = await result.json();
    setUsers(data);

    setLoading(false);
  };
  const [open1, setOpen1] = useState(false);

  ///estado para abrir la modificacion de un usario desde el superusuario
  const [openModificarUsuario, setOpenModificarUsuario] = useState(false);

  const handleOpen1 = () => {
    setOpen1(!open1);
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
    e.preventDefault();
    try {
      //setUser({ tipo_identificacion: tipoidentificacion });
      //setUser({ ...user, tipo_identificacion: tipoidentificacion });

      //console.log("datos del usuario para enviar");
      //console.log(user);
      setLoading(true);
      //Verificar si no se esta enviando lo mismo que esta en el combobox xd
      if (tipoidentificacion === "Tipo identificacion") {
        setError("Escoja un tipo de identificacion");
        hadleAlerterror();
      } else {
        const form = new FormData();
        form.set("file", file);
        form.set("nombres", user.nombres);
        form.set("tipo_identificacion", user.tipo_identificacion);
        form.set("identificacion", user.identificacion);
        form.set("correo1", user.correo1);
        form.set("correo2", user.correo2);
        form.set("celular", user.celular);
        form.set("firma", user.firma);
        const result = await axios.post(
          process.env.NEXT_PUBLIC_ACCESLINK + "user/crear_usuario",
          form,
          {
            withCredentials: true,
          }
        );
        console.log(result);
        hadleAlert();
        handleOpen();
        setLoading(false);
        load();
      }
    } catch (error) {
      let error1 = error.response.data.message;
      console.log(error);
      setError(error1);
      hadleAlerterror();
    }
  };

  //PAGINACION de USUARIOS
  const [currentPage, setCurrentPage] = useState(1);

  const buttonsPerPage = 5; // Número de botones a mostrar por página

  const handlePageChange = async (newPage) => {
    setCurrentPage(newPage);
    // llamada a la API para cargar los usuarios de la nueva página
    console.log(newPage);
    const pag = newPage;
    const result = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK + "user/Userdata/" + pag,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    const data = await result.json();
    setUsers(data);
  };
  //esto es para activar el boton de tipo file personalizado xdxd skere modo diablo
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Activa el input de tipo "file"
    }
  };
  //para filtrar en las listas
  const Buscar = async () => {
    //primero verificar si la palabra clave esta vacia
    //si esta vacia entonces mostrar todo
    if (clave.trim().length === 0) {
      load();
    } //de lo contrario mostrar solo lo filtrado
    else {
      setLoading(true);
      //primero filtrar la lista
      const result = await fetch(
        process.env.NEXT_PUBLIC_ACCESLINK +
          "user/UserdataBusqueda/" +
          pag +
          "/" +
          clave,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const data = await result.json();
      setUsers(data);

      //los botones de las listas
      const response = await fetch(
        process.env.NEXT_PUBLIC_ACCESLINK + "user/UserdatapagBusqueda/" + clave,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const data2 = await response.json();
      const totalPag = data2.totalPaginas;
      setTotalPag(totalPag);
      generatePaginationButtons();
      setLoading(false);
    }
  };

  const generatePaginationButtons = () => {
    const buttons = [];
    const numButtons = Math.ceil(TotalPag / buttonsPerPage);

    // Calcula el grupo de botones actual
    const currentGroup = Math.ceil(currentPage / buttonsPerPage);

    // Calcula el rango de botones a mostrar en el grupo actual
    const startButton = (currentGroup - 1) * buttonsPerPage + 1;
    const endButton = Math.min(currentGroup * buttonsPerPage, TotalPag);

    // Botón "Inicio"
    buttons.push(
      <Button
        variant="outlined"
        color="blue-gray"
        size="sm"
        key="start"
        onClick={() => handlePageChange(1)}
        className={1 === currentPage ? "active" : ""}
      >
        Inicio
      </Button>
    );

    // Botones numerados
    for (let i = startButton; i <= endButton; i++) {
      buttons.push(
        <Button
          variant="outlined"
          color="blue-gray"
          size="sm"
          key={i}
          onClick={() => handlePageChange(i)}
          className={i === currentPage ? "active" : ""}
        >
          {i}
        </Button>
      );
    }

    if (currentGroup < numButtons) {
      buttons.push(
        <Button
          variant="outlined"
          color="blue-gray"
          size="sm"
          key="next"
          onClick={() => handlePageChange(endButton + 1)}
        >
          {endButton + 1}
        </Button>
      );
    }

    // Botón "Fin"
    if (TotalPag > 0) {
      buttons.push(
        <Button
          variant="outlined"
          color="blue-gray"
          size="sm"
          key="end"
          onClick={() => handlePageChange(TotalPag)}
          className={TotalPag === currentPage ? "active" : ""}
        >
          Fin
        </Button>
      );
    }

    return buttons;
  };

  return (
    <Fragment>
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        ""
      )}
      {openArea ? (
        <Dialog
          size="xxl"
          open={openArea}
          handler={handleOpenArea}
          className="overflow-y-scroll"
        >
          <DialogHeader className="bg-light-green-900 text-white">
            Editar usuario
            <Button
              color="red"
              variant="text"
              size="md"
              className="!absolute top-3 right-3"
              onClick={handleOpenArea}
            >
              <Typography variant="h5" color="white">
                X
              </Typography>
            </Button>
          </DialogHeader>
          <PerfilUser iduser={userID} isadmin={true} admin={true} />
        </Dialog>
      ) : (
        ""
      )}

      <Card className="h-full w-full rounded-none">
        <Alert
          color="green"
          onClose={() => setOpenAlert(false)}
          open={openAlert}
        >
          Se creo una nuevo usuario
        </Alert>
        <div className="w-auto">
          <Dialog
            open={open}
            handler={handleOpen}
            className="w-auto h-full mt-20  overflow-y-scroll rounded-none"
          >
            <DialogHeader>
              Crear Usuario
              <Button
                color="red"
                variant="text"
                size="md"
                className="!absolute top-3 right-3"
                onClick={() => setOpen(false)}
              >
                <Typography variant="h5" color="blue-gray">
                  X
                </Typography>
              </Button>
            </DialogHeader>
            <DialogBody>
              <Alert
                color="red"
                onClose={() => setOpenAlerterror(false)}
                open={openAlerterror}
              >
                {error}
              </Alert>
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
                      <label
                        htmlFor="fileInput"
                        className="text-white font-bold"
                      >
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
            </DialogBody>
            <DialogFooter></DialogFooter>
          </Dialog>
        </div>
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Lista de Usuarios
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Administra los usuarios
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                onClick={handleOpen}
                className="ml-auto flex gap-1 md:mr-4 rounded-none md:ml-6 bg-yellow-800 h-11"
              >
                <UserPlusIcon className="h-7 w-7" />
                <p className="mt-1"> Agregar Usuario</p>
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value="all" className="w-full md:w-max">
              <TabsHeader>
                {TABS.map(({ label, value }) => (
                  <Tab key={value} value={value}>
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
            <div className="w-full md:w-72 mr-5">
              <Input
                name="clave"
                label=""
                placeholder="Buscar usuarios"
                color="black"
                onChange={(e) => setClave(e.target.value)}
                icon={
                  <MagnifyingGlassIcon
                    className="h-5 w-5 cursor-pointer"
                    onClick={() => Buscar()}
                  />
                }
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left mx-4">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map(
                (
                  {
                    userid,
                    nombres_user,
                    correo_personal_user,
                    correo_institucional_user,
                    nombre_firma_user,
                    identi,
                    numero_celular_user,
                    estadou,
                    estado_user,
                  },
                  index
                ) => {
                  return (
                    <tr key={userid}>
                      <td>
                        <div className="flex items-center gap-3 text-center">
                          <div className="flex flex-col text-center">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal text-center"
                            >
                              {index + 1}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={
                              process.env.NEXT_PUBLIC_ACCESLINK +
                              "user/foto/" +
                              userid
                            }
                            alt={nombres_user}
                            size="sm"
                          />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {nombres_user}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {correo_personal_user}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {correo_institucional_user}
                            </Typography>

                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {nombre_firma_user}
                            </Typography>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {identi}
                        </Typography>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {numero_celular_user}
                        </Typography>
                      </td>

                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={estadou}
                            color={estado_user ? "green" : "blue-gray"}
                          />
                        </div>
                      </td>
                      <td
                        className="p-4 border-b border-blue-gray-50"
                        onClick={() => (handleOpenArea(), setUserID(userid))}
                      >
                        <Tooltip content="Editar usuarios">
                          <IconButton
                            variant="text"
                            color="blue-gray"
                            onClick={() => setOpenModificarUsuario(true)}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal"
          ></Typography>
          <div className="pagination-buttons">
            {generatePaginationButtons()}
          </div>
          <div className="flex gap-2"></div>
        </CardFooter>
      </Card>
    </Fragment>
  );
}
