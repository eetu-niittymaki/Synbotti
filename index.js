/*////////////////////////////////////////
//     Requires Node 16.9 or higher!    //
////////////////////////////////////////*/

const { Client, GatewayIntentBits } = require("discord.js")
const dotenv = require("dotenv")
dotenv.config()
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

client.login(process.env.TOKEN)

let count = 0
const file = "log.csv"
const date = ", "  + new Date().toString().substring(4, 21)

// Runs once on bot startup
client.once("ready", async () => {
    const data = fs.readFileSync(file, 'utf-8') 
    if (data[0]) { // Check if content on csv first line
        const lines = data.split(",")[0]
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
    const countMem = await gdrive.getMembers()
    if (countMem > count) {
        sendMessage(countMem)
        fs.writeFile(file, countMem.toString() + date, (err) => {
            if (err) return console.log(err)
        })
        count = countMem
    } else {
        console.log("No new members", "[" + new Date().toString().substring(4, 21) + "]")
    }
}

const sendMessage = (countMem) => {
    const channel = client.channels.cache.get(process.env.CHANNEL_ID)
    channel.send(`Uusia jäseniä: ${countMem-count}`)
}

setInterval(readSheet, 1000 * 60 * 60 * 12)