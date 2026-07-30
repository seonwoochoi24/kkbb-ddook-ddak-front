// src/pages/MainPage.jsx
import { useState } from "react";
import Chat from "../components/Chat.jsx";
import WidgetRenderer from "../components/WidgetRenderer.jsx";
import kkaebiFace from "../assets/logo/kkaebi-face.svg";

function ChatPage() {
  const [widgets, setWidgets] = useState([]);
  const [greeting, setGreeting] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  

  // updated signature: (widgets, greeting)
  const handleWidgetsReceived = (receivedWidgets, receivedGreeting) => {
    setWidgets(receivedWidgets);
    setGreeting(receivedGreeting ?? null);
  };

  return (
    <main className="flex min-h-dvh flex-col gap-3 px-[10px] pb-[110px]">
      <section className="flex flex-col gap-3">
        {greeting && (
          <div className="mb-2 flex items-center gap-3">
            <img src={kkaebiFace} alt="kkaebi face" className="h-12" />
            <div className="rounded-card text-caption-2 text-darkgray">{greeting}</div>
          </div>
        )}

        {widgets.map((widget, index) => (
          <WidgetRenderer
            key={`${widget.type}-${index}`}
            widget={widget}
            onSheetOpenChanged={setIsSheetOpen}
          />
        ))}
      </section>

      <div className={`fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[375px] px-[10px] pb-[12px] ${isSheetOpen ? "hidden" : ""}`}>
        <Chat onWidgetsReceived={handleWidgetsReceived} />
      </div>
    </main>
  );
}

export default ChatPage;