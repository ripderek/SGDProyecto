import { React, useState, useEffect, Fragment } from "react";
import axios from "axios";
import Loading from "@/components/loading";
const TABLE_HEAD = ["N", "Datos", "Firmado", "Estado", "Fecha firma"];
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
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
export default function Firmas_participantes({ id_proyecto }) {
  const [loading, setLoading] = useState(false);
  const [areasdata, setAreasData] = useState([]);

  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    setLoading(true);
    const result = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK +
        "proyects/UsuariosFirmas/" +
        id_proyecto,
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
  //funcion para cambiar el estado de la firma
  const cambiar_estado = async (id_firma) => {
    setLoading(true);
    try {
      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "proyects/Editar_estado_firma",
        { p_id_firma: id_firma },
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      //para refrescar la paguina
      //location.reload();
      //console.log(result);
      load();
    } catch (error) {
      console.log(error);
      alert("Error");
      setLoading(false);
    }
  };
  return (
    <div>
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        ""
      )}
      <Card className="h-full w-full  rounded-none shadow-none">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none"
        ></CardHeader>
        <CardBody className="overflow-scroll px-10">
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
                    No hay usuarios que firmen
                  </Typography>
                </div>
              ) : (
                ""
              )}
              {areasdata.map(
                (
                  {
                    r_id_firma,
                    r_nombres_usuario,
                    r_correo_institucional,
                    r_correo_personal,
                    r_numero_celular,
                    r_identificacion,
                    r_firmado,
                    r_estado,
                    r_fecha_firma,
                    r_id_user,
                  },
                  index
                ) => {
                  const isLast = index === areasdata.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={r_id_firma}>
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
                              "user/foto/" +
                              r_id_user
                            }
                            alt={r_nombres_usuario}
                            size="sm"
                          />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {r_nombres_usuario}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {r_correo_institucional}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {r_correo_personal}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {r_numero_celular}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Chip
                              className="cursor-pointer"
                              variant="gradient"
                              value={r_firmado ? "Firmado" : "Sin firmar"}
                              color={r_firmado ? "green" : "red"}
                            />
                          </div>
                        </div>
                      </td>
                      <td
                        className={classes}
                        onClick={() => cambiar_estado(r_id_firma)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Tooltip
                              content={
                                r_estado
                                  ? "Deshabilitar firma"
                                  : "Habilitar Firma"
                              }
                            >
                              <Chip
                                className="cursor-pointer"
                                variant="gradient"
                                value={
                                  r_estado ? "Habilitado" : "No habilitado"
                                }
                                color={r_estado ? "blue" : "gray"}
                              />
                            </Tooltip>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {r_fecha_firma ? r_fecha_firma : "Aun no firmado"}
                            </Typography>
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
