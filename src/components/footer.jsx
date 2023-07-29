import React from "react";
import { Typography } from "@material-tailwind/react";

export default function Footer() {
  return (
    <footer className="w-full bg-black p-8 text-white border-t-8 border-t-yellow-700">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-black text-center md:justify-between">
        <img
          src="/img/Home/Extintor_Logo1.png"
          alt="logo-ct"
          className="w-60"
        />
        <img
          src={"http://localhost:4000/api/public/Imagen_Empresa"}
          alt="logo-ct"
          className="w-56"
        />
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <Typography
              as="a"
              href="#"
              color="white"
              className="font-normal transition-colors hover:text-yellow-900 focus:text-yellow-900"
            >
              Acerca de
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="white"
              className="font-normal transition-colors hover:text-yellow-900 focus:text-yellow-900"
            >
              Licencia
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="white"
              className="font-normal transition-colors hover:text-yellow-900 focus:text-yellow-900"
            >
              UTEQ
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="white"
              className="font-normal transition-colors hover:text-yellow-900 focus:text-yellow-900"
            >
              Contacto
            </Typography>
          </li>
        </ul>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <Typography color="white" className="text-center font-normal">
        &copy; 2023 Extintor Team
      </Typography>
    </footer>
  );
}
