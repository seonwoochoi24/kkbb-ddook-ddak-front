import Title from "../Title.jsx";
import wallet from "../../assets/icons/wallet.svg";

const ID_CARD_LABELS = {
  3: "운전면허증",
  4: "주민등록증",
};

function Done({ selectedTypes = [] }) {
  const selectedCards = selectedTypes
    .map((type) => ID_CARD_LABELS[type])
    .filter(Boolean);

  return (
    <section className="flex flex-col gap-3 rounded-card bg-white px-4 py-5 shadow-card">
      <div className="flex items-center gap-2">
        <Title icon={wallet} title="분실 신고 및 재발급 신청 완료" />
      </div>

      {selectedCards.map((cardName) => (
        <div
          key={cardName}
          className="flex flex-col gap-2 rounded-card bg-background px-4 py-4"
        >
          <span className="text-title text-darkgray">{cardName}</span>
          <span className="text-caption-1 text-yellow">
            신고 및 재발급 완료
          </span>
        </div>
      ))}
    </section>
  );
}

export default Done;
