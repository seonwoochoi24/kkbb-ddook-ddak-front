// src/pages/MainPage.jsx
import { useEffect, useState } from "react";
import Chat from "../components/Chat.jsx";
import WidgetRenderer from "../components/WidgetRenderer.jsx";
import ChatOrigin from "../components/common/ChatOrigin.jsx";
import More from "../components/lost/More.jsx";
import kkaebiFace from "../assets/logo/kkaebi-face.svg";

const TYPING_INTERVAL_MS = 35;
const WIDGET_REVEAL_INTERVAL_MS = 250;
const WIDGET_REVEAL_DELAY_MS = 300;
const ID_REISSUE_GREETING =
  "걱정 마세요! 깨비가 행정안전부와 경찰청에 뚝딱!\n신고하고 재발급까지 신청해 드릴게요.";
const TRAVEL_INSURANCE_GREETING =
  "바쁘고 복잡한 여행 준비! 깨비가 꼭 필요한 보장만 뚝딱 담았어요.";

function ChatPage() {
  const [widgets, setWidgets] = useState([]);
  const [greeting, setGreeting] = useState(null);
  const [displayedGreeting, setDisplayedGreeting] = useState("");
  const [visibleWidgetCount, setVisibleWidgetCount] = useState(0);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [autoSubmitMessage, setAutoSubmitMessage] = useState(null);
  const [isNoReply, setIsNoReply] = useState(false);
  const [insurancePlanResult, setInsurancePlanResult] = useState(null);
  const [displayedInsuranceGreeting, setDisplayedInsuranceGreeting] = useState("");
  const [isInsurancePlanVisible, setIsInsurancePlanVisible] = useState(false);
  const [completedInsurancePlanName, setCompletedInsurancePlanName] = useState(null);
  const [idReissueResult, setIdReissueResult] = useState(null);
  const [displayedIdReissueGreeting, setDisplayedIdReissueGreeting] = useState("");
  const [isIdReissueVisible, setIsIdReissueVisible] = useState(false);
  const [visibleIdReissueWidgetCount, setVisibleIdReissueWidgetCount] = useState(0);
  const [idReissueSelectedTypes, setIdReissueSelectedTypes] = useState([]);

  const shouldShowOrigin = widgets.length === 0 && !greeting;
  const isGreetingTyping = Boolean(greeting && displayedGreeting !== greeting);
  const isInsuranceGreetingTyping = Boolean(
    insurancePlanResult &&
    displayedInsuranceGreeting !== insurancePlanResult.greeting,
  );

  const handleWidgetsReceived = (receivedWidgets, receivedGreeting) => {
    const widgetGreeting = receivedWidgets.find((widget) => widget.greeting)?.greeting;
    const hasNoWidgets = receivedWidgets.length === 0;

    setDisplayedGreeting("");
    setVisibleWidgetCount(0);
    setWidgets(receivedWidgets);
    setGreeting(hasNoWidgets ? null : receivedGreeting ?? widgetGreeting ?? null);
    setIsNoReply(hasNoWidgets);
    setInsurancePlanResult(null);
    setCompletedInsurancePlanName(null);
    setIdReissueResult(null);
    setDisplayedIdReissueGreeting("");
    setIsIdReissueVisible(false);
    setVisibleIdReissueWidgetCount(0);
    setIdReissueSelectedTypes([]);

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  const handlePromptSelect = (prompt) => {
    setChatMessage(prompt);
    setAutoSubmitMessage(prompt);
  };

  const handleIdReissueSubmit = (selectedTypes) => {
    setIdReissueSelectedTypes(selectedTypes);
    setDisplayedIdReissueGreeting("");
    setIsIdReissueVisible(false);
    setVisibleIdReissueWidgetCount(0);
    setIdReissueResult({
      greeting: ID_REISSUE_GREETING,
      widgets: [
        { type: "id_reissue_done_widget", selectedTypes },
        { type: "id_reissue_receive_info_widget" },
      ],
    });

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  const handleTravelInsuranceSubmit = (selectedPlan) => {
    setDisplayedInsuranceGreeting("");
    setIsInsurancePlanVisible(false);
    setInsurancePlanResult({
      greeting: selectedPlan?.greeting ?? TRAVEL_INSURANCE_GREETING,
      widget: {
        type: "travel_insurance_plan_widget",
        planName: selectedPlan?.planName,
        title: selectedPlan?.productName ?? selectedPlan?.planName,
        coverages: selectedPlan?.coverages,
        finalPrice: selectedPlan?.finalPrice,
      },
    });

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  const handleTravelInsuranceBack = (planName) => {
    setCompletedInsurancePlanName(planName);
    setInsurancePlanResult(null);

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  useEffect(() => {
    const timers = [];
    const greetingCharacters = Array.from(greeting ?? "");

    greetingCharacters.forEach((_, index) => {
      timers.push(
        window.setTimeout(() => {
          setDisplayedGreeting(greetingCharacters.slice(0, index + 1).join(""));
        }, (index + 1) * TYPING_INTERVAL_MS),
      );
    });

    const widgetStartDelay =
      greetingCharacters.length * TYPING_INTERVAL_MS +
      (greetingCharacters.length > 0 ? WIDGET_REVEAL_DELAY_MS : 0);

    widgets.forEach((_, index) => {
      timers.push(
        window.setTimeout(() => {
          setVisibleWidgetCount(index + 1);
        }, widgetStartDelay + index * WIDGET_REVEAL_INTERVAL_MS),
      );
    });

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [greeting, widgets]);

  useEffect(() => {
    if (!insurancePlanResult) return;

    const timers = [];
    const greetingCharacters = Array.from(insurancePlanResult.greeting);

    greetingCharacters.forEach((_, index) => {
      timers.push(
        window.setTimeout(() => {
          setDisplayedInsuranceGreeting(
            greetingCharacters.slice(0, index + 1).join(""),
          );
        }, (index + 1) * TYPING_INTERVAL_MS),
      );
    });

    timers.push(
      window.setTimeout(() => {
        setIsInsurancePlanVisible(true);
      }, greetingCharacters.length * TYPING_INTERVAL_MS + WIDGET_REVEAL_DELAY_MS),
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [insurancePlanResult]);

  useEffect(() => {
    if (!idReissueResult) return;

    const timers = [];
    const greetingCharacters = Array.from(idReissueResult.greeting);

    greetingCharacters.forEach((_, index) => {
      timers.push(
        window.setTimeout(() => {
          setDisplayedIdReissueGreeting(
            greetingCharacters.slice(0, index + 1).join(""),
          );
        }, (index + 1) * TYPING_INTERVAL_MS),
      );
    });

    timers.push(
      window.setTimeout(() => {
        setIsIdReissueVisible(true);
      }, greetingCharacters.length * TYPING_INTERVAL_MS + WIDGET_REVEAL_DELAY_MS),
    );

    idReissueResult.widgets.forEach((_, index) => {
      timers.push(
        window.setTimeout(() => {
          setVisibleIdReissueWidgetCount(index + 1);
        }, greetingCharacters.length * TYPING_INTERVAL_MS + WIDGET_REVEAL_DELAY_MS + index * WIDGET_REVEAL_INTERVAL_MS),
      );
    });

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [idReissueResult]);

  useEffect(() => {
    const handleReturnToOrigin = () => {
      if (idReissueResult) {
        setIdReissueResult(null);
        setDisplayedIdReissueGreeting("");
        setIsIdReissueVisible(false);
        setVisibleIdReissueWidgetCount(0);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      if (insurancePlanResult) {
        setInsurancePlanResult(null);
        setDisplayedInsuranceGreeting("");
        setIsInsurancePlanVisible(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      if (widgets.length === 0) return;

      setWidgets([]);
      setGreeting(null);
      setDisplayedGreeting("");
      setVisibleWidgetCount(0);
      setIsNoReply(false);
      setInsurancePlanResult(null);
      setDisplayedInsuranceGreeting("");
      setIsInsurancePlanVisible(false);
      setCompletedInsurancePlanName(null);
      setIdReissueResult(null);
      setDisplayedIdReissueGreeting("");
      setIsIdReissueVisible(false);
      setIdReissueSelectedTypes([]);
      setChatMessage("");
      setAutoSubmitMessage(null);

      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("chat:return-to-origin", handleReturnToOrigin);

    return () => {
      window.removeEventListener("chat:return-to-origin", handleReturnToOrigin);
    };
  }, [idReissueResult, insurancePlanResult, widgets.length]);

  return (
    <main className="flex min-h-dvh flex-col gap-3 px-[10px] pb-[110px]">
      {shouldShowOrigin && (
        <ChatOrigin
          isNoReply={isNoReply}
          onSelectPrompt={handlePromptSelect}
        />
      )}

      <section className={`${insurancePlanResult || idReissueResult ? "hidden" : "flex"} flex-col gap-3`}>
        {greeting && (
          <div className="mb-2 flex items-center gap-3">
            <img src={kkaebiFace} alt="kkaebi face" className="h-12" />
            <div
              className="whitespace-pre-line rounded-card text-caption-2 text-darkgray"
              aria-live="polite"
            >
              {displayedGreeting}
              {isGreetingTyping && <span className="typing-cursor" aria-hidden="true" />}
            </div>
          </div>
        )}

        {widgets.slice(0, visibleWidgetCount).map((widget, index) => (
          <div key={`${widget.type}-${index}`} className="widget-reveal">
            <WidgetRenderer
              widget={widget}
              onSheetOpenChanged={setIsSheetOpen}
              onIdReissueSubmit={handleIdReissueSubmit}
              onTravelInsuranceSubmit={handleTravelInsuranceSubmit}
              onTravelInsuranceBack={handleTravelInsuranceBack}
              completedInsurancePlanName={completedInsurancePlanName}
              idReissueSelectedTypes={idReissueSelectedTypes}
            />
          </div>
        ))}

        {visibleWidgetCount === widgets.length && widgets.length > 0 && (
          <div className="widget-reveal">
            <More />
          </div>
        )}
      </section>

      {insurancePlanResult && (
        <section className="flex flex-col gap-3">
          <div className="mb-2 flex items-center gap-3">
            <img src={kkaebiFace} alt="kkaebi face" className="h-12" />
            <div
              className="whitespace-pre-line rounded-card text-caption-2 text-darkgray"
              aria-live="polite"
            >
              {displayedInsuranceGreeting}
              {isInsuranceGreetingTyping && (
                <span className="typing-cursor" aria-hidden="true" />
              )}
            </div>
          </div>

          {isInsurancePlanVisible && (
            <div className="widget-reveal">
              <WidgetRenderer
                widget={insurancePlanResult.widget}
                onTravelInsuranceBack={handleTravelInsuranceBack}
              />
            </div>
          )}
        </section>
      )}

      {idReissueResult && (
        <section className="flex flex-col gap-3">
          <div className="mb-2 flex items-center gap-3">
            <img src={kkaebiFace} alt="kkaebi face" className="h-12" />
            <div
              className="whitespace-pre-line rounded-card text-caption-2 text-darkgray"
              aria-live="polite"
            >
              {displayedIdReissueGreeting}
              {(!isIdReissueVisible || displayedIdReissueGreeting !== idReissueResult.greeting) && (
                <span className="typing-cursor" aria-hidden="true" />
              )}
            </div>
          </div>

          {isIdReissueVisible && idReissueResult.widgets.slice(0, visibleIdReissueWidgetCount).map((widget, index) => (
            <div key={`${widget.type}-${index}`} className="widget-reveal">
              <WidgetRenderer
                widget={widget}
                onSheetOpenChanged={setIsSheetOpen}
                onIdReissueSubmit={handleIdReissueSubmit}
                onTravelInsuranceSubmit={handleTravelInsuranceSubmit}
                onTravelInsuranceBack={handleTravelInsuranceBack}
                completedInsurancePlanName={completedInsurancePlanName}
                idReissueSelectedTypes={idReissueSelectedTypes}
              />
            </div>
          ))}
        </section>
      )}

      <div className={`fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[375px] px-[10px] pb-[12px] ${isSheetOpen ? "hidden" : ""}`}>
        <Chat
          message={chatMessage}
          onMessageChange={setChatMessage}
          autoSubmitMessage={autoSubmitMessage}
          onAutoSubmitComplete={() => setAutoSubmitMessage(null)}
          onWidgetsReceived={handleWidgetsReceived}
        />
      </div>
    </main>
  );
}

export default ChatPage;
