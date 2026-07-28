import drive from "../assets/icons/drive.svg";
import idcard from "../assets/icons/idcard.svg";

const CARD_CONFIG = {
  1: {
    class: "실속형",
    title: "기본 의료비 위주",
    price: "약 3,500원",
  },
  2: {
    class: "고급형(추천)",
    title: "기본 의료비 위주",
    price: "약 3,500원",
  },
  3: {
    class: "",
    title: "운전면허증",
    price: "",
    icon: drive,
  },
  4: {
    class: "",
    title: "주민등록증",
    price: "",
    icon: idcard,
  },
};

function IconCard({ type = "1", selected = false, onClick }) {
  const config = CARD_CONFIG[type];
  const cardClass = selected ? "bg-yellow" : "bg-background";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-[126px] flex flex-col items-center justify-between rounded-button ${cardClass} px-4 py-5 transition-colors cursor-pointer`}
    >
      {config.icon ? <img src={config.icon} alt="" className="mb-2 h-8 w-8" /> : null}
      <span className="text-caption-2 text-gray">{config.class}</span>
      <h2 className="text-body-1 text-darkgray">{config.title}</h2>
      <span className="text-caption-2 text-darkgray">{config.price}</span>
    </button>
  );
}

export default IconCard;