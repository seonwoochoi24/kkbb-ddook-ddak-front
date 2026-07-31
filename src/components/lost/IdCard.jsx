import { useState } from "react";
import Title from "../Title.jsx";
import IconCard from "../IconCard.jsx";
import Button from "../Button.jsx";
import wallet from "../../assets/icons/wallet.svg";

function IdCard({ onSubmit, initialSelectedTypes = [] }) {
  const [selectedTypes, setSelectedTypes] = useState(initialSelectedTypes);

  const toggleSelectedType = (type) => {
    setSelectedTypes((currentTypes) =>
      currentTypes.includes(type)
        ? currentTypes.filter((currentType) => currentType !== type)
        : [...currentTypes, type],
    );
  };

  return (
    <div className="flex flex-col items-start justify-between gap-3 rounded-card bg-white px-4 py-5">
      <Title icon={wallet} title="신분증도 잃어버리셨나요?" />
      <span className="text-caption-1 text-gray">
        주민등록증, 운전면허증 분실 신고 및 재발급 신청을 한 번에 하세요.
      </span>
      <div className="flex w-full items-center justify-center gap-10 rounded-button">
        <IconCard
          type="3"
          selected={selectedTypes.includes("3")}
          onClick={() => toggleSelectedType("3")}
        />
        <IconCard
          type="4"
          selected={selectedTypes.includes("4")}
          onClick={() => toggleSelectedType("4")}
        />
      </div>

      <Button
        text="분실 신고 & 재발급 신청하기"
        disabled={selectedTypes.length === 0}
        onClick={() => onSubmit?.(selectedTypes)}
      />
      <span className="text-caption-1 text-gray">
        정부24 및 경찰청 민원 포털과 연동되어 안전하게 처리됩니다.
      </span>
    </div>
  );
}

export default IdCard;
