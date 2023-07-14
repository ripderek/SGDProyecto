import { React, Fragment, useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/24/outline";
import { UserPlusIcon, PencilIcon, EyeIcon } from "@heroicons/react/24/solid";
import Verpdf from "./Verpdf";
import {
  Button,
  Dialog,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  Alert,
} from "@material-tailwind/react";
import axios from "axios";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
const TABLE_HEAD = ["", "Archivo", "Fecha", ""];
import AgregarUserArea from "../Areas/AgregarUserArea";
export default function DocumentosAreas({ id, rol }) {
  const [users, setUsers] = useState([]);
  const [openUser, setOpenUsers] = useState(false);
  const handlerOpenUsers = () => setOpenUsers(!openUser);
  //para enviar la foto de perfil
  const [file, setFile] = useState(null);
  const ImagePreview = (e) => {
    try {
      setFile(e.target.files[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    //Cargar la lista de usuarios
    const result = await fetch(
      "http://localhost:4000/api/proyects/documentos_proyectos/" + id,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    const data = await result.json();
    setUsers(data);
  };
  const [openAlert, setOpenAlert] = useState(false);
  const hadleAlert = () => setOpenAlert(!openAlert);
  const [openAlerterror, setOpenAlerterror] = useState(false);
  const hadleAlerterror = () => setOpenAlerterror(!openAlert);
  //mensaje de error
  const [error, setError] = useState([]);
  //abrir el pdf
  const [link, setLink] = useState("");
  const [openD, setOpenD] = useState(false);

  const HandleSUbumit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();

      form.set("file", file);
      form.set("id", id);
      setFile("");

      const result = await axios.post(
        "http://localhost:4000/api/proyects/subir_pdf",
        form,
        {
          withCredentials: true,
        }
      );

      console.log(result);
      hadleAlert();
      load();
      //console.log(result);
    } catch (error) {
      console.log(error);
      setError(error);
      hadleAlerterror();
    }
  };
  return (
    <div>
      <div className="flex shrink-0 flex-col gap-2 sm:flex-row justify-end rounded-none ">
        <Dialog
          size="xxl"
          open={openD}
          handler={() => setOpenD(false)}
          className="overflow-y-scroll"
        >
          <button onClick={() => setOpenD(false)} className="bg-yellow-900">
            <Typography variant="h2" color="white">
              Cerrar Documento
            </Typography>
          </button>
          <Verpdf link={link}></Verpdf>
        </Dialog>

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
            <Alert
              color="green"
              onClose={() => setOpenAlert(false)}
              open={openAlert}
            >
              Se subio el documento
            </Alert>
            <Alert
              color="red"
              onClose={() => setOpenAlerterror(false)}
              open={openAlerterror}
            >
              {error.message}
            </Alert>

            <form className=" sm:w-full" onSubmit={HandleSUbumit}>
              <div className="mb-4 flex flex-col gap-6">
                <input type="file" accept=".pdf" onChange={ImagePreview} />
                <Button
                  className="mt-6 rounded-none"
                  fullWidth
                  color="green"
                  type="submit"
                >
                  Subir
                </Button>
              </div>
            </form>
          </Dialog>
        ) : (
          ""
        )}
        {rol === "Revisor" ? (
          ""
        ) : (
          <Button
            className="ml-auto flex gap-1 md:mr-4 rounded-none md:ml-6 bg-yellow-800 h-11"
            onClick={handlerOpenUsers}
          >
            <ArrowUpCircleIcon className="h-7 w-7" />
            <p className="mt-1"> Subir Documento</p>
          </Button>
        )}
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
          {users.length === 0 ? (
            <div className="items-center text-center text-2xl">
              No hay documentos
            </div>
          ) : (
            ""
          )}
          {users.map((user) => {
            return (
              <tr key={user.u_id_user} className="cursor-pointer">
                <td className="p-4 border-b border-blue-gray-50">
                  <Tooltip content="Ver documento">
                    <IconButton
                      variant="text"
                      color="blue-gray"
                      onClick={() => (
                        setLink(
                          "http://localhost:4000/api/proyects/pdf/" + user.d_id
                        ),
                        setOpenD(true)
                      )}
                    >
                      <EyeIcon className="h-4 w-4" />
                    </IconButton>
                  </Tooltip>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.d_url}
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
                    {user.d_fecha}
                  </Typography>
                </td>
                {rol === "Revisor" ? (
                  ""
                ) : (
                  <td className="p-4 border-b border-blue-gray-50">
                    <Tooltip content="Edit User">
                      <IconButton variant="text" color="blue-gray">
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
