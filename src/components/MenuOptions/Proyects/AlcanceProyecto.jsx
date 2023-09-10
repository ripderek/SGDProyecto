import { React, useState, useEffect } from "react";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { EyeIcon } from "@heroicons/react/24/solid";
import Verpdf from "./VerPdfVersiones";
import {
  Button,
  Dialog,
  Typography,
  IconButton,
  Tooltip,
  Alert,
  Input,
  DialogHeader,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import axios from "axios";
const TABLE_HEAD = ["Ver archivo", "Archivo", "Fecha"];
import Loading from "@/components/loading";

export default function AlcanceProyecto({ id}) {
  const [users, setUsers] = useState([]);
  const [openUser, setOpenUsers] = useState(false);
  const [loading, setLoading] = useState(false);
  const handlerOpenUsers = () => setOpenUsers(!openUser);

  
  useEffect(() => {
    load();
  }, []);


  const load = async () => {
    setLoading(true);
    //Cargar el pdf de la reforma con los datos descripcion fecha url
    const result = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK + "proyects/Ver_Alcance/" + id,
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
  const [openAlert, setOpenAlert] = useState(false);
  const hadleAlert = () => setOpenAlert(!openAlert);
  const [openAlerterror, setOpenAlerterror] = useState(false);
  const hadleAlerterror = () => setOpenAlerterror(!openAlert);
  //mensaje de error
  const [error, setError] = useState([]);
  //abrir el pdf
  const [link, setLink] = useState("");
  const [openD, setOpenD] = useState(false);

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div>
      <div className="flex shrink-0 flex-col gap-2 sm:flex-row justify-end rounded-none ">
        <Dialog
          size="xxl"
          open={openD}
          handler={() => setOpenD(false)}
          className="overflow-y-scroll"
        >
          <DialogHeader className="bg-light-green-900 text-white">
            Alcance
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

          <Verpdf link={link}></Verpdf>
        </Dialog>      
      </div>
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
        <tbody>
          {users.length === 0 ? (
            <div className="items-center text-center text-2xl">
              No hay documentos
            </div>
          ) : (
            ""
          )}
          {users.map((user) => {
            return (
              <tr key={user.u_id_user} className="cursor-pointer">
                <td className="p-4 border-b border-blue-gray-50">
                  <Tooltip content="Ver documento">
                    <IconButton
                      variant="text"
                      color="blue-gray"
                      onClick={() => (
                        setLink(
                          process.env.NEXT_PUBLIC_ACCESLINK +
                            "proyects/Pdf_alcance/" +
                            user.d_id
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
                        {user.d_descripcion}
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
                    {user.d_fecha}
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
