// microfunciones
/*
 * 
 * 
 */
// se identifica el archivo a ingresar 

const fs = require('fs').promises;
const path = require('path');
const document = 'example1.md';

function validatePath(filePath) {
    // La ruta relativa se convierte a absoluta
    if (filePath.startsWith('.') || filePath.startsWith('..')) {
        const absolutePath = path.resolve(filePath);
        return absolutePath;
    } else {
        return filePath; // La ruta ya es absoluta
    }
}

function extensionDoc(filePath) {
    // Aquí implementas la lógica para verificar si la extensión del archivo es de tipo Markdown
    const validExtensions =['.md', '.text', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown'];
    const ext = path.extname(filePath);
    if(validExtensions.includes(ext) ){
        console.log('La extensión del archivo es:' + ext);
    } else {
        console.log('La extensión del archivo ingresado no es valida');
    }
}
extensionDoc(document);

function readFile(filePath) {
    // Aquí implementas la lógica para leer el contenido del archivo Markdown
}

function findLinks(data, filePath) {
    // Aquí implementas la lógica para encontrar los enlaces dentro del contenido del archivo Markdown
}

module.exports = {
    validatePath,
    extensionDoc,
    readFile,
    findLinks,
};

/*const path = require('path');

const document = 'example1.md'; // Aquí deberías tener el nombre de tu archivo

function extension(file){
    const validExtensions =['.md', '.text', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown'];
    const ext = path.extname(file);
    if(validExtensions.includes(ext) ){
        console.log('La extensión del archivo es:' + ext);
    } else {
        console.log('La extensión del archivo ingresado no es valida');
    }

}

extension(document);
 // Esto imprimirá la extensión del archivo, por ejemplo ".md"
// se ingresa una ruta


// va al final para exportar 
module.exports = {

};*/