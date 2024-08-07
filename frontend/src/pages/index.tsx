import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import styled from "styled-components";
import { useSpring, animated } from '@react-spring/web';
import CountingNumber from "../components/CustomFeatures/CountingNumber";

const Home: React.FC = () => {
    const bannerSpring = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 500 } });
    const featuresSpring = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 1000 }, delay: 500 });
    const userGuidesSpring = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 1000 }, delay: 1000 });
    const reviewsSpring = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 1000 }, delay: 1500 });
    const supportSpring = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 1000 }, delay: 2000 });

    return (
        <>
            <Header />
            <MainContainer>
                <animated.div style={bannerSpring}>
                    <Banner>
                        <h1>교내 실습실 대여 서비스!</h1>
                        <div>
                            <p>쉽고 빠르게 실습실을 예약하세요.</p>
                            <p>현재 총 <div style={{ fontSize: "2rem", fontWeight: "600", margin: "0.5rem", display: "flex", justifyContent: "center" }}><CountingNumber initialCount={2310} duration={3000} />개</div>랩실이 사용되었어요</p>
                        </div>
                        <StyledLink to="/register">지금 시작하기</StyledLink>
                    </Banner>
                </animated.div>
                <animated.div style={featuresSpring}>
                    <Features>
                        <Feature>
                            <h2>실습실 현황</h2>
                            <p>원하는 실습실을 한눈에 확인하고 간편하게 예약하세요.</p>
                        </Feature>
                        <Feature>
                            <h2>실습실 리뷰 및 피드백</h2>
                            <p>사용 후기를 남기고 다른 사용자의 리뷰를 확인하세요.</p>
                        </Feature>
                        <Feature>
                            <h2>알림 및 리마인더</h2>
                            <p>예약 확정 및 취소, 임박 알림을 받아보세요.</p>
                        </Feature>
                    </Features>
                </animated.div>
                <animated.div style={userGuidesSpring}>
                    <UserGuides>
                        <Guide>
                            <h2>학생</h2>
                            <p>학생 계정으로 가입하고 실습실을 예약하세요.</p>
                        </Guide>
                        <Guide>
                            <h2>선생님</h2>
                            <p>선생님 계정으로 가입하고 학생들의 실습실 예약을 관리하세요.</p>
                        </Guide>
                        <Guide>
                            <h2>관리자</h2>
                            <p>관리자 계정으로 시스템을 운영하고 실습실을 관리하세요.</p>
                        </Guide>
                    </UserGuides>
                </animated.div>
                <animated.div style={reviewsSpring}>
                    <Reviews>
                        <h2>사용자 리뷰</h2>
                        <Review>
                            <p>"LabHub 덕분에 실습실 예약이 정말 편리해졌어요!" - 학생 A</p>
                        </Review>
                        <Review>
                            <p>"쉽고 빠르게 실습실을 예약할 수 있어서 만족합니다." - 학생 B</p>
                        </Review>
                        <StyledLink to="/reviews">더 많은 리뷰 보기</StyledLink>
                    </Reviews>
                </animated.div>
                <animated.div style={supportSpring}>
                    <Support>
                        <h2>지원 및 FAQ</h2>
                        <StyledLink to="/support/faq">FAQ 보기</StyledLink>
                        <StyledLink to="/support/chat">실시간 채팅</StyledLink>
                    </Support>
                </animated.div>
            </MainContainer>
            <Footer>
                <p>&copy; 2024 LabHub. All rights reserved.</p>
                <p>문의: gbslabhub@gmail.com</p>
            </Footer>
        </>
    );
};

const MainContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    margin-top: 60px;
    padding: 0 20px;
`;

const Banner = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 40px 20px;
    background-color: #0D80A0;
    color: #FFFFFF;
    border-radius: 0px 0px 10px 10px;
    margin-bottom: 100px;

    h1 {
        font-size: 2.5em;
        margin-bottom: 20px;
    }

    p {
        font-size: 1.2em;
        margin-bottom: 20px;
    }

    @media (prefers-color-scheme: dark) {
        background-color: #1c1c1c;
        color: #f0f0f0;
    }
`;

const StyledLink = styled(Link)`
    display: inline-block;
    padding: 10px 20px;
    margin-top: 10px;
    color: white;
    background-color: #c73267;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
    transition: background-color 0.3s;

    &:hover {
        background-color: #9c1e4c;
    }

    @media (prefers-color-scheme: dark) {
        background-color: #ff4d6d;
        color: #1c1c1c;
        &:hover {
            background-color: #e5383b;
        }
    }
`;

const Features = styled.section`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 40px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }

    @media (prefers-color-scheme: dark) {
        background-color: #1c1c1c;
    }
`;

const Feature = styled.div`
    max-width: 300px;
    text-align: center;
    background-color: #f2f2f2;
    padding: 30px 20px;
    border-radius : 10px;
    margin: 20px;

    h2 {
        font-size: 1.8em;
        margin-bottom: 10px;
        color: #666262;
    }

    p {
        font-size: 1.1em;
        color: #666;
    }

    @media (prefers-color-scheme: dark) {
        background-color: #444;
        h2 {
            color: #f0f0f0;
        }
        p {
            color: #ccc;
        }
    }
`;

const UserGuides = styled.section`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 10px;
    margin-bottom: 100px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }

    @media (prefers-color-scheme: dark) {
        background-color: #1c1c1c;
    }
`;

const Guide = styled.div`
    max-width: 300px;
    text-align: center;
    background-color: #f2f2f2;
    padding: 30px 20px;
    border-radius : 10px;
    margin: 20px;

    h2 {
        font-size: 1.8em;
        margin-bottom: 10px;
        color: #333;
    }

    p {
        font-size: 1.1em;
        color: #666;
    }

    @media (prefers-color-scheme: dark) {
        background-color: #444;
        h2 {
            color: #f0f0f0;
        }
        p {
            color: #ccc;
        }
    }
`;

const Reviews = styled.section`
    text-align: center;
    padding: 50px 20px;
    border-radius: 10px;
    margin-bottom: 50px;

    h2 {
        font-size: 2em;
        margin-bottom: 20px;
        color: #333;
    }

    @media (prefers-color-scheme: dark) {
        background-color: #1c1c1c;
        h2 {
            color: #f0f0f0;
        }
    }
`;

const Review = styled.div`
    max-width: 800px;
    margin: 0 auto 20px auto;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;

    p {
        font-size: 1.1em;
        color: #333;
    }

    @media (prefers-color-scheme: dark) {
        background-color: #2c2c2c;
        border-color: #444;
        p {
            color: #f0f0f0;
        }
    }
`;

const Support = styled.section`
    text-align: center;
    padding: 50px 20px;
    background-color: #ffffff;
    border-radius: 10px;
    margin-bottom: 50px;

    h2 {
        font-size: 2em;
        margin-bottom: 20px;
        color: #333;
    }

    @media (prefers-color-scheme: dark) {
        background-color: #1c1c1c;
        h2 {
            color: #f0f0f0;
        }
    }
`;

const Footer = styled.footer`
    text-align: center;
    padding: 20px;
    background-color: #333;
    color: white;

    p {
        margin: 5px 0;
    }

    a {
        color: white;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }

    @media (prefers-color-scheme: dark) {
        background-color: #000;
        color: #f0f0f0;

        a {
            color: #f0f0f0;
        }
    }
`;

export default Home;
