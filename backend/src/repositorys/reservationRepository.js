const pool = require('../config/mysql');

const postReservation = async (reservation_date, representative, number_of_people, purpose, time_slot, lab_choice) => {
  try {
    await pool.query(
      `INSERT INTO reservations (reservation_date, representative, number_of_people, purpose, time_slot, lab_choice) 
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [reservation_date, representative, number_of_people, purpose, time_slot, lab_choice]
    );
  } catch (error) {
    throw error;
  }
};

module.exports = {
  postReservation,
};