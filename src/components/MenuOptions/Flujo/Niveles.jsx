import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  UserPlusIcon,
  PencilIcon,
  PlusIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";

import {
  CardHeader,
  Input,
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
  Typography,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  Alert,
} from "@material-tailwind/react";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import PerfilUser from "../Users/PerfilUser";
const TABS = [
  {
    label: "Todos",
    value: "Todos",
  },
  {
    label: "Inhabilitados",
    value: "Inhabilitados",
  },
  {
    label: "Habilitados",
    value: "Habilitados",
  },
];
import Crear_Nivel from "./Crear_Nivel";
import Ver_Niveles from "./Ver_Niveles";
const TABLE_HEAD = ["Ver Flujo de Niveles", "Descripcion", "Estado", "Editar"];
export default function Niveles() {
  const [openOP, setOpenOP] = useState(false);
  const handlerOpen = (estado) => {
    setOpenOP(estado);
  };
  const [openVerNiveles, setVerNiveles] = useState(false);
  const handlerNiveles = (estado) => {
    setVerNiveles(estado);
  };
  return (
    <div>
      <Card className="h-full w-full rounded-none shadow-none">
        {openOP ? <Crear_Nivel handlerOpen={handlerOpen} /> : ""}
        {openVerNiveles ? <Ver_Niveles handlerNiveles={handlerNiveles} /> : ""}
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Lista de Flujos para los niveles del proyecto
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Administra los niveles
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                className="ml-auto flex gap-1 md:mr-4 rounded-none md:ml-6 bg-yellow-800 h-11"
                onClick={() => setVerNiveles(true)}
              >
                <EyeIcon className="h-7 w-7" />
                <p className="mt-1"> Ver Niveles</p>
              </Button>
              <Button
                className="ml-auto flex gap-1 md:mr-4 rounded-none md:ml-6 bg-yellow-800 h-11"
                onClick={() => setOpenOP(true)}
              >
                <PlusIcon className="h-7 w-7" />
                <p className="mt-1"> Crear Nivel</p>
              </Button>
              <Button className="ml-auto flex gap-1 md:mr-4 rounded-none md:ml-6 bg-yellow-800 h-11">
                <PlusIcon className="h-7 w-7" />
                <p className="mt-1"> Crear Flujo</p>
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value="all" className="w-full md:w-max">
              <TabsHeader>
                {TABS.map(({ label, value }) => (
                  <Tab key={value} value={value}>
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
            <div className="w-full md:w-72 mr-5">
              <Input
                label=""
                placeholder="Buscar Flujo de nivel"
                color="black"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Pagina 1 de 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" color="blue-gray" size="sm">
              Anterior
            </Button>
            <Button variant="outlined" color="blue-gray" size="sm">
              Siguiente
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
