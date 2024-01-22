import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  ArchiveBoxIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { useRef } from "react";
import { AiOutlineUpload } from "react-icons/ai";
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
} from "@material-tailwind/react";
import axios from "axios";
import OPArea from "../Areas/OPArea";
import { useState, useEffect, Fragment } from "react";
import { FaSearch } from "react-icons/fa";
const TABLE_HEAD = ["", "Area", ""];

import Loading from "@/components/loading";

const TABS = [
  {
    label: "Todas",
    value: "Todas",
  },
  {
    label: "Inhabilitadas",
    value: "Inhabilitadas",
  },
];
import { Loader } from "@/components/Widgets";

export default function Areas() {
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => (setOpen(!open), load());
  const [openAlert, setOpenAlert] = useState(false);
  const hadleAlert = () => setOpenAlert(!openAlert);
  const [openAlerterror, setOpenAlerterror] = useState(false);
  const hadleAlerterror = () => setOpenAlerterror(!openAlert);
  const fileInputRef = useRef(null);
  //mensaje de error
  const [error, setError] = useState();
  //variables para almacenar todas las areas
  const [areasdata, setAreasData] = useState([]);
  //estado para abrir la modal ver area
  const [openArea, setOpenArea] = useState(false);
  const handleOpenArea = () => setOpenArea(!openArea);
  //estado para cuando se de click en el boton ver area se guarde el id
  const [idArea, setIdArea] = useState("");
  const [nameArea, setNameArea] = useState("");
  //para enviar la foto de perfil
  const [file, setFile] = useState(null);
  //img preview
  const [fileP, setFileP] = useState();
  //estado para abrir un modal y seleccionar un area padre xd
  const [openModalArea, setOpenModalArea] = useState(false);
  const HandleModalArea = () => {
    setOpenModalArea(!openModalArea);
  };

  //Estado para almacenar al padre del area xd
  const [areaPadre, setAreaPadre] = useState("None");
  const [areaPadreN, setAreaPadreN] = useState("");

  //Estado para almacenar la palabra clave para la busqueda
  const [clave, setClave] = useState("");
  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    //Cargar la lista de las areas
    setLoading(true);

    const result = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK + "area/all_area",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    const data = await result.json();
    setAreasData(data);
    setLoading(false);
    setAreaPadre("None");
    setAreaPadreN("");
  };
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Activa el input de tipo "file"
    }
  };
  //Dataos del area que se va a crear
  const [area, setArea] = useState({
    nombre_area: "",
    nivel_area: "",
  });
  // llenar automaticamente los datos del area a medida que se escribe en los txt
  const HandleChange = (e) => {
    setArea({ ...area, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  };
  //funcion para cargar la preview de la imagen
  const ImagePreview = (e) => {
    try {
      setFile(e.target.files[0]);
      setFileP(URL.createObjectURL(e.target.files[0]));
    } catch (error) {
      console.log(error);
    }
  };
  //funcion para buscar y filtrar areas mediante una palabra clave
  const Buscar = async () => {
    if (clave.trim().length === 0) {
      load();
    } //de lo contrario mostrar solo lo filtrado
    else {
      setLoading(true);
      const result = await fetch(
        process.env.NEXT_PUBLIC_ACCESLINK + "area/all_area_busqueda/" + clave,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const data = await result.json();
      setAreasData(data);
      setLoading(false);
    }
  };
  const HandleSUbumit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      console.log("datos del usuario para enviar");
      console.log(area);

      const form = new FormData();
      form.set("file", file);
      form.set("nombre_area", area.nombre_area);
      form.set("prefijo", area.prefijo);

      //en caso de ser un hijo hay que enviar el id del area padre
      form.set("area_padre", areaPadre);

      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "area/crear_area",
        form,
        {
          withCredentials: true,
        }
      );

      hadleAlert();
      handleOpen();
      load();
      setAreaPadre("None");
      setAreaPadreN("");

      setLoading(false);
      //console.log(result);
    } catch (error) {
      let error1 = error.response.data.message;
      setError(error1);
      hadleAlerterror();
      setLoading(false);
    }
  };

  return (
    <Fragment>
      {loading && <Loader />}

      {openArea ? (
        <Dialog
          size="xxl"
          open={openArea}
          handler={handleOpenArea}
          className="overflow-y-scroll"
        >
          <DialogHeader className="bg-light-green-900 text-white">
            Editar area
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
          <OPArea
            idArea={idArea}
            asdasda={nameArea.toString()}
            className="overflow-y-scroll"
          />
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
          Se creo una nueva area
        </Alert>
        <div className="w-auto overflow-auto">
          <Dialog
            open={open}
            handler={handleOpen}
            className="w-auto h-4/5 mt-5  overflow-y-scroll rounded-none"
          >
            <DialogHeader className="bg-blue-gray-100">
              Crear Area
              <Button
                color="red"
                variant="text"
                size="md"
                className="!absolute top-3 right-3"
                onClick={() => (
                  setOpen(false), setAreaPadre(null), setAreaPadreN("")
                )}
              >
                <Typography variant="h5" color="blue-gray">
                  X
                </Typography>
              </Button>
              <Dialog
                open={openModalArea}
                handler={HandleModalArea}
                className="w-auto h-4/5   overflow-y-scroll rounded-none"
                size="xl"
              >
                <DialogHeader>
                  Seleccione un area Padre
                  <Button
                    color="red"
                    variant="text"
                    size="md"
                    className="!absolute top-3 right-3"
                    onClick={HandleModalArea}
                  >
                    <Typography variant="h5" color="blue-gray">
                      X
                    </Typography>
                  </Button>
                </DialogHeader>
                <DialogBody>
                  <div className="flex items-center justify-between gap-4 md:flex-row-reverse">
                    <div className="w-full md:w-72 items-center">
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

                  <table className="mt-4 w-full min-w-max table-auto text-left mx-3">
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
                      {areasdata.map(
                        ({ area_id, nombrearea, logoarea, prefijo }, index) => {
                          return (
                            <tr key={area_id}>
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
                                      "area/Areaimagen/" +
                                      area_id
                                    }
                                    alt={logoarea}
                                    className="mt-3"
                                  />
                                  <div className="flex flex-col">
                                    <Typography
                                      variant="h5"
                                      color="blue-gray"
                                      className="mr-auto font-normal mb-2 text-sm"
                                    >
                                      {nombrearea}
                                    </Typography>
                                    <div className="w-auto flex ml-2 mb-2">
                                      <Chip
                                        variant="ghost"
                                        size="sm"
                                        value={prefijo}
                                        color="blue-gray"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4 border-b border-blue-gray-50">
                                <Button
                                  className="bg-yellow-900"
                                  size="sm"
                                  onClick={() => (
                                    HandleModalArea(),
                                    setAreaPadre(area_id),
                                    setAreaPadreN(nombrearea)
                                  )}
                                >
                                  Seleccionar
                                </Button>
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </DialogBody>
              </Dialog>
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
                  src={!fileP ? "/img/Home/area_icon.png" : fileP}
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
                      name="nombre_area"
                      variant="standard"
                      color="black"
                      placeholder="Nombre de Area"
                      onChange={HandleChange}
                      required
                    />
                    <Input
                      size="lg"
                      name="prefijo"
                      variant="standard"
                      maxLength={5}
                      color="black"
                      placeholder="Prefijo de 5 caracteres"
                      onChange={HandleChange}
                      required
                    />
                    {areaPadre != "None" ? (
                      <div className="text-center text-black font-black ">
                        {areaPadreN.trim().length === 0
                          ? ""
                          : "Esta Area será hija de: " + areaPadreN}
                      </div>
                    ) : (
                      ""
                    )}
                    <Button
                      className="rounded-none"
                      fullWidth
                      color="yellow"
                      onClick={HandleModalArea}
                    >
                      Seleccionar un Padre
                    </Button>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      color="green"
                      className="flex gap-1 rounded-none h-11"
                    >
                      <ArrowRightOnRectangleIcon className="h-7 w-7 mx-auto" />
                      <p className="mt-1"> Crear</p>
                    </Button>
                  </div>
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
                Lista de Areas
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Administra las areas
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                onClick={handleOpen}
                className="ml-auto flex gap-1 md:mr-4 rounded-none md:ml-6 bg-yellow-800 h-11"
              >
                <ArchiveBoxIcon className="h-7 w-7" />
                <p className="mt-1"> Agregar Area</p>
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
                placeholder="Buscar areas"
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
        {areasdata.length === 0 ? (
          <div className="text-center">
            <Typography variant="h2" color="blue-gray" className="font-normal">
              No existen areas
            </Typography>
          </div>
        ) : (
          ""
        )}

        <CardBody className="overflow-scroll px-0">
          <div className="grid grid-cols-4 gap-3 p-14">
            {areasdata.map((task) => (
              <div
                key={task.area_id}
                task={task}
                className="bg-blue-gray-50 shadow-2xl border-2 border-orange-300 cursor-pointer hover:border-4 hover:border-green-600"
                onClick={() => {
                  setIdArea(task.area_id),
                    setNameArea(task.nombrearea),
                    handleOpenArea();
                }}
              >
                <div className="mx-auto">
                  <div className="text-center">
                    <Avatar
                      src={
                        process.env.NEXT_PUBLIC_ACCESLINK +
                        "area/Areaimagen/" +
                        task.area_id
                      }
                      alt={task.logoarea}
                      size="xl"
                      className="mt-3"
                    />
                  </div>
                  <div className="w-full p-4">
                    <input
                      className="w-full text-lg bg-blue-gray-50 font-semibold	text-blue-gray-800 "
                      disabled
                      value={task.nombrearea}
                    />
                  </div>

                  <div className="w-auto flex ml-2 mb-2">
                    <Chip
                      variant="ghost"
                      size="sm"
                      value={task.estadoarea ? "Habilitada" : "Inhabilitada"}
                      color={task.estadoarea ? "green" : "red"}
                    />
                  </div>
                  <div className="w-auto flex ml-2 mb-4">
                    <Chip
                      variant="ghost"
                      size="sm"
                      value={task.prefijo}
                      color="blue-gray"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Paguina 1 de 10
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
  );
}
