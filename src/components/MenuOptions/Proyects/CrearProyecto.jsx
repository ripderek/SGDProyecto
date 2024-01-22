import {
  DialogHeader,
  DialogBody,
  Typography,
  Alert,
  Button,
  Input,
  Drawer,
  Checkbox,
  Dialog,
} from "@material-tailwind/react";
import { useState, React } from "react";
import ListaCategorias from "../Categorias/ListaCategorias";
import { ListaSeleccionSubCategorias } from "@/components/MenuOptions/SubCategorias";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Loading from "@/components/loading";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

export default function CrearProyecto({ id, openDiv }) {
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlerterror, setOpenAlerterror] = useState(false);
  const hadleAlerterror = () => setOpenAlerterror(!openAlert);
  const [error, setError] = useState([]);

  const [user, setUser] = useState({
    p_titulo: "",
    p_id_area: id,
    p_id_categoria: "",
    p_prefijo_proyecto: "",
    p_id_sub_categoria: "",
    p_Portada: false,
    p_requiere_firmas: false,
    p_encabezado: false,
  });
  const HandleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  };
  const [openCat, setOpenCat] = useState(false);
  const [idCat, setidCat] = useState("");
  const [nombreCat, setnombreCat] = useState("");
  const [nombreSubCat, setnombreSubCat] = useState("");

  const id_categoria = (idc) => {
    setUser({
      ...user,
      p_id_categoria: idc,
    });
    setidCat(idc);
  };
  const id_categoria_sub = (idc) => {
    setUser({
      ...user,
      p_id_sub_categoria: idc,
    });
    setidCat(idc);
  };
  const nombre_categoria = (name) => {
    setnombreCat(name);
  };
  const nombre_sub_categoria = (name) => {
    setnombreSubCat(name);
  };
  const cerrar = (value) => {
    setOpenCat(false);
  };
  const cerrar2 = (value) => {
    SetOpenSubCat(false);
  };
  const HandleSUbumit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "proyects/crear_proyecto",
        user,
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      console.log(result);
      console.log(user);
      openDiv(false);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      hadleAlerterror();
      setLoading(false);
    }
  };
  //estados para controlar los checks para enviarlos
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (event) => {
    setUser({
      ...user,
      p_requiere_firmas: event.target.checked,
    });
    setIsChecked(event.target.checked);
  };
  //encabezado
  const [isCheckedEncabezado, setIsCheckedEncabezado] = useState(false);
  const handleChangeEncabezado = (event) => {
    setUser({
      ...user,
      p_encabezado: event.target.checked,
    });
    setIsCheckedEncabezado(event.target.checked);
  };
  //portada
  const [isCheckedPortada, setIsCheckedPortada] = useState(false);
  const handleChangePortada = (event) => {
    setUser({
      ...user,
      p_Portada: event.target.checked,
    });
    setIsCheckedPortada(event.target.checked);
  };
  const [openSubCat, SetOpenSubCat] = useState(false);
  return (
    <div className="h-auto mb-5 ">
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        ""
      )}
      <Drawer
        open={openCat}
        onClose={() => setOpenCat(false)}
        className="p-4 overflow-y-scroll"
        placement="right"
      >
        <div className="mb-6  items-center justify-between mt-6">
          <Typography variant="h3" color="blue-gray">
            Seleccionar Categoria
          </Typography>
          <Button
            color="red"
            variant="text"
            size="md"
            className="!absolute top-3 right-3"
            onClick={() => setOpenCat(false)}
          >
            <Typography variant="h5" color="blue-gray">
              X
            </Typography>
          </Button>
        </div>
        <div>
          <ListaCategorias
            id_categoria={id_categoria}
            nombre_categoria={nombre_categoria}
            cerrar={cerrar}
          />
        </div>
      </Drawer>
      <Drawer
        open={openSubCat}
        onClose={() => SetOpenSubCat(false)}
        className="p-4 overflow-y-scroll"
        placement="right"
      >
        <div className="mb-6  items-center justify-between mt-6">
          <Typography variant="h3" color="blue-gray">
            Seleccionar Sub-Categoria
          </Typography>
          <Button
            color="red"
            variant="text"
            size="md"
            className="!absolute top-3 right-3"
            onClick={() => SetOpenSubCat(false)}
          >
            <Typography variant="h5" color="blue-gray">
              X
            </Typography>
          </Button>
        </div>
        <div>
          <ListaSeleccionSubCategorias
            id_categoria={id_categoria_sub}
            nombre_categoria={nombre_sub_categoria}
            cerrar={cerrar2}
          />
        </div>
      </Drawer>
      <DialogHeader className="justify-between bg-blue-gray-100">
        <Typography variant="h5" color="blue-gray" className="ml-4 mt-3 ">
          Crear Proyecto
        </Typography>
        <Button
          color="red"
          variant="text"
          size="md"
          className="!absolute top-3 right-3"
          onClick={() => openDiv(false)}
        >
          <Typography variant="h5" color="blue-gray">
            X
          </Typography>
        </Button>
      </DialogHeader>
      <Alert
        color="yellow"
        onClose={() => setOpenAlert(false)}
        open={openAlert}
      >
        Se creo el proyecto
      </Alert>
      <Alert
        color="red"
        onClose={() => setOpenAlerterror(false)}
        open={openAlerterror}
      >
        {error}
      </Alert>
      <DialogBody divider={false}>
        <form className=" overflow-y-scroll h-96 " onSubmit={HandleSUbumit}>
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              name="p_titulo"
              variant="standard"
              color="black"
              placeholder="Titulo"
              onChange={HandleChange}
              required
            />
            <Input
              size="lg"
              name="p_prefijo_proyecto"
              variant="standard"
              color="black"
              placeholder="Prefijo para el proyecto"
              onChange={HandleChange}
              required
              maxLength={5}
            />
            <div className="flex items-center">
              <Input
                size="lg"
                name="p_id_categoria"
                variant="standard"
                color="black"
                placeholder="Categoria"
                value={nombreCat}
                required
                disabled
              />
              <Button
                className=" rounded-none ml-2 p-3 bg-yellow-800 w-36"
                onClick={() => setOpenCat(true)}
              >
                Categoria
              </Button>
            </div>
            {/* INPUT PARA SELECCIONAR LA SUBCATEGORIA*/}
            <div className="flex items-center">
              <Input
                size="lg"
                name="p_id_sub_categoria"
                variant="standard"
                color="black"
                placeholder="Sub-Categoria"
                value={nombreSubCat}
                required
                disabled
              />
              <Button
                className=" rounded-none ml-2 p-3 w-36 bg-yellow-800"
                onClick={() => SetOpenSubCat(true)}
              >
                Sub-Categoria
              </Button>
            </div>
            {/*AGREGAR LOS CHECKBOX PARA LOS PARAMETROS PERSONALIZABLES DEL PROYECTO */}
            <div className="flex items-center">
              <Typography className="text-lg font-bold" color="gray">
                ¿Requiere firmas?
              </Typography>
              <Checkbox
                color="green"
                checked={isChecked}
                onChange={handleChange}
                id="chk1"
              />
            </div>
            <div className="flex items-center">
              <Typography className="text-lg font-bold" color="gray">
                ¿Aplica encabezado de paguina automatizado?
              </Typography>
              <Checkbox
                id="chk2"
                color="green"
                checked={isCheckedEncabezado}
                onChange={handleChangeEncabezado}
              />
            </div>
            <div className="flex items-center">
              <Typography className="text-lg font-bold" color="gray">
                ¿Aplica portada automatizada?
              </Typography>
              <Checkbox
                id="chk3"
                color="green"
                checked={isCheckedPortada}
                onChange={handleChangePortada}
              />
            </div>
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
      </DialogBody>
    </div>
  );
}
