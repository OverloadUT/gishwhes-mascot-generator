var express = require('express');
var router = express.Router();

var parts = {
  animals: [
    {
      name: 'tyrannosaurus',
      prefix: 'tyranno',
      suffix: 'saurus',
      firstPart: 'body',
      firstPartAdjective: ['hulking', 'massive', 'giant', 'scaly'],
      secondPart: 'head',
      secondPartAdjective: ['diamond-shaped', 'terrifying', 'toothy', 'scaly']
    },
    {
      name: 'sloth',
      prefix: 'slo',
      suffix: 'th',
      firstPart: 'body',
      firstPartAdjective: ['fluffy', 'sack-like', 'furry', 'cuddly'],
      secondPart: 'head',
      secondPartAdjective: ['flat', 'oblong', 'striped']
    },
    {
      name: 'wombat',
      prefix: 'wom',
      suffix: 'bat',
      firstPart: 'body',
      firstPartAdjective: ['fluffy', 'fuzzy', 'furry', 'cuddly', 'adorable', 'compact'],
      secondPart: 'head',
      secondPartAdjective: ['adorable', 'cute']
    }
  ]
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: "Mascot!",
    mascot: getMascot()
  });
});

function getMascot() {
  var myAnimals = JSON.parse(JSON.stringify(parts.animals));
  console.log(myAnimals);
  var firstAnimal = pickRandom(myAnimals);
  console.log(myAnimals);
  var secondAnimal = pickRandom(myAnimals);
  console.log(secondAnimal);

  var mascot = {};

  mascot.name = pS(firstAnimal.prefix) + pS(secondAnimal.suffix);
  mascot.description = pS(firstAnimal.firstPartAdjective) + ' ' + pS(firstAnimal.firstPart) + ' of a ' + pS(firstAnimal.name) + ', ' +
      pS(secondAnimal.secondPartAdjective) + ' ' + pS(secondAnimal.secondPart) + ' of a ' + pS(secondAnimal.name) + '.';

  return mascot;
}

function pickString(part) {
  if(part instanceof Array) {
    return part[randomInt(0, part.length-1)]
  } else if(typeof(part) === 'function') {
    return part();
  } else {
    return part;
  }
}

var pS = pickString;

function pickRandom(arr) {
  var index = randomInt(0, arr.length-1);
  var animal = arr[index];
  arr.splice(index, 1);
  return animal;
}

function randomInt(low, high) {
  return Math.floor(Math.random() * (1 + high - low) + low);
}

module.exports = router;
