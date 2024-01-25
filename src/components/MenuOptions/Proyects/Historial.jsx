import { useState, useEffect } from "react";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  
} from "@material-tailwind/react";
import {
  HomeIcon,
  XMarkIcon,
  CheckIcon,
  PlusIcon,
  PlusCircleIcon,
  ArrowUpIcon,
  DocumentPlusIcon,
  XCircleIcon,
  UserPlusIcon,
  UserMinusIcon,
  BellIcon,
  ArchiveBoxIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import OpHistorial0 from "./OpHistorial0";
import OpHistorial3 from "./OpHistorial3";
import Loading from "@/components/loading";

export default function Historial({ id }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [tipo, setTipo] = useState(0);
  const [titulo, setTitulo] = useState("");
  const [idHistorial, setIdHistorial] = useState(0);
  const [users, setUsers] = useState([]);
  const classNameIcons = "h-4 w-4";
  const classNameTypografi = "font-normal text-gray-600 text-base";
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    setLoading(true);

    const result = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK + "proyects/Historial/" + id,
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
      <Dialog open={open} handler={handleOpen} size="xl">
        <DialogHeader>{titulo}</DialogHeader>
        <DialogBody divider className="overflow-y-scroll">
          {tipo === 0 ? (
            <OpHistorial0 idHistorial={idHistorial} />
          ) : tipo === 3 || tipo === 7 ? (
            <OpHistorial3 idHistorial={idHistorial} />
          ) : (
            ""
          )}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            color="green"
            onClick={handleOpen}
            className="rounded-none"
          >
            <span>Aceptar</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <div className="ml-5">
        <Timeline>
          {users.map((task) => (
            <TimelineItem>
              <TimelineConnector />
              <TimelineHeader>
                <TimelineIcon
                  className="p-2"
                  color={
                    task.r_tipo === 0
                      ? "red"
                      : task.r_tipo === 1
                      ? "blue"
                      : task.r_tipo === 5
                      ? "green"
                      : task.r_tipo === 6
                      ? "amber"
                      : task.r_tipo === 3
                      ? "pink"
                      : task.r_tipo === 7
                      ? "brown"
                      : task.r_tipo === 8
                      ? "light-blue"
                      : task.r_tipo === 9
                      ? "red"
                      : "orange"
                  }
                >
                  {task.r_tipo === 0 ? (
                    <XMarkIcon className={classNameIcons} />
                  ) : task.r_tipo === 2 ? (
                    <DocumentPlusIcon className={classNameIcons} />
                  ) : task.r_tipo === 5 ? (
                    <CheckIcon className={classNameIcons} />
                  ) : task.r_tipo === 1 ? (
                    <PlusIcon className={classNameIcons} />
                  ) : task.r_tipo === 6 ? (
                    <ArrowUpIcon className={classNameIcons} />
                  ) : task.r_tipo === 3 ? (
                    <PlusCircleIcon className={classNameIcons} />
                  ) : task.r_tipo === 7 ? (
                    <XCircleIcon className={classNameIcons} />
                  ) : task.r_tipo === 8 ? (
                    <UserPlusIcon className={classNameIcons} />
                  ) : task.r_tipo === 9 ? (
                    <UserMinusIcon className={classNameIcons} />
                  ) : (
                    <HomeIcon className={classNameIcons} />
                  )}
                </TimelineIcon>
                <Typography variant="h6" color="blue-gray">
                  {task.r_titulo}
                </Typography>
              </TimelineHeader>
              <TimelineBody className="pb-8">
                <Typography color="gary" className={classNameTypografi}>
                  {task.r_fecha}
                </Typography>
                <Typography color="gary" className={classNameTypografi}>
                  {task.r_detalle}
                </Typography>
                <Typography color="gary" className={classNameTypografi}>
                  {task.r_tipo === 0 ? (
                    <div>
                      <a className=" text-gray-600 font-bold">Motivo:</a>
                      <div>{" " + task.r_descripcion}</div>{" "}
                    </div>
                  ) : (
                    ""
                  )}
                </Typography>
                {task.r_boton ? (
                  <div>
                    <Button
                      className="p-2 rounded-none bg-yellow-800"
                      onClick={() => (
                        handleOpen(),
                        setTipo(task.r_tipo),
                        setTitulo(task.r_titulo),
                        setIdHistorial(task.r_id_historial)
                      )}
                    >
                      Ver detalles
                    </Button>
                  </div>
                ) : (
                  ""
                )}
              </TimelineBody>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </div>
  );
}
