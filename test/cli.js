// then y catch 
const  mdLinks = require('./index')
mdLinks('./examples/example1.md')
  .then(absolutePath => {
    console.log('La ruta absoluta es:', absolutePath)
    console.log()
  })
  .catch((error) => {
    console.error(error)
  })

mdLinks('./examples/example1.md')
  .then(extension => {
    console.log('El archivo es Markdown', extension)
  })
  .catch((error) => {
    console.error(error)
  })