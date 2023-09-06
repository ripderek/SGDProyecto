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
  Button,
  Dialog,
  Typography,
  Select,
  Option
} from "@material-tailwind/react";

import Lottie from "lottie-react";
import anim_settings from "../../../../public/Anim/proyects_anim.json";
import VerFlujo_Proyecto from "./VerFlujo_Proyecto";
import Participantes from "./Participantes";
import VerPdfVersiones from "./VerPdfVersiones";

//props {idproyecto, nombrearea, idarea}
export default function ProyectoPublicadosVersiones({
  idproyecto,
  nombreproyecto
}) {
  const data = [
    {
      label: "Documento",
      value: "Documento",
    },
    {
      label: "Flujo",
      value: "Flujo",
    },
    {
      label: "Participantes",
      value: "Participantes",
    },
    {
      label: "Informacion",
      value: "Informacion",
    },
    {
      label: "Html",
      value: "Html",
    },
  ];
  const cookies = new Cookies();
  const [areasdata, setAreasData] = useState([]);
  const [openD, setOpenD] = useState(false);
  const [users2, setUsers2] = useState([]);
  const [proyectoEdit, setProyectoEdit] = useState(true);

  //para el combobox u url
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(0);


  const [link, setLink] = useState("");

  // cookies.get("id_user")
  const load = async () => {
    try {
      console.log(idproyecto);
      console.log(nombreproyecto);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Hacer la solicitud a la API y cargar los datos
    axios.get(process.env.NEXT_PUBLIC_ACCESLINK + 'proyects/LisComboBox/'
      + idproyecto,
      {
        withCredentials: true,
      })
      .then((response) => {
        // Mapear los datos de response.data a un formato de opciones
        const formattedOptions = response.data.map((item) => ({
          value: item.r_id_publicacion,
          label: item.r_version_p,
        }));
        setOptions(formattedOptions);
        console.log(idproyecto);
        console.log(nombreproyecto);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar las opciones:', error);
      });
  }, []); // Ejecutar solo una vez al montar el componente

  const Recargar = (valor) => {
    if (valor) {
      load();
    }
  };


  //Cargar el pdf de acuerdo a lo que se selecciona en el combobox
  const Cargarpdf = async () => {

    try {
      const result = await axios.get(
        process.env.NEXT_PUBLIC_ACCESLINK + "proyects/VerPdfUrlVersiones/" +
        selectedOption,
        {
          withCredentials: true,
        }
      );

      console.log(result);

    } catch (error) {
      //Mostrar algun error por consola
      console.log(error);
    }

  };

  return (
    <div className="bg-white h-full mb-10">
      <Dialog
        size="xxl"
        open={openD}
        handler={() => setOpenD(false)}
        className="overflow-y-scroll"
      >
        <DialogHeader className="bg-light-green-900 text-white">
          {nombreproyecto}
          <Button
            color="red"
            variant="text"
            size="md"
            className="!absolute top-3 right-3"
            onClick={() => setOpenD(false)}
          >
            <Typography variant="h5" color="white">
              X
            </Typography>
          </Button>
        </DialogHeader>

        <VerPdfVersiones link={link} ></VerPdfVersiones>
      </Dialog>
      <DialogHeader className="justify-between">
        <div className="flex items-center gap-3">
          <div className="-mt-px flex flex-col">{nombreproyecto}</div>
        </div>
      </DialogHeader>
      <DialogBody className="shadow-none">

        <div style={{ marginBottom: '16px', textAlign: 'left' }}>
          <Select
            color="teal"
            label="Selecciona la Versión"
            //value={selectedOption.toString()}
            onChange={(e) => {
              if (e) {
                setSelectedOption(e);
                console.log("Valor seleccionado:", e);
              }
            }}
          >
            {options.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </div>

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
                    {/* Aqui tiene que ir para mostara los documenteos  */}
                    <div>
                      {selectedOption === 0 ? (
                        <p>Debe seleccionar una version primero</p>
                      ) : (
                        <Button
                          onClick={() => {
                            setLink(
                              process.env.NEXT_PUBLIC_ACCESLINK +
                              "proyects/VerPdfUrlVersiones/" +
                              selectedOption
                            );
                            setOpenD(true);
                          }}
                        >
                          Abrir
                        </Button>
                      )}
                    </div>
                  </TabPanel>
                );
              } else if (value === "Flujo") {
                return (
                  <TabPanel key={value} value={value} className="py-0">
                    {/* Aqui tiene que ir para mostrar el flujo  */}
                  </TabPanel>
                );
              } else if (value === "Participantes") {
                return (
                  <TabPanel key={value} value={value} className="py-0">
                    {/* Aqui tiene que ir para mostrar los participantes  */}
                  </TabPanel>
                );
              } else if (value === "Informacion") {
                return (
                  <TabPanel key={value} value={value} className="py-0">

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
