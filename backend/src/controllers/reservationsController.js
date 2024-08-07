const { postReservations } = require('../repositorys/reservationRepository');

exports.postReservations = async (req, res) => {
  try {
    // 요청 본문에서 예약 정보를 가져옴
    const { reservation_date, representative, number_of_people, purpose, time_slot, lab_choice } = req.body;

    // 필수 필드가 누락되었는지 확인
    if (!reservation_date || !representative || !number_of_people || !purpose || !time_slot || !lab_choice) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // 데이터베이스에 새 예약 추가
    const result = await postReservations(reservation_date, representative, number_of_people, purpose, time_slot, lab_choice);

    // 성공적으로 추가되었음을 응답
    res.status(201).json({ message: 'Reservation added successfully' });
  } catch (error) {
    console.error("Error adding reservation:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}