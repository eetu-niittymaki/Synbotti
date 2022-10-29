const { google } = require('googleapis')
const dotenv = require("dotenv")

dotenv.config()

// Sheet ID
const sheetIDs = [process.env.SHEET_ONE, process.env.SHEET_TWO]

// Authenticates connection to Google Sheets
const authentication = async () => {
  const auth = new google.auth.GoogleAuth({
      keyFile: 'credentials.json',
      scopes: [ "https://www.googleapis.com/auth/spreadsheets.readonly", 
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

    let count = 0
    for (let i=0; i < sheetIDs.length; i++) { // Loops over and makes requests on all given sheet ids
      const res = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetIDs[i],
        range: "A:Z",
      })
      count += res.data.values.length
    }
    return count
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