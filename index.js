const Discord = require("discord.js")
const dotenv = require("dotenv")
const fs = require("fs")
const { get } = require("http")
const gdrive = require('./gdriveServer.js')
const client = new Discord.Client()

dotenv.config()

let count = 0

client.once("ready", async () => {
    console.log("Ready!")
})

const readSheet = () => {
    countMem = gdrive.getMembers()
    if (get > count) {
        count = countMem
        sendMessage()
    }
}

setTimeout(readSheet(),1000 * 60 * 60 * 24)
// For testing purposes only
/*
client.on("message", message => {
    if (message.content === "!arpa") {
        start(message)
    }
})
*/
const sendMessage = () => {
    client.on('ready', () => {
    const list = client.guilds.get("guild ID");
    list.members.forEach(member => {
       if (member.roles.some(role => role.name === 'Jäsenvastaava')) {
          member.send("Uusi jäsen!")
       }
    });  
  });
}

client.login(process.env.TOKEN)