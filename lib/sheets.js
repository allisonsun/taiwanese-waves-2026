function getDriveImageUrl(driveUrl) {
  if (!driveUrl) return null
  const match = driveUrl.match(/[-\w]{25,}/)
  if (!match) return null
  return `https://drive.google.com/uc?export=view&id=${match[0]}`
}

export async function getApprovedStories() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.GOOGLE_SHEET_ID}/values/Sheet1?key=${process.env.GOOGLE_SHEETS_API_KEY}`
  const res = await fetch(url, { next: { revalidate: 300 } })
  const data = await res.json()
  const [header, ...rows] = data.values
  const approvedIdx  = header.indexOf('Approved')
  const nameIdx      = header.indexOf('name')
  const locationIdx  = header.indexOf('location')
  const yearsIdx     = header.indexOf('years')
  const storyIdx     = header.indexOf('story')
  const photoIdx     = header.indexOf('photo')
  return rows
    .filter(r => r[approvedIdx]?.toUpperCase() === 'TRUE')
    .map(r => ({
      name:     r[nameIdx] || '',
      location: locationIdx >= 0 ? (r[locationIdx] || '') : '',
      years:    yearsIdx >= 0 ? (r[yearsIdx] || '') : '',
      story:    r[storyIdx] || '',
      photo:    getDriveImageUrl(photoIdx >= 0 ? r[photoIdx] : null),
    }))
}
