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
} from "@material-tailwind/react";
import axios from "axios";
import OPArea from "../Areas/OPArea";
import { useState, useEffect, Fragment } from "react";
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
  const [error, setError] = useState([]);
  //variables para almacenar todas las areas
  const [areasdata, setAreasData] = useState([]);
  //estado para abrir la modal ver area
  const [openArea, setOpenArea] = useState(false);
  const handleOpenArea = () => setOpenArea(!openArea);
  //estado para cuando se de click en el boton ver area se guarde el id
  const [idArea, setIdArea] = useState("");
  const [nameArea, setNameArea] = useState("");

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
    url_foto: "/img/Home/logo-fci-1.jpg",
  });
  // llenar automaticamente los datos del area a medida que se escribe en los txt
  const HandleChange = (e) => {
    setArea({ ...area, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  };
  const HandleSUbumit = async (e) => {
    e.preventDefault();
    try {
      console.log("datos del usuario para enviar");
      console.log(area);

      const result = await axios.post(
        "http://localhost:4000/api/area/crear_area",
        area,
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
      console.log(error);
      setError(error);
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
            <h4 className="text-black">Cerrar opciones de area</h4>
          </button>
          <Typography variant="h3" className="text-black ml-12 mt-4">
            {nameArea}
          </Typography>

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
                {error.message}
              </Alert>
              <div className="flex justify-center mb-5">
                <img
                  className="ml-5 h-40 w-40 rounded-full border-4 border-yellow-600 cursor-pointer"
                  src="/img/Home/logo-fci-1.jpg"
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
                      name="nombre_area"
                      variant="standard"
                      color="black"
                      placeholder="Nombre de Area"
                      onChange={HandleChange}
                      required
                    />

                    <Input
                      size="lg"
                      name="nivel_area"
                      variant="standard"
                      color="black"
                      placeholder="Nivel de Area"
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
                        src={task.logoarea}
                        alt={task.logoarea}
                        size="xl"
                        className="mt-3"
                      />
                    </div>

                    <h1 className="text-lg font-bold text-black text-center mb-2 mt-4">
                      {task.nombrearea}
                    </h1>
                    <div className="w-auto flex ml-2 mb-2">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={task.estadoarea ? "Habilitada" : "Inhabilitada"}
                        color={task.estadoarea ? "green" : "blue-gray"}
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
