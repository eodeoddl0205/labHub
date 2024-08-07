import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
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

const Calendar = () => {
    const navigate = useNavigate();
    const [reservations, setReservations] = useState<{ [key: number]: Reservation[] }>({});
    const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<string>('');
    const [etag, setEtag] = useState<string>('');

    const notificationRef = useRef<NotificationRef>(null);

    const [showCalendar, setShowCalendar] = useState<boolean>(true);

    const Props = useSpring({
        opacity: showCalendar ? 1 : 0,
        transform: showCalendar ? 'translateY(0%)' : 'translateY(+0.8%)',
        config: { duration: 200 },
    });

    useEffect(() => {
        const savedMonth = localStorage.getItem('currentMonth');
        const savedReservations = localStorage.getItem('reservations');
        const savedEtag = localStorage.getItem('etag');
        if (savedMonth) {
            setCurrentMonth(Number(savedMonth));
        }
        if (savedReservations) {
            setReservations(JSON.parse(savedReservations));
        }
        if (savedEtag) {
            setEtag(savedEtag);
        }
        fetchReservations(savedEtag);
    }, []);

    useEffect(() => {
        localStorage.setItem('currentMonth', currentMonth.toString());
    }, [currentMonth]);

    useEffect(() => {
        localStorage.setItem('reservations', JSON.stringify(reservations));
    }, [reservations]);

    useEffect(() => {
        localStorage.setItem('etag', etag);
    }, [etag]);

    const fetchReservations = async (savedEtag: string | null) => {
        try {
            setIsLoading(true);
            const response = await axios.get<ReservationResponse>(`${apiUrl}/api/calendar`, {
                headers: {
                    'If-None-Match': savedEtag || ''
                },
                validateStatus: (status) => status >= 200 && status < 300 || status === 304
            });

            if (response.status === 200) {
                console.log("ETag received:", response.headers['etag']);
                setReservations(response.data);
                const newEtag = response.headers['etag'] || '';
                setEtag(newEtag);
                localStorage.setItem('etag', newEtag);
            } else if (response.status === 304) {
                console.log("304 Not Modified: Data is up-to-date");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setIsError(`Error: ${error.message}`);
            } else {
                setIsError('Unexpected error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleView = (date: string) => {
        navigate(`/view/${date}`);
    };

    const handleImpossible = (reason: string) => {
        const messages: { [key: string]: string } = {
            'admin': "관리자가 막아 놓은 날짜입니다.",
            'previousDate': "과거로는 신청할 수 없습니다.",
            'unknown': '알 수 없는 이유로 막혀있습니다.',
        };
        notificationRef.current?.notify(messages[reason] || '알 수 없는 이유로 막혀있습니다.', 'error');
    };

    const handlePreviousMonth = () => {
        setShowCalendar(false);
        setTimeout(() => {
            setCurrentMonth(prevMonth => (prevMonth === 0 ? 11 : prevMonth - 1));
            setShowCalendar(true);
        }, 200);
    };

    const handleNextMonth = () => {
        if (showCalendar) {
            setShowCalendar(false);
            setTimeout(() => {
                setCurrentMonth(prevMonth => (prevMonth === 11 ? 0 : prevMonth + 1));
                setShowCalendar(true);
            }, 200);
        }
    };

    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentMonth, 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    const renderButton = (status: string, formattedDate: string, isPastDate: boolean) => {
        if (isPastDate) {
            return <ImpossibleButton aria-label="불가능 버튼" onClick={() => handleImpossible('previousDate')} />;
        }

        switch (status) {
            case 'applied':
                return <ViewButton aria-label="신청현황 보기 버튼" onClick={() => handleView(formattedDate)} />;
            case 'full':
                return <FullButton aria-label="신청현황 보기 버튼" onClick={() => handleView(formattedDate)} />;
            case 'impossible':
                return <ImpossibleButton aria-label="관리자로 인해 막힌 버튼" onClick={() => handleImpossible('admin')} />;
            default:
                return <ApplyButton aria-label="신청하기 버튼" onClick={() => handleView(formattedDate)} />;
        }
    };

    const renderCalendar = () => {
        const calendarRows: JSX.Element[] = [];
        let days: JSX.Element[] = [];
        const startDayOfWeek = firstDayOfMonth.getDay();

        for (let i = 0; i < startDayOfWeek; i++) {
            days.push(<td key={`empty-${i}`}></td>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentDate.getFullYear(), currentMonth, day);
            const formattedDate = date.toISOString().slice(0, 10);
            const reservationsForMonth = reservations[currentMonth] || [];
            const reservationInfo = reservationsForMonth.find(reservation => reservation.date === formattedDate);
            const status = reservationInfo?.status || '';
            const isPastDate = date < new Date(currentDate.setHours(0, 0, 0, 0));

            days.push(
                <td key={`day-${day}`}>
                    <div className="date">{day}</div>
                    {renderButton(status, formattedDate, isPastDate)}
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
                            <Button className='prevBtn' aria-label="이전 달력으로 넘기기" onClick={handlePreviousMonth}>
                            </Button>
                        </th>
                        <th colSpan={5}>{new Date(currentDate.getFullYear(), currentMonth, 1).toLocaleDateString('ko-KR', { month: 'long' })}</th>
                        <th>
                            <Button className='nextBtn' aria-label="다음 달력으로 넘기기" onClick={handleNextMonth}>
                            </Button>
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

    return (
        <>
            <Notification ref={notificationRef} closeTime={1000} />
            <CalendarContainer>
                {isError && <div className='Error' style={{marginBottom:"20px"}}>{isError}</div>}
                {!isLoading ? (
                    <animated.div style={Props}>{renderCalendar()}</animated.div>
                ) : (
                    <Loader loading={isLoading} color="#d4d4d4" size={60} message="캘린더 불러오는 중..." bgColor="rgba(255, 255, 255, 0.1)" messageColor='#000000' />
                )}
            </CalendarContainer>
        </>
    );
};

const CalendarContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  border-radius: 10px;

  .Error {
    display: flex;
    justify-content: center;
  }

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 0 10px;
  }

  @media (prefers-color-scheme: dark) {
    background-color: #222;
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
    background-color: #d2d2d2;
  }

  @media (max-width: 768px) {
    th, td {
        padding: 5px;
    }
  }

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    th {
        background-color: #666;
    }
  }
`;

const Button = styled.button`
  padding: 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 0.8rem;
  cursor: pointer;
  border-radius: 45px;
  border: none;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const ApplyButton = styled(Button)`
  background-color: #4CAF50;
`;

const ViewButton = styled(Button)`
  background-color: #F7F008;
`;

const FullButton = styled(Button)`
  background-color: #6C63FF;
`;

const ImpossibleButton = styled(Button)`
  background-color: #FF6584;
`;

export default Calendar;