import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Notification, { NotificationRef } from './CustomFeatures/Notification';
import Loader from './CustomFeatures/Loader';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

interface Reservation {
    date: string;
    status: string;
}

interface ReservationResponse {
    [key: number]: Reservation[];
}

const CalendarContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;

  .Error {
    display:flex;
    justify-content:center;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 10px;
  }
`;

const CalendarTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
  border-bottom: 1px solid #ddd;

  th, td {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
  }

  .applyBtn {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 20px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    cursor: pointer;
    border-radius: 45px;

    &:hover {
      background-color: #45a049;
    }
  }
  
  .viewBtn {
    background-color: #F7F008;
    color: white;
    border: none;
    padding: 20px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    cursor: pointer;
    border-radius: 45px;

    &:hover {
      background-color: #ffe51f;
    }
  }

  .FullBtn {
    background-color: #6C63FF;
    color: white;
    border: none;
    padding: 20px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    cursor: pointer;
    border-radius: 45px;

    &:hover {
      background-color: #5e54ff;
    }
  }

  .Impossible {
    background-color: #FF6584;
    color: white;
    border: none;
    padding: 20px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    cursor: pointer;
    border-radius: 45px;

    &:hover {
      background-color: #ff5476;
    }
  }

  .status {
    font-size: 12px;
    color: #888;
  }
`;

const Balls = styled.div`
    text-align: center;
    padding: 20px;
    display:flex;
    justify-content:center;
    gap: 1rem;

    .redBall {
        background-color: #FF6584;
        color: white;
        border: none;
        padding: 10px 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 14px;
        cursor: pointer;
        border-radius: 45px;  
    }
    .yellowBall {
        background-color: #F7F008;
        color: white;
        border: none;
        padding: 10px 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 14px;
        cursor: pointer;
        border-radius: 45px;  
    }
    .greenBall {
        background-color: #4CAF50;
        color: white;
        border: none;
        padding: 10px 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 14px;
        cursor: pointer;
        border-radius: 45px;  
    }
    .purpleBall {
        background-color: #6C63FF;
        color: white;
        border: none;
        padding: 10px 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 14px;
        cursor: pointer;
        border-radius: 45px;  
    }
`

const Calendar = () => {
    const navigate = useNavigate();
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<string>('');

    const notificationRef = useRef<NotificationRef>(null);

    const fetchReservations = async () => {
        try {
            setIsLoading(true);
            console.log(`${apiUrl}/api/lab/calender 에다가 get 요청`);
            const response = await axios.get<ReservationResponse>(`${apiUrl}/api/lab/calender`);
            const allReservations = Object.values(response.data).flat();
            setReservations(allReservations);
            setIsLoading(false);
        } catch (error) {
            setIsError('' + error);
            console.error('Error fetching reservations:', error);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    const handleApplication = async (date: string) => {
        console.log('예약 요청 날짜:', date);
        navigate(`/apply/${date}`);
    };

    const handleView = async (date: string) => {
        console.log('예약 보기 날짜:', date);
        navigate(`/view/${date}`);
    };

    const handlePreviousMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    };

    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentMonth, 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentMonth + 1, 0);

    const daysInMonth = lastDayOfMonth.getDate();

    const renderCalendar = () => {
        const calendarRows = [];
        let days: JSX.Element[] = [];
        const startDayOfWeek = firstDayOfMonth.getDay();

        for (let i = 0; i < startDayOfWeek; i++) {
            days.push(<td key={`empty-${i}`}></td>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentDate.getFullYear(), currentMonth, day);
            const sendDate = new Date(currentDate.getFullYear(), currentMonth, day + 1);
            const formattedDate = sendDate.toISOString().slice(0, 10);
            let isApplied, isFull, isImpossible, isPastDate;

            if (reservations) {
                const reservationInfo = reservations.find(reservation => reservation.date === formattedDate);
                isApplied = reservationInfo && reservationInfo.status === 'applied';
                isFull = reservationInfo && reservationInfo.status === 'full';
                isImpossible = reservationInfo && reservationInfo.status === 'impossible';
            }

            isPastDate = sendDate < new Date();

            days.push(
                <td key={`day-${day}`}>
                    <div className="date">{day}</div>
                    {!isApplied && !isPastDate && !isFull && !isImpossible && <button className='applyBtn' aria-label="신청하기 버튼" onClick={() => handleApplication(formattedDate)}></button>}
                    {isApplied && !isPastDate && <button className='viewBtn' aria-label="신청현황 보기 버튼" onClick={() => handleView(formattedDate)}></button>}
                    {isFull && !isPastDate && <button className='FullBtn' aria-label="신청현황 보기 버튼" onClick={() => handleView(formattedDate)}></button>}
                    {isImpossible && !isPastDate && <button className='Impossible' aria-label="관리자로 인해 막힌 버튼" onClick={() => handImpossible('admin')}></button>}
                    {isPastDate && <button className='Impossible' aria-label="불가능 버튼" onClick={() => handImpossible('previousDate')}></button>}
                </td>
            );

            if (date.getDay() === 6 || day === daysInMonth) {
                calendarRows.push(<tr key={`week-${currentMonth}-${day}`}>{days}</tr>);
                days = [];
            }
        }

        return (
            <CalendarTable className="calendar">
                <thead>
                    <tr>
                        <th>
                            <button className='nextBtn' aria-label="이전 달력으로 넘기기" onClick={handlePreviousMonth}>◁</button>
                        </th>
                        <th colSpan={5}>{new Date(currentDate.getFullYear(), currentMonth, 1).toLocaleDateString('ko-KR', { month: 'long' })}</th>
                        <th>
                            <button className='nextBtn' aria-label="다음 달력으로 넘기기" onClick={handleNextMonth}>▷</button>
                        </th>
                    </tr>
                    <tr>
                        <th>일</th>
                        <th>월</th>
                        <th>화</th>
                        <th>수</th>
                        <th>목</th>
                        <th>금</th>
                        <th>토</th>
                    </tr>
                </thead>
                <tbody>{calendarRows}</tbody>
            </CalendarTable>
        );
    };

    const handImpossible = (Reason: string) => {
        if (Reason === 'admin') {
            if (notificationRef.current) {
                notificationRef.current.notify("관리자가 막아 놓은 날짜입니다.", 'error');
            }
        } else if (Reason === 'previousDate') {
            if (notificationRef.current) {
                notificationRef.current.notify("과거로는 신청할 수 없습니다.", 'error');
            }
        } else if (Reason === 'unknown') {
            if (notificationRef.current) {
                notificationRef.current.notify('알 수 없는 이유로 막혀있습니다.', 'error');
            }
        }
    };

    return (
        <>
            <Notification ref={notificationRef} closeTime={1000} />
            <CalendarContainer>
                <Balls>
                    <span className='redBall'></span>불가능
                    <span className='yellowBall'></span>신청됨
                    <span className='greenBall'></span>신청가능
                    <span className='purpleBall'></span>가득참
                </Balls>
                {isError && (<div className='Error'>{isError}</div>)}
                {!isLoading ? renderCalendar() : <Loader loading={isLoading} color="#d4d4d4" size={60} message="캘린더 불러오는 중..." bgColor="rgba(255, 255, 255, 0.1)" />}
            </CalendarContainer>
        </>
    );
};

export default Calendar;