// importar las funciones
//{}la sintaxis de desestructuración, se pueden extraer 
//partes específicas de un objeto o módulo y asignarlas a variables locales 
const  {readFilePath, extractLinks, validateLinks}  = require('../lib/app')

function mdLinks(filePath, validate) {
// lee el contenido del archivo en la ruta especificada
// y devuelve una promesa.  
  return readFilePath(filePath)
  // utiliza .then para esperar la resolución de la promesa
  // y finalmente retorna los enlaces extraídos.
    .then((content) => {
      const links = extractLinks(content, filePath)
      if (validate) {
        return validateLinks(links)
      }
      return links
    })
}


module.exports = mdLinks

/*
function mdLinks(path) {
    return new Promise((resolve, reject) => {
        resolve ('resuelto');

       // reject('rechazado');
        
    })
}

module.exports = mdLinks;
function extensionDocValid(filePath) {
    const validExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
    const ext = path.extname(filePath);
    return validExtensions.includes(ext);
}

module.exports = mdLinks;


/*const { validatePath, extensionDoc, readFile, findLinks } = require('./lib/app');
const path = require('path');

function mdLinks(filePath) {
    return new Promise((resolve, reject) => {
        const absolutePath = validatePath(filePath);
        if (!absolutePath) {
            reject(new Error('Lo sentimos, la ruta no es válida',filePath));
        }
        if (!extensionDoc(absolutePath)) {
            reject(new Error('lo sentimos, el documento no tiene las extensiones validas'));
        }

        readFile(absolutePath)
            .then((data) => {
                const links = findLinks(data, absolutePath);
                resolve(links);
            })
            .catch((err) => {
                reject(err);
            });
    });
    const linkArray = new set ();
}


module.exports = mdLinks;*/

/*const app = require('./lib/app.js')
const result = mdLinks(ruta);
new Promise((resolve, reject) => {

})*/