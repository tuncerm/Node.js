const leftPad = require('left-pad');

const numbers = [ "12", "846", "2", "1236" ];

numbers.forEach(number => console.log(leftPad(number, 8, " ")));