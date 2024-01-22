import {
  Input,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Card,
  Alert,
} from "@material-tailwind/react";
import { useState } from "react";
import axios from "axios";
import {
  PencilIcon,
  PlusIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";

import { Loader } from "@/components/Widgets";

export default function Crear({ cerrar }) {
  const [openAlerterror, setOpenAlerterror] = useState(false);
  const [error, setError] = useState();
  const [user, setUser] = useState([]);
  const [loading, setLoad] = useState(false);

  const HandleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
    // setUser({ ...user, tipo_identificacion: tipoidentificacion });
  };
  const HandleSUbumit = async (e) => {
    setLoad(true);
    e.preventDefault();
    try {
      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "proyects/crear_sub_categoria",
        user,
        {
          withCredentials: true,
        }
      );
      console.log(result);
      setLoad(false);

      cerrar();
      load();
    } catch (error) {
      setLoad(false);
      setError("Ocurrio un error");
      setOpenAlerterror(true);
      console.log(error);
    }
  };
  return (
    <>
      {loading && <Loader />}

      <Dialog
        open={true}
        //handler={handleOpen}
        className="w-auto  mt-20  overflow-y-scroll rounded-none"
      >
        <DialogHeader className="bg-blue-gray-100">
          Crear Sub-Categoria
          <Button
            color="red"
            variant="text"
            size="md"
            className="!absolute top-3 right-3 "
            onClick={cerrar}
          >
            <Typography variant="h5" color="blue-gray">
              X
            </Typography>
          </Button>
        </DialogHeader>
        <DialogBody>
          <Alert
            color="red"
            onClose={() => setOpenAlerterror(false)}
            open={openAlerterror}
          >
            {error}
          </Alert>
          <div className="flex justify-center mb-5"></div>
          <Card
            color="transparent"
            shadow={false}
            className="w-full items-center"
          >
            <form className=" sm:w-full" onSubmit={HandleSUbumit}>
              <div className="mb-4 flex flex-col gap-6">
                <Input
                  size="lg"
                  name="p_titulo_sub_categoria"
                  variant="standard"
                  color="black"
                  label="Titulo de Sub-Categoria"
                  onChange={HandleChange}
                  required
                />

                <Input
                  size="lg"
                  name="p_descripcion"
                  variant="standard"
                  color="black"
                  label="Descripcion "
                  onChange={HandleChange}
                  required
                  maxLength={200}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  color="green"
                  className="flex gap-1 rounded-none h-11"
                >
                  <ArrowRightOnRectangleIcon className="h-7 w-7 mx-auto" />
                  <p className="mt-1"> Crear</p>
                </Button>
              </div>
            </form>
          </Card>
        </DialogBody>
        <DialogFooter></DialogFooter>
      </Dialog>
    </>
  );
}
