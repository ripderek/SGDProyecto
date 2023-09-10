import { Inter } from 'next/font/google'
import Navbar1 from '../components/navbar1'
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Typography
} from "@material-tailwind/react";
import {
    Square3Stack3DIcon,
    UserCircleIcon,
    Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import Recientes from '../components/recientes';
import Footer from '../components/footer'
import AllDocuments from '@/components/AllDocuments';
const data = [
    {
        label: "Crea proyectos",
        value: "dashboard",
        title: "Trabaja con el editor de texto",
        img: "/img/Home/gdocs_edit2.gif",
        desc: `Gracias el editor de texto integrado puedes trabajar de manera
        sincrona con todos los integrantes de tu equipo, guardar historiales de borradores y firmar electronicamente.`,
    },
    {
        label: "Administra su flujo",
        value: "profile",
        title: "Crea un flujo para el proyecto",
        img: "/img/Home/bracnhes.png",
        desc: `Al crear un  proyecto puedes asignar un flujo donde se harán revisiones con aprobaciones o rechazos para finalmente publicarlo.`,
    },
    {
        label: "Publica",
        value: "settings",
        title: "Publica el documento",
        img: "/img/Home/Conoce-el-procedimiento-de-digitalización-de-documentos.jpg",
        desc: `Cuando el proyecto termine todas sus revisiones y finalmente se acepte su publicación quedará publico para todas las personas.`,
    },
    {
        label: "Automatiza versiones",
        value: "settings2",
        title: "Versión de documentos automáticas",
        img: "/img/Home/dashboard-personalizado-de-wordpress-1024x512.png",
        desc: `Puedes planificar reformas para normativas ya publicadas para así poderlas modificar y cuando se acepte su publicación se hará como una nueva versión del documento anterior.`,
    },
];


const inter = Inter({ subsets: ['latin'] })
export default function Home() {

    return (
        <div className='p-0 m-0'>
            <div className='bg-gray-900'>
                <Navbar1 />
            </div>
            <div className={` ${inter.className}`}>

                <Tabs value="dashboard">
                    <TabsHeader>
                        {data.map(({ label, value, icon }) => (
                            <Tab key={value} value={value}>
                                <div className="flex items-center gap-2">
                                    {label}
                                </div>
                            </Tab>
                        ))}
                    </TabsHeader>
                    <TabsBody>
                        {data.map(({ value, desc, title, img }) => {
                            return (
                                <TabPanel key={value} value={value}>
                                    <div className="grid   grid-flow-col border-b-blue-gray-900 border-b-4 ">
                                        <div className=" cuadro row-span-3 h-80" style={{ backgroundImage: `url(${img})` }}>
                                        </div>
                                        <div className="row-span-2  w-full h-full col-span-2  text-justify">
                                            <Typography
                                                variant="h6"
                                                color="#33691e"
                                                className="mr-4 text-center items-center mx-auto cursor-pointer py-1.5 mt-0 md:mt-14 md:text-4xl text-black"
                                            >
                                                {title}
                                            </Typography>
                                            <p className='mx-5 my-5'>
                                                {desc}

                                            </p>
                                        </div>
                                    </div>
                                </TabPanel>
                            );
                        })}
                    </TabsBody>
                </Tabs>
                <Recientes />
                <Footer />
            </div>
        </div>

    )
}