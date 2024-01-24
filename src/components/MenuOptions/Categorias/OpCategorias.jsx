import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/solid";
//importar los compoonentes desdel index y ya no por separador
import {
  Crear,
  Ediatr,
  DefinirFlujo,
    VerFlujoCategoria
} from "@/components/MenuOptions/Categorias";
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
  IconButton,
  Tooltip,
  Card,
  Alert,
} from "@material-tailwind/react";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";

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
  "Flujo",
  "Editar",
];
import { Loader } from "@/components/Widgets";
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
  const [loading, setLoad] = useState(false);
  const [user, setUser] = useState([]);
  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    setLoad(true);
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
    console.log(data);
    setLoad(false);
  };
  const HandleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
    // setUser({ ...user, tipo_identificacion: tipoidentificacion });
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
  //constante para abrir el creador de categorias
  const [openCrear, setOpenCrear] = useState(false);
  const cerrar = () => {
    setOpenCrear(false);
    load();
  };
  const [openEditar, setOpenEditar] = useState(false);
  const cerrarEditar = () => {
    setOpenEditar(false);
    load();
  };
  //const para abrir el editor de flujo
  const [openFlujo, SetOpenFlujo] = useState(false);
  const cerrarDefinir = () => {
    SetOpenFlujo(false);
  };
  //const para ver el flujo de una categoria
  const [openVerFlujo, SetOpenVerFlujo] = useState(false);
  //Ver flujo
  //editCat
  const cerrarVerFlujo = ()=> {
    SetOpenVerFlujo(false);
  }
  return (
    <div>
      {openVerFlujo && <VerFlujoCategoria cerrar={cerrarVerFlujo} idHistorial={editCat}/>}
      {openFlujo && (
        <DefinirFlujo cerrar={cerrarDefinir} idcategoria={editCat} />
      )}
      {loading && <Loader />}
      {/* NUEVO METODO PARA CREAR PARA SEPARARLO DEL COMPONENTE PRINCIPAL */}
      {openCrear && <Crear cerrar={cerrar} />}
      {openEditar && (
        <Ediatr cerrar={cerrarEditar} categoriaEdit={categoriaEdit} />
      )}

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
                  onClick={() => setOpenCrear(true)}
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
            <table className="mt-4 w-full min-w-max table-auto text-left m-4">
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
                      <td className="p-4 border-b border-blue-gray-50">
                        <div>
                          {user.tiene_flujo ? (
                            <Button
                              onClick={() => (
                                setEditCat(user.t_id_categoria),
                                    SetOpenVerFlujo(true)
                              )}
                              color="yellow"
                              className="rounded-none"
                            >
                              Ver Flujo
                            </Button>
                          ) : (
                            <Button
                              onClick={() => (
                                setEditCat(user.t_id_categoria),
                                SetOpenFlujo(true),
                                console.log(user)
                              )}
                              color="green"
                              className="rounded-none"
                            >
                              Definir Flujo
                            </Button>
                          )}
                        </div>
                      </td>
                      <td
                        className="p-4 border-b border-blue-gray-50"
                        /* */
                        onClick={() => (
                          handleOpenArea(),
                          setCategoriaEDit({
                            cat_id: user.t_id_categoria,
                            cat_nombre: user.t_nombre_categoria,
                            catPrefijo: user.t_prefijo_categoria,
                            catDescripcion: user.t_descripcion,
                          }),
                          //setEditCat(user.t_id_categoria)
                          setOpenEditar(true)
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
