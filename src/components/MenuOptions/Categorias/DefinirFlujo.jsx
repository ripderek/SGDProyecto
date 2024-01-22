import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";

export default function DefinirFlujo({ cerrar }) {
  return (
    <>
      <Dialog open={true} handler={cerrar} size="xxl">
        <DialogHeader className="bg-blue-gray-100">
          Definir flujo
          <Button
            color="red"
            variant="text"
            size="md"
            className="!absolute top-3 right-3"
            onClick={cerrar}
          >
            <Typography variant="h5" color="blue-gray">
              X
            </Typography>
          </Button>
        </DialogHeader>
        <DialogBody>
          The key to more success is to have a lot of pillows. Put it this way,
          it took me twenty five years to get these plants, twenty five years of
          blood sweat and tears, and I&apos;m never giving up, I&apos;m just
          getting started. I&apos;m up to something. Fan luv.
        </DialogBody>

        {/* 
        <DialogFooter>
          <Button variant="text" color="red" onClick={cerrar} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={cerrar}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
*/}
      </Dialog>
    </>
  );
}
