import { React, useState, useEffect, Fragment } from "react";
import fileDownload from "js-file-download";


import {
    Card,
    Input,
    Button,
    Typography,
    Drawer,
    CardBody,
    Avatar,
    CardFooter,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

import axios from "axios"

export default function Firmar() {
    const [file, setFile] = useState(null);
    const [fileP12, setFileP12] = useState(null);

    const [descripcion, setDescripcion] = useState("");

    const ImagePreview = (e) => {
        try {
            setFile(e.target.files[0]);
        } catch (error) {
            console.log(error);
        }
    };
    const P12PREVIEW = (e) => {
        try {
            setFileP12(e.target.files[0]);
        } catch (error) {
            console.log(error);
        }
    };
    const HandleSUbumit = async (e) => {
        /*
        try {
            const result = await axios.post(
                process.env.NEXT_PUBLIC_ACCESLINK + "proyects/FirmarPDF",
                { hola: "hola" },
                {
                    withCredentials: true,
                }
            );
            //alert(result.data.message);
            console.log(result);
            alert("funciono");
        } catch (error) {
            console.log(error);
            alert("No funciono");
            //alert(error.response.data.message);
        } */
        //firmar con el server de python xdxd skere modod diablo
        //http://127.0.0.1:81/
        //http://192.168.1.22:81/
        const form = new FormData();
        form.append("pdf", file);
        form.append("firma", fileP12);
        form.append("palabra_secreta", descripcion);
        //http://192.168.2.102:81
        //mia john 192.168.0.100:81
        await axios({
            method: "post",
            url: "http://192.168.0.100:81/procesar",
            data: form,
            responseType: "blob",
            withCredentials: false,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(async (res) => {
            console.log(res.data);
            //fileDownload(res.data, 'archiv.pdf');

            // Convertir el Blob del PDF en un archivo File
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

            //const pdfFile = new File([pdfBlob], 'archivo.pdf');
            // Crear un archivo File a partir del Blob
            const pdfFile = new File([pdfBlob], 'archivo.pdf', { type: 'application/pdf' });

            // Crear un objeto FormData para adjuntar el archivo PDF
            const formData = new FormData();
            formData.append('file', pdfFile);

            // Realizar la solicitud POST al servidor
            await axios({
                method: 'post',
                url: process.env.NEXT_PUBLIC_ACCESLINK + "firma/guardar_pdf_firma",
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(async (response) => {
                    console.log(response);
                    alert('PDF guardado con éxito');
                })
                .catch((error) => {
                    // Maneja los errores de la solicitud aquí
                    console.error('Error en la solicitud:', error);
                });


        });
        /*
        try {
            const result = await axios.post(
                "http://192.168.1.22:81/procesar",
                form,
                {
                    withCredentials: false,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }

            ).then((res) => {
                fileDownload(res.archivo_pdf_para_enviar_al_cliente, "documento.pdf");
                console.log(res);
            });
            //alert(result.data.message);
            console.log(result);
            alert("funciono");
        } catch (error) {
            console.log(error);
            alert("No funciono");
            //alert(error.response.data.message);
        }
        */
    };

    return (
        <div>
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Firmar Documento de prueba
                </Typography>
                <form className="">
                    <div className="mb-4 flex flex-col gap-6 mt-3">
                        Documento PDF a firmar
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={ImagePreview}
                            className="mx-auto items-center"
                        />
                        Archivo p12
                        <input
                            type="file"
                            accept=".p12"
                            onChange={P12PREVIEW}
                            className="mx-auto items-center"
                            label="Archivo P12"
                        />
                        <Input
                            size="lg"
                            label="Contrasena"
                            required
                            onChange={(e) => setDescripcion(e.target.value)}
                            value={descripcion}
                        />
                    </div>
                    <Button
                        className="mt-6 rounded-none"
                        fullWidth
                        color="green"
                        onClick={HandleSUbumit}
                    >
                        Firmar
                    </Button>
                </form>
            </Card>
        </div>

    )
}
