import React from "react";
import { Dialog, DialogHeader } from "@material-tailwind/react";
import Lottie from "lottie-react";
import anim from "../../../public/Anim/loading_anim.json";
export default function Loading() {
  return (
    <Dialog open={true} className="w-9" size="sm">
      <DialogHeader>
        <div className="mx-auto">
          <Lottie animationData={anim} className="w-20 mx-auto" />
        </div>
      </DialogHeader>
    </Dialog>
  );
}
