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
const TABLE_HEAD = [
  "Titulo",
  "Descripcion",
  "Acepta varias Area",
  "Estado",
  "Editar",
];
import { PencilIcon } from "@heroicons/react/24/solid";
import { Loader } from "@/components/Widgets";

export default function Ver_Niveles({ handlerNiveles }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    setLoader(true);
    const result = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK + "flujo/Ver_niveles",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    const data = await result.json();
    setUsers(data);
    setLoader(false);
  };
  const [loading, setLoader] = useState(false);

  return (
    <div>
      {loading && <Loader />}
      <Dialog size="xl" open={true} className="rounded-none">
        <DialogHeader className="bg-gray-200">
          Lista de niveles
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
          <table className="w-full">
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
                  <tr key={user.r_id_nivel}>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.r_titulo}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.r_descripcion}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.r_cardiniladad ? "Si" : "No"}
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
        </DialogBody>
      </Dialog>
    </div>
  );
}
