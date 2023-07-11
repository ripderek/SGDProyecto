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

export default function Flujo(idarea) {
  const [areasdata, setAreasData] = useState([]);
  const [styleC, setStyleC] = useState(
    "relative rounded-xl border border-blue-gray-50  py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5 bg-light-green-900 text-white"
  );
  const [styleN, setStyleN] = useState(
    "relative rounded-xl border border-blue-gray-50  py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5 bg-white text-black"
  );
  const [styleM, setStyleM] = useState(
    "relative rounded-xl border border-blue-gray-50  py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5 bg-yellow-400 text-black  "
  );

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
    console.log(areasdata);
  };
  return (
    <div className="w-[25rem] ml-8">
      <Timeline>
        {areasdata.map((task) => (
          <TimelineItem className="h-28 ">
            <TimelineConnector className="!w-[78px]" />
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
                    "http://localhost:4000/api/area/Areaimagen/" + task.area_id
                  }
                  alt="User image"
                />
              </div>
              <TimelineIcon variant="filled" color="yellow"></TimelineIcon>
              <div className="flex flex-col gap-1">
                <Typography variant="h4">{task.nombrearea}</Typography>
                <Typography>
                  {task.cabezer ? "Area Padre" : "Area Hija"}
                </Typography>
              </div>
            </TimelineHeader>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
}
