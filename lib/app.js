// microfunciones
/*
 * 
 * 
 */
// se identifica el archivo a ingresar 
//const fetch = require('node-fetch');
import('node-fetch').then(({ default: fetch }) => {

const chalk = require('chalk');

function fetchLink(link) { //isLinkValid
  console.log(chalk.cyan(`Validando enlace: ${link.href}`));
  return fetch(link.href)
    .then((response) => {
      if (response.ok) {
        return {
          ...link,
          status: response.status,
          statusText: response.statusText,
          isValid: true,
        };
      } else {
        if (response.status === 404) {
          console.error(chalk.red(`Error al validar enlace: ${link.href}`), error);
          return {
            ...link,
            status: response.status,
            statusText: response.statusText,
            isValid: false,
            isBroken: true, 
          };
        } else {
          return {
            ...link, 
            status: response.status,
            statusText: response.statusText,
            isValid: false,
            isBroken: false, 
          };
        }
      }
    })
    .catch((error) => {
      console.error(chalk.red(`Error al validar enlace: ${link.href}`), error);
      return {
        ...link,
        isValid: false,
        isBroken: true,
        error: error.message,
      };
    });
}

module.exports = {fetchLink};
});
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