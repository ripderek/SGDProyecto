import { useState, useEffect } from "react";
import { ArrowDownIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Loading from "@/components/loading";
import Router from "next/router";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Lottie from "lottie-react";
import anim_error from "../../../../public/Anim/error_anim.json";

export default function SubirNivel0({ id_proyect }) {
  const [users, setUsers] = useState([]);
  const bg1 = "items-center flex flex-col gap-1 mb-10 bg-blue-gray-50";
  const bg2 = "items-center flex flex-col gap-1 mb-10 bg-yellow-600";
  const inputTitle = "w-60 text-center text-lg  font-semibold	text-black";
  const inputSubtitile = "w-60 text-center text-lg 	text-black";
  const inputTitle2 =
    "w-60 text-center text-lg  font-semibold	text-black bg-yellow-600";
  const inputSubtitile2 = "w-60 text-center text-lg 	text-black bg-yellow-600";
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [errorM, setErrorM] = useState("");
  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    setLoading(true);

    //ojito aqui hay que realizar un cambio  ya que solo deben mostrarle los niveles que tienen estado true
    const result = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK +
        "proyects/ver_niveles_actual/" +
        id_proyect,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    const data = await result.json();
    setUsers(data);
    setLoading(false);
  };
  const HandleSUbumit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      setLoading(true);
      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "proyects/subir_nivel",
        { list_niveles: users, id_pro: id_proyect },
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
      setOpenAlert(true);
      setErrorM(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <div className="relative overflow-y-auto h-screen mx-auto">
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        ""
      )}
      <Dialog open={openAlert} handler={() => setOpenAlert(false)} size="sm">
        <DialogBody>
          <div className="mx-auto text-center font-body text-black text-base">
            {errorM}
            <Lottie animationData={anim_error} className="w-24 mx-auto mt-2" />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            color="green"
            onClick={() => setOpenAlert(false)}
          >
            <span>Aceptar</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <div className="bg-gray-100  mb-3" id="Header">
        <div className="ml-10 text-black font-semibold">
          {users.length != 0 ? " Subir al nivel de " + users[1].nivel : ""}
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
      <div className="relative h-full mb-16 mx-auto">
        {users.length === 0 ? "No hay flujo para cargar" : ""}
        {users.map((task) => (
          <div className="mx-auto p-4 w-80" style={{ top: task.numero * 150 }}>
            <div className={task.numero === 0 ? bg1 : bg2}>
              <div className="flex justify-center mt-4 ">
                <img
                  className=" h-16 w-16 rounded-full border-4 border-yellow-600 cursor-pointer"
                  src={
                    process.env.NEXT_PUBLIC_ACCESLINK +
                    "area/Areaimagen/" +
                    task.area_id
                  }
                  alt="User image"
                />
              </div>
              <input
                className={task.numero === 0 ? inputTitle : inputTitle2}
                disabled
                value={task.nombrearea}
              />
              <input
                className={task.numero === 0 ? inputSubtitile : inputSubtitile2}
                disabled
                value={task.nivel}
              />
            </div>
            {task.numero >= 0 && task.numero <= users.length - 2 ? (
              <ArrowDownIcon
                className="h-10 w-10  items-center mx-auto"
                style={{ top: task.numero * 150 }}
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
