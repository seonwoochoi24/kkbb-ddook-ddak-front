import { useState } from "react";
import Title from "../Title.jsx";
import wallet from "../../assets/icons/wallet.svg";
import check from "../../assets/icons/check.svg";

function Plan({
  title = "상하이 안심 플랜 (고급형)",
  items = [
    { label: "현지 질병/상해 의료비", value: "+ 최대 3천만원" },
    { label: "휴대폰 도난 및 파손", value: "+ 최대 50만원" },
    { label: "항공기 및 수하물 지연", value: "+ 최대 20만원" },
  ],
}) {
  const [agreed, setAgreed] = useState(false);

  return (
    <section className="flex flex-col gap-4 rounded-card bg-white px-4 py-5">
      <Title icon={wallet} title={title} />

      <div className="flex flex-col gap-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between gap-2">
            <span className="text-body-2 text-gray">{item.label}</span>
            <span className="text-body-1 text-yellow">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 border-t border-gray/20 pt-3">
        <div className="flex items-center justify-between">
          <span className="text-body-1 text-gray">최종 결제 금액</span>
          <span className="text-header text-darkgray">3,500원</span>
        </div>

        <button
          type="button"
          onClick={() => setAgreed((prev) => !prev)}
          className="flex items-center gap-2 rounded-button bg-white text-left"
        >
          <span className="flex h-4 w-4 shrink-0 items-center justify-center">
            <img
              src={check}
              alt=""
              className={`h-4 w-4 ${agreed ? "opacity-100" : "opacity-50"}`}
              style={{ filter: agreed ? "brightness(0) saturate(100%) invert(78%) sepia(61%) saturate(1112%) hue-rotate(354deg) brightness(103%) contrast(96%)" : "none" }}
            />
          </span>
          <span className="whitespace-nowrap text-body-2 text-gray">
            보험 가입을 위한 필수 약관 및 개인정보 제공 동의
          </span>
        </button>

        <button
          type="button"
          disabled={!agreed}
          className={`rounded-button px-4 py-3 text-title font-semibold transition ${
            agreed
              ? "bg-yellow text-darkgray"
              : "bg-darkgray text-white"
          }`}
        >
          Face ID로 1초 만에 연동하기
        </button>
      </div>
    </section>
  );
}

export default Plan;
