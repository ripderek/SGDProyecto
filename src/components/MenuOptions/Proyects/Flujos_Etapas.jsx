import {
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Chip,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
const TABLE_HEAD = ["Ver Flujo", "Titulo", "Fecha creacion", ""];
import { EyeIcon } from "@heroicons/react/24/solid";
import Ver_Flujo from "../Flujo/Ver_Flujo";

export default function Flujos_Etapas({ handlerNiveles, handlerID }) {
  const [users, setUsers] = useState([]);
  //handleVerFLujo
  const [id_tipo_flujo, setIdTipoFlujo] = useState("");

  const [openVerFlujo, setOpenVerFLujo] = useState(false);
  const handleVerFLujo = (estado) => {
    setOpenVerFLujo(estado);
    load();
  };
  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    const result = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK + "flujo/Ver_jerarquias_activas",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    const data = await result.json();
    setUsers(data);
    console.log(data);
  };
  return (
    <div>
      <Dialog size="sm" open={true} className="rounded-none">
        {openVerFlujo ? (
          <Ver_Flujo
            handleVerFLujo={handleVerFLujo}
            idTipoFlujo={id_tipo_flujo}
          />
        ) : (
          ""
        )}
        <DialogHeader className="bg-gray-200">
          Lista de flujos
          <Button
            color="red"
            variant="text"
            size="sm"
            className="!absolute top-3 right-3"
            onClick={() => handlerNiveles(false)}
          >
            <Typography variant="h5" color="blue-gray">
              X
            </Typography>
          </Button>
        </DialogHeader>
        <DialogBody className="overflow-scroll h-96">
          <table className="mx-auto mt-4 w-full table-auto text-left">
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
                No hay niveles registrados
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
                      <Button
                        className="rounded-none p-2"
                        color="yellow"
                        onClick={() => (
                          handlerID(user.r_id_tipo), handlerNiveles(false)
                        )}
                      >
                        Seleccionar
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </DialogBody>
      </Dialog>
    </div>
  );
}
