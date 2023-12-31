import { Fragment, React, useState, useEffect } from "react";
import { ArrowDownIcon } from "@heroicons/react/24/solid";
import Loading from "@/components/loading";

export default function NivelesProyecto({ id }) {
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
    setLoading(false);
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
      <div className="relative h-full mb-16 mx-auto">
        {users.length === 0 ? "No hay flujo para cargar" : ""}
        {users.map((task) => (
          <div className="mx-auto p-4 w-80" style={{ top: task.r_nivel * 150 }}>
            <div className="items-center flex flex-col gap-1 mb-10 bg-blue-gray-50">
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
              <input
                className="w-60 text-center text-lg 	text-black"
                disabled
                value={task.r_estado_nivel}
              />
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
