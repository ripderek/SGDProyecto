import {
  CardBody,
  Typography,
  Card,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { Fragment, useState, useEffect } from "react";
import EditUser from "../Users/EditUser";
import EditUserM from "../Users/EditUserM";
import Loading from "@/components/loading";
import { UserPlusIcon, PencilIcon } from "@heroicons/react/24/solid";

export default function MiPerfi({ admin, iduser }) {
  //Data para almacenar la respuesta del usuario
  const [UserData, setUserData] = useState([]);
  const [userImage, setUserImage] = useState("");
  const [classes, setclasses] = useState("p-4 border-b border-blue-gray-50");
  //constante para saber si se va a editar el perfil del usuario
  const [openEdit, setOpenEdit] = useState(false);
  //estado para cargar
  const [loading, setLoading] = useState(false);
  //useffect para cargarlo
  useEffect(() => {
    load();
  }, []);
  //funcion para effect

  const load = async () => {
    try {
      setLoading(true);

      const resultdata = await fetch(
        process.env.NEXT_PUBLIC_ACCESLINK + "user/Datos/" + iduser,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      setUserImage(process.env.NEXT_PUBLIC_ACCESLINK + "user/foto/" + iduser);
      const dataU = await resultdata.json();
      setUserData(dataU);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const openEditUser = (respuesta) => {
    setOpenEdit(respuesta);
    if (respuesta) load();
    else load();
  };
  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <Card className="w-auto shadow-none rounded-none border-0">
      {openEdit ? (
        admin ? (
          <EditUser openEditUser={openEditUser} userID={iduser} />
        ) : (
          <EditUserM openEditUser={openEditUser} userID={iduser} />
        )
      ) : (
        ""
      )}

      <CardBody className="mx-auto shadow-none rounded-none">
        <div className=" rounded-none shadow-none w-auto  p-4 border-none mx-auto">
          <div className="flex flex-wrap items-center  justify-between gap-y-4 ">
            <div className="mx-auto w-full">
              <input
                className=" text-center w-full text-3xl font-semibold	text-blue-gray-800 bg-white"
                value={UserData.u_nombres}
                disabled
              />
              <input
                className=" text-center w-full text-3xl font-semibold	text-blue-gray-800 bg-white "
                value={UserData.u_correo_institucional}
                disabled
              />
            </div>

            <Fragment>
              <img
                className="h-auto w-40 mx-auto "
                src={userImage}
                alt="User image"
              />
            </Fragment>
          </div>
        </div>
        <div className="w-max mx-auto">
          <table className="w-2/4 mx-auto overflow-x-scroll text-left ">
            <thead>
              <tr>
                <th
                  key={2}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Dato
                  </Typography>
                </th>
                <th
                  key={1}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Valor
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold"
                  >
                    Tipo identificacion:
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {UserData.u_tipo_identificacion}
                  </Typography>
                </td>
              </tr>
              <tr>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold"
                  >
                    Identificacion:
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
              </tr>
              <tr>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold"
                  >
                    Correo personal:
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
              </tr>
              <tr>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold"
                  >
                    Correo institucional:
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
              </tr>
              <tr>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold"
                  >
                    Numero Celular:
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
              </tr>
              <tr>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold"
                  >
                    Firma:
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
              </tr>
              <tr>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold"
                  >
                    Accion:
                  </Typography>
                </td>

                <td className={classes}>
                  <Tooltip content="Editar datos">
                    <IconButton
                      variant="text"
                      color="blue-gray"
                      onClick={() => setOpenEdit(!openEdit)}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
}
