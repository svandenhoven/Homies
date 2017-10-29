'use strict'

const KlikAanKlikUit = require('kaku-rpi')
let kaku = KlikAanKlikUit(8,260,7,5)

kaku.transmit(1, 15, 1)
console.log("put 1 on, with new")