const crypto = require('crypto')
const key1= crypto.randomBytes(32).toString('hex')
const key2= crypto.randomBytes(32).toString('hex')

console.table({key1, key2});

// │  key1   │ '2783ca68ccba00d235f0efd11fc6db68b8cde001c917cbd29dee70d88db34952'  │
// │  key2   │ '51dc44ef57caf4925d002d50df913380f4145c8014db6662a7ba84d3353f6551'