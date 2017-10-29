'use strict'

const KlikAanKlikUit = require('kaku-rpi')
let kakuOld = KlikAanKlikUit(8,375,7,5)
let kakuNew = KlikAanKlikUit(8,260,7,5)

exports.setSwitch = function (deviceId,newState) {


  if(deviceId == "All") {
      var lights = ["A","B","C","D","E"]
      for (var i = 0; i < lights.length; i++) {
        kakuOld.transmit(lights[i], 15, newState)
      }
  }
  else {
    if(deviceId == "1")
    {
      kakuNew.transmit(1, 15, newState) 
    }
    else
    {
      kakuOld.transmit(deviceId, 15, newState) 
    }
  }
  console.log("put " + deviceId + " " + newState)
}