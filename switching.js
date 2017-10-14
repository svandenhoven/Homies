'use strict'

const KlikAanKlikUit = require('kaku-rpi')
let kaku = KlikAanKlikUit(8,375,7,5)

exports.setSwitch = function (deviceId,newState) {


  if(deviceId == "All") {
      var lights = ["A","B","C","D","E"]
      for (var i = 0; i < lights.length; i++) {
        kaku.transmit(lights[i], 15, newState)
        console.log("put " + lights[i] + " " + newState)
      }
  }
  else {
    kaku.transmit(deviceId, 15, newState) 
    console.log("put " + deviceId + " " + newState)
  }
  
}