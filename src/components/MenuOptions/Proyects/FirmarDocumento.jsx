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
    //setUsers(data);
    //console.log(data);
    setID(data.r_id);

    //guardar el pdf en una variable de tipo file xd
    const resultpdf = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK + "proyects/pdf2/" + data.r_id,
      {
        method: "GET",
        headers: { "Content-Type": "application/pdf" },
        credentials: "include",
      }
    );
    console.log("Datos del pdf revisido");
    console.log(resultpdf);

    setLoading(false);
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
                  <Typography variant="h6" color="white">
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
