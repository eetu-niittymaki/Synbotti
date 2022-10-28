const { google } = require('googleapis')
const dotenv = require("dotenv")

dotenv.config()

// Sheet ID
const memberSheet = process.env.SHEET

// Authenticates connection to Google Sheets
const authentication = async () => {
  const auth = new google.auth.GoogleAuth({
      keyFile: 'credentials.json',
      scopes: [ "https://www.googleapis.com/auth/spreadsheets", 
                "https://www.googleapis.com/auth/drive",
                'https://www.googleapis.com/auth/forms.body.readonly' ]
  })

  const client = await auth.getClient()
  const sheets = google.sheets({
      version: 'v4',
      auth: client
  })
  return { sheets }
}

// Returns row count of members sheet
const getMembers = async () => {
  try {
    const { sheets } = await authentication()

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: memberSheet,
      range: "A:X",
    })
    console.log(response.data.values.length)
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

module.exports = { getMembers }