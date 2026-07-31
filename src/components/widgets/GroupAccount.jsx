import Title from "../Title.jsx";
import wallet from "../../assets/icons/wallet.svg";

function GroupAccount({ title, syncDescription, balance, paidCount, totalCount, unpaidMembers = [], notice }) {
  const percent = totalCount ? Math.round((paidCount / totalCount) * 100) : 0;

  return (
    <div className="flex flex-col gap-3 rounded-card bg-white px-4 py-5 shadow-card">
      <div className="flex flex-col gap-1">
        <Title icon={wallet} title={title} />
        <span className="text-caption-1 text-gray">{syncDescription}</span>
      </div>

      <div className="flex flex-col gap-2 rounded-button bg-background p-4">
        <span className="text-body-1 text-darkgray">
          현재 잔액 : {balance?.toLocaleString("ko-KR")}원
        </span>
        <span className="text-body-1 text-yellow">
          {paidCount}/{totalCount}
        </span>
        <div className="h-2 w-full rounded-full bg-gray/30">
          <div
            className="h-2 rounded-full bg-yellow transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {unpaidMembers.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {unpaidMembers.map((name) => (
            <span
              key={name}
              className="rounded-full border border-gray px-3 py-1 text-caption-2 text-darkgray"
            >
              {name}
            </span>
          ))}
        </div>
      )}

      {notice && <span className="text-caption-1 text-gray">{notice}</span>}
    </div>
  );
}

export default GroupAccount;
