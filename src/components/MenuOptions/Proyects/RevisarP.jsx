import { React, useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import {
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";
import Lottie from "lottie-react";
import anim_settings from "../../../../public/Anim/proyects_anim.json";
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
    label: "Participantes",
    value: "Participantes",
  },
  {
    label: "Flujo",
    value: "Flujo",
  },
  {
    label: "Accion",
    value: "Accion",
  },
  {
    label: "Añadir documentos",
    value: "Añadir documentos",
  },
  {
    label: "Html",
    value: "Html",
  },
];
export default function RevisarP() {
  return (
    <div className="bg-white h-full mb-10">
      <DialogHeader className="justify-between">
        <div className="flex items-center gap-3">
          <div className="-mt-px flex flex-col">
            Aqui va el titulo del proyecto
          </div>
        </div>
      </DialogHeader>
      <DialogBody className="shadow-none">
        <Tabs value="Html" orientation="vertical">
          <TabsHeader className="w-32">
            {data.map(({ label, value }) => {
              if (value !== "Html") {
                return (
                  <Tab key={label} value={value}>
                    {label}
                  </Tab>
                );
              }
            })}
          </TabsHeader>
          <TabsBody>
            {data.map(({ value }) => {
              if (value === "Documento") {
                return (
                  <TabPanel key={value} value={value} className="py-0">
                    Documento
                  </TabPanel>
                );
              } else if (value === "Comentarios") {
                return (
                  <TabPanel key={value} value={value} className="py-0">
                    Comentarios
                  </TabPanel>
                );
              } else if (value === "Participantes") {
                return (
                  <TabPanel key={value} value={value} className="py-0">
                    Participantes
                  </TabPanel>
                );
              } else if (value === "Flujo") {
                return (
                  <TabPanel key={value} value={value} className="py-0">
                    Flujo
                  </TabPanel>
                );
              } else if (value === "Accion") {
                return (
                  <TabPanel key={value} value={value} className="py-0">
                    Accion
                  </TabPanel>
                );
              } else if (value === "Añadir documentos              ") {
                return (
                  <TabPanel key={value} value={value} className="py-0">
                    Añadir documentos
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
      </DialogBody>
      <DialogFooter className="justify-between"></DialogFooter>
    </div>
  );
}
