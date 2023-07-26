import { useState, useEffect, Fragment } from "react";
import Cookies from "universal-cookie";
import {
  MagnifyingGlassIcon,
  ArchiveBoxXMarkIcon,
  BanknotesIcon,
  BuildingLibraryIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";

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
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIcon,
  TimelineHeader,
} from "@material-tailwind/react";
import {
  BellIcon,
  ArchiveBoxIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";

export default function ProyectosAreas({ idarea, nombrearea, addIDP }) {
  const [areasdata, setAreasData] = useState([]);
  const cookies = new Cookies();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    //Cargar la lista de las areas

    const result = await fetch(
      "http://localhost:4000/api/proyects/proyectos_areas/" + idarea,
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
    <div>
      <Card className="h-full w-full rounded-none">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-0 flex  justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Lista de Proyectos
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                El area {nombrearea} tiene estos proyectos activos
              </Typography>
            </div>
            <div className="w-full md:w-72 mr-5">
              <Input
                label=""
                placeholder="Buscar proyectos"
                color="black"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>
        {areasdata.length === 0 ? (
          <Typography variant="h5" color="blue-gray" className="mx-auto">
            Esta area no tiene proyectos
          </Typography>
        ) : (
          ""
        )}
        <div className="grid grid-cols-3 gap-3 p-14 mx-auto cursor-pointer">
          {areasdata.map((task) => (
            <div className="w-[25rem]" key={task.p_id_proyecto}>
              <Timeline>
                <TimelineItem className="h-auto shadow-2xl">
                  <TimelineHeader
                    className="relative rounded-none border border-blue-gray-50 bg-light-green-700 py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5"
                    onClick={() => addIDP(task.p_id_proyecto)}
                  >
                    <TimelineIcon
                      className="p-3"
                      variant="gradient"
                      color="yellow"
                    >
                      <ClipboardDocumentIcon className="h-5 w-5" />
                    </TimelineIcon>
                    <div className="flex flex-col gap-1">
                      <div className="w-full">
                        <input
                          className="w-full text-lg bg-light-green-700 font-semibold	text-white "
                          disabled
                          value={task.p_titulo}
                        />
                      </div>

                      <Typography
                        variant="small"
                        color="white"
                        className="font-normal"
                      >
                        {task.p_categoria}
                      </Typography>
                    </div>
                  </TimelineHeader>
                </TimelineItem>
              </Timeline>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
