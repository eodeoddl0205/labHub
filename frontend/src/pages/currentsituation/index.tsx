import React, { Suspense, useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

const Calendar = React.lazy(() => import('../../components/Calender'));
const Header = React.lazy(() => import('../../components/Header'));

const CurrentSituation = () => {
    const [showCalendar, setShowCalendar] = useState(false);

    useEffect(() => {
        setShowCalendar(true);
    }, []);

    const props = useSpring({
        opacity: showCalendar ? 1 : 0,
        config: { duration: 300 },
    });

    return (
        <Suspense fallback={<Skeleton count={5} />}>
            <MainContainer>
                <Header />
                <animated.div style={props}>
                    <Calendar />
                </animated.div>
            </MainContainer>
        </Suspense >
    );
};

const MainContainer = styled.div`
    margin-top: 80px;
    width: 100%;
`

export default CurrentSituation;
