const template = require('handlebars').compile('{{subject}} is great to {{punchline}}');
const subjects = ["shark", "popcorn", "poison", "fork", "cherry", "toothbrush", "cannon"];
const punchlines = ["watch movie with", "spread some love", "put on cake", "clean toilets", "go to the moon", "achieve world piece", "help people learn programing"];

function getRandomItem(array){
  return array[Math.floor(Math.random() * array.length)]
}

const result = template({
  subject: getRandomItem(subjects), 
  punchline: getRandomItem(punchlines)
});

console.log(result);