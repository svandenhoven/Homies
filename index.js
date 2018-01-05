//Code for KaKu Solution
//Sander van den Hoven

'use strict'

var express = require('express')
var switcher = require('./switching.js')

var app = express()
let kaku = KlikAanKlikUit(8,375,7,5)

app.get('/',function(req,res) {
  res.sendfile('index.html');
})

app.get('/lights',function(req,res) {
  res.json({lights: "status of lights"})
})


app.get('/lights/:deviceId', function(req,res) {
  console.log(req.params.deviceId)
  res.json({lights:"on"})
})

app.get('/lights/:deviceId/:state',function(req,res) {
  console.log(req.url)
  var newState = 0
  if(req.params.state == "on")
  {
    newState = 1
  }

    if(req.params.deviceId == "All")
    {
      var lights = ["A","B","C","D","E"]
      for (var i = 0; i < lights.length; i++) {
        switcher.setSwitch(lights[i], newState)
        console.log("put " + lights[i] + " " + req.params.state);
      }
    }
    else
    {
      switcher.setSwitch(req.params.deviceId, newState)
      console.log("put " + req.params.deviceId + " " + req.params.state);        
    }

  res.json({device: req.params.deviceId, state: req.params.state})
})

app.listen(3000)

console.log("listing on 3000")


