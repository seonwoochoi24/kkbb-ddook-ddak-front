import Title from "../Title.jsx";
import magnifier from "../../assets/icons/magnifier.svg";

function More() {
  return (
    <div className="flex flex-col items-start justify-between rounded-card bg-white px-4 py-5 gap-3">
      <Title title="더 필요한 준비가 있나요?" />
      <span className="text-caption-1 text-gray">
        데이터 로밍이나 현지 날씨 등 궁금한 점을 깨비에게 물어보세요.
      </span>
      <button className="flex w-[193px] items-center justify-center gap-2 rounded-button border-[1px] border-dashed border-gray p-[10px] text-body-1 text-darkgray">
        <img src={magnifier} alt="" className="h-5 w-5" />
        <span>다른 조치 뚝딱 추가하기</span>
      </button>
    </div>
  );
}

export default More;