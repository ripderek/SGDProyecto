import { React, useState, useEffect, useRef } from "react";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { ArrowDownIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Dialog,
  DialogHeader,
  Typography,
  IconButton,
  Alert,
  Card,
  CardHeader,
  CardBody,
  Input,
} from "@material-tailwind/react";
import axios from "axios";
import fileDownload from "js-file-download";
import Loading from "@/components/loading";
import { AiOutlineUpload } from "react-icons/ai";

const TABLE_HEAD = ["", "Archivo", "Fecha", "Tipo", "Descargar"];

export default function GuiasProyecto({ id, rol, editproyecto, permitesubir }) {
  const [loading, setLoading] = useState(false);

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
    //Cargar la lista de guias
    setLoading(true);

    const result = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK + "proyects/guias/" + id,
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
  const [error, setError] = useState();
  //abrir el pdf

  //connstante para almacenar la descripcion
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
        process.env.NEXT_PUBLIC_ACCESLINK + "proyects/upload_guia",
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
      setError(error.response.data.message);
      hadleAlerterror();
      setLoading(false);
    }
  };
  const [link1, setLink1] = useState("");
  const [guiaDown, setGuiaDown] = useState({
    link: "",
  });
  //funcion para descargar la guia
  const DescargarGuia = async (archvi, guia) => {
    console.log(guiaDown);
    setLoading(true);

    axios({
      method: "post",
      url: process.env.NEXT_PUBLIC_ACCESLINK + "proyects/ver_guia/",
      data: { link: guia },
      responseType: "blob",
      withCredentials: true,
    }).then((res) => {
      fileDownload(res.data, archvi);
      setLoading(false);
    });
    //setLoading(false);
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
        {openUser ? (
          <Dialog
            size="sm"
            open={openUser}
            handler={handlerOpenUsers}
            className=" rounded-none"
          >
            <DialogHeader>
              Subir Guia
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
                    <label htmlFor="fileInput" className="text-black ">
                      Subir documento:
                    </label>
                    <input
                      type="file"
                      id="fileInput"
                      onChange={ImagePreview}
                      accept=".pdf , .docx"
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
        {editproyecto && permitesubir ? (
          <Button
            className="ml-auto flex gap-1 md:mr-4 rounded-none md:ml-6 bg-yellow-800 h-11"
            onClick={handlerOpenUsers}
          >
            <ArrowUpCircleIcon className="h-7 w-7" />
            <p className="mt-1"> Subir Guia</p>
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
              No hay Guias
            </div>
          ) : (
            ""
          )}
          {users.map(
            (
              { r_descripcion, r_fecha, r_tipo, r_url_guia, u_id_user },
              index
            ) => {
              return (
                <tr key={u_id_user} className="cursor-pointer">
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {index + 1}
                        </Typography>
                      </div>
                    </div>
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
                      {r_fecha}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <img
                      className=" h-7 w-7 rounded-full "
                      src={
                        r_tipo === ".pdf"
                          ? "/img/Home/pdf_icon.png"
                          : "/img/Home/doc_icon.png"
                      }
                      alt="User image"
                    />
                  </td>
                  <td
                    className="p-4 border-b border-blue-gray-50"
                    onClick={() => (
                      setGuiaDown({ link: r_url_guia }),
                      DescargarGuia(r_descripcion + r_tipo, r_url_guia)
                    )}
                  >
                    <IconButton variant="text" color="blue-gray">
                      <ArrowDownIcon className="h-4 w-4" />
                    </IconButton>
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
