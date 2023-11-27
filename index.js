// md links y aquí se llaman las microfunciones
// Cambia la importación de require a import()
//import fetch from 'node-fetch'; // Importación dinámica

const mdLinks = require('./lib/mdLinks')// Importa la función mdLinks desde el archivo mdLinks.js
const path = require('path')

const filePath = './examples/example1.md' 
//const filePath = './examples/example2.html'
const validate = true // o false, dependiendo del caso
const allowedExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text']
const fileExtension = path.extname(filePath)

if (!allowedExtensions.includes(fileExtension)) {
  console.error(`Error: Extensión no permitida. Las extensiones permitidas son: ${allowedExtensions.join(', ')}`)
} else {
  mdLinks(filePath, validate)
    .then(links => {
      console.log('Links obtenidos:', links)
      //console.log(links)
    })
    .catch(error => {
      console.error('Error al obtener los links:', error)
    })
}

mdLinks(filePath, validate) // Llama a la función mdLinks con la ruta del archivo como argumento
  .then(links => {
    // Haces algo con los links si la promesa se resuelve exitosamente
    console.log(links)
  })
  .catch(console.error)

/*const mdLinks = require('./lib/mdLinks.js')
const fetchLink = require('./lib/app.js')
// eslint-disable-next-line
const colors = require('colors')
// eslint-disable-next-line
const { Table } = require('console-table-printer')


mdLinks('examples/example1.md')
  .then((links) => {
    const linkPromises = links.map((link) => fetchLink(link))
    return Promise.all(linkPromises)
  })
  .then((linksWithStatus) => {
    const table = new Table() // Crea una nueva tabla

    // Configura el formato de las columnas
    table.addColumn({ name: 'Index', alignment: 'left', color: 'white', format: colors.white })
    table.addColumn({ name: 'Texto', alignment: 'left', color: 'cyan', format: colors.cyan })
    table.addColumn({ name: 'URL', alignment: 'left', color: 'magenta', format: colors.magenta })
    table.addColumn({ name: 'Válido', alignment: 'left', color: 'green', format: colors.green })
    table.addColumn({ name: 'Estado', alignment: 'left', color: 'yellow', format: colors.yellow })
    

    linksWithStatus.forEach((link, index) => {
      const rowData = {
        Index: index + 1,
        Texto: link.text,
        URL: link.href,
        Válido: link.isValid ? 'True' : 'False',
        Estado: link.status ? `${link.status} ${link.statusText}` : 'N/A',
      }

      table.addRow(rowData) // Agrega una fila a la tabla
    })

    table.printTable() // Imprime la tabla
  })
  .catch((error) => {
    console.error(error)
  })*/
/*const { validatePath,
    convertAbsolutePath,
    fileExist,
    validateLink, } = require('./lib/app');
const path = require('path');
function mdLinks(filePath, validate = false) {
    const absolutePath = validatePath(filePath);
    if (!absolutePath) {
        throw new Error('Lo sentimos, la ruta no es válida', filePath);
    }
    if (!extensionDoc(absolutePath)) {
        throw new Error('Lo sentimos, el documento no tiene las extensiones válidas');
    }

    return readFile(absolutePath)
        .then(data => {
            const links = findLinks(data, absolutePath);
            if (validate) {
                return validateLinksArray(links);
            }
            return links;
        })
        .catch(error => {
            throw error;
        });
}

module.exports = mdLinks;*/
/*const { validatePath, convertAbsolutePath, fileExist, validateLink } = require('./lib/app');
const path = require('path');

function mdLinks(filePath) {
    return new Promise((resolve, reject) => {
        if (validatePath(filePath)) {
            fileExist(filePath)
                .then((exists) => {
                    if (!exists) {
                        reject('La ruta no existe.');
                    } else {
                        const fileExtension = path.extname(filePath);
                        if (!extensionDocValid(fileExtension)) {
                            reject('El archivo no es de tipo Markdown.');
                        } else {
                            validateLink(filePath)
                                .then((links) => {
                                    console.log('Links procesados:', links);
                                    resolve(links);
                                })
                                .catch((err) => reject(err));
                        }
                    }
                });
        } else {
            const absolutePath = convertAbsolutePath(filePath);
            fileExist(absolutePath)
                .then((exists) => {
                    if (!exists) {
                        reject('La ruta no existe.');
                    } else {
                        if (!extensionDocValid(absolutePath)) {
                            reject('El archivo no es del tipo Markdown.');
                        } else {
                            validateLink(absolutePath)
                                .then((links) => {
                                    console.log('Links procesados:', links);
                                    resolve(links);
                                })
                                .catch((err) => reject(err));
                        }
                    }
                });
        }
    });
    
}

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