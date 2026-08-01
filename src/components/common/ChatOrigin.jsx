import kkaebi from "../../assets/logo/kkaebi.svg";
import noreply from "../../assets/logo/noreply.png";

function ChatOrigin({ isNoReply = false, onSelectPrompt }) {
  const chips = [
    "지갑을 분실했어요",
    "상하이 여행 준비하기",
    "동아리 회비 정산하기",
  ];

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center overflow-hidden">
      <div className="relative flex flex-col items-center justify-center text-center">
        {isNoReply ? (
          <>
            <img
              src={noreply}
              alt="응답하지 못한 깨비"
              className="absolute -top-[130px] right-[0px] h-[115px] w-auto object-contain"
            />
            <h1 className="text-[22px] font-bold text-darkgray">
              앗! 깨비가 뚝딱 만들지 못했어요
            </h1>
            <span className="mt-2 whitespace-pre-line text-body-2 text-gray">
              {"프로토타입에서는 정해진 시나리오만 가능해요.\n아래를 클릭해볼까요?"}
            </span>
          </>
        ) : (
          <>
            <h1 className="text-[22px] font-bold text-darkgray">
              어떤 금융 서비스가 필요하신가요?
            </h1>
            <img
              src={kkaebi}
              alt="Kkaebi"
              className="absolute -top-[130px] right-[0px] h-[115px] w-auto object-contain"
              style={{ filter: "drop-shadow(0 0 18px rgba(255, 215, 0, 0.75))" }}
                fetchPriority="high"

            />
            <span className="mt-2 text-body-2 text-gray">
              상황을 말씀해주시면 딱 맞는 화면을 뚝딱해 드릴게요.
            </span>
          </>
        )}

        <div className="mt-4 w-[min(92vw,335px)] overflow-hidden px-2">
          <div className="marquee-track flex items-center gap-3 whitespace-nowrap">
            {[...chips, ...chips].map((label, index) => (
              <button
                key={`${label}-${index}`}
                type="button"
                onClick={() => onSelectPrompt?.(label)}
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-body-2 text-darkgray transition hover:bg-gray-50"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .marquee-track {
          width: max-content;
          animation: marquee 12s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

export default ChatOrigin;
