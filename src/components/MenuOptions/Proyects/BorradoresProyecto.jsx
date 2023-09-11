import { React, useState, useEffect } from "react";
import { EyeIcon } from "@heroicons/react/24/solid";
import {
  Dialog,
  Typography,
  IconButton,
  Tooltip,
  DialogHeader,
  Button,
  Chip,
  Avatar,
} from "@material-tailwind/react";
const TABLE_HEAD = ["", "", "Archivo", "Fecha"];
import VerBorradorPDF from "./VerBorradorPDF";
import Loading from "@/components/loading";

export default function BorradoresProyecto({ id, TituloProyecto, idarea }) {
  const [users, setUsers] = useState([]);
  const [link, setLink] = useState("");
  const [openD, setOpenD] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    setLoading(true);

    //Cargar la lista de usuarios
    const result = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK + "proyects/borradores/" + id,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    const data = await result.json();
    setUsers(data);
    setLoading(false);
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
      <div className="flex shrink-0 flex-col gap-2 sm:flex-row rounded-none">
        <Typography color="blue-gray" className="font-semibold text-xl ml-6">
          Historial de borradores
        </Typography>
      </div>
      <div className="flex shrink-0 flex-col gap-2 sm:flex-row justify-end rounded-none ">
        <Dialog
          size="xxl"
          open={openD}
          handler={() => setOpenD(false)}
          className="overflow-y-scroll"
        >
          <DialogHeader className="bg-gray-900 text-white">
            Borradores
            <div className="ml-5">
              <Chip
                icon={
                  <Avatar
                    size="xxl"
                    variant="circular"
                    className="h-full w-full -translate-x-0.5"
                    alt={TituloProyecto}
                    src={
                      process.env.NEXT_PUBLIC_ACCESLINK +
                      "area/Areaimagen/" +
                      idarea
                    }
                  />
                }
                value={
                  <Typography
                    variant="small"
                    color="black"
                    className="font-bold capitalize leading-none "
                  >
                    {TituloProyecto}
                  </Typography>
                }
                className="rounded-full  p-3"
                color="yellow"
              />
            </div>
            <Button
              color="red"
              variant="text"
              size="md"
              className="!absolute top-3 right-3"
              onClick={() => setOpenD(false)}
            >
              <Typography variant="h5" color="white">
                X
              </Typography>
            </Button>
          </DialogHeader>

          <VerBorradorPDF link={link} />
        </Dialog>
      </div>
      <table className="mt-4 w-full min-w-max table-auto text-left m-5">
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
          {users.length === 0 ? (
            <div className="items-center text-center text-2xl">
              No hay documentos
            </div>
          ) : (
            ""
          )}
          {users.map(({ d_id, d_descripcion, d_fecha }, index) => {
            return (
              <tr key={d_id} className="cursor-pointer">
                <td className="p-4 border-b border-blue-gray-50">
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
                <td className="p-4 border-b border-blue-gray-50">
                  <Tooltip content="Ver documento">
                    <IconButton
                      variant="text"
                      color="blue-gray"
                      onClick={() => (
                        setLink(
                          process.env.NEXT_PUBLIC_ACCESLINK +
                            "proyects/pdf/" +
                            d_id
                        ),
                        setOpenD(true)
                      )}
                    >
                      <EyeIcon className="h-4 w-4" />
                    </IconButton>
                  </Tooltip>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {d_descripcion}
                      </Typography>
                    </div>
                  </div>
                </td>

                <td className="p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {d_fecha}
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
