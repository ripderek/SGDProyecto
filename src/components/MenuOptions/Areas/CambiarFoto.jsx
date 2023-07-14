import { useState, useEffect, Fragment } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import axios from "axios";

export default function CambiarFoto({ id_user }) {
  const [openAlert, setOpenAlert] = useState(false);
  const hadleAlert = () => setOpenAlert(!openAlert);
  const [openAlerterror, setOpenAlerterror] = useState(false);
  const hadleAlerterror = () => setOpenAlerterror(!openAlert);
  const [error, setError] = useState([]);

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
  const HandleSUbumit = async () => {
    try {
      const form = new FormData();
      form.set("file", file);
      form.set("id", id_user);

      const result = await axios.post(
        "http://localhost:4000/api/area/Cambiar_foto_area",
        form,
        {
          withCredentials: true,
        }
      );
      hadleAlert();
      //console.log(result);
    } catch (error) {
      console.log(error);
      setError(error);
      hadleAlerterror();
    }
  };

  return (
    <div className="mb-9">
      <Alert color="green" onClose={() => setOpenAlert(false)} open={openAlert}>
        Foto actualizada
      </Alert>
      <Alert
        color="red"
        onClose={() => setOpenAlerterror(false)}
        open={openAlerterror}
      >
        {error.message}
      </Alert>
      <Card className="w-full max-w-[24rem] mx-auto bg-blue-gray-50 rounded-none">
        <CardHeader
          color="green"
          floated={false}
          shadow={false}
          className="m-0 grid place-items-center rounded-none py-8 px-4 text-center"
        >
          <div className="mb-4 rounded-full border  p-6">
            <img
              className=" h-40 w-40 rounded-full mx-auto "
              src={
                !fileP
                  ? "http://localhost:4000/api/area/Areaimagen/" + id_user
                  : fileP
              }
              alt="User image"
            />
          </div>
          <input
            type="file"
            accept="image/png, .jpeg"
            onChange={ImagePreview}
          />
        </CardHeader>
        <CardBody className="justify-items-end">
          <div className="justify-end justify-items-end">
            <Button
              className="bg-yellow-900 p-3 justify-items-end rounded-none"
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
