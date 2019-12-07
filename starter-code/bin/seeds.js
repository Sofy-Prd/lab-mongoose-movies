const mongoose = require('mongoose');
const celebrity = require('../models/celebrity'); 

const dbName = 'lab-mongoose-movies';
mongoose.connect(`mongodb://localhost/${dbName}`);



const celebrities = [
  {
  name: "Jimi Hendrix",
  occupation: "musicien",
  catchPhrase: "La connaissance parle, la sagesse écoute."
  },
  {
  name:"Oscar Wilde",
  occupation:"poète",
  catchPhrase: "Les folies sont les seules choses qu'on ne regrette jamais."
  },
  {
  name:"Morgan Freeman",
  occupation: "acteur",
  catchPhrase: "Je bénis le ciel que mes grands rôles au cinéma soient arrivés vers 50 ans, à 30 ans j’étais immature."
  },
  {
  name:"Brad Pitt",
  occupation: "acteur",
  catchPhrase: "Si les filles qui rêvent devant ma photo me voyaient au réveil..."
  },
  {
  name:"Marilyn Monroe",
  occupation: "actrice",
  catchPhrase: "Une carrière, c'est fantastique,mais on ne peut pas se blottir contre elle la nuit quand on a froid"
  }
  ];
  
  celebrity.create(celebrities, (err) => {
    if (err) { throw(err) }
    console.log(`Created ${celebrities.length} celebrities`);
    
    // Once created, close the DB connection
    mongoose.connection.close();
  });
  
  
  