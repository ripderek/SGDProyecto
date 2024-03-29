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
import Loading from "@/components/loading";

export default function ListaCategorias({
  id_categoria,
  nombre_categoria,
  cerrar,
}) {
  //variables para almacenar todas las areas
  const [areasdata, setAreasData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    //Cargar la lista de las areas
    setLoading(true);

    const result = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK + "proyects/categorias_proyecto",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    const data = await result.json();
    setAreasData(data);
    console.log(areasdata);
    setLoading(false);
  };
  return (
    <Fragment>
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        ""
      )}
      <div className="flex w-auto">
        <Input label="" variant="standard" placeholder="Buscar" color="black" />
        <Button className="flex gap-1 rounded-none bg-light-green-900 h-auto w-auto">
          <FaSearch size="1.9em" />
        </Button>
      </div>
      {areasdata.map((task) => (
        <Card
          className="mt-6 h-auto bg-blue-gray-50 shadow-2xl cursor-pointer hover:border-4 hover:border-green-600"
          key={task.c_categoria_id}
          onClick={() => (
            id_categoria(task.c_categoria_id),
            nombre_categoria(task.c_nombre_categoria),
            cerrar(false)
          )}
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
            {/*
            <Typography variant="" color="blue-gray" className="mb-1">
              {task.c_descripcion}
            </Typography>
             */}
          </CardBody>
        </Card>
      ))}
    </Fragment>
  );
}
