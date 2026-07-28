import Title from "../Title.jsx";
import wallet from "../../assets/icons/wallet.svg";

function AtmDescript() {
  return (
    <section className="flex flex-col gap-3 rounded-card bg-white px-4 py-5">
      <div className="flex items-center gap-2">
        <Title icon={wallet} title="가장 가까운 KB ATM" />
      </div>

      <div className="min-h-[180px] rounded-button bg-background" />

      <div className="flex flex-col gap-2 rounded-card bg-gray-100 px-4 py-4">
        <div className="flex items-center justify-between">
          <span className="text-title text-darkgray">KB국민은행 ATM</span>
          <span className="text-caption-1 text-yellow">350m</span>
        </div>

        <span className="text-caption-1 text-gray">
          서울특별시 강남구 테헤란로 152
        </span>
      </div>
    </section>
  );
}

export default AtmDescript;
