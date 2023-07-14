import { useState, useEffect, Fragment } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

import {
  Card,
  CardHeader,
  Input,
  Typography,
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
  Alert,
  Chip,
  Avatar,
  Drawer,
} from "@material-tailwind/react";

export default function AreasAdmin({ id_area, nombre_area, isadmin }) {
  const [areasdata, setAreasData] = useState([]);
  const cookies = new Cookies();

  useEffect(() => {
    load();
  }, []);
  const [task, setakc] = useState({
    identi: isadmin,
  });
  const load = async () => {
    //Cargar la lista de las areas

    const data = await axios.post(
      "http://localhost:4000/api/area/areas_usuario/" + cookies.get("id_user"),
      { identi: isadmin },
      {
        withCredentials: true,
      }
    );
    console.log(data.data);
    setAreasData(data.data);
    console.log(areasdata);
  };
  return (
    <div>
      <Card className="h-full w-full rounded-none">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-0 flex  justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Lista de Areas
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Participas en estas areas
              </Typography>
            </div>
          </div>
        </CardHeader>
        {areasdata.length === 0 ? (
          <Typography variant="h5" color="blue-gray" className="mx-auto">
            No pertence a ningun area
          </Typography>
        ) : (
          ""
        )}
        <div className="grid grid-cols-4 gap-3 p-14">
          {areasdata.map((task) => (
            <div
              key={task.a_id_area}
              task={task}
              className="bg-blue-gray-50 shadow-2xl"
            >
              <div className="bg-zinc-900 text-black shadow-2xl ">
                <div className="mx-auto">
                  <div className="text-center">
                    <Avatar
                      src={
                        "http://localhost:4000/api/area/Areaimagen/" +
                        task.a_id_area
                      }
                      alt={task.logoarea}
                      size="xl"
                      className="mt-3"
                    />
                  </div>

                  <h1 className="text-lg font-bold text-black text-center mb-2 mt-4">
                    {task.a_nombre_area}
                  </h1>
                  <div className="w-auto flex ml-2 mb-2">
                    <Chip
                      variant="ghost"
                      size="sm"
                      value={task.a_rol}
                      color="green"
                    />
                    <Chip
                      variant="ghost"
                      className="ml-4"
                      size="sm"
                      value={task.a_prefijo}
                      color="blue-gray"
                    />
                  </div>
                </div>
                <div
                  className="p-2  bg-green-400"
                  onClick={() => (
                    id_area(task.a_id_area), nombre_area(task.a_nombre_area)
                  )}
                >
                  <button className="bg-zinc-50 p-2 hover:bg-blue-700 bg-yellow-900">
                    <p className="text-lg font-semibold items-center text-white">
                      Ir
                    </p>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
