import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

import {
  Card,
  CardHeader,
  Typography,
  Chip,
  Avatar,
  CardBody,
} from "@material-tailwind/react";
import Lottie from "lottie-react";
import anim from "../../../../public/Anim/advertencia_anim.json";
import Loading from "@/components/loading";

export default function AreasAdmin({ id_area, nombre_area, isadmin, rolarea }) {
  const [areasdata, setAreasData] = useState([]);
  const cookies = new Cookies();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
  }, []);
  const [task, setakc] = useState({
    identi: isadmin,
  });
  const load = async () => {
    //Cargar la lista de las areas
    setLoading(true);

    const data = await axios.post(
      process.env.NEXT_PUBLIC_ACCESLINK +
        "area/areas_usuario/" +
        cookies.get("id_user"),
      { identi: isadmin },
      {
        withCredentials: true,
      }
    );
    console.log(data.data);
    setAreasData(data.data);
    console.log(areasdata);
    setLoading(false);
  };
  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <div>
      <Card className="h-full w-full rounded-none shadow-none">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-0 flex  justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Lista de Areas
              </Typography>
              {areasdata.length === 0 ? (
                ""
              ) : (
                <Typography color="gray" className="mt-1 font-normal">
                  Participas en estas areas
                </Typography>
              )}
            </div>
          </div>
        </CardHeader>
        <CardBody className=" mx-auto items-center">
          {areasdata.length === 0 ? (
            <div className="mx-auto">
              <Lottie animationData={anim} className="w-3/4 mx-auto" />
              <Typography className="text-center">
                No se encuentra en ninguna area
              </Typography>
            </div>
          ) : (
            ""
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 p-2">
            {areasdata.map((task) => (
              <div
                key={task.a_id_area}
                task={task}
                className="bg-blue-gray-50 shadow-2xl cursor-pointer border-2 border-yellow-400 hover:border-4 hover:border-green-800 hover:shadow-2xl hover:shadow-green-700"
                onClick={() => (
                  id_area(task.a_id_area),
                  nombre_area(task.a_nombre_area),
                  rolarea(task.a_rol === "Administrador Area" ? true : false)
                )}
              >
                <div className="mx-auto">
                  <div className="text-center">
                    <Avatar
                      src={
                        process.env.NEXT_PUBLIC_ACCESLINK +
                        "area/Areaimagen/" +
                        task.a_id_area
                      }
                      alt={task.logoarea}
                      size="xl"
                      className="mt-3"
                    />
                  </div>
                  <div className="w-full p-4">
                    <input
                      className="w-full text-lg bg-blue-gray-50 font-semibold	text-blue-gray-800 "
                      disabled
                      value={task.a_nombre_area}
                    />
                  </div>
                  <div className="w-auto flex ml-2 mb-2">
                    {task.a_rol === "Administrador Area" ? (
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={task.a_rol}
                        color="green"
                      />
                    ) : (
                      <Chip
                        variant="ghost"
                        size="sm"
                        value=" ___"
                        className="bg-blue-gray-50 text-blue-gray-50"
                      />
                    )}
                  </div>
                  <Chip
                    variant="ghost"
                    className="ml-4 w-max mb-6"
                    size="sm"
                    value={task.a_prefijo}
                    color="blue-gray"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
