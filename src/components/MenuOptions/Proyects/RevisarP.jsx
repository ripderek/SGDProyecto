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
  Card,
  CardBody,
  Button,
} from "@material-tailwind/react";
import Lottie from "lottie-react";
import anim_settings from "../../../../public/Anim/verification_anim.json";
import VerPdfRevision from "./VerPdfRevision";

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
export default function RevisarP({ idproyecto }) {
  const [areasdata, setAreasData] = useState([]);
  const cookies = new Cookies();
  const [id, setID] = useState(0);
  useEffect(() => {
    load();
  }, []);
  // cookies.get("id_user")
  const load = async () => {
    //Cargar la lista de las areas
    const user = {
      p_id_user: cookies.get("id_user"),
      p_id_proyect: idproyecto,
    };
    const result = await axios.post(
      process.env.NEXT_PUBLIC_ACCESLINK + "proyects/roles_proyecto",
      user,
      {
        withCredentials: true,
      }
    );
    setAreasData(result.data);
    console.log(result.data);

    //aqui recibir el id del documento que se necesita ver xd
    const result2 = await fetch(
      process.env.NEXT_PUBLIC_ACCESLINK + "proyects/UltimoPDF/" + idproyecto,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    const data = await result2.json();
    //setUsers(data);
    console.log(data);
    setID(data.r_id);

    //setLink(process.env.NEXT_PUBLIC_ACCESLINK + "proyects/pdf/" + users.d_id);
  };
  const AceptarDoc = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "proyects/SubirLevel/" + idproyecto,
        "hola xd",
        {
          withCredentials: true,
        }
      );
      alert("Se acepto el documento");
      //console.log(result);
    } catch (error) {
      alert("Error");
      console.log(error);
    }
  };
  return (
    <div className="bg-white h-full mb-10">
      <DialogHeader className="justify-between">
        <div className="flex items-center gap-3">
          <div className="-mt-px flex flex-col">{areasdata.p_titulo}</div>
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
                    <Card>
                      <CardBody>
                        <div className="text-black">
                          <Button
                            className="mb-8 rounded-none p-4"
                            color="green"
                            onClick={AceptarDoc}
                          >
                            Aceptar documento
                          </Button>
                          <Button
                            className="mb-8 rounded-none p-4 ml-6"
                            color="red"
                          >
                            Rechazar documento
                          </Button>
                        </div>

                        <iframe
                          src={
                            process.env.NEXT_PUBLIC_ACCESLINK +
                            "proyects/pdf/" +
                            id
                          }
                          height="100%"
                          width="100%"
                          className="h-screen"
                        />
                      </CardBody>
                    </Card>
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
