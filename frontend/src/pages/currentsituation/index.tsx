import Calender from "../../components/Calender";
import Header from "../../components/Header";

const CurrentSituation = () => {
    const navItems = [
        { tag: "현황", link: "/currentsituation" },
        { tag: "FAQ", link: "/support/faq" },
    ];
    return (
        <>
            <Header notices={["편하게 실습실을 대여해요!", "개발자가 가장 좋아하는 동물은 고양이입니다.", "개발자는 아싸이기에 혼자 개발했습니다."]}
                title="LABHUB"
                navItems={navItems} />
            <Calender />
        </>
    )
}

export default CurrentSituation;