import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon, PencilIcon } from "@heroicons/react/24/solid";

import {
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Card,
} from "@material-tailwind/react";
import { Fragment, useState, useEffect } from "react";
import EditUser from "../Users/EditUser";
const TABLE_HEAD = [
  "Tipo Identificacion",
  "Identificacion",
  "Correo Personal",
  "Correo Institucional",
  "Numero Celular",
  "Firma",
  "Accion",
];

export default function MiPerfi(iduser) {
  //Data para almacenar la respuesta del usuario
  const [UserData, setUserData] = useState([]);
  const [userImage, setUserImage] = useState("");
  const [classes, setclasses] = useState("p-4 border-b border-blue-gray-50");
  //constante para saber si se va a editar el perfil del usuario
  const [openEdit, setOpenEdit] = useState(false);
  //useffect para cargarlo
  useEffect(() => {
    load();
  }, []);
  //funcion para effect

  const load = async () => {
    try {
      const resultdata = await fetch(
        "http://localhost:4000/api/user/Datos/" + iduser.iduser,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      setUserImage("http://localhost:4000/api/user/foto/" + iduser.iduser);
      const dataU = await resultdata.json();
      setUserData(dataU);
    } catch (error) {}
  };
  const openEditUser = (respuesta) => {
    setOpenEdit(respuesta);
    if (respuesta) load();
    else load();
  };
  return (
    <Card className="">
      {openEdit ? (
        <EditUser openEditUser={openEditUser} userID={iduser.iduser} />
      ) : (
        ""
      )}
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex  items-center text-center px-7">
          <div className=" mx-auto ">
            <Typography variant="h2" color="black">
              {UserData.u_nombres}
            </Typography>
            <Typography variant="h4" color="gray">
              {UserData.u_correo_institucional}
            </Typography>
          </div>
          <div className="flex px-24">
            <img
              className="ml-5 h-40 w-40 rounded-full border-4 border-yellow-600 "
              src={userImage}
              alt="User image"
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="mx-auto">
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
            <tr>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {UserData.u_tipo_identificacion}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {UserData.u_identificacion}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {UserData.u_correopersonal}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {UserData.u_correo_institucional}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {UserData.u_numero_celular}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {UserData.u_nombre_firma}
                </Typography>
              </td>
              <td className={classes} onClick={() => setOpenEdit(!openEdit)}>
                <Typography
                  variant="small"
                  color="blue"
                  className="font-medium cursor-pointer"
                >
                  Editar
                </Typography>
              </td>
            </tr>
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4"></CardFooter>
    </Card>
  );
}
