import { React, useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import {
  Button,
  Typography,
  Avatar,
  Tooltip,
  Input,
  Dialog,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
const TABLE_HEAD = ["Datos", "Identificacion", "Celular", "Acción"];
import Loading from "@/components/loading";

export default function Participantessinproyectos({
  idproyecto,
  idarea,
  tipoRol,
}) {
  //Crear la tabla con usuarios
  const [users, setUsers] = useState([]);
  const [openUser, setOpenUsers] = useState(false);
  const handlerOpenUsers = () => setOpenUsers(!openUser);
  const [openArea, setOpenArea] = useState(false);
  const [verificardor, setVerificador] = useState(false);
  const handleOpen = () => setVerificador(!verificardor);
  const [loading, setLoading] = useState(false);

  const handleOpenArea = () => {
    setOpenArea(!openArea), load();
  };
  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    //Cargar la lista de usuarios
    setLoading(true);

    const result = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK +
        "proyects/participantes_sin_proyecto/" +
        idarea +
        "/" +
        idproyecto,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    const data = await result.json();
    setUsers(data);
    setLoading(false);
  };
  //funcion para anadir el usuario
  const AnadirUsuarioProyecto = async (id_rel) => {
    setLoading(true);
    try {
      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "proyects/agregar_usuario_proyecto",
        { p_proyecto_id: idproyecto, p_id_relacion: id_rel, p_id_rol: tipoRol },
        {
          withCredentials: true,
        }
      );

      console.log(result);
      setVerificador(true);
      load();
      setLoading(false);
      //console.log(result);
    } catch (error) {
      alert("error:" + error);
      setLoading(false);
    }
  };
  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div>
      <Dialog open={verificardor} handler={handleOpen}>
        <DialogHeader>Se añadió el usuario al proyecto</DialogHeader>
        <DialogFooter>
          <Button
            variant="gradient"
            color="green"
            onClick={() => setVerificador(false)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <div className="flex shrink-0 flex-col gap-2 sm:flex-row justify-end rounded-none">
        <div className="w-full md:w-72 mr-5 mt-4">
          <Input
            label=""
            placeholder="Buscar usuarios"
            color="black"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          />
        </div>
      </div>
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
              <tr key={user.u_id_user}>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={
                        process.env.NEXT_PUBLIC_ACCESLINK +
                        "user/foto/" +
                        user.r_id_user
                      }
                      alt={user.r_nombres}
                      size="sm"
                    />
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.r_nombres}
                      </Typography>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        {user.r_correo_personal}
                      </Typography>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        {user.r_correo_institucional}
                      </Typography>

                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        {user.r_nombre_firma}
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
                    {user.r_identificacion}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {user.r_numero_celular}
                  </Typography>
                </td>

                <td className="p-4 border-b border-blue-gray-50">
                  <Tooltip content="Agregar usuario al proyecto">
                    <Button
                      className="ml-auto flex gap-1 md:mr-4 rounded-none md:ml-6 bg-light-green-800 h-11"
                      onClick={() => AnadirUsuarioProyecto(user.r_id_realcion)}
                    >
                      <UserPlusIcon className="h-7 w-7" />
                      <p className="mt-1"> Agregar</p>
                    </Button>
                  </Tooltip>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
