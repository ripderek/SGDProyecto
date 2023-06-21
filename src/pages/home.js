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
import Recientes from '../components/recientes';
import Footer from '../components/footer'
import AllDocuments from '@/components/AllDocuments';


const inter = Inter({ subsets: ['latin'] })
export default function Home() {

    return (
        <div className='p-0 m-0'>
            <div className='bg-gray-900'>            <Navbar1 />
            </div>
            <div className={` ${inter.className}`}>
                <Tabs value="html">
                    <TabsHeader>
                        <Tab key="op1" value="op1">
                            Crea proyectos
                        </Tab>
                        <Tab key="op2" value="op2">
                            Administra su flujo
                        </Tab>
                        <Tab key="op3" value="op3">
                            Publica
                        </Tab>
                        <Tab key="op4" value="op4">
                            Automatiza versiones
                        </Tab>
                    </TabsHeader>
                    <TabsBody>
                        <TabPanel key="op1" value="op1" >
                            <div className="grid   grid-flow-col border-b-light-green-900 border-b-4 ">
                                <div className=" cuadro row-span-3 h-80" style={{ backgroundImage: `url("/img/Home/gdocs_edit2.gif")` }}>
                                </div>
                                <div className="row-span-2  w-full h-full col-span-2  text-justify">
                                    <Typography
                                        variant="h6"
                                        color="#33691e"
                                        className="mr-4 text-center items-center mx-auto cursor-pointer py-1.5 mt-0 md:mt-14 md:text-4xl text-black"
                                    >
                                        Trabaja con el editor de texto
                                    </Typography>
                                    <p className='mx-5 my-5'>
                                        Gracias el editor de texto integrado puedes trabajar de manera
                                        sincrona con todos los integrantes de tu equipo, guardar historiales de borradores y firmar electronicamente.
                                    </p>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel key="op2" value="op2">
                            <div className="grid   grid-flow-col border-b-blue-gray-900 border-b-4 ">
                                <div className=" cuadro row-span-3 h-80" style={{ backgroundImage: `url("/img/Home/bracnhes.png")` }}>
                                </div>
                                <div className="row-span-2  w-full h-full col-span-2  text-justify">
                                    <Typography
                                        variant="h6"
                                        color="#33691e"
                                        className="mr-4 text-center items-center mx-auto cursor-pointer py-1.5 mt-0 md:mt-14 md:text-4xl text-black"
                                    >
                                        Crea un flujo para el documento
                                    </Typography>
                                    <p className='mx-5 my-5'>
                                        Al crear un  proyecto puedes asignar un flujo donde se harán revisiones con aprobaciones o rechazos para finalmente publicarlo.
                                    </p>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel key="op3" value="op3">
                            <div className="grid   grid-flow-col border-b-blue-gray-900 border-b-4 ">
                                <div className=" cuadro row-span-3 h-80" style={{ backgroundImage: `url("/img/Home/Conoce-el-procedimiento-de-digitalización-de-documentos.jpg")` }}>
                                </div>
                                <div className="row-span-2  w-full h-full col-span-2  text-justify">
                                    <Typography
                                        variant="h6"
                                        color="#33691e"
                                        className="mr-4 text-center items-center mx-auto cursor-pointer py-1.5 mt-0 md:mt-14 md:text-4xl text-black"
                                    >
                                        Publica el documento
                                    </Typography>
                                    <p className='mx-5 my-5'>
                                        Cuando el proyecto termine todas sus revisiones y finalmente se acepte su publicación quedará publico para todas las personas.
                                    </p>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel key="op4" value="op4">
                            <div className="grid   grid-flow-col border-b-blue-gray-900 border-b-4 ">
                                <div className=" cuadro row-span-3 h-80" style={{ backgroundImage: `url("/img/Home/dashboard-personalizado-de-wordpress-1024x512.png")` }}>
                                </div>
                                <div className="row-span-2  w-full h-full col-span-2  text-justify">
                                    <Typography
                                        variant="h6"
                                        color="#33691e"
                                        className="mr-4 text-center items-center mx-auto cursor-pointer py-1.5 mt-0 md:mt-14 md:text-4xl text-black"
                                    >
                                        Versión de documentos automáticas
                                    </Typography>
                                    <p className='mx-5 my-5'>
                                        Puedes planificar reformas para normativas ya publicadas para así poderlas modificar y cuando se acepte su publicación se hará como una nueva versión del documento anterior.
                                    </p>
                                </div>
                            </div>
                        </TabPanel>
                    </TabsBody>
                </Tabs>
                <Recientes />
                <AllDocuments />
                <Footer />
            </div>
        </div>

    )
}