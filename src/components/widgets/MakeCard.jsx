import { useState } from "react";
import Title from "../Title.jsx";
import IconCard from "../IconCard.jsx";
import Button from "../Button.jsx";

function MakeCard() {
  const [selectedType, setSelectedType] = useState(null);

  return (
    <div className="flex flex-col items-start justify-between rounded-card bg-white px-4 py-5 gap-3">
      <Title title="상하이, 든든하게 준비할까요?" />
      <span className="text-caption-1 text-gray">
        출국 전 나에게 맞는 보장을 선택해 보세요.      
        </span>
      <div className="flex w-full items-center justify-center gap-10 rounded-button">
        <IconCard type="1" selected={selectedType === "1"} onClick={() => setSelectedType("1")} />
        <IconCard type="2" selected={selectedType === "2"} onClick={() => setSelectedType("2")} />
      </div>

      <Button text="3초만에 뚝딱 가입하기" disabled={!selectedType} />
    <span className="text-caption-1 text-gray">
정부24 및 경찰청 민원 포털과 연동되어 안전하게 처리됩니다.        </span>
    </div>
  );
}

export default MakeCard;