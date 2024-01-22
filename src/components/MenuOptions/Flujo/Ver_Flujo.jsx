import {
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Loader } from "@/components/Widgets";

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
  //const [users, setUsers] = useState([]);
  const [espacio, setEspacio] = useState(0);
  const sumar = () => {
    setEspacioFlecha(espacioFlecha + 3), setEspacio(espacio + 300);
  };
  const [posiciones, setPosiciones] = useState([]);

  const verFlujo = (users) => {
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
    load().then(() => {
      // Llamar a la función después de obtener la información
      //tuFuncionDespuesDeCargarDatos();
    });
  }, []);
  const load = () => {
    setLoader(true);
    // Retorna la promesa directamente sin el uso de async/await
    return fetch(
      process.env.NEXT_PUBLIC_ACCESLINK + "flujo/Ver_flujo/" + idTipoFlujo,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    )
      .then((result) => result.json())
      .then((data) => {
        //setUsers(data);
        setLoader(false);
        verFlujo(data);
      });
  };
  const [loading, setLoader] = useState(false);

  //constante para retornar el div con las los names xd
  return (
    <div>
      {loading && <Loader />}
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
          <div className="relative overflow-scroll mx-auto items-center text-center ml-7">
            <div className="relative  w-auto h-16 mb-16 ">
              {/* 
              <button onClick={verFlujo}>Cargar Flujo</button>
              */}
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
                      className="w-60 text-center text-lg  font-semibold	text-black bg-transparent"
                      disabled
                      value={task.titulo}
                    />
                    <input
                      className="w-60 text-center text-lg 	text-black bg-transparent"
                      disabled
                      value={task.cardinalidad}
                    />
                    <input
                      className="w-60 text-center text-lg  font-semibold	text-black bg-transparent"
                      disabled
                      value={""}
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
