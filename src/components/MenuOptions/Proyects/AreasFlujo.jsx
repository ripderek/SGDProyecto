import {
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Chip,
  Checkbox,
  DialogFooter,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
const TABLE_HEAD = ["Area", "Prefijo", "Tipo", "Accion"];
import { EyeIcon } from "@heroicons/react/24/solid";
import Loading from "@/components/loading";

export default function AreasFlujo({
  handlerArea,
  datos,
  title,
  masAreas,
  padre,
}) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  //estado para pasar al siguiente nivel
  const [pasar, setPasar] = useState(false);
  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    setLoading(true);
    var nivelpublicacion = title === "Publicacion" ? true : padre;
    const result = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK + "area/Flujo/" + nivelpublicacion,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    const data = await result.json();
    setUsers(data);
    console.log(data);
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
      <Dialog size="sm" open={true} className="rounded-none">
        <DialogHeader className="bg-gray-200">
          Lista de Areas para el nivel: {title}
          <Button
            color="red"
            variant="text"
            size="sm"
            className="!absolute top-3 right-3"
            onClick={() => handlerArea(false)}
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
                No hay Areas registrados
              </Typography>
            ) : (
              ""
            )}
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.r_id_area}>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.r_nombre_area}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.r_prefijo}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.r_cabezera ? "Area Padre" : "Area Hija"}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Button
                        className="rounded-none p-2"
                        color="yellow"
                        onClick={() => (
                          datos({
                            id_area: user.r_id_area,
                            nombre: user.r_nombre_area,
                            pase_nivel: pasar,
                            cabezera: user.r_cabezera,
                          }),
                          handlerArea(false)
                        )}
                      >
                        Añadir
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="items-end text-end">
            {masAreas ? (
              <Checkbox
                name="p_cardinalidad"
                onChange={(e) => setPasar(e.target.checked)}
                label={
                  <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center font-normal"
                  >
                    ¿Ultima area para este nivel?
                  </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
              />
            ) : (
              ""
            )}
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
}
