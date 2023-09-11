import { React, useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon, UserMinusIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import {
  Button,
  Dialog,
  Typography,
  Avatar,
  Tooltip,
  Input,
  DialogHeader,
} from "@material-tailwind/react";
const TABLE_HEAD = ["", "Datos", "Identificacion", "Celular", "Rol", ""];
import Participantessinproyectos from "./Participantessinproyectos";
import Loading from "@/components/loading";

export default function Participantes({
  idproyecto,
  idarea,
  agregarRevisores,
  permite_agregar,
}) {
  //Crear la tabla con usuarios
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openUser, setOpenUsers] = useState(false);
  const handlerOpenUsers = () => setOpenUsers(!openUser);
  const [openArea, setOpenArea] = useState(false);
  const handleOpenArea = () => {
    setOpenArea(!openArea), load();
  };
  //const para almacenar el rol que se quiere anadir, ya sea revisor o editor
  const [TipoRol, setTipoRol] = useState(0);
  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    //Cargar la lista de usuarios
    setLoading(true);

    const result = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK +
        "proyects/participantes_proyecto/" +
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
  //funcion para expulsar a un usuario del proyecto
  const expulsarUsuario = async (id_rel) => {
    setLoading(true);

    try {
      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK +
          "proyects/expulsar_usuario_proyecto",
        { p_proyecto_id: idproyecto, p_id_relacion: id_rel },
        {
          withCredentials: true,
        }
      );

      console.log(result);
      load();
      //console.log(result);
      setLoading(false);
    } catch (error) {
      alert("error:" + error);
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
      <div className="flex shrink-0 flex-col gap-2 sm:flex-row justify-end rounded-none">
        {openUser ? (
          <Dialog
            size="xl"
            open={openUser}
            handler={handlerOpenUsers}
            className="overflow-y-scroll rounded-none h-4/5"
          >
            <DialogHeader className="bg-light-green-900 text-white">
              Agregar Usuarios
              <Button
                color="red"
                variant="text"
                size="md"
                className="!absolute top-3 right-3"
                onClick={() => (handlerOpenUsers(), load())}
              >
                <Typography variant="h5" color="white">
                  X
                </Typography>
              </Button>
            </DialogHeader>
            <Participantessinproyectos
              idproyecto={idproyecto}
              idarea={idarea}
              tipoRol={TipoRol}
            />
          </Dialog>
        ) : (
          ""
        )}
        <div className="w-full md:w-72 mr-5">
          <Input
            label=""
            placeholder="Buscar usuarios"
            color="black"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          />
        </div>
        {agregarRevisores && permite_agregar ? (
          <Button
            className="ml-auto flex gap-1 md:mr-4 rounded-none md:ml-6 bg-yellow-800 h-11"
            onClick={() => (handlerOpenUsers(), setTipoRol(3))}
          >
            <UserPlusIcon className="h-7 w-7" />
            <p className="mt-1"> Agregar editores</p>
          </Button>
        ) : (
          ""
        )}
        {permite_agregar ? (
          <Button
            className="ml-auto flex gap-1 md:mr-4 rounded-none md:ml-6 bg-yellow-800 h-11"
            onClick={() => (handlerOpenUsers(), setTipoRol(2))}
          >
            <UserPlusIcon className="h-7 w-7" />
            <p className="mt-1"> Agregar revisores</p>
          </Button>
        ) : (
          ""
        )}
      </div>
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
          {users.map(
            (
              {
                r_id_user,
                r_nombres,
                r_correo_personal,
                r_correo_institucional,
                r_nombre_firma,
                r_identificacion,
                r_numero_celular,
                r_rol,
                r_id_realcion,
              },
              index
            ) => {
              return (
                <tr key={r_id_user}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {index + 1}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={
                          process.env.NEXT_PUBLIC_ACCESLINK +
                          "user/foto/" +
                          r_id_user
                        }
                        alt={r_nombres}
                        size="sm"
                      />
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {r_nombres}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {r_correo_personal}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {r_correo_institucional}
                        </Typography>

                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {r_nombre_firma}
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
                      {r_identificacion}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {r_numero_celular}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {r_rol}
                    </Typography>
                  </td>
                  {r_rol !== "Admin" && permite_agregar ? (
                    <td className="p-4 border-b border-blue-gray-50">
                      <Tooltip content="Expulsar usuario del proyecto">
                        <Button
                          className="ml-auto flex gap-1 md:mr-4 rounded-none md:ml-6 bg-light-green-800 h-11"
                          onClick={() => expulsarUsuario(r_id_realcion)}
                        >
                          <UserMinusIcon className="h-7 w-7" />
                          <p className="mt-1"> Expulsar</p>
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
    </div>
  );
}
