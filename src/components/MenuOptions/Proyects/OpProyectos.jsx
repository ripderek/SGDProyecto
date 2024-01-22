import { React, Fragment, useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon, PencilIcon } from "@heroicons/react/24/solid";
import Cookies from "universal-cookie";

import {
  Button,
  Dialog,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  Input,
  Chip,
} from "@material-tailwind/react";
const TABLE_HEAD = [
  "",
  "Titulo Proyecto",
  "Categoria",
  "Tipo",
  "Código",
  "Estado",
  "",
];
import CrearProyecto from "./CrearProyecto";
import Loading from "@/components/loading";

export default function OpProyectos(id) {
  //Crear la tabla con usuarios
  const [users, setUsers] = useState([]);
  const [openUser, setOpenUsers] = useState(false);
  const handlerOpenUsers = () => setOpenUsers(!openUser);
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();

  //Funcion para cerrar el formulario de crear proyectos
  const [openFOrm, setOpenForm] = useState(false);

  const openDiv = (opend) => {
    setOpenForm(opend);
    load();
  };

  useEffect(() => {
    load();
  }, []);
  //setLoading(true);
  const load = async () => {
    setLoading(true);

    //Cargar la lista de usuarios
    try {
      const user_data = {
        idu: cookies.get("id_user"),
      };
      const result = await fetch(
        process.env.NEXT_PUBLIC_ACCESLINK +
          "proyects/proyectos_areas/" +
          id.id +
          "/" +
          true +
          "/" +
          user_data.idu,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const data = await result.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
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
      <div className="flex shrink-0 flex-col  sm:flex-row justify-end rounded-none">
        {openFOrm ? (
          <Dialog open={openFOrm} className=" rounded-none">
            <CrearProyecto id={id.id} openDiv={openDiv} />
          </Dialog>
        ) : (
          ""
        )}
        <div className="w-full md:w-72 mr-5">
          <Input
            label=""
            placeholder="Buscar proyectos"
            color="black"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          />
        </div>
        <Button
          className="ml-auto flex gap-1 md:mr-4 rounded-none md:ml-6 bg-yellow-800 h-11"
          onClick={setOpenForm}
        >
          <UserPlusIcon className="h-7 w-7" />
          <p className="mt-1"> Agregar Proyecto</p>
        </Button>
      </div>
      {users.length === 0 ? (
        <Typography variant="h3" color="gray" className="mx-auto text-center">
          "No hay proyectos en esta area"
        </Typography>
      ) : (
        <table className="mt-4 w-full min-w-max table-auto text-left mx-4">
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
            {users.map(
              (
                {
                  p_id_proyecto,
                  p_titulo,
                  p_categoria,
                  p_titulo_nivel,
                  p_tipo_nivel,
                  p_reforma,
                  p_codigo,
                  p_estado,
                },
                index
              ) => {
                const isLast = index === users.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={p_id_proyecto}>
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
                      {p_reforma ? (
                        <Chip
                          size="sm"
                          variant="ghost"
                          value="Reforma"
                          color="yellow"
                          className="w-max"
                        />
                      ) : (
                        ""
                      )}
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
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          size="sm"
                          variant="ghost"
                          value={p_codigo}
                          color={"cyan"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          size="sm"
                          variant="ghost"
                          value={p_estado ? "Habilitado" : "Deshabilitado"}
                          color={p_estado ? "green" : "cyan"}
                        />
                      </div>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Tooltip content="Configurar proyecto">
                        <IconButton variant="text" color="blue-gray">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
