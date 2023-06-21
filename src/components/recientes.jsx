import { Inter } from "next/font/google";
import Navbar1 from "../components/navbar1";
import { Typography } from "@material-tailwind/react";
import CardsHome from "./CardsHome";

const inter = Inter({ subsets: ["latin"] });

export default function Recientes() {
  return (
    <div className={` ${inter.className}`}>
      <div className="border-b-light-green-900 border-b-4 ">
        <Typography
          as="a"
          href="#"
          variant="h3"
          className="mr-4 ml-2 cursor-pointer py-1.5"
        >
          Recien subidos
        </Typography>
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
