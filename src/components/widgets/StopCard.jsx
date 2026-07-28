import { useState } from "react";
import Title from "../Title.jsx";

import alert from "../../assets/icons/alert.svg";
import goodkkaebi from "../../assets/logo/goodkkaebi.svg";

function StopCard() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggle = () => {
    const nextValue = !isEnabled;
    setIsEnabled(nextValue);

    if (nextValue) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEnabled(false);
  };

  return (
    <>
      <div className="flex flex-col gap-3 rounded-card bg-white px-4 py-5">
        <div className="flex items-center justify-between">
          <Title icon={alert} title="보유 카드 일괄 정지" />
          <button
            type="button"
            onClick={handleToggle}
            className={`relative h-6 w-11 rounded-full transition-colors ${isEnabled ? "bg-yellow" : "bg-gray"}`}
            aria-pressed={isEnabled}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${isEnabled ? "right-0.5" : "left-0.5"}`}
            />
          </button>
        </div>
        <div className="flex items-center gap-2 rounded-button bg-background p-4">
          <span className="text-body-1 text-darkgray">[체크] </span>
          <span className="text-body-2 text-gray">KB국민 노리2 체크카드</span>
        </div>
        <span className="text-caption-1 text-gray">
          분실된 카드의 모든 결제가 차단됩니다.
        </span>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4">
          <div className="flex h-[367px] w-[284px] flex-col items-center rounded-[24px] bg-white px-5 py-6 text-center shadow-xl">
            <img src={goodkkaebi} alt="goodkkaebi" className="mb-3 h-[168px] w-auto" />
            <p className="whitespace-nowrap text-header text-darkgray">
              모든 카드가 안전하게 정지되었어요!
            </p>
            <p className="mt-2 text-body-2 text-gray">
              분실된 카드의 결제가 차단되었습니다.
            </p>
            <button
              type="button"
              className="mt-4 w-full rounded-[16px] bg-yellow px-4 py-3 text-title text-darkgray"
            >
              새로운 카드로 재발급 신청하기 &gt;
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="mt-3 whitespace-nowrap text-caption-1 text-gray underline"
            >
              아니요. 괜찮습니다.
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default StopCard;