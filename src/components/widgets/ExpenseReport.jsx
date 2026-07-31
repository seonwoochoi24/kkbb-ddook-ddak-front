import { useState } from "react";
import Title from "../Title.jsx";
import Button from "../Button.jsx";
import OverlayPortal from "../common/OverlayPortal.jsx";
import dollar from "../../assets/icons/dollar.svg";

const CATEGORY_COLORS = ["#FFCC00", "#FF6B6B", "#8B5CF6", "#4ADE80", "#38BDF8"];

function ExpenseReport({
  title,
  biggestExpense,
  categories = [],
  totalAmount,
  shareTitle,
  onSheetOpenChanged,
}) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleToggleSheet = () => {
    setIsSheetOpen((prev) => {
      const next = !prev;
      onSheetOpenChanged?.(next);
      return next;
    });
  };

  return (
    <>
      <div className="flex flex-col gap-3 rounded-card bg-white px-4 py-5">
        <Title icon={dollar} title={title} />

        {biggestExpense && (
          <span className="text-body-2 text-darkgray">
            가장 큰 지출 : {biggestExpense.label}{" "}
            <span className="text-body-1 text-yellow">
              ({biggestExpense.amount?.toLocaleString("ko-KR")}원)
            </span>
          </span>
        )}

        <div className="flex h-2 w-full overflow-hidden rounded-full bg-background">
          {categories.map((category, index) => (
            <div
              key={category.label}
              className="h-full"
              style={{
                width: `${category.percent}%`,
                backgroundColor: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
              }}
            />
          ))}
        </div>

        <div className="flex flex-col gap-1">
          {categories.map((category, index) => (
            <div key={category.label} className="flex items-center gap-2 text-caption-1 text-darkgray">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: CATEGORY_COLORS[index % CATEGORY_COLORS.length] }}
              />
              <span>
                {category.label} ({category.percent}%)
              </span>
            </div>
          ))}
        </div>

        <Button text="동아리 단톡방에 뚝딱 공유하기" onClick={handleToggleSheet} />
      </div>

      <OverlayPortal>
        <div className={`fixed inset-0 z-[100] flex items-end justify-center ${isSheetOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
          <div
            className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isSheetOpen ? "opacity-100" : "opacity-0"}`}
            onClick={handleToggleSheet}
          />

          <div
            className={`relative w-[375px] rounded-t-[24px] bg-white p-5 shadow-2xl transition-transform duration-300 ${
              isSheetOpen ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <span className="mx-auto mb-4 block h-1 w-10 rounded-full bg-gray-300" />

            <p className="text-title text-darkgray">{shareTitle}</p>
            <hr className="my-3 border-t border-dashed border-gray-300" />

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-body-2 text-darkgray">총 지출액</span>
                <span className="text-title text-yellow">
                  {totalAmount?.toLocaleString("ko-KR")}원
                </span>
              </div>

              {categories.map((category) => (
                <div key={category.label} className="flex items-center justify-between">
                  <span className="text-body-2 text-gray">
                    {category.label} ({category.percent}%)
                  </span>
                  <span className="text-body-1 text-darkgray">
                    {category.amount?.toLocaleString("ko-KR")}원
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Button text="카카오톡으로 뚝딱 공유하기" onClick={handleToggleSheet} />
            </div>
          </div>
        </div>
      </OverlayPortal>
    </>
  );
}

export default ExpenseReport;
