import { React, Fragment, useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon, PencilIcon } from "@heroicons/react/24/solid";

import {
  Button,
  Dialog,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
const TABLE_HEAD = [
  "Titulo",
  "Codigo",
  "Estado",
  "Prefijo",
  "Categoria",
  "Accion",
];
import CrearProyecto from "./CrearProyecto";
export default function OpProyectos(id) {
  //Crear la tabla con usuarios
  const [users, setUsers] = useState([]);
  const [openUser, setOpenUsers] = useState(false);
  const handlerOpenUsers = () => setOpenUsers(!openUser);

  //Funcion para cerrar el formulario de crear proyectos
  const [openFOrm, setOpenForm] = useState(false);

  const openDiv = (opend) => {
    setOpenForm(opend);
    load();
  };

  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    //Cargar la lista de usuarios
    const result = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK + "proyects/proyectos_areas/" + id.id,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    const data = await result.json();
    setUsers(data);
  };
  return (
    <div>
      <div className="flex shrink-0 flex-col  sm:flex-row justify-end rounded-none">
        {openFOrm ? (
          <Dialog open={openFOrm} className="overflow-y-scroll rounded-none">
            <CrearProyecto id={id.id} openDiv={openDiv} />
          </Dialog>
        ) : (
          ""
        )}
        <div className="w-full md:w-72 mr-5">
          <Input
            label=""
            placeholder="Buscar proyectos"
            color="black"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          />
        </div>
        <Button
          className="ml-auto flex gap-1 md:mr-4 rounded-none md:ml-6 bg-yellow-800 h-11"
          onClick={setOpenForm}
        >
          <UserPlusIcon className="h-7 w-7" />
          <p className="mt-1"> Agregar Proyecto</p>
        </Button>
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
              <tr key={user.p_id_proyecto}>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.p_titulo}
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
                    {user.p_codigo}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {user.p_estado ? "Habilitado" : "Deshabilitado"}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {user.p_prefijo}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {user.p_categoria}
                  </Typography>
                </td>

                <td className="p-4 border-b border-blue-gray-50">
                  <Tooltip content="Edit User">
                    <IconButton variant="text" color="blue-gray">
                      <PencilIcon className="h-4 w-4" />
                    </IconButton>
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
