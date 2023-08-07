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
    console.log("ver flujo");
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
            y = y + 120;
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

  const [styleTituloC, setTC] = useState(
    "w-full text-lg bg-light-green-900 font-semibold	text-White"
  );
  const [styleTituloN, setTN] = useState(
    "w-full text-lg  bg-white  font-semibold	text-blue-gray-800 "
  );
  const [styleTituloM, setTM] = useState(
    "w-full text-lg bg-yellow-400 font-semibold	text-blue-gray-800 "
  );

  //    createTasks({ title, description });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    //Cargar la lista de las areas

    const result = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK + "area/Jerarquias/" + idarea.idarea,
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
      <div className="relative  w-full ">
        {posiciones.map((task) => (
          <div
            className="absolute"
            style={{ left: task.pos_x, top: task.pos_y }}
          >
            <TimelineItem className="h-28 w-96">
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
                    className=" h-16 w-16 rounded-full border-4 border-yellow-600 cursor-pointer"
                    src={
                      process.env.NEXT_PUBLIC_ACCESLINK +
                      "area/Areaimagen/" +
                      task.area_id
                    }
                    alt="User image"
                  />
                </div>
                <div className="flex flex-col gap-1 ">
                  <div className="w-full">
                    <input
                      className={
                        task.cabezer
                          ? styleTituloC
                          : task.area_id == idarea.idarea
                          ? styleTituloM
                          : styleTituloN
                      }
                      disabled
                      value={task.nombrearea}
                    />
                  </div>
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
