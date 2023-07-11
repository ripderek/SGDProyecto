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
  const [numHijos, setNumHijos] = useState(0);
  //constante para saber si el array solo tiene  1 elemento que seria la cabezera
  const [olnyCabezera, setOnlyC] = useState(false);
  const [posiciones, setPosiciones] = useState([]);
  const [fluj, setFluj] = useState("");
  const verFlujo = () => {
    var st = "";
    var num = 0;
    var x = 10;
    var y = 10;
    var posicion1 = [];
    for (let i = 0; i < areasdata.length; i++) {
      //preguntar cuantos hijos tiene este man xd
      for (let j = 0; j < areasdata.length; j++) {
        if (areasdata[i].area_id === areasdata[j].padre_id) {
          num++;
        }
      }
      st =
        st +
        " <--- " +
        areasdata[i].nombrearea +
        "Numero de hijos: " +
        num +
        "Posicion X = " +
        x;
      posicion1 = [
        ...posicion1,
        { area_id: areasdata[i].nombrearea, pos_x: x, pos_y: y },
      ];

      num = 0;
      x = x + 200;
      y = y + 20;
    }
    setFluj(st);
    console.log(fluj);
    console.log("Posiciones1 ");
    console.log(posicion1);

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
    areasdata.length > 1 ? setOnlyC(true) : "";
  };
  return (
    <div
      className="w-full
      overflow-x-scroll   "
    >
      <button onClick={verFlujo}>Cargar Flujo</button>
      <div>
        {posiciones.map((task) => (
          <div
            className="absolute"
            style={{ left: task.pos_x, top: task.pos_y }}
          >
            {" "}
            {task.area_id}
          </div>
        ))}
      </div>
    </div>
  );
}
