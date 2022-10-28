const Discord = require("discord.js")
const dotenv = require("dotenv")
const gdrive = require('./gdriveServer.js')
const client = new Discord.Client()

dotenv.config()

let count = 0

client.once("ready", async () => {
    count = await gdrive.getMembers()
    console.log("Ready!")
})

const readSheet = async () => {
    countMem = await gdrive.getMembers()
    if (countMem > count) {
        count = countMem
        sendMessage(countMem)
    }
}

setTimeout(readSheet(), (1000 * 60 * 60 * 12))

const sendMessage = (countMem) => {
    client.on('ready', async () => {
        const channel = guild.channels.array().filter(c => c.name.toLowerCase() === 'synbotti')
        await channel.send(`Uusia jäseniä: ${countMem-count}`)
    })
}

client.login(process.env.TOKEN)