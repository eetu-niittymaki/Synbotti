const { google } = require('googleapis')
const dotenv = require("dotenv")

dotenv.config()

// Sheet ID
const sheet1 = process.env.SHEET_ONE
const sheet2 = process.env.SHEET_TWO

// Authenticates connection to Google Sheets
const authentication = async () => {
  const auth = new google.auth.GoogleAuth({
      keyFile: 'credentials.json',
      scopes: [ "https://www.googleapis.com/auth/spreadsheets", 
                "https://www.googleapis.com/auth/drive",
                 ]
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

    const res1 = await sheets.spreadsheets.values.get({
      spreadsheetId: sheet1,
      range: "A:Z",
    })

    const res2 = await sheets.spreadsheets.values.get({
      spreadsheetId: sheet2,
      range: "A:Z",
    })
    return res1.data.values.length + res2.data.values.length 
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