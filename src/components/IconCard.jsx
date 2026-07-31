import drive from "../assets/icons/drive.svg";
import idcard from "../assets/icons/idcard.svg";

const ID_CARD_CONFIG = {
  3: {
    title: "운전면허증",
    icon: drive,
  },
  4: {
    title: "주민등록증",
    icon: idcard,
  },
};

function IconCard({
  type = "1",
  planName,
  recommended = false,
  summary = "",
  finalPrice,
  selected = false,
  onClick,
}) {
  const isInsuranceCard = type === "1" || type === "2";
  const idCardConfig = ID_CARD_CONFIG[type];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-[126px] cursor-pointer flex-col items-center justify-between rounded-button px-4 py-5 transition-colors ${
        selected ? "bg-yellow" : "bg-background"
      }`}
    >
      {isInsuranceCard ? (
        <>
          <span className="text-caption-2 text-gray">
            {planName}{recommended && " (추천)"}
          </span>

          <div className="my-2">
            <span className="break-keep text-center text-caption-2 text-darkgray">{summary}</span>
          </div>

          <span className="text-body-1 text-darkgray">
            약 {finalPrice?.toLocaleString("ko-KR")}원
          </span>
        </>
      ) : (
        <>
          {idCardConfig?.icon && (
            <img
              src={idCardConfig.icon}
              alt=""
              className="mb-2 h-8 w-8"
            />
          )}

          <h2 className="text-body-1 text-darkgray">
            {idCardConfig?.title}
          </h2>
        </>
      )}
    </button>
  );
}

export default IconCard;
