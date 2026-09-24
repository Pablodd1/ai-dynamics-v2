// Vercel Serverless Function: GET /api/availability
// Returns next 5 business days with available 30-minute consultation slots

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
  res.setHeader('Access-Control-Allow-Origin', '*')

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const slots = {}
    const timeOptions = [
      { start: '09:00', end: '09:30', display: '9:00 AM' },
      { start: '10:00', end: '10:30', display: '10:00 AM' },
      { start: '11:00', end: '11:30', display: '11:00 AM' },
      { start: '13:00', end: '13:30', display: '1:00 PM' },
      { start: '14:00', end: '14:30', display: '2:00 PM' },
      { start: '15:00', end: '15:30', display: '3:00 PM' },
      { start: '16:00', end: '16:30', display: '4:00 PM' },
    ]

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    let targetDate = new Date()
    // Start from tomorrow
    targetDate.setDate(targetDate.getDate() + 1)

    let businessDaysAdded = 0
    while (businessDaysAdded < 5) {
      const dayOfWeek = targetDate.getDay()
      // Skip weekends (0 = Sunday, 6 = Saturday)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        const yyyy = targetDate.getFullYear()
        const mm = String(targetDate.getMonth() + 1).padStart(2, '0')
        const dd = String(targetDate.getDate()).padStart(2, '0')
        const dateKey = `${yyyy}-${mm}-${dd}`
        
        const dayName = daysOfWeek[dayOfWeek]
        const monthName = months[targetDate.getMonth()]
        const dayDisplay = `${dayName.slice(0, 3)}, ${monthName} ${targetDate.getDate()}`

        slots[dateKey] = timeOptions.map(t => ({
          start: `${dateKey}T${t.start}:00-04:00`,
          end: `${dateKey}T${t.end}:00-04:00`,
          display: t.display,
          day: dayDisplay,
          value: `${dateKey} ${t.display}`
        }))

        businessDaysAdded++
      }
      targetDate.setDate(targetDate.getDate() + 1)
    }

    return res.status(200).json({ success: true, slots })
  } catch (error) {
    return res.status(500).json({ error: 'Failed to generate availability', details: error.message })
  }
}
