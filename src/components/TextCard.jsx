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
  
};

function TextCard({ type="1" }) {
  const config = CARD_CONFIG[type];

  return (
    <div className={`w-[126px] flex flex-col items-center justify-between rounded-button bg-yellow px-4 py-5`}>
        <span className="text-caption-2 text-gray">{config.class}</span>
        <h2 className="text-body-1 text-darkgray">{config.title}</h2>
        <span className="text-caption-2 text-darkgray">{config.price}</span>
    </div>
  );
}
    

export default TextCard;