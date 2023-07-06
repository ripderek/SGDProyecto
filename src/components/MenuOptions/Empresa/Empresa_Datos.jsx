import { Fragment, useState, useEffect } from "react";
import { Button, Typography, Card } from "@material-tailwind/react";
//import second from '../../../../public/img/Home/'

const TABLE_HEAD = ["Direccion", "Ceulular", "Correo", ""];
const TABLE_ROWS = [
  {
    name: "Campus Central Av. Quito km. 11/2 vía a Santo Domingo de los Tsáchilas",
    job: " (+593) 5 3702-220",
    date: " info@uteq.edu.ec",
  },
];
export default function Empresa_Datos() {
  return (
    <Card className="h-full w-auto rounded-none mb-7">
      <div className=" rounded-none shadow-none w-full  p-4 border-none mx-auto ">
        <Typography variant="h5" color="blue-gray">
          Datos de la empresa
        </Typography>
        <div className="flex flex-wrap items-center  justify-between gap-y-4 ">
          <div className="">
            <Typography variant="h2" color="black" className="py-1.5">
              Universidad Técnica Estatal de Quevedo
            </Typography>
            <Typography variant="h4" color="gray" className="py-1.5">
              Campus "Ing. Manuel Haz Álvarez"
            </Typography>
          </div>
          <Fragment>
            <img
              className="h-auto w-1/5  "
              src="/img/Home/img-ident1.png"
              alt="User image"
            />
          </Fragment>
        </div>
      </div>
      <Card className=" h-full w-full rounded-none">
        <table className="  text-left ">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({ name, job, date }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={name}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {job}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {date}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue"
                      className="font-medium"
                    >
                      Editar
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </Card>
  );
}
