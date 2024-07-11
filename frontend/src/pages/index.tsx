import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return(
        <div>
            홈입니다.
            <Link to={'/test'}>테스트 환경 접속</Link>
        </div>
    )
}

export default Home;