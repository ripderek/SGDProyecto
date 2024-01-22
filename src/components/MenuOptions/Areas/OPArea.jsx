import { React, Fragment, useState, useEffect } from "react";
import {
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tab,
  TabsBody,
  Tabs,
  TabsHeader,
} from "@material-tailwind/react";
import UsersAreas from "../Areas/UsersAreas";
import Loading from "@/components/loading";

//prueba para dibujar el arbol
import Arbol from "../Areas/VerArbol";
import OpProyectos from "../Proyects/OpProyectos";
import EditarArea from "./EditarArea";
import CambiarFoto from "./CambiarFoto";
import CrearUsuarioArea from "./CrearUsuarioArea";
export default function OPArea(idArea) {
  const [loading, setLoading] = useState(false);
  const [UserAreaData, setUserAreaData] = useState([]);

  const [state, setState] = useState({
    openUsers: false,
    openAreas: false,
    openJerarquia: false,
    openProyectos: false,
    openEditarArea: false,
    openCambiarFoto: false,
    openCrearUsuario: false,
    fondo: true,
  });

  const handleOption = (option) => {
    setState({
      openUsers: option === "openUsers",
      openAreas: option === "openAreas",
      openJerarquia: option === "openJerarquia",
      openProyectos: option === "openProyectos",
      openEditarArea: option === "openEditarArea",
      openCambiarFoto: option === "openCambiarFoto",
      openCrearUsuario: option === "openCrearUsuario",
      fondo: false,
    });
  };

  const resetOptions = () => {
    setState(initialState);
  };

  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    setLoading(true);
    try {
      const resultdata = await fetch(
        process.env.NEXT_PUBLIC_ACCESLINK +
          "area/data_area_id/" +
          idArea.idArea,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const dataU = await resultdata.json();
      setUserAreaData(dataU);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  //funcion que se activa cada vez que se anade un nuevo usuario para ver el listado
  const ver_listado = (valor) => {
    if (valor) handleOption("openUsers");
  };
  return (
    <div className="bg-white h-auto">
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        ""
      )}
      <DialogHeader className="justify-between">
        <div className="flex items-center gap-3">
          <div className="-mt-px flex flex-col">{UserAreaData.nombrearea}</div>
        </div>
      </DialogHeader>
      <DialogBody divider={true}>
        <Fragment>
          <div className="bg-white">
            <Tabs orientation="vertical" className="p-3">
              <TabsHeader className="w-32">
                <Tab
                  onClick={() => handleOption("openUsers")}
                  key={"Usuarios"}
                  value={"Usuarios"}
                >
                  Usuarios
                </Tab>
                <Tab
                  onClick={() => handleOption("openCrearUsuario")}
                  key={"Crear Usuario"}
                  value={"Crear Usuario"}
                >
                  Crear Usuario
                </Tab>
                <Tab
                  onClick={() => handleOption("openProyectos")}
                  key={"Proyectos"}
                  value={"Proyectos"}
                >
                  Proyectos
                </Tab>
                <Tab
                  onClick={() => handleOption("openJerarquia")}
                  key={"Jerarquia"}
                  value={"Jerarquia"}
                >
                  Jerarquia
                </Tab>
                <Tab
                  onClick={() => handleOption("openEditarArea")}
                  key={"Editar Datos"}
                  value={"Editar Datos"}
                >
                  Editar Datos
                </Tab>
                <Tab
                  onClick={() => handleOption("openCambiarFoto")}
                  key={"Cambiar foto"}
                  value={"Cambiar foto"}
                >
                  Cambiar foto
                </Tab>
              </TabsHeader>
              <TabsBody className="overflow-x-auto">
                {state.openUsers ? <UsersAreas id={idArea.idArea} /> : ""}
                {state.openJerarquia ? <Arbol idarea={idArea.idArea} /> : ""}
                {state.openProyectos ? <OpProyectos id={idArea.idArea} /> : ""}
                {state.openEditarArea ? (
                  <EditarArea id_user={idArea.idArea} />
                ) : (
                  ""
                )}
                {state.openCambiarFoto ? (
                  <CambiarFoto id_user={idArea.idArea} />
                ) : (
                  ""
                )}
                {state.openCrearUsuario ? (
                  <CrearUsuarioArea
                    id_user={idArea.idArea}
                    ver_listado={ver_listado}
                  />
                ) : (
                  ""
                )}
                {state.fondo ? (
                  <div>
                    <div className="flex justify-center mt-7">
                      <img
                        className="ml-5 h-80 w-80 rounded-full border-4 border-yellow-600 center opacity-30"
                        src={
                          process.env.NEXT_PUBLIC_ACCESLINK +
                          "area/Areaimagen/" +
                          idArea.idArea
                        }
                        alt="User image"
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </TabsBody>
            </Tabs>
          </div>
        </Fragment>
      </DialogBody>
      <DialogFooter className="justify-between"></DialogFooter>
    </div>
  );
}
