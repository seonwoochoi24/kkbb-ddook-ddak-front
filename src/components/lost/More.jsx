import Title from "../Title.jsx";
import magnifier from "../../assets/icons/magnifier.svg";

function More({ title, subtitle }) {
  return (
    <div className="flex flex-col items-start justify-between rounded-card bg-white px-4 py-5 gap-3 shadow-card">
      <Title icon={null} title={title} />
      <span className="text-caption-1 text-gray">
        {subtitle}
      </span>
      <button
        type="button"
        className="flex w-[193px] items-center justify-center gap-2 rounded-button border-[1px] border-dashed border-gray p-[10px] text-body-1 text-darkgray"
      >
        <img src={magnifier} alt="" className="h-5 w-5" />
        <span>다른 조치 뚝딱 추가하기</span>
      </button>
    </div>
  );
}

export default More;
