import { React, useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
export default function User_area(id_area) {
  //consultar y almacenar los datos del area al que pertenece este usuario
  const [data_area, setDataArea] = useState([]);
  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    try {
      //almacenar datos del usuario con respecto al area para que ingrese a las opciones de usuario administrador de area
      //y para mostrar opciones
      const resultdata = await fetch(
        process.env.NEXT_PUBLIC_ACCESLINK +
          "area/data_area_id/" +
          id_area.id_area,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const dataU = await resultdata.json();
      setDataArea(dataU);
    } catch (error) {
      //Mostrar algun error por consola
      console.log(error);
    }
  };

  return (
    <div className="bg-blue-gray-50 ">
      <Typography variant="h1" className="ml-5">
        {data_area.nombrearea}
      </Typography>
    </div>
  );
}
