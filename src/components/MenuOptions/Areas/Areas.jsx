import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ArchiveBoxIcon } from "@heroicons/react/24/solid";
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

export default function Areas() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [openAlert, setOpenAlert] = useState(false);
  const hadleAlert = () => setOpenAlert(!openAlert);
  const [openAlerterror, setOpenAlerterror] = useState(false);
  const hadleAlerterror = () => setOpenAlerterror(!openAlert);
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
  const [areaPadreN, setAreaPadreN] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    //Cargar la lista de las areas

    const result = await fetch("http://localhost:4000/api/area/all_area", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await result.json();
    setAreasData(data);
    console.log(areasdata);
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

  const HandleSUbumit = async (e) => {
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
        "http://localhost:4000/api/area/crear_area",
        form,
        {
          withCredentials: true,
        }
      );

      console.log(area);
      console.log(result);
      hadleAlert();
      handleOpen();
      load();
      //console.log(result);
    } catch (error) {
      let error1 = error.response.data.message;
      console.log(error);
      setError(error1);
      hadleAlerterror();
    }
  };

  return (
    <Fragment>
      {openArea ? (
        <Dialog
          size="xxl"
          open={openArea}
          handler={handleOpenArea}
          className="overflow-y-scroll"
        >
          <button onClick={handleOpenArea} className="bg-yellow-900">
            <Typography variant="h2" color="white">
              Cerrar opciones de area
            </Typography>
          </button>

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
        <div className="w-auto">
          <Dialog
            open={open}
            handler={handleOpen}
            className="w-auto h-auto mt-5  overflow-y-scroll rounded-none"
          >
            <DialogHeader>
              Crear Area
              <Button
                color="red"
                variant="text"
                size="md"
                className="!absolute top-3 right-3"
                onClick={() => (setOpen(false), setAreaPadre(null))}
              >
                <Typography variant="h5" color="blue-gray">
                  X
                </Typography>
              </Button>
              <Fragment>
                <Drawer
                  open={openModalArea}
                  onClose={HandleModalArea}
                  className="p-4 overflow-y-scroll"
                  placement="right"
                >
                  <div className="mb-6  items-center justify-between mt-6">
                    <Typography variant="h3" color="blue-gray">
                      Seleccionar área
                    </Typography>
                    <div className="flex w-auto">
                      <Input
                        label=""
                        variant="standard"
                        placeholder="Buscar"
                        color="black"
                      />
                      <Button className="flex gap-1 rounded-none bg-light-green-900 h-auto w-auto">
                        <FaSearch size="1.9em" />
                      </Button>
                    </div>
                  </div>
                  {areasdata.map((task) => (
                    <Card className="mt-6 w- h-auto bg-blue-gray-50 shadow-2xl">
                      <CardBody>
                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className="mb-2"
                        >
                          {task.nombrearea}
                        </Typography>
                        <div className="text-center">
                          <Avatar
                            src={
                              "http://localhost:4000/api/area/Areaimagen/" +
                              task.area_id
                            }
                            alt={task.logoarea}
                            size="xl"
                            className="mt-3"
                          />
                        </div>
                      </CardBody>
                      <CardFooter className="pt-0">
                        <Button
                          className="bg-yellow-900"
                          onClick={() => (
                            HandleModalArea(),
                            setAreaPadre(task.area_id),
                            setAreaPadreN(task.nombrearea)
                          )}
                        >
                          Seleccionar
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </Drawer>
              </Fragment>
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
                    <input
                      type="file"
                      accept="image/png, .jpeg"
                      onChange={ImagePreview}
                    />
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
                      color="black"
                      placeholder="Prefijo de 5 caracteres"
                      onChange={HandleChange}
                      required
                    />
                    {areaPadre != "None" ? (
                      <div className="text-center text-black font-black ">
                        {"Esta Area será hija de: " + areaPadreN}
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
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
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
                className="bg-blue-gray-50 shadow-2xl"
              >
                <div className="bg-zinc-900 text-black shadow-2xl ">
                  <div className="mx-auto">
                    <div className="text-center">
                      <Avatar
                        src={
                          "http://localhost:4000/api/area/Areaimagen/" +
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
                    <div className="w-auto flex ml-2 mb-2">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={task.prefijo}
                        color="blue-gray"
                      />
                    </div>
                  </div>
                  <div className="p-2  bg-green-400">
                    <button
                      className="bg-zinc-50 p-2 hover:bg-blue-700 
        bg-yellow-900"
                      onClick={() => {
                        setIdArea(task.area_id),
                          setNameArea(task.nombrearea),
                          handleOpenArea();
                      }}
                    >
                      <p className="text-lg font-semibold items-center text-white">
                        Ver area
                      </p>
                    </button>
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
