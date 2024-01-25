import { Fragment, React, useState, useEffect } from "react";
import { ArrowDownIcon } from "@heroicons/react/24/solid";
import Loading from "@/components/loading";
import {
  Button,
  Dialog,
  Typography,
  IconButton,
  Tooltip,
  Alert,
  Input,
  DialogHeader,
  Card,
  CardHeader,
  CardBody,
  Chip,
  Avatar,
} from "@material-tailwind/react";
import axios from "axios";

export default function NivelesProyecto({ id, SubirLevel }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    setLoading(true);

    //Cargar la lista de usuarios
    const result = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK + "proyects/estados_niveles/" + id,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    const data = await result.json();
    setUsers(data);
    console.log(data);
    load2();
    setLoading(false);
  };
  const load2 = async () => {
    setLoading(true);

    //ojito aqui hay que realizar un cambio  ya que solo deben mostrarle los niveles que tienen estado true
    const result = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK + "proyects/ver_niveles_actual/" + id,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    const data = await result.json();
    setUsers2(data);
    setLoading(false);
  };
  // Para subirlo de Nivel Xd
  const HandleSUbumit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      setLoading(true);
      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "proyects/SubirLevel/" + id,
        { list_niveles: users2, id_pro: id },
        {
          withCredentials: true,
        }
      );
      console.log(result);
      //refrescar la pagunia xdxdxd skere modo diablo
      setLoading(false);
      location.reload();
      //console.log(result);
    } catch (error) {
      alert("Error");
      console.log(error);
      //setOpenAlert(true);
      //setErrorM(error.response.data.message);
      setLoading(false);
    }
  };
  const [users2, setUsers2] = useState([]);

  return (
    <div className="relative overflow-y-auto h-screen mx-auto">
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        ""
      )}
      {SubirLevel && (
        <div
          className="bg-transparent border-4 ml-5 mr-5 p-3 border-orange-900 mb-3"
          id="Header"
        >
          <div className="ml-10 text-black font-semibold">
            {users2.length != 0 ? " Subir al nivel de " + users2[1].nivel : ""}
            <Button
              color="green"
              variant="gradient"
              size="md"
              className="ml-5 rounded-none"
              onClick={HandleSUbumit}
            >
              Aceptar
            </Button>
          </div>
        </div>
      )}

      <div className="relative h-full mb-16 mx-auto">
        {users.length === 0 ? "No hay flujo para cargar" : ""}
        {users.map((task) => (
          <div
            className="mx-auto p-4 w-80 "
            style={{ top: task.r_nivel * 150 }}
          >
            <div className="items-center flex flex-col gap-1 mb-10 bg-blue-gray-50 cursor-pointer hover:border-4 hover:border-green-800">
              <div className="flex justify-center mt-4">
                <img
                  className=" h-16 w-16 rounded-full border-4 border-yellow-600 cursor-pointer"
                  src={
                    process.env.NEXT_PUBLIC_ACCESLINK +
                    "area/Areaimagen/" +
                    task.r_id_area
                  }
                  alt="User image"
                />
              </div>
              <input
                className="w-60 text-center text-lg  font-semibold	text-black"
                disabled
                value={task.r_nombre_area}
              />
              <input
                className="w-60 text-center text-lg 	text-black"
                disabled
                value={task.r_tipo_nivel}
              />
              {task.r_estado_nivel === "Sin enviar" ? (
                <Chip
                  className="w-60 text-center text-lg mb-3	text-white"
                  color="red"
                  value={task.r_estado_nivel}
                />
              ) : (
                <Chip
                  className="w-60 text-center text-lg mb-3	text-white"
                  color="orange"
                  value={task.r_estado_nivel}
                />
              )}
            </div>

            {task.r_nivel >= 0 && task.r_nivel <= users.length - 2 ? (
              <ArrowDownIcon
                className="h-10 w-10  items-center mx-auto"
                style={{ top: task.r_nivel * 150 }}
              />
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
