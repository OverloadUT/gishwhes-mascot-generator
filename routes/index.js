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
      prefix: 'womba',
      suffix: 'bat',
      firstPart: 'body',
      firstPartAdjective: ['fluffy', 'fuzzy', 'furry', 'cuddly', 'adorable', 'compact'],
      secondPart: 'head',
      secondPartAdjective: ['adorable', 'cute']
    },
    {
      name: 'chicken',
      prefix: 'chicke',
      suffix: 'cken',
      firstPart: 'body',
      firstPartAdjective: ['feathery', 'delicious', 'plump', 'white', 'brown'],
      secondPart: 'beak',
      secondPartAdjective: ['sharp', 'long']
    },
    {
      name: 'snake',
      prefix: 'sna',
      suffix: 'ke',
      firstPart: 'body',
      firstPartAdjective: ['scaly', 'long', 'winding'],
      secondPart: 'head',
      secondPartAdjective: ['venomous', 'mesmerizing']
    },
    {
      name: 'flamingo',
      prefix: 'flami',
      suffix: 'ngo',
      firstPart: 'body',
      firstPartAdjective: ['pink', 'feathered', 'ridiculous'],
      secondPart: 'head',
      secondPartAdjective: ['beaked', 'pink', 'absurd', 'awkward']
    },
    {
      name: 'shark',
      prefix: 'sha',
      suffix: 'rk',
      firstPart: 'body',
      firstPartAdjective: ['smooth', 'moist', 'sleek'],
      secondPart: 'head',
      secondPartAdjective: ['vicious', 'large', 'toothy', 'giant', 'terrifying']
    },
    {
      name: 'turtle',
      prefix: 'tu',
      suffix: 'rtle',
      firstPart: 'shell',
      firstPartAdjective: ['hard', 'protective', 'domed', 'awesome'],
      secondPart: 'head',
      secondPartAdjective: ['snapping', 'dorky', 'silly-looking', 'retractable', 'surprisingly dangerous']
    },
    {
      name: 'frog',
      prefix: 'fro',
      suffix: 'rog',
      firstPart: 'body',
      firstPartAdjective: ['green', 'slimy', 'amphibious', 'slick'],
      secondPart: 'head',
      secondPartAdjective: ['croaking', 'weird', 'mysterious']
    },
    {
      name: 'dolphin',
      prefix: 'dolphi',
      suffix: 'phin',
      firstPart: 'body',
      firstPartAdjective: ['majestic', 'smooth', 'majestic'],
      secondPart: 'head',
      secondPartAdjective: ['majestic', 'silly', 'smiling']
    },
    {
      name: 'aardvark',
      prefix: 'aardva',
      suffix: 'vark',
      firstPart: 'body',
      firstPartAdjective: ['burrowing', 'tough', 'arched'],
      secondPart: 'head',
      secondPartAdjective: ['unique', 'elongated', 'weird']
    },
    {
      name: 'platypus',
      prefix: 'platy',
      suffix: 'pus',
      firstPart: 'body',
      firstPartAdjective: ['aquatic', 'furry'],
      secondPart: 'head',
      secondPartAdjective: ['ridiculous', 'duck-billed', 'very weird']
    }
  ],
  randomFacts: [
      'it can fly in space',
      'it makes the best kale pancakes',
      'it learned to tap dance watching Fred Astaire movies',
      'it fully understands string theory',
      'it has a collection of sasquatch memorabilia',
      'it has a collection of sasquatch memorabilia',
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
      'but will never admit it',
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
  mascot.description = [];
  mascot.description[0] = pS(firstAnimal.firstPartAdjective) + ' ' + pS(firstAnimal.firstPart) + ' of a ' + pS(firstAnimal.name) + ', ';
  mascot.description[1] = pS(secondAnimal.secondPartAdjective) + ' ' + pS(secondAnimal.secondPart) + ' of a ' + pS(secondAnimal.name) + '.';

  mascot.factoid = [];
  if(Math.random() < 0.7) {
    mascot.factoid[0] = 'also, ' + pS(parts.randomFacts) + ', ';
    mascot.factoid[1] =  pS(parts.randomFactReasons);
  }

  console.log(mascot.description);

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
