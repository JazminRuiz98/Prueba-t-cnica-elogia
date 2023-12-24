const {readFilePath, validateAndRequire, extractLinks, validateLinks } = require('../lib/app.js')
// Ajusta la ruta de importación del módulo readFilePath.js

describe('readFilePath', () => {
  it('Debe devolver una promesa resuelta con el contenido del archivo, si este existe', () => {
    const filePath = './examples/example1.md' // Ajusta la ruta del archivo de ejemplo

    return readFilePath(filePath).then((result) => {
      // Verifica si el resultado contiene ciertos patrones específicos de enlaces
      expect(result).toMatch(/\* Google \[Enlace a Google\]\(https:\/\/www\.google\.com\)\./)
      expect(result).toMatch(/\* Youtube \[Enlace a youtube\]\(https:\/\/www\.youtube\.com\/\)\./)
      expect(result).toMatch(/\* Laboratoria \[Enlace a Laboratoria\]\(https:\/\/www\.laboratoria\.la\/\)\./)
      expect(result).toMatch(/\* Github \[Enlace a github\]\(https:\/\/github\.com\/\)\./)
      expect(result).toMatch(/\* Github \[Enlace a roto github\]\(https:\/\/github1\.com\/\)\./)
      expect(result).toMatch(/\* Google \[Enlace roto de Google\]\(https:\/\/www1\.google\.com\)\./)
      expect(result).toMatch(/\*!\[md-links\]\(https:\/\/github\.com\/Laboratoria\/bootcamp\/assets\/12631491\/fc6bc380-7824-4fab-ab8f-7ab53cd9d0e4\)\./)
      // Puedes agregar más expectativas según sea necesario
    })
  })

  it('Debe devolver una promesa resuelta que rechace con un mensaje de error, si la ruta del archivo no existe', () => {
    const filePath = './examples/nonexistent.md' // Ajusta la ruta de un archivo que no existe
    return readFilePath(filePath).catch((error) => {
      expect(error).toEqual(`La ruta '${filePath}' no existe`)
    })
  })
})



describe('validateAndRequire', () => {
  it('Debe devolver una promesa  resuelta con la ruta del archivo si este existe', () => {
    return validateAndRequire('path/to/existing/file.md').then((result) => {
      expect(result).toEqual('path/to/existing/file.md')
    })
  })

  it('Debe devolver una promesa que rechace con un mensaje de error si la ruta del archivo no existe', () => {
    return validateAndRequire('path/to/nonexistent/file.md').catch((error) => {
      expect(error).toEqual('La ruta \'path/to/nonexistent/file.md\' no existe')
    })
  })
})


describe('extractLinks', () => {
// sta prueba verifica si la función extractLinks extrae correctamente los enlaces del contenido de Markdown proporcionado.
  it('Debe de extraer los links del archivo markdown', () => {
  // variable filePath que indica la ruta del archivo Markdown
    const markdownContent = `
      This is a [link](https://www.example.com) to an example website.
      Here is another [link](https://www.google.com).`
    // función extractLinks con el contenido de Markdown 
    // y la ruta del archivo como argumentos y se espera que devuelva un array de objetos de enlace específicos
    const filePath = 'path/to/example.md'
    const links = extractLinks(markdownContent, filePath)

    expect(links).toEqual([
      {
        text: 'link',
        href: 'https://www.example.com',
        file: 'path/to/example.md'
      },
      {
        text: 'link',
        href: 'https://www.google.com',
        file: 'path/to/example.md'
      }
    ])
  })
})

const axios = require('axios')
// la función jest.mock('axios') para simular el módulo axios
jest.mock('axios')

describe('validateLinksFunc', () => {
// 'should handle undefined links'. 
// Esta prueba verifica si la función validateLinks maneja correctamente los enlaces no definidos.
  it('Debería manejar los links indefinidos', async () => {
  // Se define una lista de enlaces donde uno de los objetos de enlace tiene href como undefined
    const links = [{ href: undefined }]
  
    const result = await validateLinks(links)
    // se espera que el primer objeto de resultado tenga una propiedad status que sea igual a la cadena 'undefined'  
    expect(result[0].status).toBe('undefined')
  
  })
})
// it('should return validated links with status', () => {

//   const markdownLinks = [
//     {
//       href: 'https://www.example.com',
//       status: 200,
//       ok: '✔️  ok'
//     }
//   ];

//   return validateLinks(markdownLinks).then((validatedLinks) => {
//     expect(validatedLinks).toEqual([
//       { 
//         href: 'https://www.example.com',
//         status: 200, 
//         ok: '✔️  ok' 
//       }
//     ]);
//   });

// });

// it('should handle undefined links', () => {

//   const badLinks = [
//     {
//       href: undefined,
//       status: 'undefined',
//       ok: '❌ fail'
//     }
//   ];

//   return validateLinks(badLinks).then((validatedLinks) => {
//     expect(validatedLinks).toEqual([
//       {
//         href: undefined,
//         status: 'undefined',
//         ok: '❌ fail'  
//       }
//     ]);
//   });

// });