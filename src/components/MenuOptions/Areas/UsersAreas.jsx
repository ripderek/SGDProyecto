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
import axios from "axios";
const TABLE_HEAD = ["Datos", "Identificacion", "Celular", "Rol", "Editar"];
import AgregarUserArea from "../Areas/AgregarUserArea";
import PerfilUser from "../Users/PerfilUser";
export default function UsersAreas(id) {
  //Crear la tabla con usuarios
  const [users, setUsers] = useState([]);
  const [userID, setUserID] = useState();
  const [ID_relacion, setIDRealcion] = useState();

  const [openUser, setOpenUsers] = useState(false);
  const handlerOpenUsers = () => setOpenUsers(!openUser);
  const [openArea, setOpenArea] = useState(false);
  const handleOpenArea = () => {
    setOpenArea(!openArea), load();
  };
  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    //Cargar la lista de usuarios
    const result = await fetch(
      "http://localhost:4000/api/area/user_area/" + id.id,
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
      {openArea ? (
        <Dialog
          size="xxl"
          open={openArea}
          handler={handleOpenArea}
          className="overflow-y-scroll"
        >
          <button onClick={handleOpenArea} className="bg-yellow-900">
            <Typography variant="h2" color="white">
              Cerrar opciones de usuario
            </Typography>
          </button>
          <PerfilUser
            iduser={userID}
            isadminarea={true}
            idarea={id.id}
            relacionarea={ID_relacion}
          />
        </Dialog>
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
            <button
              className="bg-green-900 w-full"
              onClick={() => (handlerOpenUsers(), load())}
            >
              <Typography variant="h2" color="white">
                Cerrar
              </Typography>
            </button>

            <AgregarUserArea id={id.id} key={id} />
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
        <Button
          className="ml-auto flex gap-1 md:mr-4 rounded-none md:ml-6 bg-yellow-800 h-11"
          onClick={handlerOpenUsers}
        >
          <UserPlusIcon className="h-7 w-7" />
          <p className="mt-1"> Agregar Usuario</p>
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
              <tr key={user.u_id_user}>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={
                        "http://localhost:4000/api/user/foto/" + user.u_id_user
                      }
                      alt={user.u_nombres}
                      size="sm"
                    />
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.u_nombres}
                      </Typography>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        {user.u_correo}
                      </Typography>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        {user.u_correo2}
                      </Typography>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        {user.u_id_user}
                      </Typography>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        {user.u_nombrefirma}
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
                    {user.u_identificacion}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {user.u_celular}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {user.u_rol}
                  </Typography>
                </td>

                <td className="p-4 border-b border-blue-gray-50">
                  <Tooltip content="Editar Usuario">
                    <IconButton
                      variant="text"
                      color="blue-gray"
                      onClick={() => (
                        handleOpenArea(),
                        setUserID(user.u_id_user),
                        setIDRealcion(user.u_relacion)
                      )}
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
    </div>
  );
}
