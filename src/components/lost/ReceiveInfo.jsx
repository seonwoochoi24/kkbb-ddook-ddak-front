import Title from "../Title.jsx";
import wallet from "../../assets/icons/wallet.svg";

function ReceiveInfo() {
  return (
    <section className="flex flex-col gap-3 rounded-card bg-white px-4 py-5 shadow-card">
      <div className="flex items-center gap-2">
        <Title icon={wallet} title="수령 방법 및 예상 기간 안내" />
      </div>

        <span className="text-caption-1 text-gray">
          재발급된 신분증은 주민등록증은 3~4주, 운전면허증은 1~2주 내로 선택하신 방법으로 수령하실 수 있습니다.
        </span>
    </section>
  );
}

export default ReceiveInfo;
