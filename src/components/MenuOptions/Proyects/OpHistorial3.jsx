import { useState, useEffect } from "react";
import { ArrowDownIcon } from "@heroicons/react/24/solid";

export default function OpHistorial3({ idHistorial }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    //ojito aqui hay que realizar un cambio  ya que solo deben mostrarle los niveles que tienen estado true
    const result = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK +
        "proyects/VerFlujoHistorial/" +
        idHistorial,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    const data = await result.json();
    setUsers(data);
  };
  return (
    <div className="h-72">
      <div className="relative overflow-y-auto h-screen mx-auto">
        <div className="relative h-full mb-16 mx-auto">
          {users.length === 0 ? "No hay flujo para cargar" : ""}
          {users.map((task) => (
            <div
              className="mx-auto p-4 w-80"
              style={{ top: task.numero * 150 }}
            >
              <div className="items-center flex flex-col gap-1 mb-10 bg-blue-gray-50">
                <div className="flex justify-center mt-4">
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
                  style={{ top: task.numero * 150 }}
                />
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
