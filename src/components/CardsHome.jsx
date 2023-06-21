import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function CardsHome() {
  return (
    <Card className="mt-16 w-72  mb-7 mx-8 shadow-2xl">
      <CardHeader color="blue-gray" className="relative h-72">
        <img src="/img/Home/Portada.png" layout="fill" />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Reglamento de tutorias academicas y de titulacion.
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button className="bg-yellow-800">Leer</Button>
      </CardFooter>
    </Card>
  );
}
