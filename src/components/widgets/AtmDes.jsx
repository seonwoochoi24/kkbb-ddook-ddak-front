import Title from "../Title.jsx";
import wallet from "../../assets/icons/wallet.svg";

function AtmDes() {
  return (
    <section className="flex flex-col gap-3 rounded-card bg-white px-4 py-5">
      <div className="flex items-center gap-2">
        <Title icon={wallet} title="ATM 사용 방법" />
      </div>

      <div className="flex flex-col gap-3 rounded-card bg-gray-100 px-4 py-4">
        <div className="flex items-start gap-2">
          <span className="text-body-2 text-darkgray">
           1. ATM 화면에서 ‘스마트 출금’ 선택
          </span>
        </div>

        <div className="flex items-start gap-2">
          <span className="text-body-2 text-darkgray">
            2. 복사한 인증번호 입력
          </span>
        </div>

        <div className="flex items-start gap-2">
          <span className="text-body-2 text-darkgray">
            3. 출금할 금액 입력
          </span>
        </div>

        <div className="flex items-start gap-2">
          <span className="text-body-2 text-darkgray">
            4. 현금 수령
          </span>
        </div>
      </div>
    </section>
  );
}

export default AtmDes;
