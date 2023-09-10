import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { EyeIcon } from "@heroicons/react/24/solid";
import CrearReforma from "./CrearReforma";
import VerVersionesPro from "./VersionesProyectosPublicados";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";

const TABLE_HEAD = [
  "",
  "Proyecto",
  "Categoria",
  "Codigo",
  "Fecha publicación",
  "Version",
  "Ver",
  "",
];
import Loading from "@/components/loading";

export default function ProyectosPublicados({ addIDPPV }) {
  const [areasdata, setAreasData] = useState([]);
  const cookies = new Cookies();
  //constante para abrir el dialog para poder hacerle reforma a un proyecto xdxd lgante lkl
  const [OpenDialog, setOpenDialog] = useState(false);
  //constante para llevar el id del proyecto seleccionado
  const [id_proyecto, setIDProyecto] = useState(0);
  //consta para llevar el nombre del proyecto para no andar consultandolo xd
  const [tituloProyecto, setTituloProyecto] = useState("");

  const handlerDialog = () => {
    setOpenDialog(false);
  };
  useEffect(() => {
    load();
  }, []);
  //variables para el load
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const result = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK + "proyects/proyectos_publicados",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    const data = await result.json();
    setAreasData(data);
    setLoading(false);
  };
  const accion = (valor) => {
    setOpenDialog(valor);
    load();
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
      <Dialog
        size="sm"
        open={OpenDialog}
        handler={handlerDialog}
        className=" rounded-none"
      >
        <DialogHeader>
          Reformar proyecto
          <Button
            color="red"
            variant="text"
            size="md"
            className="!absolute top-3 right-3"
            onClick={() => setOpenDialog(false)}
          >
            <Typography variant="h5" color="blue-gray">
              X
            </Typography>
          </Button>
        </DialogHeader>
        <DialogBody>
          <CrearReforma
            id_proyecto={id_proyecto}
            titulo_proyecto={tituloProyecto}
            accion={accion}
          />
        </DialogBody>
      </Dialog>
      <Card className="h-full w-full p-7 rounded-none shadow-none">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Lista de publicaciones
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Proyectos para reformas
              </Typography>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-72">
              <Input
                label="Buscar"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-24">
          <table className="mt-4 w-full min-w-max table-auto text-left ">
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
                (
                  {
                    r_id_proyecto,
                    r_titulo_proyecto,
                    r_nombre_area,
                    r_nombre_categoria,
                    r_codigo,
                    r_fecha_publicacion,
                    r_version,
                    r_publicado,
                  },
                  index
                ) => {
                  const isLast = index === areasdata.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={r_id_proyecto}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {index + 1}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {r_titulo_proyecto}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {r_nombre_area}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {r_nombre_categoria}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={r_codigo}
                            color={"green"}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {r_fecha_publicacion}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {r_version}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Ver proyecto">
                          <IconButton
                            variant="text"
                            onClick={() =>
                              addIDPPV(r_id_proyecto, r_titulo_proyecto)
                            }
                          >
                            <EyeIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                      {r_publicado ? (
                        <td className={classes}>
                          <Tooltip content="Reformar proyecto">
                            <Button
                              color="yellow"
                              variant="gradient"
                              size="md"
                              className="ml-5 rounded-none"
                              onClick={() => {
                                setOpenDialog(true),
                                  setIDProyecto(r_id_proyecto),
                                  setTituloProyecto(r_titulo_proyecto);
                              }}
                            >
                              Reformar
                            </Button>
                          </Tooltip>
                        </td>
                      ) : (
                        ""
                      )}
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Paguina 1 de 1
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
    </div>
  );
}
