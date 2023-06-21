import React, { Fragment } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
export default function CardsNotification() {
  return (
    <Fragment>
      <Card className="mt-6 w- h-auto bg-blue-gray-50 shadow-2xl">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Titulo Notificacion
          </Typography>
          <Typography>Cuerpo de la notificacion</Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button className="bg-yellow-900">Read More</Button>
        </CardFooter>
      </Card>
    </Fragment>
  );
}
