// microfunciones
/*
 * 
 * 
 */
// se identifica el archivo a ingresar 
const path = require('path');

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

};