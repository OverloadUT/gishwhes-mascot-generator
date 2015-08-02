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
    },
    {
      name: 'chicken',
      prefix: 'chick',
      suffix: 'cken',
      firstPart: 'body',
      firstPartAdjective: ['feathery', 'delicious', 'plump', 'white', 'brown'],
      secondPart: 'beak',
      secondPartAdjective: ['sharp', 'long']
    },
    {
      name: 'snake',
      prefix: 'sna',
      suffix: 'ake',
      firstPart: 'body',
      firstPartAdjective: ['scaly', 'long', 'winding'],
      secondPart: 'head',
      secondPartAdjective: ['venomous', 'mesmerizing']
    },
    {
      name: 'flamingo',
      prefix: 'flami',
      suffix: 'ingo',
      firstPart: 'body',
      firstPartAdjective: ['pink', 'feathered', 'ridiculous'],
      secondPart: 'head',
      secondPartAdjective: ['beaked', 'pink', 'absurd', 'awkward']
    }
  ],
  randomFacts: [
      'it can fly in space',
      'it poops steel ingots',
      'it can only be seen by natural-born Norwegians',
      'it is allergic to Celtic folk music',
      'it can shoot lasers from its eyes',
      'it only eats stuffed animals'
  ],
  randomFactReasons: [
      'for some reason',
      'and nobody knows why',
      'ever since the incident',
      'inexplicably',
      'thanks to science'
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

  mascot.factoid = '';
  if(Math.random() < 0.2) {
    mascot.factoid = 'also, ' + pS(parts.randomFacts) + ', ' + pS(parts.randomFactReasons);
  }

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
