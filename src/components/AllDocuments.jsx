import React from "react";
import { Inter } from "next/font/google";
import Navbar1 from "../components/navbar1";
import { Typography, Button } from "@material-tailwind/react";
import CardsHome from "./CardsHome";
const inter = Inter({ subsets: ["latin"] });

export default function AllDocuments() {
  return (
    <div className={`${inter.className}`}>
      <div className="flex border-b-light-green-900 border-b-4  ">
        <Typography
          as="a"
          href="#"
          variant="h3"
          className="mr-4 ml-5 cursor-pointer py-1.5  "
        >
          Todos
        </Typography>
        <Button className=" flex mt-1 md:mr-4 rounded-none md:ml-6 bg-light-green-900 h-11">
          <p className="mt-1">Ver más</p>
        </Button>
      </div>
      <div className="flex subidos bg-blue-gray-50 h-full">
        <CardsHome />
        <CardsHome />
        <CardsHome />
        <CardsHome />
      </div>
    </div>
  );
}
