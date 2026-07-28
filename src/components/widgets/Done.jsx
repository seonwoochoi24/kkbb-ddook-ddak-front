import Title from "../Title.jsx";
import wallet from "../../assets/icons/wallet.svg";

function Done() {
  return (
    <section className="flex flex-col gap-3 rounded-card bg-white px-4 py-5">
      <div className="flex items-center gap-2">
        <Title icon={wallet} title="분실 신고 및 재발급 신청 완료" />
      </div>

      <div className="flex flex-col gap-2 rounded-card bg-gray-100 px-4 py-4">
        <span className="text-title text-darkgray">주민등록증</span>
        <span className="text-caption-1 text-yellow">
          신고 및 재발급 완료
        </span>
      </div>
    </section>
  );
}

export default Done;
