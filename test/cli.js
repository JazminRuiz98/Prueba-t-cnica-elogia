// then y catch 
const  mdLinks = require('./index');
mdLinks('example1/Markdown.md')
  .then((links) => {
    console.log(links);
  })
  .catch((error) => {
    console.error(error);
  });
