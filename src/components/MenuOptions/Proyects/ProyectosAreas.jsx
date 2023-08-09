import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

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
  Chip,
} from "@material-tailwind/react";

const TABS = [
  {
    label: "Todos",
    value: "Todos",
  },
  {
    label: "Elaboracion",
    value: "Elaboracion",
  },
  {
    label: "Revision",
    value: "Revision",
  },
  {
    label: "Publicacion",
    value: "Publicacion",
  },
];
const TABLE_HEAD = ["Titulo Proyecto", "Categoria", "Tipo"];

export default function ProyectosAreas({
  idarea,
  nombrearea,
  addIDP,
  adminA,
  tipo_proyecto,
}) {
  const [areasdata, setAreasData] = useState([]);
  const cookies = new Cookies();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    //Cargar la lista de las areas
    //aqui tengo que enviar un parametro que indique que el usuario que solicita cargar la lista de los proyectos es administrador del area por ende deben de cargar los proyectos que vienen de areas inferiores para su revision o publicacion

    const result = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK +
        "proyects/proyectos_areas/" +
        idarea +
        "/" +
        adminA,
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
      <Card className="h-full w-full p-7 rounded-none shadow-none">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Lista de Proyectos
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                El area {nombrearea} tiene estos proyectos activos
              </Typography>
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
            <div className="w-full md:w-72">
              <Input
                label="Buscar"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-24">
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
            <tbody>
              {areasdata.map(
                (
                  {
                    p_id_proyecto,
                    p_titulo,
                    p_categoria,
                    p_titulo_nivel,
                    p_tipo_nivel,
                  },
                  index
                ) => {
                  const isLast = index === areasdata.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr
                      key={p_id_proyecto}
                      onClick={() => (
                        addIDP(p_id_proyecto), tipo_proyecto(p_tipo_nivel)
                      )}
                      className="cursor-pointer"
                    >
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {p_titulo}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {p_categoria}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            size="sm"
                            variant="ghost"
                            value={p_titulo_nivel}
                            color={
                              p_tipo_nivel === 1
                                ? "green"
                                : p_tipo_nivel === 2
                                ? "yellow"
                                : "cyan"
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Paguina 1 de 1
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
