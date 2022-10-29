/*////////////////////////////////////////
//     Requires Node 16.9 or higher!    //
////////////////////////////////////////*/

const { Client, GatewayIntentBits } = require("discord.js")
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
    console.log("Ready!")
})

// Gets sheet row count
const readSheet = async () => {
    countMem = await gdrive.getMembers()
    if (countMem > count) {
        count = countMem
        sendMessage(countMem)
        fs.writeFile(file, countMem, (err) => {
            if (err) return console.log(err)
        })
    } else {
        console.log("No new members")
    }
}

const sendMessage = (countMem) => {
    client.on('ready', async guild => {
        const channel =  await guild.channels.array().filter(c => c.name.toLowerCase() === 'synbotti')
        await channel.send({content: `Uusia jäseniä: ${countMem-count}`,})
    })
}

setInterval(readSheet, 1000 * 60 * 60 * 12)