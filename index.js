const Discord = require("discord.js")
const dotenv = require("dotenv")
const fs = require("fs")
const gdrive = require('./gdriveServer.js')
const client = new Discord.Client()

dotenv.config()

let count = 0
const file = "log.txt"

client.once("ready", async () => {
    const data = fs.readFileSync(file, 'utf8')
    count = int(data)
    await readSheet()
    console.log("Ready!")
})

const readSheet = async () => {
    countMem = await gdrive.getMembers()
    if (countMem > count) {
        count = countMem
        sendMessage(countMem)
        fs.writeFile(file, countMem, (err) => {
            if (err) return console.log(err)
        })
    }
}

setTimeout(readSheet(), (1000 * 60 * 60 * 12))

const sendMessage = (countMem) => {
    client.on('ready', async () => {
        const channel = await guild.channels.array().filter(c => c.name.toLowerCase() === 'synbotti')
        await channel.send(`Uusia jäseniä: ${countMem-count}`)
    })
}

client.login(process.env.TOKEN)