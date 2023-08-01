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
  Input,
  Alert,
} from "@material-tailwind/react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

import axios from "axios";
import { useState, useEffect } from "react";

export default function Ver_Flujo({ handleVerFLujo, idTipoFlujo }) {
  const [styleC, setStyleC] = useState(
    "flex flex-col gap-1 mb-10 bg-lime-400 "
  );
  const [styleN, setStyleN] = useState(
    "flex flex-col gap-1 mb-10 bg-blue-gray-50"
  );
  const [styleF, setStyleF] = useState(
    "flex flex-col gap-1 mb-10 bg-yellow-100"
  );
  const [users, setUsers] = useState([]);
  const [espacio, setEspacio] = useState(0);
  const sumar = () => {
    setEspacioFlecha(espacioFlecha + 3), setEspacio(espacio + 300);
  };
  const [posiciones, setPosiciones] = useState([]);

  const verFlujo = () => {
    console.log("dibujando ");
    var x = 0;
    // x += 300;
    var espacioFlecha = 250;
    var posicion1 = [];
    var cabecera = true;
    for (let i = 0; i < users.length; i++) {
      //aqui dibujar primero la cabezera
      if (cabecera) {
        posicion1 = [
          ...posicion1,
          {
            pos_x: x,
            titulo: users[i].r_titulo_cabecera,
            cardinalidad: users[i].r_cardinalidad_cabecera
              ? "Muchas areas"
              : "Solo permite una area",
            num: posicion1.length,
            espacioFlecha: espacioFlecha,
          },
        ];
        cabecera = false;
        x += 300;
        espacioFlecha += 3;
      }
      //dibujar el resto en orden
      posicion1 = [
        ...posicion1,
        {
          pos_x: x,
          titulo: users[i].r_titulo_hijo,
          cardinalidad: users[i].r_cardinalidad_hijo
            ? "Muchas areas"
            : "Solo permite una area",
          num: posicion1.length,
          espacioFlecha: espacioFlecha,
        },
      ];
      x += 300;
      espacioFlecha += 3;
    }
    setPosiciones(posicion1);
    console.log(posicion1);
  };
  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    //ojito aqui hay que realizar un cambio  ya que solo deben mostrarle los niveles que tienen estado true
    const result = await fetch(
      "http://localhost:4000/api/flujo/Ver_flujo/" + idTipoFlujo,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    const data = await result.json();
    setUsers(data);
  };
  //constante para retornar el div con las los names xd
  return (
    <div>
      <Dialog size="xl" open={true} className="rounded-none">
        <DialogHeader className="bg-gray-200">
          Ver flujo
          <Button
            color="red"
            variant="text"
            size="sm"
            className="!absolute top-3 right-3"
            onClick={() => handleVerFLujo(false)}
          >
            <Typography variant="h5" color="blue-gray">
              X
            </Typography>
          </Button>
        </DialogHeader>
        <DialogBody className=" w-auto">
          <div className="relative overflow-scroll">
            <div className="relative  w-auto h-16 mb-16 ">
              <button onClick={verFlujo}>Cargar Flujo</button>
              {posiciones.map((task) => (
                <div
                  className="absolute mb-20"
                  style={{ left: task.pos_x, top: "20px" }}
                >
                  <div
                    className={
                      task.num === 0
                        ? styleC
                        : task.num === posiciones.length - 1
                        ? styleF
                        : styleN
                    }
                  >
                    <input
                      className="w-60 text-center text-lg  font-semibold	text-black"
                      disabled
                      value={task.titulo}
                    />
                    <input
                      className="w-60 text-center text-lg 	text-black"
                      disabled
                      value={task.cardinalidad}
                    />
                    <input
                      className="w-60 text-center text-lg  font-semibold	text-black"
                      disabled
                      value={task.length - 1 === 0 ? "Inicio" : ""}
                    />
                  </div>
                  {task.num === posiciones.length - 1 ? (
                    ""
                  ) : (
                    <ArrowRightIcon
                      className="h-10 w-10 absolute"
                      style={{ left: task.espacioFlecha, top: "10px" }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
}
