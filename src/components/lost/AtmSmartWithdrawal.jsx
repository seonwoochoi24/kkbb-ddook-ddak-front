import { useState } from "react";
import Title from "../Title.jsx";
import wallet from "../../assets/icons/wallet.svg";
import copy from "../../assets/icons/copy.svg";
import map from "../../assets/icons/map.png";

function AtmSmartWithdrawal({
  title = "카드 없는 스마트 출금",
  authCode = "987654",
  expiresInSeconds = 1800,
  nearestAtm = {
    name: "여의도본점 ATM",
    distance: "150m",
    address: "서울 영등포구 여의도동...",
  },
  steps = [
    "ATM 화면에서 '스마트출금' 선택",
    "복사한 인증번호 입력",
    "출금할 금액 입력",
    "현금 수령",
  ],
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(authCode.replace(/\s/g, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("복사 실패", error);
    }
  };

  const timerLabel = `${Math.floor(expiresInSeconds / 60)}:${String(expiresInSeconds % 60).padStart(2, "0")}`;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col items-start justify-between gap-3 rounded-card bg-white px-4 py-5 shadow-card">
        <Title icon={wallet} title={title} />
        <span className="text-caption-1 text-gray">인증번호를 ATM에 입력하세요.</span>

        <div className="flex w-full flex-col items-start rounded-button bg-background p-4">
          <span className="text-title text-darkgray">출금 인증번호</span>
          <span className="mt-1 text-caption-1 text-gray">복사해서 사용하세요.</span>

          <div className="mt-3 flex w-full items-center justify-between gap-3">
            <span className="whitespace-nowrap text-[32px] font-semibold leading-none tracking-[0%] text-darkgray">
              {authCode}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center justify-center rounded-full bg-background p-2"
                aria-label="인증번호 복사"
              >
                <img src={copy} alt="copy" className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="rounded-full bg-background px-3 py-2 text-caption-1 text-yellow"
              >
                {timerLabel}
              </button>
            </div>
          </div>
          {copied && <span className="mt-2 text-caption-1 text-gray">복사되었습니다.</span>}
        </div>

        <span className="text-body-2 text-gray">보안을 위해 인증번호는 자동 폐기합니다</span>
      </div>

      <div className="flex flex-col gap-3 rounded-card bg-white px-4 py-5 shadow-card">
        <div className="flex items-center gap-2">
          <Title icon={wallet} title="가장 가까운 KB ATM" />
        </div>

        <img src={map} alt="map" className="rounded-button bg-background" />

        <div className="flex flex-col gap-2 rounded-card bg-gray-100 px-4 py-4">
          <div className="flex items-center justify-between">
            <span className="text-title text-darkgray">{nearestAtm.name}</span>
            <span className="text-caption-1 text-yellow">{nearestAtm.distance}</span>
          </div>
          <span className="text-caption-1 text-gray">{nearestAtm.address}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-card bg-white px-4 py-5 shadow-card">
        <div className="flex items-center gap-2">
          <Title icon={wallet} title="ATM 사용 방법" />
        </div>

        <div className="flex flex-col gap-3 rounded-card bg-gray-100 px-4 py-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="text-body-2 text-darkgray">{`${index + 1}. ${step}`}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AtmSmartWithdrawal;
