import {
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Chip,
  Drawer,
  DialogFooter,
  Card,
  Input,
  Alert,
} from "@material-tailwind/react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

import axios from "axios";
import { useState, useEffect } from "react";

export default function Crear_Flujo({ handlerFlujo }) {
  const [users, setUsers] = useState([]);
  const [openRight, setOpenRight] = useState(false);
  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);
  const [titulo, setTitulo] = useState("");
  //estado para almacenar en forma de objetos cada vez que se da click en seleccionar
  const [lista_niveles, setLista_niveles] = useState([]);
  const [espacio, setEspacio] = useState(0);
  const [espacioFlecha, setEspacioFlecha] = useState(250);
  const [openAlert, setOpenAlert] = useState(false);
  const [error, setError] = useState([]);
  const [openAlerterror, setOpenAlerterror] = useState(false);
  const hadleAlerterror = () => setOpenAlerterror(!openAlert);
  const hadleAlert = () => setOpenAlert(!openAlert);

  const [styleC, setStyleC] = useState(
    "flex flex-col gap-1 mb-10 bg-lime-400 "
  );
  const [styleN, setStyleN] = useState(
    "flex flex-col gap-1 mb-10 bg-blue-gray-50"
  );
  const [styleF, setStyleF] = useState(
    "flex flex-col gap-1 mb-10 bg-yellow-100"
  );
  const verDatos = () => {
    console.log(lista_niveles[lista_niveles.length - 1]);
    console.log(lista_niveles);
  };
  const verlista = (v_id, v_titulo, v_cardinalidad) => {
    //setLista_niveles(setLista_niveles.push({ num: lista_niveles.length }));
    //const id_padre = lista_niveles[lista_niveles.length - 1].nivel_id;
    const id_padre =
      lista_niveles.length === 0
        ? 0
        : lista_niveles[lista_niveles.length - 1].nivel_id;
        
    const newValor = {
      nivel_id: v_id,
      nivel_titulo: v_titulo,
      nivel_cardinalidad: v_cardinalidad,
      esp_x: espacio,
      num: lista_niveles.length,
      espacioFlecha: espacioFlecha,
      id_p: id_padre,
    };
    setEspacio(espacio + 300);
    setEspacioFlecha(espacioFlecha + 3);
    setLista_niveles([...lista_niveles, newValor]);
  };
  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    //ojito aqui hay que realizar un cambio  ya que solo deben mostrarle los niveles que tienen estado true
    const result = await fetch(
      "http://localhost:4000/api/flujo/Ver_niveles_activos",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    const data = await result.json();
    setUsers(data);
  };
  //Enviar los datos
  const HandleSUbumit = async () => {
    try {
      console.log("aqui van los archivos");
      const result = await axios.post(
        "http://localhost:4000/api/flujo/Crear_Jerarquias_Niveles/" + titulo,
        { list_niveles: lista_niveles },
        {
          withCredentials: true,
        }
      );
      //hadleAlert();
      //setError(result.data);
      hadleAlert();
      setError(result.data);
      console.log(result.data);
    } catch (error) {
      //setError(error.response.data);
      //hadleAlerterror();
      console.log(error);
      setError(error.response.data);
      hadleAlerterror();
    }
  };
  return (
    <div>
      <Dialog size="xl" open={true} className="rounded-none">
        <DialogHeader className="bg-gray-200">
          Crear Flujo de trabajo
          <Button
            color="red"
            variant="text"
            size="sm"
            className="!absolute top-3 right-3"
            onClick={() => handlerFlujo(false)}
          >
            <Typography variant="h5" color="blue-gray">
              X
            </Typography>
          </Button>
        </DialogHeader>
        <DialogBody className=" w-auto">
          <Alert
            color="green"
            onClose={() => setOpenAlert(false)}
            open={openAlert}
          >
            {error.message}
          </Alert>
          <Alert
            color="red"
            onClose={() => setOpenAlerterror(false)}
            open={openAlerterror}
          >
            {error.message}
          </Alert>
          <div className="mx-auto items-center justify-center text-center">
            <Input
              className=" w-96 "
              label="Titulo"
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <div className="relative overflow-scroll">
            <div className="relative  w-auto h-16 mb-16 ">
              {lista_niveles.map((task) => (
                <div
                  className="absolute mb-20"
                  style={{ left: task.esp_x, top: "20px" }}
                >
                  <div
                    className={
                      task.num === 0
                        ? styleC
                        : task.num === lista_niveles.length - 1
                        ? styleF
                        : styleN
                    }
                  >
                    <input
                      className="w-60 text-center text-lg  font-semibold	text-black"
                      disabled
                      value={task.nivel_titulo}
                    />
                    <input
                      className="w-60 text-center text-lg 	text-black"
                      disabled
                      value={task.nivel_cardinalidad}
                    />
                    <input
                      className="w-60 text-center text-lg  font-semibold	text-black"
                      disabled
                      value={
                        task.num === 0
                          ? "Inicio"
                          : task.num === lista_niveles.length - 1
                          ? "Final"
                          : ""
                      }
                    />
                  </div>
                  {task.num === lista_niveles.length - 1 ? (
                    ""
                  ) : (
                    <ArrowRightIcon
                      className="h-10 w-10 absolute"
                      style={{ left: task.espacioFlecha, top: "10px" }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <div className=" text-end items-end justify-items-end ">
            <Button
              color="yellow"
              className="rounded-none mt-2 "
              onClick={openDrawerRight}
            >
              Ver Niveles
            </Button>

            {lista_niveles.length === 0 ? (
              ""
            ) : (
              <Button
                color="green"
                className="ml-4 rounded-none mt-2 "
                onClick={HandleSUbumit}
              >
                Guardar
              </Button>
            )}
          </div>
          <Drawer
            placement="right"
            open={openRight}
            onClose={closeDrawerRight}
            className="p-4 overflow-x-scroll"
          >
            <div className="mb-6 flex items-center justify-between">
              <Typography variant="h5" color="blue-gray">
                Seleccionar Nivel
              </Typography>
              <IconButton
                variant="text"
                color="blue-gray"
                onClick={closeDrawerRight}
              >
                X
              </IconButton>
            </div>
            {users.map((user) => (
              <Card className="mt-2 h-auto bg-blue-gray-50 rounded-none ">
                <input
                  type="text"
                  value={user.r_titulo}
                  className="px-2 mt-2 bg-blue-gray-50 text-black font-semibold w-full"
                  disabled
                />
                <input
                  type="text"
                  value={user.r_descripcion}
                  className=" px-2 mt-1 bg-blue-gray-50 text-black  w-full"
                  disabled
                />
                <div className="w-max">
                  <Chip
                    variant="ghost"
                    size="sm"
                    value={
                      user.r_cardiniladad ? "Acepta varias area" : "Solo una"
                    }
                    color={user.r_cardiniladad ? "green" : "blue-gray"}
                    className=" mt-1 ml-2"
                  />
                </div>
                <Button
                  className="bg-yellow-900  p-2 mx-7 mb-2 mt-2"
                  onClick={() =>
                    verlista(
                      user.r_id_nivel,
                      user.r_titulo,
                      user.r_cardiniladad ? "Acepta varias area" : "Solo una"
                    )
                  }
                >
                  Seleccionar
                </Button>
              </Card>
            ))}
          </Drawer>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
