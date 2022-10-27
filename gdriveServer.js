const { google } = require('googleapis')
const dotenv = require("dotenv")

dotenv.config()

// Sheet IDs
const sheet = process.env.SHEET

// Authenticates connection to Google Sheets
const authentication = async () => {
  const auth = new google.auth.GoogleAuth({
      keyFile: 'credentials.json',
      scopes: [ "https://www.googleapis.com/auth/spreadsheets", 
                "https://www.googleapis.com/auth/drive" ]
  })

  const client = await auth.getClient()
  const sheets = google.sheets({
      version: 'v4',
      auth: client
  })
  return { sheets }
}

// Read prizes from spreadsheet
const getPrize = async () => {
  try {
    const { sheets } = await authentication()

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: prizes,
      range: 'Taulukko1'
    })
    const randomPrize = await getRandom(response.data.values)
    for (let i = 0; i < response.data.values.length; i++) { // Loop through response to find prize index
      if (response.data.values[i] === randomPrize) {
        console.log(randomPrize, i)
        index = i
      }
    }
    return randomPrize
  } catch(e) {
    console.log(e)
  }
}

// Read persons who have already entered raffle
const getHasEntered = async () => {
  try {
    const { sheets } = await authentication()

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: hasEnteredId,
      range: 'Taulukko1'
    })
    console.log(typeof response.data.values)
    return response.data.values
  } catch(e) {
    console.log(e)
  }
}

// prints all files and folders service account has access to
/*
drive.files.list({}, (err, res) => {
    if (err) throw err
    const files = res.data.files;
    if (files.length) {
    files.map((file) => {
      console.log(file)
    })
    } else {
      console.log('No files found')
    }
  })
*/

module.exports = { getPrize, getHasEntered}