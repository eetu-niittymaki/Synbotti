const { google } = require('googleapis')
const dotenv = require("dotenv")

dotenv.config()

// Sheet IDs
const memberSheet = process.env.SHEET

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

// Read persons who have already entered raffle
const getMembers = async () => {
  try {
    const { sheets } = await authentication()

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: memberSheet,
      range: 'Taulukko1'
    })
    return response.data.values.length
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

module.exports = { getMembers}