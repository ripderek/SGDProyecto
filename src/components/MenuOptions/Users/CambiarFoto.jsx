import { useState, useRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import axios from "axios";
import { AiOutlineUpload } from "react-icons/ai";
import Loading from "@/components/loading";

export default function CambiarFoto({ id_user }) {
  const [openAlert, setOpenAlert] = useState(false);
  const hadleAlert = () => setOpenAlert(!openAlert);
  const [openAlerterror, setOpenAlerterror] = useState(false);
  const hadleAlerterror = () => setOpenAlerterror(!openAlert);
  const [error, setError] = useState();
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Activa el input de tipo "file"
    }
  };
  const [file, setFile] = useState(null);
  //img preview
  const [fileP, setFileP] = useState();
  const ImagePreview = (e) => {
    try {
      setFile(e.target.files[0]);
      setFileP(URL.createObjectURL(e.target.files[0]));
    } catch (error) {
      console.log(error);
    }
  };
  const [loading, setLoading] = useState(false);
  //enviar la peticion para guardar la nueva foto
  const HandleSUbumit = async () => {
    setLoading(true);
    try {
      const form = new FormData();
      form.set("file", file);
      form.set("id_user", id_user);

      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "user/Cambiar_foto",
        form,
        {
          withCredentials: true,
        }
      );
      hadleAlert();
      setLoading(false);
      //console.log(result);
    } catch (error) {
      console.log(error);
      setError("El formato de la imgen no es correcto");
      hadleAlerterror();
      setLoading(false);
    }
  };

  return (
    <div className="mb-9">
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        ""
      )}
      <Alert color="green" onClose={() => setOpenAlert(false)} open={openAlert}>
        Foto actualizada
      </Alert>
      <Alert
        color="red"
        onClose={() => setOpenAlerterror(false)}
        open={openAlerterror}
      >
        {error}
      </Alert>
      <Card className="w-full max-w-[24rem] mx-auto bg-blue-gray-100 rounded-none shadow-2xl">
        <CardHeader
          color="white"
          floated={false}
          shadow={false}
          className="m-0 grid place-items-center rounded-none py-8 px-4 text-center"
        >
          <div className="mb-4 rounded-full border  p-6">
            <img
              className=" h-40 w-40 rounded-full mx-auto "
              src={
                !fileP
                  ? process.env.NEXT_PUBLIC_ACCESLINK + "user/foto/" + id_user
                  : fileP
              }
              alt="User image"
            />
          </div>
          <div className="mx-auto bg-yellow-800 p-2 rounded-xl">
            <label htmlFor="fileInput" className="text-black ">
              Subir Foto:
            </label>
            <input
              type="file"
              id="fileInput"
              onChange={ImagePreview}
              accept="image/png, .jpeg"
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
        <CardBody className="justify-items-end">
          <div className="justify-end justify-items-end">
            <Button
              className="bg-green-700 p-3 justify-items-end rounded-none"
              onClick={HandleSUbumit}
            >
              <Typography variant="h6" color="white">
                Guardar Cambios
              </Typography>
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
