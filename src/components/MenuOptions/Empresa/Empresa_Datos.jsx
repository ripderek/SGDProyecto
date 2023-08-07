import { Fragment, useState, useEffect } from "react";
import {
  Typography,
  Card,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import OP_Empresa from "./OP_Empresa";
const TABLE_HEAD = ["Direccion", "Celular", "Correo", ""];

export default function Empresa_Datos() {
  const [users, setUsers] = useState([]);
  const [openOP, setOpenOP] = useState(false);
  const [id_empresa, setIdEmpresa] = useState("");
  //funcion para cerrar el menu de edicion de la empresa
  const handlerOpen = (estado) => {
    setOpenOP(estado);
    load();
  };
  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    //Cargar la lista de guias
    const result = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK + "public/Datos_Empresa",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    console.log(result);
    const data = await result.json();
    setUsers(data);
    setIdEmpresa(data.empresaid);
    console.log(data);
  };
  return (
    <Card className="h-full w-auto rounded-none mb-7 overflow-x-scroll">
      {openOP ? (
        <OP_Empresa handlerOpen={handlerOpen} id_empresa={id_empresa} />
      ) : (
        ""
      )}
      <div className=" rounded-none shadow-none w-full  p-4 border-none mx-auto ">
        <div className="flex flex-wrap items-center  justify-between gap-y-4 ">
          <div className="mx-auto w-full">
            <input
              className=" text-center w-full text-3xl font-semibold	text-blue-gray-800"
              value={users.nombres_empresa}
              disabled
            />
          </div>
          <Fragment>
            <img
              className="h-auto w-1/5 mx-auto "
              src={process.env.NEXT_PUBLIC_ACCESLINK + "public/Imagen_Empresa"}
              alt="User image"
            />
          </Fragment>
        </div>
      </div>
      <Card className=" h-full w-2/3 mx-auto rounded-none">
        <table className="  text-left ">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
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
            <tr key={users.empresaid}>
              <td className="p-4 border-b border-blue-gray-50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {users.direccion_empresa}
                </Typography>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {users.celular_empresa}
                </Typography>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {users.correo_empresa}
                </Typography>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <Tooltip content="Editar Empresa">
                  <IconButton
                    variant="text"
                    color="blue-gray"
                    onClick={() => setOpenOP(true)}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </IconButton>
                </Tooltip>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </Card>
  );
}
