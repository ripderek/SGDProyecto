import {
  Typography,
  Button,
  Tabs,
  TabsHeader,
  Tab,
  Dialog,
  DialogHeader,
  DialogBody,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";
import Editar_Empresa from "./Editar_Empresa";
import Cambiar_foto_empresa from "./Cambiar_foto_empresa";
import Lottie from "lottie-react";
import anim_settings from "../../../../public/Anim/settings_empresa.json";
import { Loader } from "@/components/Widgets";

function OP_Empresa({ handlerOpen, id_empresa }) {
  const data = [
    {
      label: "Datos",
      value: "Datos",
    },
    {
      label: "Foto",
      value: "Foto",
    },
    {
      label: "Html",
      value: "Html",
    },
  ];
  return (
    <Dialog size="sm" open={true} className="rounded-none">
      <DialogHeader className="bg-gray-200">
        Editar Empresa
        <Button
          color="red"
          variant="text"
          size="sm"
          className="!absolute top-3 right-3"
          onClick={() => handlerOpen(false)}
        >
          <Typography variant="h5" color="blue-gray">
            X
          </Typography>
        </Button>
      </DialogHeader>
      <DialogBody>
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
              if (value === "Datos") {
                return (
                  <TabPanel key={value} value={value} className="py-0">
                    <Editar_Empresa id_empresa={id_empresa} />
                  </TabPanel>
                );
              } else if (value === "Foto") {
                return (
                  <TabPanel key={value} value={value} className="py-0">
                    <Cambiar_foto_empresa id_empresa={id_empresa} />
                  </TabPanel>
                );
              } else {
                return (
                  <TabPanel key={value} value={value} className="py-0">
                    <Lottie animationData={anim_settings} />
                  </TabPanel>
                );
              }
            })}
          </TabsBody>
        </Tabs>
      </DialogBody>
    </Dialog>
  );
}

export default OP_Empresa;
