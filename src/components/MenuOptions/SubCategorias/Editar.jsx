import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  PencilIcon,
  PlusIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
//importar los compoonentes desdel index y ya no por separador
import { Crear } from "@/components/MenuOptions/Categorias";
import {
  CardHeader,
  Input,
  Button,
  CardBody,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Card,
  Alert,
} from "@material-tailwind/react";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Loader } from "@/components/Widgets";

export default function Editar({ cerrar, categoriaEdit }) {
  const [openAlerterror, setOpenAlerterror] = useState(false);
  const [error, setError] = useState();

  const HandleSUbumitEDIT = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      //setUser({ tipo_identificacion: tipoidentificacion });
      //setUser({ ...user, tipo_identificacion: tipoidentificacion });
      //console.log(editCat);
      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "proyects/editar_categoria",
        {
          p_nombres: user.p_nombres,
          p_prefijo: user.p_prefijo,
          p_descripcion: user.p_descripcion,
          p_id_categoria: categoriaEdit.cat_id,
        },
        {
          withCredentials: true,
        }
      );
      //console.log(result);
      // setMensajeAlert("Se edito la categoria");

      //hadleAlert();
      setLoader(false);
      cerrar();
    } catch (error) {
      //setError(error.response.data.message);
      setError("Error ");
      setOpenAlerterror(true);
      console.log(error);
      setLoader(false);
    }
  };
  const [user, setUser] = useState({
    p_nombres: categoriaEdit.cat_nombre,
    p_prefijo: categoriaEdit.catPrefijo,
    p_descripcion: categoriaEdit.catDescripcion,
  });

  const HandleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
    //
  };
  const [loading, setLoader] = useState(false);
  return (
    <>
      {loading && <Loader />}
      <Dialog
        open={true}
        //handler={handleOpenArea}
        className="w-auto  mt-20  overflow-y-scroll rounded-none"
      >
        <DialogHeader className="bg-blue-gray-100">
          Editar Sub-Categoria
          <Button
            color="red"
            variant="text"
            size="md"
            className="!absolute top-3 right-3"
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
            <form className=" sm:w-full" onSubmit={HandleSUbumitEDIT}>
              <div className="mb-4 flex flex-col gap-6">
                <Input
                  size="lg"
                  name="p_nombres"
                  variant="standard"
                  color="black"
                  label="Nombre categoria"
                  //placeholder="Nombre categoria"
                  onChange={HandleChange}
                  value={user.p_nombres}
                  required
                />

                <Input
                  size="lg"
                  name="p_descripcion"
                  variant="standard"
                  color="black"
                  label="Descripcion"
                  //placeholder="Descripcion"
                  onChange={HandleChange}
                  value={user.p_descripcion}
                  required
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  color="green"
                  className="flex gap-1 rounded-none h-11"
                >
                  <ArrowRightOnRectangleIcon className="h-7 w-7 mx-auto" />
                  <p className="mt-1"> Guardar Cambios</p>
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
