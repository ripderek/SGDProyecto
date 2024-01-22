import { useState, useEffect, Fragment, useRef } from "react";
import {
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
  Button,
  Dialog,
  Typography,
  Chip,
  Input,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import Loading from "@/components/loading";
import fileDownload from "js-file-download";
import Cookies from "universal-cookie";

import { AiOutlineUpload } from "react-icons/ai";

import axios from "axios";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
export default function FirmarDocumento({
  id_proyecto,
  id_area,
  id_firma_participantes,
  id_firma,
  titulo_proyecto,
  codigo_proyecto,
  salir_firmador,
}) {
  //hacer una funcion que cargue informacion sobre el proyecto como el titulo, codigo, etc
  const [loading, setLoading] = useState(false);
  const [id, setID] = useState(0);
  const [openFirmar, setOpenFirmar] = useState(false);
  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Activa el input de tipo "file"
    }
  };
  const [descripcion, setDescripcion] = useState("");

  const [file, setFile] = useState(null);
  const [filePDF, setFilePDF] = useState(null);
  const [coordernadas, setCoordenadas] = useState([]);
  const ImagePreview = (e) => {
    try {
      setFile(e.target.files[0]);
      console.log(e.target.files[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    setLoading(true);
    const result2 = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK + "proyects/UltimoPDF/" + id_proyecto,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    const data = await result2.json();
    setID(data.r_id);
    console.log("Enviar los datos");
    //coordenadas para firmar el documento
    const result_coordenas = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK +
        "proyects/Calcularcoordenadas/" +
        id_proyecto +
        "/" +
        cookies.get("id_user"),
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    const data2 = await result_coordenas.json();
    setCoordenadas(data2);
    setLoading(false);
  };
  //fucnion para calcular las coordenas esto debe de cargarse en el load
  const cookies = new Cookies();

  const calcular = async () => {
    //obtener las coordenadas de donde va firmar el usuario para enviarlo al firmador
    const result_coordenas = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK +
        "proyects/Calcularcoordenadas/" +
        id_proyecto +
        "/" +
        cookies.get("id_user"),
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    const data = await result_coordenas.json();
    setCoordenadas(data);
    alert("Calculad");
  };
  //funcion para enviar a firmar el pdf
  const HandleSUbumit = async (e) => {
    setLoading(true);

    await axios({
      method: "post",
      url: process.env.NEXT_PUBLIC_ACCESLINK + "proyects/PDF_para_firmar/" + id,
      responseType: "blob",
      withCredentials: true,
    })
      .then(async (res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        // Crear un archivo File a partir del Blob
        const pdfFile = new File([pdfBlob], "archivo.pdf", {
          type: "application/pdf",
        });
        console.log(pdfFile);

        const form = new FormData();
        form.append("pdf", pdfFile);
        form.append("firma", file);
        form.append("palabra_secreta", descripcion);
        form.append("posicion_x", coordernadas.coordenadaX);
        form.append("posicion_y", coordernadas.coordenadaY);
        form.append("numero_paguina", coordernadas.numPag);

        //enviar a firmar
        try {
          await axios({
            method: "post",
            url: "http://192.168.1.22:81/procesar",
            data: form,
            responseType: "blob",
            withCredentials: false,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
            .then(async (res) => {
              console.log("descargando el archivo");
              //este es el que descarga
              //si se necesitan hacer pruebas descomentar fileDownload(res.data, "archiv.pdf");
              //fileDownload(res.data, "archiv.pdf");
              ///
              ///
              ///
              ///
              //
              //aqui invocar la otra parte de la funcion para enviar el pdf a la API en lugar de descargarlo
              //si se necesitan hacer pruebas sin enviar a la api o registrar la firma (osea para ver el documento pdf firmado)
              //comentar todo lo siguiente hasta .catch((err)=>{})

              // Convertir el Blob del PDF en un archivo File
              console.log(res.data);
              const pdfBlob2 = new Blob([res.data], {
                type: "application/pdf",
              });
              console.log(pdfBlob2);
              var nombre_documento = "DocumentoFirmado-" + Date.now() + ".pdf";
              //const pdfFile = new File([pdfBlob], 'archivo.pdf');
              // Crear un archivo File a partir del Blob
              const pdfFile2 = new File([pdfBlob2], nombre_documento, {
                type: "application/pdf",
              });

              // Crear un objeto FormData para adjuntar el archivo PDF
              const formData = new FormData();
              formData.append("file", pdfFile2);
              formData.append("id_user", cookies.get("id_user"));
              formData.append("id", id_proyecto);

              // Realizar la solicitud POST al servidor
              await axios({
                method: "post",
                url:
                  process.env.NEXT_PUBLIC_ACCESLINK +
                  "proyects/DocumentoFirmado",
                data: formData,
                headers: {
                  "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
              })
                .then(async (response) => {
                  console.log(response);
                  salir_firmador(true);
                  setLoading(false);
                })
                .catch((error) => {
                  // Maneja los errores de la solicitud aquí
                  setLoading(false);
                  alert("Error");
                  console.error("Error en la solicitud:", error);
                });
              ///

              ////

              ///
              ///

              ///

              ///
              //regresar a la pantalla principal de documentos por firmar
              //salir_firmador(true);
              //setLoading(false);
            })
            .catch((err) => {
              // Manejar el error aquí
              console.log(err.message);
              alert(err.message);
              setLoading(false);
            });
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      })
      .catch((err) => {
        // Manejar el error aquí
        console.log(err.message);
        alert(err.message);
        setLoading(false);
      });
  };
  return (
    <div className="bg-white h-full mb-10">
      <Dialog
        size="sm"
        open={openFirmar}
        handler={() => setOpenFirmar(false)}
        className="overflow-y-scroll"
      >
        <DialogHeader className="bg-blue-gray-50 text-black">
          Firmar documento
          <Button
            color="red"
            variant="text"
            size="md"
            className="!absolute top-3 right-3"
            onClick={() => setOpenFirmar(false)}
          >
            <Typography variant="h5" color="blue-gray">
              X
            </Typography>
          </Button>
        </DialogHeader>

        <form className=" sm:w-full">
          <Card className="w-full  mx-auto bg-blue-gray-100 rounded-none shadow-2xl">
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
                  label="Contraseña del .p12"
                  name="contra_nueva"
                  onChange={(e) => setDescripcion(e.target.value)}
                  type="password"
                />
              </div>
              <div className="mx-auto bg-yellow-800 p-2 rounded-xl">
                <label htmlFor="fileInput" className="text-white font-bold">
                  Subir archivo:
                </label>
                <input
                  type="file"
                  id="fileInput"
                  onChange={ImagePreview}
                  accept=".p12"
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
                <Button className="bg-green-700 p-3 justify-items-end rounded-none">
                  <Typography
                    variant="h6"
                    color="white"
                    onClick={HandleSUbumit}
                  >
                    Aceptar
                  </Typography>
                </Button>
              </div>
            </CardBody>
          </Card>
        </form>
      </Dialog>
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        ""
      )}
      <DialogHeader className="justify-between">
        <div className="w-full text-2xl text-black font-bold overflow-hidden">
          {titulo_proyecto}
        </div>
      </DialogHeader>
      <div className="ml-6">
        <div className="flex gap-3 w-max">
          <div className="-mt-px flex flex-col">
            <Chip color="yellow" value={codigo_proyecto} />
          </div>
        </div>
      </div>
      <DialogBody className="shadow-none">
        <Fragment>
          <div className="bg-white">
            <Button
              className="mb-8 rounded-none p-4"
              color="green"
              onClick={() => setOpenFirmar(true)}
            >
              <PencilSquareIcon size="20px" />
              <p className="mt-1">Firmar</p>
            </Button>
          </div>

          <iframe
            src={process.env.NEXT_PUBLIC_ACCESLINK + "proyects/pdf2/" + id}
            height="100%"
            width="100%"
            className="h-screen"
          />
        </Fragment>
      </DialogBody>
    </div>
  );
}
