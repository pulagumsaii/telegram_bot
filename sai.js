const TelegramBot = require('node-telegram-bot-api'); 
const request = require('request');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');

var serviceAccount = require("./serviceAccountKey.json");
const token = '6840169570:AAF01FDsdTdKB0gkbaDWo-qZqWfOcoOJypA';

const bot = new TelegramBot(token, {polling: true});



// var serviceAccount = require("./serviceAccountKey.json");
initializeApp({
    credential: cert(serviceAccount)
  });
  
  const db = getFirestore();
    
bot.on('message', function(mg){
   console.log(mg) 
})



bot.on('message',function(mg){
    request('http://www.omdbapi.com/?t='+mg.text+'&apikey=d9c931e0', function(err, responce, body){
     const actors = JSON.parse(body).Actors 
     const gen = JSON.parse(body).Genre    
bot.sendMessage(mg.chat.id,actors)
bot.sendMessage(mg.chat.id,gen)
db.collection('movies').add({
    Actors:actors,
    Genere:gen,
    userID:mg.from.id
})

});
});
