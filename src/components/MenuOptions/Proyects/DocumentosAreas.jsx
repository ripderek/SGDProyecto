import { React, useState, useEffect, useRef } from "react";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { EyeIcon } from "@heroicons/react/24/solid";
import Verpdf from "./Verpdf";
import {
  Button,
  Dialog,
  Typography,
  IconButton,
  Tooltip,
  Alert,
  Input,
  DialogHeader,
  Card,
  CardHeader,
  CardBody,
  Chip,
  Avatar,
} from "@material-tailwind/react";
import axios from "axios";
const TABLE_HEAD = ["Ver archivo", "Archivo", "Fecha"];
import Loading from "@/components/loading";
import { AiOutlineUpload } from "react-icons/ai";

export default function DocumentosAreas({
  id,
  rol,
  editproyecto,
  TituloProyecto,
  idarea,
}) {
  const [users, setUsers] = useState([]);
  const [openUser, setOpenUsers] = useState(false);
  const [loading, setLoading] = useState(false);
  const handlerOpenUsers = () => {
    setOpenUsers(!openUser);
    SetFileName("");
  };
  //para enviar la foto de perfil
  const [file, setFile] = useState(null);
  const ImagePreview = (e) => {
    try {
      setFile(e.target.files[0]);
      SetFileName(e.target.files[0].name);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    setLoading(true);
    //Cargar la lista de usuarios
    const result = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK + "proyects/documentos_proyectos/" + id,
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
  const [openAlert, setOpenAlert] = useState(false);
  const hadleAlert = () => setOpenAlert(!openAlert);
  const [openAlerterror, setOpenAlerterror] = useState(false);
  const hadleAlerterror = () => setOpenAlerterror(!openAlert);
  //mensaje de error
  const [error, setError] = useState([]);
  //abrir el pdf
  const [link, setLink] = useState("");
  const [openD, setOpenD] = useState(false);
  const [descripcion, setDescripcion] = useState("");

  const HandleSUbumit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const form = new FormData();

      form.set("file", file);
      form.set("id", id);
      form.set("descripcion", descripcion);
      setFile("");

      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "proyects/subir_pdf",
        form,
        {
          withCredentials: true,
        }
      );

      console.log(result);
      hadleAlert();
      handlerOpenUsers(), load();
      //console.log(result);
    } catch (error) {
      console.log(error);
      setError(error);
      hadleAlerterror();
      setLoading(false);
    }
  };
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Activa el input de tipo "file"
    }
  };
  const [fileName, SetFileName] = useState("");
  return (
    <div>
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        ""
      )}

      <div className="flex shrink-0 flex-col gap-2 sm:flex-row justify-end rounded-none ">
        <Dialog
          size="xxl"
          open={openD}
          handler={() => setOpenD(false)}
          className="overflow-y-scroll"
        >
          <DialogHeader className="bg-light-green-900 text-white">
            Documento Actual
            <div className="ml-5">
              <Chip
                icon={
                  <Avatar
                    size="xxl"
                    variant="circular"
                    className="h-full w-full -translate-x-0.5"
                    alt={TituloProyecto}
                    src={
                      process.env.NEXT_PUBLIC_ACCESLINK +
                      "area/Areaimagen/" +
                      idarea
                    }
                  />
                }
                value={
                  <Typography
                    variant="small"
                    color="black"
                    className="font-bold capitalize leading-none "
                  >
                    {TituloProyecto}
                  </Typography>
                }
                className="rounded-full  p-3"
                color="yellow"
              />
            </div>
            <Button
              color="red"
              variant="text"
              size="md"
              className="!absolute top-3 right-3"
              onClick={() => setOpenD(false)}
            >
              <Typography variant="h5" color="white">
                X
              </Typography>
            </Button>
          </DialogHeader>

          <Verpdf link={link} id={id} admin={rol}></Verpdf>
        </Dialog>

        {openUser ? (
          <Dialog
            size="sm"
            open={openUser}
            handler={handlerOpenUsers}
            className=" rounded-none"
          >
            <DialogHeader>
              Subir Documento
              <Button
                color="red"
                variant="text"
                size="md"
                className="!absolute top-3 right-3"
                onClick={() => (handlerOpenUsers(), load())}
              >
                <Typography variant="h5" color="blue-gray">
                  X
                </Typography>
              </Button>
            </DialogHeader>

            <form className=" sm:w-full" onSubmit={HandleSUbumit}>
              <Card className="w-full  mx-auto bg-blue-gray-100 rounded-none shadow-2xl">
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
                  El formato de subida no es el correcto
                </Alert>
                <CardHeader
                  color="white"
                  floated={false}
                  shadow={false}
                  className="m-0 grid place-items-center rounded-none py-8 px-4 text-center"
                >
                  <div className="mb-4 w-full">
                    <Input
                      variant="outlined"
                      color="black"
                      label="Descripcion del documento"
                      name="contra_nueva"
                      onChange={(e) => setDescripcion(e.target.value)}
                    />
                  </div>
                  <div className="mx-auto bg-yellow-800 p-2 rounded-xl">
                    <label
                      htmlFor="fileInput"
                      className="text-white font-bold "
                    >
                      Subir archivo:
                    </label>
                    <input
                      type="file"
                      id="fileInput"
                      onChange={ImagePreview}
                      accept=".pdf"
                      className="hidden"
                      ref={fileInputRef}
                    />
                    <Button
                      className="ml-3  rounded-xl  bg-white h-11"
                      onClick={handleButtonClick}
                    >
                      <AiOutlineUpload size="25px" color="black" />
                    </Button>
                  </div>

                  {fileName && <Typography color="gray">{fileName}</Typography>}
                </CardHeader>
                <CardBody className="text-right">
                  <div>
                    <Button
                      className="bg-green-700 p-3 justify-items-end rounded-none"
                      type="submit"
                    >
                      <Typography variant="h6" color="white">
                        Aceptar
                      </Typography>
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </form>
          </Dialog>
        ) : (
          ""
        )}
        {editproyecto === true ? (
          <Button
            className="ml-auto flex gap-1 md:mr-4 rounded-none md:ml-6 bg-yellow-800 h-11"
            onClick={handlerOpenUsers}
          >
            <ArrowUpCircleIcon className="h-7 w-7" />
            <p className="mt-1 text-white font-bold"> Subir Documento</p>
          </Button>
        ) : (
          ""
        )}
      </div>
      <table className="mt-4 w-full min-w-max table-auto text-left m-3">
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
                          process.env.NEXT_PUBLIC_ACCESLINK +
                            "proyects/pdf/" +
                            user.d_id
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
                        {user.d_descripcion}
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
