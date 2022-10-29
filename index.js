/*////////////////////////////////////////
//     Requires Node 16.9 or higher!    //
////////////////////////////////////////*/

const { Client, GatewayIntentBits, Events } = require("discord.js")
const dotenv = require("dotenv")
const fs = require("fs")
const gdrive = require('./gdriveServer.js')
const client = new Client({
    intents: [ 
        GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent, 
        GatewayIntentBits.DirectMessages, 
    ]
  })

dotenv.config()

client.login(process.env.TOKEN)

let count = 0
const file = "log.csv"

// Runs once on bot startup
client.once("ready", async () => {
    const data = fs.readFileSync(file, 'utf-8') 
    let lines = data.split(/\r?\n/)
    if (data[0]) {
        count = Number(lines)
        //console.log(count)
    } else {
        count = await gdrive.getMembers()
        //console.log(count)
    }
    readSheet()
    console.log("Ready!")
})

// Gets sheet row count
const readSheet = async () => {
    countMem = await gdrive.getMembers()
    if (countMem > count) {
        sendMessage(countMem)
        fs.writeFile(file, countMem.toString(), (err) => {
            if (err) return console.log(err)
        })
        count = countMem
    } else {
        console.log("No new members", "[" + new Date().toString() + "]")
    }
}

const sendMessage = (countMem) => {
    const channel = client.channels.cache.get('1035617438286499951')
    channel.send(`Uusia jäseniä: ${countMem-count}`)
}

setInterval(readSheet, 1000 * 60 * 60 * 12)