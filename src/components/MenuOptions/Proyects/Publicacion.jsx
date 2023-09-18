import { React, useState, useEffect, Fragment } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import {
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
  Card,
  CardBody,
  Button,
  Dialog,
  Input,
  Chip,
} from "@material-tailwind/react";
import Lottie from "lottie-react";
import anim_settings from "../../../../public/Anim/verification_anim.json";
import ListDocumentosExtras from "./ListDocumentosExtras";
import Participantes from "./Participantes";
import Loading from "@/components/loading";
import LisDocumentosContraportadas from "./LisDocumentosContraportadas";

export default function Publicacion({ idproyecto, idarea }) {
  const [areasdata, setAreasData] = useState([]);
  const cookies = new Cookies();
  const [id, setID] = useState(0);
  const [descripcion, setDescripcoin] = useState("");
  const [RolUser, setRolUser] = useState([]);

  //para abrir la alerta de rechazar el documento
  const [openRechazar, setOpenRechazar] = useState(false);
  const handleOpen = () => setOpenRechazar(!openRechazar);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
  }, []);
  // cookies.get("id_user")
  const load = async () => {
    try {
      setLoading(true);
      const resultdata = await fetch(
        process.env.NEXT_PUBLIC_ACCESLINK +
          "proyects/datos_revision/" +
          cookies.get("id_user") +
          "/" +
          idproyecto,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const dataU = await resultdata.json();
      setAreasData(dataU);

      //setAreasData(result.data);
      console.log(resultdata);

      //aqui recibir el id del documento que se necesita ver xd
      const result2 = await fetch(
        process.env.NEXT_PUBLIC_ACCESLINK + "proyects/UltimoPDF/" + idproyecto,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const data = await result2.json();
      //setUsers(data);
      console.log(data);
      setID(data.r_id);
      const user_data = {
        idu: cookies.get("id_user"),
        p_id_proyecto: idproyecto,
        p_id_area: idarea,
      };
      //para el rol del usuario dentro del proyecto
      const result3 = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "user/User_rol",
        user_data,
        {
          withCredentials: true,
        }
      );
      setRolUser(result3.data);

      setLoading(false);
    } catch (error) {
      alert("error");
      console.log(error);
      setLoading(false);
    }
    setLoading(false);

    //setLink(process.env.NEXT_PUBLIC_ACCESLINK + "proyects/pdf/" + users.d_id);
  };
  const AceptarDoc = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "proyects/Publicar/" + idproyecto,
        "hola xd",
        {
          withCredentials: true,
        }
      );
      alert("Se acepto el documento");
      //console.log(result);
    } catch (error) {
      alert("Error");
      console.log(error);
    }
  };
  //funcion para rechazar el level
  const Rechazar = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK + "proyects/Rechazar/" + idproyecto,
        { descripcionp: descripcion },
        {
          withCredentials: true,
        }
      );
      handleOpen();
      setLoading(false);
      //para refrescar la paguina
      location.reload();
      //console.log(result);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const Preparar = async () => {
    setLoading(true);

    try {
      const result = await axios.post(
        process.env.NEXT_PUBLIC_ACCESLINK +
          "proyects/generar_listado_participantes/" +
          idproyecto,
        {},
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      setPrepararDoc(false);
      load();
    } catch (error) {
      alert("Error");
      console.log(error);
      setLoading(false);
    }
  };
  //aqui van los estados y handlers para poder acceder a las opciones xdxd skere modo diablo
  const [openDocumento, setOpenDocumento] = useState(false);
  const HandlerOpenDocumento = () => {
    setOpenDocumento(true);
    setOpenParticipantes(false);
    setOpenAnadirDocs(false);
    setFondo(false);
    setOpenContraportada(false);
  };
  const [openParticipantes, setOpenParticipantes] = useState(false);
  const HandlerParticipantes = () => {
    setOpenParticipantes(true);
    setOpenDocumento(false);
    setOpenAnadirDocs(false);
    setFondo(false);
    setOpenContraportada(false);
  };
  const [openAnadirDocs, setOpenAnadirDocs] = useState(false);
  const HandlerAnadir = () => {
    setOpenAnadirDocs(true);
    setOpenParticipantes(false);
    setOpenDocumento(false);
    setFondo(false);
    setOpenContraportada(false);
  };
  const [openContraportada, setOpenContraportada] = useState(false);
  const handlerContraportada = () => {
    setOpenContraportada(true);
    setOpenAnadirDocs(false);
    setOpenParticipantes(false);
    setOpenDocumento(false);
    setFondo(false);
  };
  const [fondo, setFondo] = useState(true);
  //constantes para abrir el dialog de preparar documento
  const [prepararDoc, setPrepararDoc] = useState(false);
  const handlerPreparar = () => setPrepararDoc(!prepararDoc);
  return (
    <div className="bg-white h-full mb-10">
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        ""
      )}
      <Dialog open={openRechazar} handler={handleOpen}>
        <DialogHeader>Rechazar documento</DialogHeader>
        <DialogBody divider>
          Si rechaza el documento volverá al nivel de elaboración.
          <div className="w-full p-4">
            <Input
              label="Descripcion"
              value={descripcion}
              onChange={(e) => setDescripcoin(e.target.value)}
              required
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancelar</span>
          </Button>
          <Button variant="gradient" color="green" onClick={Rechazar}>
            <span>Aceptar</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog open={prepararDoc} handler={handlerPreparar}>
        <DialogHeader>Preparar documento</DialogHeader>
        <DialogBody divider>
          Al preparar el documento se adjuntaran todos los documentos extras
          agregados y contraportadas, además se generará un listado con los
          participantes y se habilitará sus firmas
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handlerPreparar}
            className="mr-1"
          >
            <span>Cancelar</span>
          </Button>
          <Button variant="gradient" color="green" onClick={Preparar}>
            <span>Aceptar</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <DialogHeader className="justify-between">
        <div className="w-full text-2xl text-black font-bold overflow-hidden">
          {areasdata.r_titulo}
        </div>
      </DialogHeader>
      <div className="ml-6">
        <div className="flex gap-3 w-max">
          <div className="-mt-px flex flex-col">
            <Chip color="green" value={areasdata.r_codigo} />
          </div>
          <div className="-mt-px flex flex-col">
            <Chip color="amber" value={RolUser.rol_user} />
          </div>
          {areasdata.r_reforma ? (
            <div className="-mt-px flex flex-col">
              <Chip color="blue" value="Reforma" />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <DialogBody className="shadow-none">
        <Fragment>
          <div className="bg-white">
            <Tabs orientation="vertical" className="p-3">
              <TabsHeader className="w-32">
                <Tab
                  key={"Documento"}
                  value={"Documento"}
                  onClick={HandlerOpenDocumento}
                >
                  Documento
                </Tab>
                <Tab key={"Comentarios"} value={"Comentarios"}>
                  Comentarios
                </Tab>
                <Tab
                  key={"Participantes"}
                  value={"Participantes"}
                  onClick={HandlerParticipantes}
                >
                  Participantes
                </Tab>
                <Tab
                  key={"Añadir contraportada"}
                  value={"Añadir contraportada"}
                  onClick={handlerContraportada}
                >
                  Añadir contraportada
                </Tab>
                <Tab
                  key={"Añadir documentos"}
                  value={"Añadir documentos"}
                  onClick={HandlerAnadir}
                >
                  Documentos extras
                </Tab>
              </TabsHeader>
              <TabsBody className="overflow-x-auto">
                {openDocumento ? (
                  <Card>
                    <CardBody>
                      <div className="text-black">
                        {areasdata.r_documento_preparado ? (
                          <Button
                            className="mb-8 rounded-none p-4"
                            color="green"
                            onClick={AceptarDoc}
                          >
                            Publicar Documento
                          </Button>
                        ) : (
                          ""
                        )}

                        <Button
                          className="mb-8 rounded-none p-4 ml-6"
                          color="red"
                          onClick={handleOpen}
                        >
                          Rechazar documento
                        </Button>
                        {!areasdata.r_documento_preparado ? (
                          <Button
                            className="mb-8 rounded-none p-4 ml-6"
                            color="yellow"
                            onClick={handlerPreparar}
                          >
                            Preparar Documento
                          </Button>
                        ) : (
                          ""
                        )}
                      </div>

                      <iframe
                        src={
                          process.env.NEXT_PUBLIC_ACCESLINK +
                          "proyects/pdf2/" +
                          id
                        }
                        height="100%"
                        width="100%"
                        className="h-screen"
                      />
                    </CardBody>
                  </Card>
                ) : (
                  ""
                )}
                {openParticipantes ? (
                  <Participantes
                    idproyecto={idproyecto}
                    idarea={idarea}
                    agregarRevisores={false}
                    permite_agregar={
                      areasdata.r_rol_user === "Admin" ? true : false
                    }
                  />
                ) : (
                  ""
                )}
                {openAnadirDocs ? (
                  <ListDocumentosExtras
                    idProyecto={idproyecto}
                    permite_agregar={
                      areasdata.r_rol_user === "Admin" ? true : false
                    }
                  />
                ) : (
                  ""
                )}
                {fondo ? (
                  <Lottie
                    animationData={anim_settings}
                    className="w-80 md:w-2/5 mx-auto"
                  />
                ) : (
                  ""
                )}
                {openContraportada ? (
                  <LisDocumentosContraportadas idProyecto={idproyecto} />
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
