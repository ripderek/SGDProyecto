import {
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
  Checkbox,
  DialogFooter,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import Loading from "@/components/loading";
import axios from "axios";
import Lottie from "lottie-react";
import anim_error from "../../../../public/Anim/error_anim.json";
export default function EditarProyecto({ idproyecto, handlerSalir }) {
  const [openAlert, setOpenAlert] = useState(false);

  const [loading, setLoading] = useState(false);
  //Dataos del usuario que se va a crear
  const [proyecto, setProyecto] = useState({
    p_titulo: "",
    p_prefijo_nuevo: "",
    p_visibilidad: "",
  });

  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    setLoading(true);

    const result = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK + "proyects/DatosEditar/" + idproyecto,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    const dataU = await result.json();
    setProyecto({
      ...proyecto,
      p_titulo: dataU.r_titulo,
      p_prefijo_nuevo: dataU.r_prefijo,
      p_visibilidad: dataU.r_publico,
    });
    setLoading(false);
  };
  const HandleChange = (e) => {
    setProyecto({ ...proyecto, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
    // setUser({ ...user, tipo_identificacion: tipoidentificacion });
  };
  const [MensajeError, setMensajeError] = useState("");

  //funcion para enviar la data sskks skere modo diablo
  const HandleSUbumit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK +
          "proyects/EditarDatos/" +
          idproyecto,
        proyecto,
        {
          withCredentials: true,
        }
      );
      handlerSalir(true);
      setLoading(false);
    } catch (error) {
      alert(error.response.data.message);
      setOpenAlert(true);
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

      <Dialog size="sm" open={true} className="rounded-none">
        <DialogHeader className="bg-gray-200">
          Editar Datos
          <Button
            color="red"
            variant="text"
            size="sm"
            className="!absolute top-3 right-3"
            onClick={() => handlerSalir(true)}
          >
            <Typography variant="h5" color="blue-gray">
              X
            </Typography>
          </Button>
        </DialogHeader>
        <DialogBody className="overflow-scroll h-96">
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
              <Input
                size="lg"
                label="Titulo"
                value={proyecto.p_titulo}
                name="p_titulo"
                onChange={HandleChange}
                required
              />
              <Input
                size="lg"
                label="Prefijo"
                value={proyecto.p_prefijo_nuevo}
                name="p_prefijo_nuevo"
                onChange={HandleChange}
                maxLength={5}
                required
              />
            </div>
            <Checkbox
              color="green"
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  ¿Es publico?
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
              checked={proyecto.p_visibilidad}
              name="p_visibilidad"
              value={proyecto.p_visibilidad}
              onChange={(e) =>
                setProyecto({ ...proyecto, p_visibilidad: e.target.checked })
              }
            />
            <Button
              className="mt-6"
              fullWidth
              color="green"
              onClick={HandleSUbumit}
            >
              Actualizar datos
            </Button>
          </form>
        </DialogBody>
      </Dialog>
    </div>
  );
}
