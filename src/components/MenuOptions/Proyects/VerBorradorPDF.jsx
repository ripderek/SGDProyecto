import { React, Fragment } from "react";
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
import anim_settings from "../../../../public/Anim/file_anim.json";
export default function VerBorradorPDF({ link }) {
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
      label: "Html",
      value: "Html",
    },
  ];
  return (
    <div className="bg-white h-auto">
      <DialogBody divider={true}>
        <Fragment>
          <div className="bg-white">
            <Tabs value="Html" orientation="vertical">
              <TabsHeader className="w-32">
                {data.map(({ label, value }) => {
                  if (value != "Html") {
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
                        <iframe
                          src={link}
                          height="100%"
                          width="100%"
                          className="h-screen"
                        />
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
