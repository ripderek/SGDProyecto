import { useState } from "react";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { DocumentTextIcon, ArchiveBoxIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Loading from "@/components/loading";
import EditarProyecto from "./EditarProyecto";
export default function ConfigurarProyecto({
  eliminarFlujo,
  id_proyecto,
  Recargar,
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openEditarDatos, setOpenEditarDatos] = useState(false);
  const handleOpen = () => setOpen(!open);
  //funcion para deshabilitar el flujo de un proyecto
  const handlerSubmit = async () => {
    setLoading(true);

    try {
      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK +
          "proyects/EliminarFLujo/" +
          id_proyecto,
        {},
        {
          withCredentials: true,
        }
      );
      //alert("Se elimino el flujo");
      //aqui enviar al inicio xdxd skere modo diablo
      setOpen(!open);
      setLoading(false);
      Recargar(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handlerSalir = (valor) => {
    if (valor) {
      setOpenEditarDatos(false);
      //aqui tambien volver a la pagina principal xdxdx skere modo dibalo
      Recargar(true);
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
      {openEditarDatos ? (
        <EditarProyecto idproyecto={id_proyecto} handlerSalir={handlerSalir} />
      ) : (
        ""
      )}
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Borrar Flujo</DialogHeader>
        <DialogBody divider>
          Al confirmar esta acción se eliminará el flujo actual del proyecto,
          solo será posible si aún no se envia al siguiente nivel.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancelar</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handlerSubmit}>
            <span>Confirmar</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <Card className="h-full w-full rounded-none shadow-none">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-0 flex  justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Configuraciones
              </Typography>
            </div>
          </div>
        </CardHeader>
        <CardBody className=" mx-auto items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 p-2">
            <div className="bg-blue-gray-50 shadow-2xl">
              <div className="bg-zinc-900 text-black shadow-2xl ">
                <div className="mx-auto">
                  <div className="text-center">
                    <DocumentTextIcon className="h-14 w-14 mx-auto mt-2" />
                  </div>
                  <div className="w-full p-4">
                    <input
                      className="w-full text-lg bg-blue-gray-50 font-semibold	text-blue-gray-800 "
                      disabled
                      value="Editar datos"
                    />
                  </div>
                </div>
                <div className="p-2  bg-green-400">
                  <button
                    className="bg-zinc-50 p-2 hover:bg-blue-700 bg-yellow-900"
                    onClick={() => setOpenEditarDatos(true)}
                  >
                    <p className="text-lg font-semibold items-center text-white">
                      Seleccionar
                    </p>
                  </button>
                </div>
              </div>
            </div>
            {eliminarFlujo ? (
              <div className="bg-blue-gray-50 shadow-2xl">
                <div className="bg-zinc-900 text-black shadow-2xl ">
                  <div className="mx-auto">
                    <div className="text-center">
                      <ArchiveBoxIcon className="h-14 w-14 mx-auto mt-2" />
                    </div>
                    <div className="w-full p-4">
                      <input
                        className="w-full text-lg bg-blue-gray-50 font-semibold	text-blue-gray-800 "
                        disabled
                        value="Borrar flujo"
                      />
                    </div>
                  </div>
                  <div className="p-2  bg-green-400">
                    <button
                      className="bg-zinc-50 p-2 hover:bg-blue-700 bg-yellow-900"
                      onClick={handleOpen}
                    >
                      <p className="text-lg font-semibold items-center text-white">
                        Seleccionar
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
