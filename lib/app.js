// microfunciones
//Esta función simplemente toma una ruta de archivo como argumento y 
// utiliza path.resolve para convertirla en una ruta absoluta.
const fs = require('fs') // Importa el módulo 'fs' de Node.js que te permite trabajar con el sistema de archivos del equipo.
const path = require('path')

const readFilePath = (filePath) => { // Define una función llamada 'readFilePath' que toma como argumento la ruta del archivo.
  return new Promise((resolve, reject) => { // Retorna una nueva promesa que puede ser resuelta o rechazada.
    if (!fs.existsSync(filePath)) { // Verifica si el archivo no existe  
      reject(`La ruta '${filePath}' no existe`)
    } 
    else {  
      fs.readFile(filePath, 'utf8', (err, content) => { // Verifica si se puede acceder a la ruta especificada y si existe el archivo.
        if (err) { // Si hay un error al intentar acceder a la ruta o el archivo no existe.
          reject(`Error al leer el documento: ${err}`) // Rechaza la promesa con un mensaje de error que indica que la ruta no se encontró.
        } 
        else { // Si no hay error y la ruta existe.
          resolve(content) // Resuelve la promesa con la ruta del archivo que se verificó con éxito.
        }
      })
    }
  })
}

//  función validateAndRequire que toma dos parámetros: modulePath y allowedExtensions
const validateAndRequire = (modulePath, allowedExtensions) => {
  let resolvedPath

  if (!allowedExtensions) {
  // Verifica si allowedExtensions está definido y si no, le asigna el valor por defecto ['.js'].
    allowedExtensions = ['.js'] // Extensiones por defecto permitidas
  }
  // Si modulePath es una ruta absoluta, se asigna directamente a resolvedPath.
  if (path.isAbsolute(modulePath)) {
    resolvedPath = modulePath
  } else {
  //Si no es una ruta absoluta, la función usa path.resolve para intentar resolver 
  //la ruta usando cada una de las extensiones permitidas en allowedExtensions.
    resolvedPath = allowedExtensions
      .map(ext => path.resolve(__dirname, modulePath + ext))
    // el método find para buscar el primer elemento que exista en el sistema de archivos utilizando fs.existsSync.
      .find(fs.existsSync)
  }
  //Si la condición !resolvedPath se evalúa como verdadera, 
  //se lanzará una excepción con el mensaje 'File not found.
  if (!resolvedPath) {
  
    // throw para interrumpir el flujo normal del programa y 
    //generar un error controlado que puede ser capturado por una declaración
    throw new Error('Archivo no encontrado.')
  }
  //  la función devuelve el módulo requerido desde la ruta resuelta.
  return require(resolvedPath)
}

function extractLinks(markdownContent, filePath) {
  // Se declara una expresión regular llamada linkRegex que busca enlaces en el contenido Markdown
  // La expresión regular se utiliza con la bandera g para encontrar todos los enlaces en el contenido, no solo el primero.
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const links = [] // // Inicializa la variable links como un arreglo vacío
  let match // Se inicializa match

  // Bucle while para buscar enlaces en el contenido del archivo Markdown
  // markdownContent busca el próximo enlace en el contenido y devuelve un metodo de expresión regular "match"
  // El bucle continúa hasta que no se encuentren más coincidencias.
  // El método exec busca una coincidencia en una cadena especificada y devuelve un array
  // encuentre coincidencias en la cadena y la asignación de match no sea igual a null.
  while ((match = linkRegex.exec(markdownContent)) !== null) {
    // Crea un objeto para cada link con las propiedades texto, href y archivo
    const text = match[1] // se refiere al primer grupo capturado por la expresión regular
    const url = match[2]
    // se está empujando (push) un objeto al final de un array llamado links. El objeto empujado al array links
    links.push({
      text,
      href: url, 
      file: filePath
    })

  }

  return links

}

const axios = require('axios')

const validateLinks = (links) => {
  return Promise.all(links.map(link => {

    if(!link.href) {
      link.status = 'undefined' 
      return Promise.resolve(link)
    }
    // return Promise.resolve({
    //   href: 'undefined',
    //   status: 'undefined',
      
    return axios.get(link.href)
      .then((res) => {
        link.status = res.status
        // link.ok = "✔️  ok";
        return link
      })
      .catch((err) => {
        link.status = 'error'
        // if (err.response && err.response.status) {
        //   link.status = err.response.status;
        // } else {
        //   link.status = 'undefined';
        // }
        // link.ok = "❌ fail";
        return link
      })
  })
  )
}

// Exportamos la función para que pueda ser utilizada en otros archivos.

module.exports = {readFilePath, validateAndRequire, extractLinks, validateLinks}



/*import('node-fetch').then(({ default: fetch }) => {
  const chalk = require('chalk')
  
  function isLinkValid(link) {
    console.log(chalk.cyan(`Validando enlace: ${link.href}`))
  
    if (!link.href) {
      return Promise.resolve({
        ...link,
        isValid: false,
        isBroken: true,
        status: 'No URL',
      })
    }
  
    return fetch(link.href)
      .then((response) => {
        if (response.ok) {
          return {
            ...link,
            status: response.status,
            statusText: response.statusText,
            isValid: true,
          }
        } else {
          if (response.status === 404) {
            console.error(chalk.red(`Error 404 - Página no encontrada: ${link.href}`))
            return {
              ...link,
              status: response.status,
              statusText: response.statusText,
              isValid: false,
              isBroken: true,
            }
          } else {
            return {
              ...link,
              status: response.status,
              statusText: response.statusText,
              isValid: false,
              isBroken: true,
            }
          }
        }
      })
      .catch((error) => {
        console.error(chalk.red(`Error al validar enlace: ${link.href}`), error)
        return {
          ...link,
          isValid: false,
          isBroken: true,
          error: error.message,
        }
      })
  }
  
  module.exports = isLinkValid
})*/
  
//const fetch = require('node-fetch');
/*import('node-fetch').then(({ default: fetch }) => {

  const chalk = require('chalk')

  function fetchLink(link) { //isLinkValid
    console.log(chalk.cyan(`Validando enlace: ${link.href}`))
    return fetch(link.href)
      .then((response) => {
        if (response.ok) {
          return {
            ...link,
            status: response.status,
            statusText: response.statusText,
            isValid: true,
          }
        } else {
          if (response.status === 404) {
            console.error(chalk.red(`Error al validar enlace: ${link.href}`), error)
            return {
              ...link,
              status: response.status,
              statusText: response.statusText,
              isValid: false,
              isBroken: true, 
            }
          } else {
            return {
              ...link, 
              status: response.status,
              statusText: response.statusText,
              isValid: false,
              isBroken: false, 
            }
          }
        }
      })
      .catch((error) => {
        console.error(chalk.red(`Error al validar enlace: ${link.href}`), error)
        return {
          ...link,
          isValid: false,
          isBroken: true,
          error: error.message,
        }
      })
  }

  module.exports = {fetchLink}
})*/
/*
function extensionDoc(filePath) {
    // Aquí implementas la lógica para verificar si la extensión del archivo es de tipo Markdown
    const validExtensions =['.md', '.text', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown'];
    const ext = path.extname(filePath);
    if(validExtensions.includes(ext) ){
        console.log('La extensión del archivo es:' + ext);
        return true;
    } else {
        console.log('La extensión del archivo ingresado no es valida');
        return false;
    }
}

*/