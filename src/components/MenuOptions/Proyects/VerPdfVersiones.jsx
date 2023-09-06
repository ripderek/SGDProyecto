import { Fragment, React, useEffect } from "react";

import {
  DialogBody,
  DialogFooter
} from "@material-tailwind/react";

export default function VerPdfVersiones({ link}) {

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    
  };

  return (
    <div className="bg-white h-auto">
      <DialogBody divider={true}>
        <Fragment>
          <div className="bg-white">
            <iframe
              src={link}
              height="100%"
              width="100%"
              className="h-screen"
            />
          </div>
        </Fragment>
      </DialogBody>
      <DialogFooter className="justify-between"></DialogFooter>
    </div>
  );
}
