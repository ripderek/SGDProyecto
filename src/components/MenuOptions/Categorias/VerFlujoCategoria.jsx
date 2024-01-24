
import { useState, useEffect } from "react";
import { ArrowDownIcon } from "@heroicons/react/24/solid";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter, Typography,
} from "@material-tailwind/react";
import { Loader } from "@/components/Widgets";

export default function VerFlujoCategoria({ idHistorial, cerrar }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    load();
  }, []);
    const [loading, setLoad] = useState(false);

    const load = async () => {
        setLoad(true);
        //ojito aqui hay que realizar un cambio  ya que solo deben mostrarle los niveles que tienen estado true
    const result = await fetch(
        process.env.NEXT_PUBLIC_ACCESLINK +
        "proyects/VerFlujoCategoria/" +
        idHistorial,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
    );

    const data = await result.json();
    setUsers(data);
        setLoad(false);
    };
  return (
      <>
          {loading && <Loader />}
          <Dialog open={true} handler={cerrar} className="rounded-none">
              <DialogHeader className="bg-gray-200">Flujo Categoria
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
                  </Button></DialogHeader>
              <DialogBody divider className="overflow-y-scroll">
                  <div className="h-72 relative">
                      <div className="relative h-screen mx-auto">
                          <div className="relative h-full mb-16 mx-auto">
                              {users.length === 0 ? "No hay flujo para cargar" : ""}
                              {users.map((task) => (
                                  <div
                                      className="mx-auto p-4 w-80"
                                      style={{top: task.numero * 150}}
                                  >
                                      <div className="items-center flex flex-col gap-1 mb-10 bg-blue-gray-50">
                                          <div className="flex justify-center mt-4">
                                              {task.area_id !== 0 && <img
                                                  className=" h-16 w-16 rounded-full border-4 border-yellow-600 cursor-pointer"
                                                  src={
                                                      process.env.NEXT_PUBLIC_ACCESLINK +
                                                      "area/Areaimagen/" +
                                                      task.area_id
                                                  }
                                                  alt="User image"
                                              />}

                                          </div>
                                          <input
                                              className="w-60 text-center text-lg  font-semibold	text-black"
                                              disabled
                                              value={task.nombrearea}
                                          />
                                          <input
                                              className="w-60 text-center text-lg 	text-black"
                                              disabled
                                              value={task.nivel}
                                          />
                                      </div>
                                      {task.numero >= 0 && task.numero <= users.length - 2 ? (
                                          <ArrowDownIcon
                                              className="h-10 w-10  items-center mx-auto"
                                              style={{top: task.numero * 150}}
                                          />
                                      ) : (
                                          ""
                                      )}
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>
              </DialogBody>
          </Dialog>
      </>
  );
}
