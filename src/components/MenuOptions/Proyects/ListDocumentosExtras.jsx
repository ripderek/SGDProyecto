import { React, useState, useEffect, useRef } from "react";
import { EyeIcon } from "@heroicons/react/24/solid";
import {
  Dialog,
  Typography,
  IconButton,
  Tooltip,
  DialogHeader,
  Button,
  Chip,
  Card,
  Alert,
  Input,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { AiOutlineUpload } from "react-icons/ai";
//              {file && file.name}

import Loading from "@/components/loading";
import axios from "axios";

const TABLE_HEAD = ["", "Ver documento", "Archivo", "Fecha", "Estado"];
import VerBorradorPDF from "./VerBorradorPDF";

export default function ListDocumentosExtras({ idProyecto, permite_agregar }) {
  const [users, setUsers] = useState([]);
  const [link, setLink] = useState("");
  const [openD, setOpenD] = useState(false);
  const [openUser, setOpenUsers] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlerOpenUsers = () => setOpenUsers(!openUser);
  const [openAlert, setOpenAlert] = useState(false);
  const hadleAlert = () => setOpenAlert(!openAlert);
  const [openAlerterror, setOpenAlerterror] = useState(false);
  const hadleAlerterror = () => setOpenAlerterror(!openAlert);
  //mensaje de error
  const [error, setError] = useState();
  //abrir el pdf
  const [descripcion, setDescripcion] = useState("");

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
    setLoading(true);

    const result = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK +
        "proyects/DocumentosExtras/" +
        idProyecto,
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

  const HandleSUbumit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const form = new FormData();

      form.set("file", file);
      form.set("id", idProyecto);
      form.set("descripcion", descripcion);
      setFile("");

      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "proyects/subir_pdf_extra",
        form,
        {
          withCredentials: true,
        }
      );

      console.log(result);
      hadleAlert();
      load();
      setLoading(false);
      handlerOpenUsers();
      //console.log(result);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
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
          <DialogHeader className="bg-green-700 text-white">
            Documentos extras
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
          <VerBorradorPDF link={link} />
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
                  {error}
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
                    <label htmlFor="fileInput" className="text-white font-bold">
                      Subir documento:
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
        {permite_agregar ? (
          <Button
            className="ml-auto flex gap-1 md:mr-4 rounded-none md:ml-6 bg-yellow-800 h-11"
            onClick={handlerOpenUsers}
          >
            <ArrowUpCircleIcon className="h-7 w-7" />
            <p className="mt-1"> Subir Documento</p>
          </Button>
        ) : (
          ""
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
          {users.map(
            (
              {
                r_id_documento_extra,
                r_descripcion,
                r_fecha_creacion,
                r_estado,
              },
              index
            ) => {
              return (
                <tr key={r_id_documento_extra}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className=" items-center gap-3 text-center">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {index + 1}
                      </Typography>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Tooltip content="Ver documento">
                      <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={() => (
                          setLink(
                            process.env.NEXT_PUBLIC_ACCESLINK +
                              "proyects/VerpdfUrl/" +
                              r_id_documento_extra
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
                          {r_descripcion}
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
                      {r_fecha_creacion}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Chip
                      color={r_estado ? "blue" : "red"}
                      value={r_estado ? "Habilitado" : "Deshabilitado"}
                      className="w-max"
                    />
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
}
