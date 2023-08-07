import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/solid";

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
const TABS = [
  {
    label: "Todos",
    value: "Todos",
  },
  {
    label: "Inhabilitados",
    value: "Inhabilitados",
  },
];

const TABLE_HEAD = [
  "Nombre categoria",
  "Prefijo",
  "Descripcion",
  "Estado",
  "Editar",
];

export default function OpCategorias() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [users, setUsers] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const hadleAlert = () => setOpenAlert(!openAlert);
  const [openAlerterror, setOpenAlerterror] = useState(false);
  const hadleAlerterror = () => setOpenAlerterror(!openAlert);
  //estado para almacenar los datos a editar
  const [categoriaEdit, setCategoriaEDit] = useState([]);
  //mensaje de error
  const [error, setError] = useState();
  ///constante para guardar el id del usuario a editar
  const [userID, setUserID] = useState();
  //abrir la modal para editar el user
  const [openArea, setOpenArea] = useState(false);
  const handleOpenArea = () => setOpenArea(!openArea);
  const [open1, setOpen1] = useState(false);

  ///estado para abrir la modificacion de un usario desde el superusuario
  const [openModificarUsuario, setOpenModificarUsuario] = useState(false);
  //mensaje para saber que diablos se hizo para la alerta dou
  const [mensajealert, setMensajeAlert] = useState("");

  //estado para almacenar los datos del usuario que se va a editar
  //ID
  const [editCat, setEditCat] = useState("");
  const [nombreEdit, setNombreEdit] = useState("");
  const [preEdit, setPrefEdit] = useState("");
  const [descripcionEdit, setDescripcionEdit] = useState("");

  const [openEstado, setOpenEstado] = useState(false);

  const handleOpenEsatdo = () => setOpenEstado(!openEstado);

  //Dataos del usuario que se va a crear
  const [user, setUser] = useState([]);
  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    const result = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK + "proyects/list_categorias",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    const data = await result.json();
    setUsers(data);
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

      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "proyects/crear_categoria",
        user,
        {
          withCredentials: true,
        }
      );
      console.log(result);
      setMensajeAlert("Se creo la categoria");
      hadleAlert();
      handleOpen();
      load();
    } catch (error) {
      setError(error.response.data.message);
      setOpenAlerterror(true);
      console.log(error);
    }
  };
  const HandleSUbumitESTADO = async () => {
    try {
      //setUser({ tipo_identificacion: tipoidentificacion });
      //setUser({ ...user, tipo_identificacion: tipoidentificacion });

      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "proyects/estado/" + editCat,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(result);
      setMensajeAlert("Se cambio el estado de la categoria");
      hadleAlert();
      handleOpenEsatdo();
      load();
    } catch (error) {
      setError(error.response.data.message);
      setOpenAlerterror(true);
      console.log(error);
    }
  };
  const HandleSUbumitEDIT = async (e) => {
    e.preventDefault();
    try {
      //setUser({ tipo_identificacion: tipoidentificacion });
      //setUser({ ...user, tipo_identificacion: tipoidentificacion });
      console.log(editCat);
      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "proyects/editar_categoria",
        {
          p_nombres: nombreEdit,
          p_prefijo: preEdit,
          p_descripcion: descripcionEdit,
          p_id_categoria: editCat,
        },
        {
          withCredentials: true,
        }
      );
      console.log(result);
      setMensajeAlert("Se edito la categoria");

      hadleAlert();
      handleOpenArea();
      load();
    } catch (error) {
      setError(error.response.data.message);
      setOpenAlerterror(true);
      console.log(error);
    }
  };
  return (
    <div>
      <Fragment>
        <Dialog
          open={openEstado}
          handler={handleOpenEsatdo}
          className="rounded-none"
        >
          <DialogHeader>Cambiar estado de categoria</DialogHeader>
          <DialogBody divider>
            Si el estado a cambiar es Falso no podra ser listado para escojerlo
            en un proyecto
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpenEsatdo}
              className="mr-1"
            >
              <span>Cancelar</span>
            </Button>
            <Button
              variant="gradient"
              color="green"
              onClick={HandleSUbumitESTADO}
            >
              <span>Confirmar</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </Fragment>
      <Fragment>
        <Card className="h-full w-full rounded-none">
          <Alert
            color="green"
            onClose={() => setOpenAlert(false)}
            open={openAlert}
          >
            {mensajealert}
          </Alert>
          <div className="w-auto">
            <Dialog
              open={openArea}
              handler={handleOpenArea}
              className="w-auto  mt-20  overflow-y-scroll rounded-none"
            >
              <DialogHeader>
                Editar Categoria {editCat}
                <Button
                  color="red"
                  variant="text"
                  size="md"
                  className="!absolute top-3 right-3"
                  onClick={() => setOpenArea(false)}
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
                <div className="flex justify-center mb-5"></div>
                <Card
                  color="transparent"
                  shadow={false}
                  className="w-full items-center"
                >
                  <form className=" sm:w-full" onSubmit={HandleSUbumitEDIT}>
                    <div className="mb-4 flex flex-col gap-6">
                      <Input
                        size="lg"
                        name="p_nombres"
                        variant="standard"
                        color="black"
                        label={categoriaEdit.cat_nombre}
                        placeholder="Nombre categoria"
                        onChange={(e) => setNombreEdit(e.target.value)}
                        required
                      />

                      <Input
                        size="lg"
                        name="p_prefijo"
                        variant="standard"
                        color="black"
                        label={categoriaEdit.catPrefijo}
                        placeholder="Prefijo "
                        onChange={(e) => setPrefEdit(e.target.value)}
                        required
                      />
                      <Input
                        size="lg"
                        name="p_descripcion"
                        variant="standard"
                        color="black"
                        label={categoriaEdit.catDescripcion}
                        placeholder="Descripcion"
                        onChange={(e) => setDescripcionEdit(e.target.value)}
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
            <Dialog
              open={open}
              handler={handleOpen}
              className="w-auto  mt-20  overflow-y-scroll rounded-none"
            >
              <DialogHeader>
                Crear Categoria
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
                <div className="flex justify-center mb-5"></div>
                <Card
                  color="transparent"
                  shadow={false}
                  className="w-full items-center"
                >
                  <form className=" sm:w-full" onSubmit={HandleSUbumit}>
                    <div className="mb-4 flex flex-col gap-6">
                      <Input
                        size="lg"
                        name="p_nombre"
                        variant="standard"
                        color="black"
                        placeholder="Nombre de Categoria"
                        onChange={HandleChange}
                        required
                      />

                      <Input
                        size="lg"
                        name="p_prefijo"
                        variant="standard"
                        color="black"
                        placeholder="Prefijo "
                        onChange={HandleChange}
                        required
                      />
                      <Input
                        size="lg"
                        name="p_descripcion"
                        variant="standard"
                        color="black"
                        placeholder="Descripcion"
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
                  Lista de Categorias
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  Administra las categorias
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button
                  onClick={handleOpen}
                  className="ml-auto flex gap-1 md:mr-4 rounded-none md:ml-6 bg-yellow-800 h-11"
                >
                  <PlusIcon className="h-7 w-7" />
                  <p className="mt-1"> Agregar Categoria</p>
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
                  label=""
                  placeholder="Buscar usuarios"
                  color="black"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-scroll px-0">
            <table className="mt-4 w-full min-w-max table-auto text-left">
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
                {users.map((user) => {
                  return (
                    <tr key={user.t_id_categoria}>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {user.t_nombre_categoria}
                        </Typography>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {user.t_prefijo_categoria}
                        </Typography>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {user.t_descripcion}
                        </Typography>
                      </td>
                      <td
                        className="p-4 border-b border-blue-gray-50"
                        onClick={() => (
                          handleOpenEsatdo(), setEditCat(user.t_id_categoria)
                        )}
                      >
                        <div className="w-max cursor-pointer">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={user.t_est}
                            color={user.t_estado ? "green" : "blue-gray"}
                          />
                        </div>
                      </td>
                      <td
                        className="p-4 border-b border-blue-gray-50"
                        onClick={() => (
                          handleOpenArea(),
                          setCategoriaEDit({
                            cat_id: user.t_id_categoria,
                            cat_nombre: user.t_nombre_categoria,
                            catPrefijo: user.t_prefijo_categoria,
                            catDescripcion: user.t_descripcion,
                          }),
                          setEditCat(user.t_id_categoria)
                        )}
                      >
                        <Tooltip content="Editar Categoria">
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
                })}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              Pagina 1 de 10
            </Typography>
            <div className="flex gap-2">
              <Button variant="outlined" color="blue-gray" size="sm">
                Anterior
              </Button>
              <Button variant="outlined" color="blue-gray" size="sm">
                Siguiente
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Fragment>
    </div>
  );
}
