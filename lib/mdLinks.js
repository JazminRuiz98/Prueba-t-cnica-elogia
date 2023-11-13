// md links y aquí se llaman las microfunciones
const fs = require('fs').promises;
const path = require('path');
function absolutePath(filePath) { 
  return path.resolve(filePath); 
}
function relativeToAbsolutePath(filePath) { 
  return path.resolve(filePath);
}
function fileExist(filePath) { 
  return fs.access(filePath, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
}
function readLinks(filePath) { 
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8')
      .then(data => {
        let regex = /\[(.*?)\]\((\S*?) ?('(.*?)')?\)/gs;
        let regexURL = /https*?:([^"')\s]+)/;
        let regexText = /\[(.*)\]/;
        const arrayLinks = data.match(regex);
        const links = [];
        const uniqueLinks = new Set(); // Conjunto para rastrear enlaces únicos
        // console.log(arrayLinks);
        arrayLinks.forEach((elem) => {
          // console.log(elem ,56);
          if (elem !== undefined) {
            const matchURL = elem.match(regexURL);
            const matchText = elem.match(regexText);
            if (matchURL !== null && matchText !== null) {
              // Comprobar si el enlace ya existe en enlaces únicos
              const linkKey = matchURL[0];
              if (!uniqueLinks.has(linkKey)) {
                links.push({
                  href: matchURL[0],
                  text: matchText[1],
                  file: filePath
                });
                uniqueLinks.add(linkKey); // Agregar el enlace al conjunto de enlaces únicos
              }
            } else {
              // Manejo de casos de errores específicos
              if (elem.includes('](') && !elem.includes(')')) {
                links.push({
                  href: 'El enlace esta incompleto',
                  text: 'El enlace es inválido',
                  file: filePath
                });
              } else if (!matchText && matchURL) {
                links.push({
                  href: matchURL[0],
                  text: 'Texto sin enlace',
                  file: filePath
                });
              } else if (!matchURL && matchText) {
                links.push({
                  href: 'El enlace no tiene texto',
                  text: matchText[1],
                  file: filePath
                });
              } else {
                links.push({
                  href: 'Error no identificado',
                  text: 'Error no identificado',
                  file: filePath
                });
              }
            }
          }
        });
        resolve(links);
        // console.log(links);
      });
  });
}
function mdLinks(filePath) {
  return new Promise((resolve, reject) => {
    if (absolutePath(filePath)) {
      fileExist(filePath)
        .then((exists) => {
          if (!exists) {
            reject('Lo sentimos, la ruta no es valida.');
          } else {
            const fileExtension = path.extname(filePath);
            if (!extensionDoc(fileExtension)) {
              reject('Lo sentimos, el archivo no tiene la extensión valida');
            } else {
              analyzeLinks(filePath)
                .then((links) => {
                  console.log('Links:', links);
                  resolve(links);
                })
                .catch((err) => reject(err));
            }
          }
        });
    } else {
      const absolutePath = relativeToAbsolutePath(filePath);
      fileExist(absolutePath)
        .then((exists) => {
          if (!exists) {
            reject('Lo sentimos, la ruta no es valida.');
          } else {
            if(!extensionDoc(absolutePath)){ //isValidMarkdownExtension
              reject('Lo sentimos, el archivo no tiene la extensión valida ');
            } else {
              readLinks(absolutePath)
                .then((links) => {
                  console.log('Links:', links);
                  resolve(links);
                })
                .catch((err) => reject(err));
            }
          }
        });
    }
  });
  function extensionDoc(filePath) {
    const validExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
    const ext = path.extname(filePath);
    return validExtensions.includes(ext);
  }
}
module.exports = mdLinks;


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