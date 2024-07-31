import { Link } from "react-router-dom";
import Header from "../components/Header";
import styled from "styled-components";

const Home: React.FC = () => {
    const navItems = [
        { tag: "현황", link: "/currentsituation" },
        { tag: "FAQ", link: "/support/faq" },
    ];

    return (
        <>
            <Header notices={["편하게 실습실을 대여해요!","개발자가 가장 좋아하는 동물은 고양이입니다.","개발자는 아싸이기에 혼자 개발했습니다."]}
                title="LABHUB"
                navItems={navItems} />
            <MainContainer>
                <Banner>
                    <h1>교내 최고의 실습실 대여 서비스!</h1>
                    <div>
                        <p>쉽고 빠르게 실습실을 예약하세요.</p>
                        <p>현재 총 2,131번 랩실이 사용되었어요</p>
                    </div>
                    <StyledLink to="/register">지금 시작하기</StyledLink>
                </Banner>
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
                <Support>
                    <h2>지원 및 FAQ</h2>
                    <StyledLink to="/support/faq">FAQ 보기</StyledLink>
                    <StyledLink to="/support/chat">실시간 채팅</StyledLink>
                </Support>
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
    padding: 0 20px;
`;

const Banner = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 40px 20px;
    background-color: #6C63FF;
    color: white;
    border-radius: 0px 0px 10px 10px;
    margin-bottom: 50px;

    h1 {
        font-size: 2.5em;
        margin-bottom: 20px;
    }

    p {
        font-size: 1.2em;
        margin-bottom: 20px;
    }
`;

const StyledLink = styled(Link)`
    display: inline-block;
    padding: 10px 20px;
    margin-top: 10px;
    color: white;
    background-color: #FF6584;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
    transition: background-color 0.3s;

    &:hover {
        background-color: #FF497D;
    }
`;

const Features = styled.section`
    display: flex;
    justify-content: space-between;
    padding: 50px 0;
    border-radius: 10px;
    margin-bottom: 50px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const Feature = styled.div`
    max-width: 300px;
    text-align: center;
    margin-bottom: 30px;

    h2 {
        font-size: 1.8em;
        margin-bottom: 10px;
        color: #333;
    }

    p {
        font-size: 1.1em;
        color: #666;
    }
`;

const UserGuides = styled.section`
    display: flex;
    justify-content: space-between;
    padding: 50px 0;
    background-color: #ffffff;
    border-radius: 10px;
    margin-bottom: 50px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const Guide = styled.div`
    max-width: 300px;
    text-align: center;
    margin-bottom: 30px;

    h2 {
        font-size: 1.8em;
        margin-bottom: 10px;
        color: #333;
    }

    p {
        font-size: 1.1em;
        color: #666;
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
`;

export default Home;
