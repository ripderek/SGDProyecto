import { Fragment, useState } from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
  Collapse,
  Card,
  CardBody,
  Drawer,
} from "@material-tailwind/react";
import { UserIcon } from "@heroicons/react/24/solid";
import { FaSearch } from "react-icons/fa";

export default function Navbar1() {
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const [openc, setOpenc] = useState(false);
  const toggleOpen = () => setOpenc((cur) => !cur);
  return (
    <Fragment>
      <Navbar className=" rounded-none shadow-none  bg-orange-600  p-4 ">
        <div className="flex flex-wrap items-center justify-between gap-y-4 text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            variant="h3"
            color="white"
            className="mr-4 ml-2 cursor-pointer py-1.5"
          >
            Sistema de documentación
          </Typography>

          <div className="relative flex w-full gap-4 md:w-96 ml-auto ">
            <Input
              className="pr-20"
              label=""
              variant="standard"
              placeholder="Busca documentos"
              color="white"
              containerProps={{
                className: "min-w-[350px]",
              }}
            />
          </div>
          <Button
            onClick={toggleOpen}
            className="ml-0 flex gap-1 md:mr-0 rounded-none md:ml-0  bg-light-green-900 h-11"
          >
            <FaSearch size="1.9em" />
          </Button>

          <Fragment>
            <Button
              onClick={openDrawer}
              className="ml-auto flex gap-1 md:mr-4 rounded-none md:ml-6 bg-yellow-800 h-11"
            >
              <p className="mt-1">Iniciar Sesion</p>
            </Button>{" "}
          </Fragment>
        </div>
      </Navbar>
      <Fragment>
        <Drawer
          open={open}
          onClose={closeDrawer}
          className="p-4"
          placement="right"
        >
          <div className="mb-6 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              Iniciar Sesion
            </Typography>
          </div>
          <Typography color="gray" className="mb-8 pr-4 font-normal">
            Por favor ingrese sus credenciales:
          </Typography>
          <Input
            className="pr-20"
            label="Correo"
            variant="outlined"
            placeholder="Correo"
            color="black"
            containerProps={{
              className: "min-w-[30px]",
            }}
          />
          <Input
            className="pr-20"
            label="Contraseña"
            variant="outlined"
            placeholder="Contraseña"
            color="black"
            containerProps={{
              className: "min-w-[30px] mt-4 mb-6",
            }}
          />
          <div className="flex gap-2">
            <Button size="sm" variant="outlined" color="green">
              Recuperar cuenta
            </Button>
            <Button size="sm" className="bg-light-green-900">
              Iniciar Sesion
            </Button>
          </div>
        </Drawer>
      </Fragment>
      <Fragment>
        <Collapse open={openc}>
          <Card className="my-4 mx-auto w-8/12">
            <CardBody>
              <Typography>Resultados de la búsqueda</Typography>
            </CardBody>
          </Card>
        </Collapse>
      </Fragment>
    </Fragment>
  );
}
