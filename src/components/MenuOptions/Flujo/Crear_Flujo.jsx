import {
    Typography,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    IconButton,
    Chip,
    Drawer,
    DialogFooter,
    Card,
  } from "@material-tailwind/react";
  import axios from "axios";
  import { useState, useEffect } from "react";
  const TABLE_HEAD = [
    "Titulo",
    "Descripcion",
    "Acepta varias Area",
    "Estado",
    "Editar",
  ];
  import { PencilIcon } from "@heroicons/react/24/solid";

export default function Crear_Flujo({ handlerFlujo }) {
    const [users, setUsers] = useState([]);
    const [openRight, setOpenRight] = useState(false);

    const openDrawerRight = () => setOpenRight(true);
    const closeDrawerRight = () => setOpenRight(false);
  useEffect(() => {
    load();
  }, []);
  const load = async () => {

    //ojito aqui hay que realizar un cambio  ya que solo deben mostrarle los niveles que tienen estado true 
    const result = await fetch("http://localhost:4000/api/flujo/Ver_niveles_activos", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await result.json();
    setUsers(data);
  };
  return (
    <div>
    <Dialog size="sm" open={true} className="rounded-none">
      <DialogHeader className="bg-gray-200">
        Crear Flujo de trabajo
        <Button
          color="red"
          variant="text"
          size="sm"
          className="!absolute top-3 right-3"
          onClick={() => handlerFlujo(false)}
        >
          <Typography variant="h5" color="blue-gray">
            X
          </Typography>
        </Button>
      </DialogHeader>
      <DialogBody>
      <div className="mx-auto text-end items-end justify-items-end">
        <Button color="yellow" className="rounded-none mt-2 " onClick={openDrawerRight}>Ver Niveles</Button>
      </div>
      
        <table className="mt-4 w-auto table-auto text-left">
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
      <DialogFooter>
      <Drawer
        placement="right"
        open={openRight}
        onClose={closeDrawerRight}
        className="p-4 overflow-x-scroll"
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Seleccionar Nivel
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={closeDrawerRight}
          >
            X
          </IconButton>
        </div>
        {users.map((user) => (
                    <Card className="mt-2 h-auto bg-blue-gray-50 rounded-none ">
      
                        <input type="text" value={user.r_titulo} className="px-2 mt-2 bg-blue-gray-50 text-black font-semibold w-full" disabled/>
                        <input type="text" value={user.r_descripcion} className=" px-2 mt-1 bg-blue-gray-50 text-black  w-full" disabled/>
                        <div className="w-max">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value=    {user.r_cardiniladad ? "Acepta varias area" : "Solo una"}
                        color={user.r_cardiniladad ? "green" : "blue-gray"}
                        className=" mt-1 ml-2"
                      />
                    </div>
                        <Button
                          className="bg-yellow-900  p-2 mx-7 mb-2 mt-2"
                        >
                           Seleccionar
                        </Button>
             
                     
                    </Card>
                  ))}
      </Drawer>
      </DialogFooter>
    </Dialog>
  </div>
  )
}
