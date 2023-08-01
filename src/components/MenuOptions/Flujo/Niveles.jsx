import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PlusIcon, EyeIcon, PencilIcon } from "@heroicons/react/24/solid";

import {
  CardHeader,
  Input,
  Button,
  CardBody,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Typography,
  Card,
  IconButton,
  Chip,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";

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
import Crear_Flujo from "./Crear_Flujo";
import Ver_Flujo from "./Ver_Flujo";
const TABLE_HEAD = [
  "Ver Flujo",
  "Titulo",
  "Fecha creacion",
  "Estado",
  "Editar",
];

export default function Niveles() {
  const [openOP, setOpenOP] = useState(false);
  const handlerOpen = (estado) => {
    setOpenOP(estado);
    load();
  };
  const [openVerNiveles, setVerNiveles] = useState(false);
  const handlerNiveles = (estado) => {
    setVerNiveles(estado);
    load();
  };
  const [openCrearFlujo, setOpenCrearFlujo] = useState(false);
  const handlerFlujo = (estado) => {
    setOpenCrearFlujo(estado);
    load();
  };
  //handleVerFLujo
  const [openVerFlujo, setOpenVerFLujo] = useState(false);
  const handleVerFLujo = (estado) => {
    setOpenVerFLujo(estado);
    load();
  };
  const [users, setUsers] = useState([]);
  const [id_tipo_flujo, setIdTipoFlujo] = useState("");
  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    //ojito aqui hay que realizar un cambio  ya que solo deben mostrarle los niveles que tienen estado true
    const result = await fetch(
      "http://localhost:4000/api/flujo/Ver_tipos_jerarquias",
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
    <div>
      <Card className="h-full w-full rounded-none shadow-none">
        {openOP ? <Crear_Nivel handlerOpen={handlerOpen} /> : ""}
        {openVerNiveles ? <Ver_Niveles handlerNiveles={handlerNiveles} /> : ""}
        {openCrearFlujo ? <Crear_Flujo handlerFlujo={handlerFlujo} /> : ""}
        {openVerFlujo ? (
          <Ver_Flujo
            handleVerFLujo={handleVerFLujo}
            idTipoFlujo={id_tipo_flujo}
          />
        ) : (
          ""
        )}

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
              <Button
                className="ml-auto flex gap-1 md:mr-4 rounded-none md:ml-6 bg-yellow-800 h-11"
                onClick={() => setOpenCrearFlujo(true)}
              >
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
        <CardBody className=" px-0 w-4/5 mx-auto">
          <table className="mt-4 w-full min-w-max table-auto text-left ">
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
            {users.length === 0 ? (
              <Typography
                variant="h5"
                color="blue-gray"
                className="text-center items-center justify-center"
              >
                No hay flujos registrados
              </Typography>
            ) : (
              ""
            )}
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.r_id_tipo}>
                    <td className="p-4 border-b border-blue-gray-50 z-10">
                      <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={() => (
                          setOpenVerFLujo(true), setIdTipoFlujo(user.r_id_tipo)
                        )}
                      >
                        <EyeIcon className="h-4 w-4" />
                      </IconButton>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.r_titulo_nivel}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.r_fecha}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={user.r_estado ? "Habilitado" : "Deshabilitado"}
                          color={user.r_estado ? "green" : "blue-gray"}
                        />
                      </div>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 z-10">
                      <IconButton variant="text" color="blue-gray">
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4 mt-10 mb-10">
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
