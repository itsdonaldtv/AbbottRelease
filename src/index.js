const AbbottClient = require('./Structures/AbbottClient.js');
const config = require('../config.json'); 

const bot = new AbbottClient(config);
bot.start(); 