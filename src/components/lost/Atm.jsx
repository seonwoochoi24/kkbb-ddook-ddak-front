import Title from "../Title.jsx";
import wallet from "../../assets/icons/wallet.svg";
import vector from "../../assets/icons/vector.svg";
import map from "../../assets/icons/map.png";

function Atm({ onCreate }) {
  return (
    <section className="flex flex-col gap-3 rounded-card bg-white px-4 py-5 shadow-card">
      <div className="flex items-center gap-2">
        <Title icon={wallet} title="당장 현금이 필요하신가요?" />
      </div>

      <span className="text-caption-1 text-gray">
        카드 없이 가까운 KB ATM에서 출금할 수 있어요.
      </span>
        <img src={map} alt="map" className="rounded-button bg-background" />

      <button
        type="button"
        onClick={onCreate}
        className="flex flex-col gap-3 rounded-card bg-yellow px-4 py-5 text-left"
      >
        <div className="flex flex-row items-center ">
          <span className="text-title text-darkgray">출금 인증번호 뚝딱 만들기</span>
          <img src={vector} alt="" className="h-4 w-4" />
        </div>

        <span className="text-caption-1 text-gray">
          생성된 인증번호는 30분 동안 유효합니다.
        </span>
      </button>
    </section>
  );
}

export default Atm;
