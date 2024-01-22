import { React, useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon, PencilIcon } from "@heroicons/react/24/solid";
import Loading from "@/components/loading";
import {
  Button,
  Dialog,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  Input,
  DialogHeader,
} from "@material-tailwind/react";
const TABLE_HEAD = ["", "Datos", "Identificacion", "Celular", "Rol", "Editar"];
import AgregarUserArea from "../Areas/AgregarUserArea";
import PerfilUser from "../Users/PerfilUser";
export default function UsersAreas(id) {
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    const result = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK + "area/user_area/" + id.id,
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
  const Salir = (valor) => {
    if (valor) {
      setOpenArea(false);
      load();
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
      {openArea ? (
        <Dialog
          size="xxl"
          open={openArea}
          handler={handleOpenArea}
          className="overflow-y-scroll"
        >
          <DialogHeader className="bg-light-green-900 text-white">
            Editar usuario
            <Button
              color="red"
              variant="text"
              size="md"
              className="!absolute top-3 right-3"
              onClick={() => (handleOpenArea(), load())}
            >
              <Typography variant="h5" color="white">
                X
              </Typography>
            </Button>
          </DialogHeader>

          <PerfilUser
            iduser={userID}
            isadminarea={true}
            admin={true}
            idarea={id.id}
            relacionarea={ID_relacion}
            Salir={Salir}
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
            <DialogHeader className="bg-light-green-900 text-white">
              Agregar usuario
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
      {users.length === 0 ? (
        <Typography variant="h3" color="gray" className="mx-auto text-center ">
          No hay usuarios en esta area
        </Typography>
      ) : (
        <table className="mt-4 w-full min-w-max table-auto text-left mx-3 m-4">
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
                  u_id_user,
                  u_nombres,
                  u_correo,
                  u_correo2,
                  u_nombrefirma,
                  u_identificacion,
                  u_celular,
                  u_rol,
                  u_relacion,
                },
                index
              ) => {
                return (
                  <tr key={u_id_user}>
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
                            "user/foto/" +
                            u_id_user
                          }
                          alt={u_nombres}
                          size="sm"
                        />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {u_nombres}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {u_correo}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {u_correo2}
                          </Typography>

                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {u_nombrefirma}
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
                        {u_identificacion}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {u_celular}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {u_rol}
                      </Typography>
                    </td>

                    <td className="p-4 border-b border-blue-gray-50">
                      <Tooltip content="Editar Usuario">
                        <IconButton
                          variant="text"
                          color="blue-gray"
                          onClick={() => (
                            handleOpenArea(),
                            setUserID(u_id_user),
                            setIDRealcion(u_relacion)
                          )}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
