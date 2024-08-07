const crypto = require('crypto');
const { getCalendarByYear, putCalendar } = require('../repositorys/calendarRepository');

const generateETag = (data) => {
  const hash = crypto.createHash('md5');
  hash.update(JSON.stringify(data));
  return hash.digest('hex');
};

exports.putCalendar = async (req, res) => {
  try {
    const result = await putCalendar();
    if (result) {
      res.status(200).json({ message: 'Calendar updated successfully' });
    } else {
      res.status(500).json({ message: 'Failed to update calendar' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating calendar', error: error.message });
  }
}

exports.getCalendar = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const data = await getCalendarByYear(currentYear);

    const eTag = generateETag(data);
    if (req.headers['if-none-match'] === eTag) {
      return res.status(304).end();
    }

    res.setHeader('ETag', eTag);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.postCalender = async (req, res) => {

}