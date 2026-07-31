import { useState } from "react";
import { Icon } from "@iconify/react";
import Title from "../Title.jsx";
import OverlayPortal from "../common/OverlayPortal.jsx";
import wallet from "../../assets/icons/wallet.svg";
import check from "../../assets/icons/check.svg";

function OverseasQrPaymentWidget({
  title,
  linkedCard,
  merchantNetwork,
  benefits = [],
  agreements = [],
  onSheetOpenChanged,
}) {
  const [checkedAgreements, setCheckedAgreements] = useState([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleAgreementClick = (index) => {
    setCheckedAgreements((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index],
    );
  };

  const toggleSheet = () => {
    setIsSheetOpen((prev) => {
      const next = !prev;
      onSheetOpenChanged?.(next);
      return next;
    });
  };

  const handleConnect = () => {
    if (!allRequiredAgreed) return;

    // mark as connected, close sheet and notify parent to show chat
    setIsConnected(true);
    setIsSheetOpen(false);
    onSheetOpenChanged?.(false);
  };

  const requiredAgreementIndexes = agreements
    .map((agreement, index) => (agreement.required ? index : null))
    .filter((index) => index !== null);

  const allRequiredAgreed = requiredAgreementIndexes.every((index) =>
    checkedAgreements.includes(index),
  );

  return (
    <section className="flex flex-col gap-4 rounded-card bg-white px-4 py-5">
      <Title icon={wallet} title={title} />

      

      <div className="flex flex-wrap gap-2">
        {benefits.map((benefit, index) => (
          <span
            key={index}
            className="inline-flex items-center rounded-full bg-background px-3 py-2 text-caption-2 text-darkgray"
          >
            {benefit}
          </span>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={isConnected ? undefined : toggleSheet}
          disabled={isConnected}
          aria-disabled={isConnected}
          className={`rounded-button px-4 py-4 w-full text-body-1 font-semibold ${
            isConnected ? "bg-yellow text-black cursor-default" : "bg-darkgray text-white"
          }`}
        >
          {isConnected ? "상하이 현지 결제 준비 완료!" : "알리페이 / 위챗페이 연동 뚝딱 켜기"}
        </button>

      </div>

      <OverlayPortal>
      <div className={`fixed inset-0 z-[100] flex items-end justify-center ${isSheetOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isSheetOpen ? "opacity-100" : "opacity-0"}`}
          onClick={toggleSheet}
        />

        <div
          className={`relative w-full max-w-[375px] h-[364px] rounded-t-[24px] bg-white p-4 shadow-2xl transition-transform duration-300 ${
            isSheetOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="mb-4 flex flex-col gap-2">
            <span className="mx-auto h-1 w-10 rounded-full bg-gray-300" />
            <p className="text-header font-semibold">Alipay / WeChat Pay 연동</p>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-card px-4 py-4">
            <div>
              <div className="text-body-2 text-gray">연결 카드</div>
              <div className="text-body-1 text-darkgray">{linkedCard}</div>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-full">
              <Icon icon="solar:arrow-right-bold" className="h-5 w-5 text-yellow" />
            </div>

            <div className="text-right">
              <div className="text-body-2 text-gray">가맹점</div>
              <div className="text-body-1 text-darkgray">{merchantNetwork}</div>
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-card px-4 py-4">
            {agreements.map((agreement, index) => {
              const isChecked = checkedAgreements.includes(index);

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleAgreementClick(index)}
                  className="flex items-center gap-2 rounded-button bg-white text-left"
                >
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                    <img
                      src={check}
                      alt=""
                      className={`h-4 w-4 ${
                        isChecked ? "opacity-100" : "opacity-50"
                      }`}
                      style={{
                        filter: isChecked
                          ? "brightness(0) saturate(100%) invert(78%) sepia(61%) saturate(1112%) hue-rotate(354deg) brightness(103%) contrast(96%)"
                          : "none",
                      }}
                    />
                  </span>

                  <span className="text-body-2 text-gray">
                    {agreement.required && (
                      <span className="mr-1 text-yellow">[필수]</span>
                    )}
                    {agreement.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex justify-center">
            <button
              type="button"
              disabled={!allRequiredAgreed}
              onClick={handleConnect}
              className={`rounded-button w-full px-4 py-3 text-title font-semibold transition ${
                allRequiredAgreed
                  ? "bg-yellow text-black"
                  : "bg-darkgray text-white"
              }`}
            >
              {allRequiredAgreed ? "Face ID로 1초 만에 연동하기" : "Face ID로 1초 만에 연동하기"}
            </button>
          </div>
        </div>
      </div>
      </OverlayPortal>
    </section>
  );
}

export default OverseasQrPaymentWidget;
