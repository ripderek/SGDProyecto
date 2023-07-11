import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIcon,
  Typography,
  TimelineHeader,
} from "@material-tailwind/react";
import {
  BellIcon,
  ArchiveBoxIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import { useState, useEffect, Fragment } from "react";

export default function Arbol(idarea) {
  //        {posiciones.map((task) => task.area_id + " Position X: " + task.pos_x)}

  const [areasdata, setAreasData] = useState([]);
  //constante para saber si el array solo tiene  1 elemento que seria la cabezera
  const [posiciones, setPosiciones] = useState([]);
  const verFlujo = () => {
    var num = 0;
    var x = 10;
    var y = 0;
    var posicion1 = [];
    for (let i = 0; i < areasdata.length; i++) {
      num = 0;
      for (let j = 0; j < areasdata.length; j++) {
        num++;
        if (areasdata[i].area_id === areasdata[j].padre_id) {
          if (num > 1) {
            posicion1 = [
              ...posicion1,
              {
                area_id: areasdata[j].area_id,
                pos_x: x,
                pos_y: y,
                cabezer: areasdata[j].cabezer,
                nombrearea: areasdata[j].nombrearea,
              },
            ];
            y = y + 200;
          } else {
            posicion1 = [
              ...posicion1,
              {
                area_id: areasdata[j].area_id,
                pos_x: x,
                pos_y: y,
                cabezer: areasdata[j].cabezer,
                nombrearea: areasdata[j].nombrearea,
              },
            ];
            x = x + 400;
          }
        }
      }
      num = 0;
      y = 0;
      x = x + 400;
    }
    setPosiciones(posicion1);
  };
  const [styleC, setStyleC] = useState(
    "relative rounded-xl border border-blue-gray-50  py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5 bg-light-green-900 text-white"
  );
  const [styleN, setStyleN] = useState(
    "relative rounded-xl border border-blue-gray-50  py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5 bg-white text-black"
  );
  const [styleM, setStyleM] = useState(
    "relative rounded-xl border border-blue-gray-50  py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5 bg-yellow-400 text-black  "
  );

  //    createTasks({ title, description });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    //Cargar la lista de las areas

    const result = await fetch(
      "http://localhost:4000/api/area/Jerarquias/" + idarea.idarea,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    const data = await result.json();
    setAreasData(data);
    //console.log(areasdata);
  };
  return (
    <div
      className="w-full
      h-full
      overflow-x-scroll   "
    >
      <button onClick={verFlujo}>Cargar Flujo</button>
      <div className="relative ml-24 w-full h-full">
        {posiciones.map((task) => (
          <div
            className="absolute"
            style={{ left: task.pos_x, top: task.pos_y }}
          >
            <TimelineItem className="h-28 w-80">
              <TimelineConnector className="" />
              <TimelineHeader
                className={
                  task.cabezer
                    ? styleC
                    : task.area_id == idarea.idarea
                    ? styleM
                    : styleN
                }
              >
                <div className="flex justify-center">
                  <img
                    className=" h-12 w-12 rounded-full border-4 border-yellow-600 cursor-pointer"
                    src={
                      "http://localhost:4000/api/area/Areaimagen/" +
                      task.area_id
                    }
                    alt="User image"
                  />
                </div>
                <div className="flex flex-col gap-1 ">
                  <Typography variant="h4">{task.nombrearea}</Typography>
                  <Typography>
                    {task.cabezer ? "Area Padre" : "Area Hija"}
                  </Typography>
                </div>
              </TimelineHeader>
            </TimelineItem>
          </div>
        ))}
      </div>
    </div>
  );
}
