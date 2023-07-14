import {
  Card,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Chip,
} from "@material-tailwind/react";
import { useState, useEffect, Fragment } from "react";
import { FaSearch } from "react-icons/fa";

export default function ListaCategorias({
  id_categoria,
  nombre_categoria,
  cerrar,
}) {
  //variables para almacenar todas las areas
  const [areasdata, setAreasData] = useState([]);

  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    //Cargar la lista de las areas

    const result = await fetch(
      "http://localhost:4000/api/proyects/categorias_proyecto",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    const data = await result.json();
    setAreasData(data);
    console.log(areasdata);
  };
  return (
    <Fragment>
      <div className="flex w-auto">
        <Input label="" variant="standard" placeholder="Buscar" color="black" />
        <Button className="flex gap-1 rounded-none bg-light-green-900 h-auto w-auto">
          <FaSearch size="1.9em" />
        </Button>
      </div>
      {areasdata.map((task) => (
        <Card
          className="mt-6 h-auto bg-blue-gray-50 shadow-2xl"
          key={task.c_categoria_id}
        >
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-1">
              {task.c_nombre_categoria}
            </Typography>

            <div className="w-max">
              <Chip
                variant="ghost"
                size="sm"
                value={task.c_prefijo}
                color="green"
              />
            </div>
            <Typography variant="" color="blue-gray" className="mb-1">
              {task.c_descripcion}
            </Typography>
          </CardBody>
          <Button
            className="bg-yellow-900"
            onClick={() => (
              id_categoria(task.c_categoria_id),
              nombre_categoria(task.c_nombre_categoria),
              cerrar(false)
            )}
          >
            Seleccionar
          </Button>
          <CardFooter className="pt-0"></CardFooter>
        </Card>
      ))}
    </Fragment>
  );
}
