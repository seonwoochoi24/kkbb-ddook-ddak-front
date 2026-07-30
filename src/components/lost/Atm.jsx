import Title from "../Title.jsx";
import wallet from "../../assets/icons/wallet.svg";
import vector from "../../assets/icons/vector.svg";

function Atm() {
  return (
    <section className="flex flex-col gap-3 rounded-card bg-white px-4 py-5">
      <div className="flex items-center gap-2">
        <Title icon={wallet} title="당장 현금이 필요하신가요?" />
      </div>

      <span className="text-caption-1 text-gray">
        카드 없이 가까운 KB ATM에서 출금할 수 있어요.
      </span>

      <div className="min-h-[140px] rounded-button bg-background" />
    <div className="flex flex-col gap-3 rounded-card bg-yellow px-4 py-5">
        <div className="flex flex-row items-center ">
            <span className="text-title text-darkgray">출금 인증번호 뚝딱 만들기</span>
            <img src={vector} alt="" className="h-4 w-4" />
        </div>

        <span className="text-caption-1 text-gray">
            생성된 인증번호는 30분 동안 유효합니다.
        </span>
      </div>
      
    </section>
  );
}

export default Atm;
