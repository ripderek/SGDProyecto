import { Fragment, React, useState, useEffect } from "react";

import {
  DialogBody,
  DialogFooter,
  Tabs,
  Tab,
  TabsHeader,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";
import Lottie from "lottie-react";
import anim_settings from "../../../../public/Anim/document_anim.json";
import NivelesProyecto from "./NivelesProyecto";
import SubirNivel from "./SubirNivel";
export default function Verpdf({ link, id, admin }) {
  const data = [
    {
      label: "Documento",
      value: "Documento",
    },
    {
      label: "Comentarios",
      value: "Comentarios",
    },
    {
      label: "Niveles",
      value: "Niveles",
    },
    {
      label: "Revisiones",
      value: "Revisiones",
    },
    {
      label: "Firmas",
      value: "Firmas",
    },
    {
      label: "Subir Nivel",
      value: "Subir Nivel",
    },
    {
      label: "Html",
      value: "Html",
    },
  ];
  //hacer una peticion para cargar los datos del proyecto para saber si tiene un flujo
  //y tambien para habilitar el boton subir de nivel
  const [users, setUsers] = useState([]);
  const [users2, setUsers2] = useState([]);

  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    //Cargar la lista de usuarios
    const result = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK + "proyects/data_pro/" + id,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    const data = await result.json();
    setUsers(data);

    const result2 = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK + "proyects/estados_niveles/" + id,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    const data2 = await result2.json();
    setUsers2(data2);
    console.log(data2);
  };
  return (
    <div className="bg-white h-auto">
      <DialogBody divider={true}>
        <Fragment>
          <div className="bg-white">
            <Tabs value="Html" orientation="vertical">
              <TabsHeader className="w-32">
                {data.map(({ label, value }) => {
                  if (value != "Html") {
                    if (value === "Niveles") {
                      if (users.length != 0)
                        return (
                          <Tab key={label} value={value}>
                            {label}
                          </Tab>
                        );
                    } else if (value === "Subir Nivel") {
                      if (admin === "Admin" && users2.length === 1)
                        if (users2[0].r_estado) {
                          return (
                            <Tab key={label} value={value}>
                              {label}
                            </Tab>
                          );
                        }
                    } else {
                      return (
                        <Tab key={label} value={value}>
                          {label}
                        </Tab>
                      );
                    }
                  }
                })}
              </TabsHeader>
              <TabsBody>
                {data.map(({ value }) => {
                  if (value === "Documento") {
                    return (
                      <TabPanel key={value} value={value} className="py-0">
                        <iframe
                          src={link}
                          height="100%"
                          width="100%"
                          className="h-screen"
                        />
                      </TabPanel>
                    );
                  } else if (value === "Niveles") {
                    return (
                      <TabPanel key={value} value={value} className="py-0">
                        <NivelesProyecto id={id} />
                      </TabPanel>
                    );
                  } else if (value === "Subir Nivel") {
                    return (
                      <TabPanel key={value} value={value} className="py-0">
                        <SubirNivel id_proyect={id} />
                      </TabPanel>
                    );
                  } else {
                    return (
                      <TabPanel key={value} value={value} className="py-0">
                        <Lottie
                          animationData={anim_settings}
                          className="w-80 md:w-2/5 mx-auto"
                        />
                      </TabPanel>
                    );
                  }
                })}
              </TabsBody>
            </Tabs>
          </div>
        </Fragment>
      </DialogBody>
      <DialogFooter className="justify-between"></DialogFooter>
    </div>
  );
}
