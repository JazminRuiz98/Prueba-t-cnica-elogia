// md links y aquí se llaman las microfunciones

const { validatePath, extensionDoc, readFile, findLinks } = require('./lib/app');
const path = require('path');

function mdLinks(filePath) {
    return new Promise((resolve, reject) => {
        const absolutePath = validatePath(filePath);
        if (!absolutePath) {
            reject(new Error('Lo sentimos, la ruta no es válida'));
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
}

module.exports = mdLinks;

/*const app = require('./lib/app.js')
const result = mdLinks(ruta);
new Promise((resolve, reject) => {

})*/