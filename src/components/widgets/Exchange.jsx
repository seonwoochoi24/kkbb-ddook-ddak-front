import Title from "../Title.jsx";
import dollar from "../../assets/icons/dollar.svg";

function Exchange() {
  return (
    <section className="flex flex-col gap-3 rounded-card bg-white px-4 py-5">
      <div className="flex items-center gap-2">
        <Title icon={dollar} title="위안화(CNY) 충전하셨나요?" />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between rounded-card bg-background px-4 py-4">
          <span className="text-body-2 text-darkgray">
            내 트래블 카드 잔액 : 0 CNY
          </span>
          <div className="flex justify-end">
            <button className="rounded-[8px] bg-yellow px-2 py-3 text-body-1 text-darkgray">
              뚝딱 충전하기
            </button>
          </div>
        </div>

        <span className="px-1 text-caption-1 text-gray">
          현재 환율 1 CNY = 약 190원 (우대환율 100% 적용 중)
        </span>
      </div>
    </section>
  );
}

export default Exchange;
