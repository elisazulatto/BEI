import fs from 'fs/promises';

class messageManager {
    constructor() {
        this.id = Math.random();

        //read the messages file and do some conditions and save
        this.messages = []
    }

    crearArchivo() {
        fs.writeFile("mensaje.txt", "mensaje de prueba")
            .then(() => console.log("Archivo creado"))
            .catch((error) => console.log("Hubo un error al crear el archivo"));

    }

    sendMessage(message) {
        console.log("Mensaje enviado");
        console.log(this);
    }

    readMessages() {
        fs.readFile("mensaje.txt", "utf-8")
            .then((data) => console.log(data))
            .catch((error) => console.log("Hubo un error al leer el archivo"));
    }

    async crearArchivoAsync() {
        try {
            await fs.writeFile("mensaje.txt", "mensaje de prueba");
            console.log("Archivo creado");
        } catch (error) {
            console.log("Hubo un error al crear el archivo");
        }
    }

    async readMessagesAsync() {
        try {
            const data = await fs.readFile("mensaje.txt", "utf-8");
            return data;
        } catch (error) {
            console.log("Hubo un error al leer el archivo");
        }
    }
}

export default messageManager;