import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  Avatar,
} from "@material-tailwind/react";
import Cookies from "universal-cookie";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const TABLE_HEAD = ["", "Proyecto", "Categoria", "Codigo"];
import Loading from "@/components/loading";
export default function Firmas({ HandlerSubmit }) {
  const [areasdata, setAreasData] = useState([]);
  const cookies = new Cookies();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    setLoading(true);
    const result = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK +
        "proyects/DocumentosporFirmar/" +
        cookies.get("id_user"),
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    const data = await result.json();
    console.log(data);
    setAreasData(data);
    setLoading(false);
  };
  //funcion que cierrre la ventana actual para poder ver el documento que se va a firmar y poder firmarlo
  //necesita retornar lo siguiente
  /**
   * id_proyecto,
      id_area,
     id_firma_participantes,
      id_firma,
   */

  return (
    <div>
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        ""
      )}
      <Card className="h-full w-full p-7 rounded-none shadow-none">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Lista de proyectos
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Estos documentos necesitan su firma
              </Typography>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
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
              {areasdata.length === 0 ? (
                <div className="items-center text-center w-full mx-auto">
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="font-normal"
                  >
                    No tiene documentos pendientes por firmar
                  </Typography>
                </div>
              ) : (
                ""
              )}
              {areasdata.map(
                (
                  {
                    r_id_proyecto,
                    r_titulo_proyecto,
                    r_codigo_proyecto,
                    r_categoria_proyecto,
                    r_id_area,
                    r_nombre_area,
                    r_id_firma_participantes,
                    r_id_firma,
                  },
                  index
                ) => {
                  const isLast = index === areasdata.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr
                      key={r_id_proyecto}
                      className="cursor-pointer"
                      onClick={() =>
                        HandlerSubmit(
                          r_id_proyecto,
                          r_id_area,
                          r_id_firma_participantes,
                          r_id_firma,
                          r_titulo_proyecto,
                          r_codigo_proyecto
                        )
                      }
                    >
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {index + 1}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={
                              process.env.NEXT_PUBLIC_ACCESLINK +
                              "area/Areaimagen/" +
                              r_id_area
                            }
                            alt={r_nombre_area}
                            size="sm"
                          />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {r_titulo_proyecto}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {r_nombre_area}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Chip
                              variant="outlined"
                              value={r_categoria_proyecto}
                              color="orange"
                            />
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Chip
                              variant="gradient"
                              value={r_codigo_proyecto}
                              color="green"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
