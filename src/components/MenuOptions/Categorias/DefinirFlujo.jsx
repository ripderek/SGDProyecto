import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  CardHeader,
  CardBody,
  CardFooter,
  Card,
} from "@material-tailwind/react";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/solid";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import Flujos_Etapas from "../Proyects/Flujos_Etapas";
import AreasFlujo from "../Proyects/AreasFlujo";
import axios from "axios";
import Loading from "@/components/loading";

export default function DefinirFlujo({
  cerrar,
  idproyecto,
  idarea,
  Recargar,
  idcategoria,
}) {
  const [contador, setcontador] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadw();
  }, []);
  const [users2, setUsers2] = useState([]);

  const loadw = async () => {
    setLoading(true);

    //ojito aqui hay que realizar un cambio  ya que solo deben mostrarle los niveles que tienen estado true
    const result = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK + "area/Data/" + idarea,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    const data = await result.json();
    setUsers2(data);
    console.log(data);
    setLoading(false);
  };
  const [openVerNiveles, setVerNiveles] = useState(false);

  const handlerNiveles = (estado) => {
    setLoading(true);
    setVerNiveles(estado);
    setLoading(false);
  };
  //constante simplemente para la estectic xd
  const [titulonivel, setTitulNivel] = useState("");
  //para ver si abre la ventana para seleecionar las areas
  const [openVerAreaFlujo, setOpenVerAreaFlujo] = useState(false);
  const handlerArea = (estado) => {
    setOpenVerAreaFlujo(estado);
    //aqui se debe retornar un objeto para adjuntarlo al json de las areas
  };
  //estado para los niveles que permiten mas de un 1 area
  const [masAreas, setMasAreas] = useState(false);
  //estado para retornar el objeto que me devuelve areasFlujo
  const [areaD, setAreaD] = useState([]);
  const [cabezera, setCabezera] = useState(false);
  const datos = (data) => {
    setLoading(true);

    console.log("datos retornados");
    console.log(data);
    console.log(users);
    //aqui tengo que obtener el dato retornardo para saber si se escojio un area padre para que no empate con un area hija
    //y si es el ultimo area entonces solo puede ser area padre
    setCabezera(data.cabezera);

    //primero hay que preguntar si el id area que se esta ingresando no esta ya en el flujo
    //si ya esta en el flujo enviar una alerta
    var verifciar = true;
    for (let i = 0; i < lista_niveles.length; i++) {
      if (lista_niveles[i].id_area_f === data.id_area) {
        alert("Esta area ya se encuentra en el flujo");
        verifciar = false;
        setLoading(false);
      }
    }
    if (!final) {
      const newUsers = users.filter((user) => user.r_num !== 1);
      //setUsers(newUsers);
      if (verifciar && users.length !== 0) {
        console.log("NIVELES");
        console.log(newUsers);
        console.log(users);
        //validar si el nivel actualidad permite cardinalidad y el dato que se recibe sobre el pase de nivel es true entonces eliminar el nivel actual
        // si es un nivel con cardinalidad no hay que eliminar
        if (newUsers[0].r_cardinalidad_nivel) {
          setTitulNivel(newUsers[0].r_titulo_nivel);
          //si el nivel permite varias areas y ya se ingreso una se debe permitir ver el checbox para poder ir a otro nivel;
          if (!masAreas && newUsers[0].r_cardinalidad_nivel) {
            setMasAreas(true);
          }
          if (newUsers[0].r_cardinalidad_nivel && data.pase_nivel) {
            setMasAreas(false);
            setTitulNivel(
              newUsers.length > 1 ? newUsers[1].r_titulo_nivel : ""
            );
            const newUsers2 = newUsers.filter(
              (user) => user.r_num !== newUsers[0].r_num
            );
            setUsers(newUsers2);
            setfinal(newUsers2.length === 0 ? true : false);

            console.log("Con cardinalidad");
            console.log(newUsers);
            console.log(users);
          }
        }
        //es un nivel sin cardinalidad por lo tanto solo es un area que se registra
        else {
          setMasAreas(false);
          setTitulNivel(newUsers.length > 1 ? newUsers[1].r_titulo_nivel : "");
          //handleRemoveItem(newUsers[0].r_num);

          const newUsers2 = newUsers.filter(
            (user) => user.r_num !== newUsers[0].r_num
          );
          setUsers(newUsers2);

          console.log("Sin cardinialidad");
          console.log(newUsers);
          console.log(users);
          setfinal(newUsers2.length === 0 ? true : false);
        }
        //else es xq el nivel solo permite un area y tambien hay que eliminar el nivel actual para poder pasar al siguiente
        const newValor = {
          id_area: data.id_area,
          nombre: data.nombre,
        };
        setAreaD([...areaD, newValor]);
        var i = contador + 1;

        //aqui mapear los demas cuadros
        MapearCuadros(
          newValor.id_area,
          newUsers[0].id_nivel,
          newValor.nombre,
          newUsers[0].r_titulo_nivel,
          i
        );
        setcontador(i);
        setLoading(false);
      }
    }
  };
  //estado para habilitar el boton de anadir areas
  const [verBotonAnadir, setVerbotonAnadir] = useState(false);
  //estado para retornar el id del flujo seleccionado y cargarlo aqui en una constante
  const [id_tipo, setIdTipo] = useState("");
  //estado para ocultar el boton de seleecionar un flujo
  const [espacio, setEspacio] = useState(0);
  const [espacioFlecha, setEspacioFlecha] = useState(250);
  const [verbotonSeleccionar, setVerbotonSeleccionar] = useState(true);
  const handlerID = (valor) => {
    setLoading(true);
    setIdTipo(valor);
    setVerbotonAnadir(true);
    setVerbotonSeleccionar(false);
    //aqui enviar a cargar en un json el flujo de ese tipo de jerarquia
    load(valor);
    setLoading(false);
  };
  //Funcion para mapear donde van a ir los cuadritos
  const [lista_niveles, setLista_niveles] = useState([]);
  const MapearCuadros = (id, ni, nombre, tipoNIv, num) => {
    setLoading(true);

    const newValor = {
      id_area_f: id,
      id_nivel_f: ni,
      nombre_area: nombre,
      tipo_nivel: tipoNIv,
      nivel: num,
      esp_x: espacio,
      espacioFlecha: espacioFlecha,
    };
    setEspacio(espacio + 300);
    setEspacioFlecha(espacioFlecha + 3);
    setLista_niveles([...lista_niveles, newValor]);
    setLoading(false);
  };
  //funcion que cargue el contenido de un flujo segun el id del tipo
  const [users, setUsers] = useState([]);

  const load = async (valor) => {
    setLoading(true);

    const result = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK + "flujo/Ver_niveles_detalles/" + valor,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    const data = await result.json();
    setUsers(data);
    setVerGuardar(true);
    console.log(data);
    setTitulNivel(data[1].r_titulo_nivel);
    MapearCuadros(0, 0, "Futura Area", data[0].r_titulo_nivel, 0);
    //por defecto se manda a eliminar el primer item que seria Elaboracion que tiene numero 1
    //handleRemoveItem(1);
    setLoading(false);
  };
  const [final, setfinal] = useState(false);
  //funcion para remover un item de la lista de las jerarquias

  const [verGuardar, setVerGuardar] = useState(false);
  //estado retornado de AreasFlujo para pasar al siguiente nivel
  //estado para abrir el drawer para seleccionar las areas
  //Enviar los datos
  const HandleSUbumit = async () => {
    setLoading(true);

    try {
      console.log("aqui van los archivos");
      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK +
          "flujo/Crear_FLujo_CAT/" +
          idcategoria +
          "/" +
          id_tipo,
        { list_niveles: lista_niveles },
        {
          withCredentials: true,
        }
      );
      console.log(result.data);
      //alert(result.data.message);
      //setVerGuardar(true);
      //Recargar(true);
      cerrar();
      setLoading(false);
    } catch (error) {
      alert("Error");
      setLoading(false);
    }
  };
  const btnEliminar = () => {
    setCabezera(false);
    setLoading(true);
    setLista_niveles([]), setcontador(0), setEspacio(0);
    setVerbotonAnadir(false);
    setVerbotonSeleccionar(true);
    setUsers([]);
    setVerGuardar(false);
    setMasAreas(false);
    setfinal(false);
    setLoading(false);
  };
  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <>
      <Dialog open={true} handler={cerrar} size="xl">
        <DialogHeader className="bg-blue-gray-100">
          Definir flujo
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
          <Card className="h-full w-full rounded-none shadow-none">
            {openVerNiveles ? (
              <Flujos_Etapas
                handlerNiveles={handlerNiveles}
                handlerID={handlerID}
              />
            ) : (
              ""
            )}
            {openVerAreaFlujo ? (
              <AreasFlujo
                handlerArea={handlerArea}
                datos={datos}
                title={titulonivel}
                masAreas={masAreas}
                padre={cabezera}
              />
            ) : (
              ""
            )}
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className="mb-8 flex items-center justify-between gap-8">
                <div>
                  <Typography variant="h5" color="blue-gray">
                    Crear Flujo
                  </Typography>
                  <Typography color="gray" className="mt-1 font-normal">
                    Añade niveles para el flujo
                  </Typography>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  {verbotonSeleccionar ? (
                    <Button
                      className="ml-auto flex gap-1 md:mr-4 rounded-none md:ml-6 bg-yellow-800 h-11"
                      onClick={() => setVerNiveles(true)}
                    >
                      <CheckIcon className="h-7 w-7" />
                      <p className="mt-1"> Seleccionar Etapas</p>
                    </Button>
                  ) : (
                    ""
                  )}

                  {final && verGuardar ? (
                    <Button
                      className="ml-auto flex gap-1 md:mr-4 rounded-none md:ml-6 bg-green-500 h-11"
                      onClick={HandleSUbumit}
                    >
                      <PlusIcon className="h-7 w-7" />
                      <p className="mt-1"> Guardar Flujo</p>
                    </Button>
                  ) : verBotonAnadir ? (
                    <Button
                      className="ml-auto flex gap-1 md:mr-4 rounded-none md:ml-6 bg-yellow-800 h-11"
                      onClick={() => setOpenVerAreaFlujo(true)}
                    >
                      <PlusIcon className="h-7 w-7" />
                      <p className="mt-1"> Añadir areas</p>
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <div className="relative overflow-scroll">
                <div className="relative  w-auto h-16 mb-16 ">
                  {lista_niveles.map((task) => (
                    <div
                      className="absolute mb-20"
                      style={{ left: task.esp_x, top: "20px" }}
                    >
                      <div className="flex flex-col gap-1 mb-10 bg-blue-gray-50">
                        <input
                          className="w-60 text-center text-lg  font-semibold	text-black"
                          disabled
                          value={task.nombre_area}
                        />
                        <input
                          className="w-60 text-center text-lg 	text-black"
                          disabled
                          value={task.tipo_nivel}
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
            </CardBody>
            <CardFooter>
              <div>
                <Button
                  className="bg-red-500 rounded-none ml-5"
                  onClick={btnEliminar}
                >
                  Eliminar jerarquia
                </Button>
              </div>
            </CardFooter>
          </Card>
        </DialogBody>

        {/* 
        <DialogFooter>
          <Button variant="text" color="red" onClick={cerrar} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={cerrar}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
*/}
      </Dialog>
    </>
  );
}
