import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/solid";

import {
  DialogHeader,
  DialogBody,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  Alert,
  Input,
} from "@material-tailwind/react";
import { Fragment, useState, useEffect, React } from "react";
import Loading from "@/components/loading";

import axios from "axios";
const TABLE_HEAD = ["", "Datos", "Identificacion", "Agregar"];

export default function AgregarUserArea(id) {
  const [users, setUsers] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const hadleAlert = () => setOpenAlert(!openAlert);
  const [openArea, setOpenArea] = useState(false);
  const handleOpenArea = () => setOpenArea(!openArea);
  const [openAlerterror, setOpenAlerterror] = useState(false);
  const hadleAlerterror = () => setOpenAlerterror(!openAlert);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  //mensaje de error
  const [error, setError] = useState([]);
  const [open, setOpen] = useState(false);
  const [idarea, setIdeArea] = useState("");
  const handleOpen = () => {
    setOpen(!open);
  };
  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    //Cargar la lista de usuarios
    setLoading(true);

    const result = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK + "area/users_sin_area/" + id.id,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    setIdeArea(id.id);
    const data = await result.json();
    setUsers(data);
    setLoading(false);
  };
  const HandleSUbumit = async (p1) => {
    setLoading(true);
    try {
      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "area/usuario_area",
        {
          p_id_user: p1,
          p_id_area: idarea,
        },
        {
          withCredentials: true,
        }
      );
      console.log(user);
      load();
      console.log(result);
    } catch (error) {
      console.log(user);
      console.log(error);
      setError(error.response.data.message);
      hadleAlerterror();
      setLoading(false);
    }
  };
  return (
    <div className="h-auto">
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        ""
      )}
      <DialogHeader className="justify-between">
        <Alert
          color="yellow"
          onClose={() => setOpenAlert(false)}
          open={openAlert}
        >
          Se agrego un nuevo usuario al area
        </Alert>
        <Alert
          color="red"
          onClose={() => setOpenAlerterror(false)}
          open={openAlerterror}
        >
          {error}
        </Alert>
        <div className="w-full mt-0 p-5">
          <Input
            label=""
            placeholder="Buscar usuarios"
            color="black"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          />
        </div>
      </DialogHeader>
      <DialogBody divider={true}>
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
            {users.map(
              (
                {
                  u_id_user,
                  u_nombres,
                  u_correo,
                  u_correo2,
                  u_nombrefirma,
                  u_identificacion,
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
                            {u_id_user}
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

                    <td
                      className="p-4 border-b border-blue-gray-50"
                      onClick={() => HandleSUbumit(u_id_user)}
                    >
                      <Tooltip content="Edit User">
                        <IconButton variant="text" color="blue-gray">
                          <UserPlusIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </DialogBody>
    </div>
  );
}
