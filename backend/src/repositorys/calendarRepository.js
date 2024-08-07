const pool = require('../config/mysql');

const putCalendar = async () => {
  try {
    await pool.query(`CALL update_reservation_status()`);
    return true;
  } catch (error) {
    throw error;
  }
}

const getCalendar = async () => {
  
}

const getCalendarByYear = async (year) => {
  try {
    // 데이터를 가져옵니다.
    const [rows] = await pool.query(`
      SELECT reservation_date, status
      FROM calendar
      WHERE YEAR(reservation_date) = ?
      ORDER BY reservation_date
    `, [year]);

    // 데이터를 형식화하여 결과를 구성
    const allReservations = {};

    rows.forEach(row => {
      const date = row.reservation_date.toISOString().split('T')[0]; // ISO 문자열에서 날짜 부분만 추출
      const month = new Date(row.reservation_date).getMonth(); // 월을 숫자로 추출 (0-11)

      // 월을 키로 사용
      if (!allReservations[month]) {
        allReservations[month] = [];
      }

      allReservations[month].push({
        date: date,
        status: row.status
      });
    });

    return allReservations;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getCalendarByYear,
  putCalendar
};
