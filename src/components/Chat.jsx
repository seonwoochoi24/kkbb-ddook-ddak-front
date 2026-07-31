// src/components/Chat.jsx
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

function Chat({
  type = "chat",
  onWidgetsReceived,
  message: controlledMessage,
  onMessageChange,
  autoSubmitMessage,
  onAutoSubmitComplete,
}) {
  const [internalMessage, setInternalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const message = controlledMessage !== undefined ? controlledMessage : internalMessage;

  const updateMessage = (nextValue) => {
    if (onMessageChange) {
      onMessageChange(nextValue);
      return;
    }

    setInternalMessage(nextValue);
  };

  const hasMessage = message.trim().length > 0;

  const placeholder =
    type === "chat"
      ? "필요한 상황을 자유롭게 말해주세요."
      : "나 지갑을 잃어버렸는데 어떡하지?";

  const API_URL = import.meta.env.VITE_CHAT_API_URL ?? "";

  const handleButtonClick = async (nextMessage = message) => {
    const trimmedMessage = (nextMessage ?? "").trim();

    if (!trimmedMessage) {
      console.log("음성 입력 시작");
      return;
    }

    if (!API_URL || isLoading) {
      if (!API_URL) {
        console.warn("VITE_CHAT_API_URL이 설정되지 않았습니다.");
      }

      return;
    }

    updateMessage("");
    setIsLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmedMessage,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }

      const data = await res.json();

      console.log("응답:", data);

      onWidgetsReceived?.(
        data.widgets ?? [],
        data.greeting ?? null,
        data.additionalActionPrompt ?? null,
      );
    } catch (error) {
      console.error("전송 에러:", error);
      onWidgetsReceived?.([], null, null);
    } finally {
      setIsLoading(false);
      onAutoSubmitComplete?.();
    }
  };

  useEffect(() => {
    if (!autoSubmitMessage) return;

    updateMessage(autoSubmitMessage);
    handleButtonClick(autoSubmitMessage);
  }, [autoSubmitMessage]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleButtonClick();
    }
  };

  return (
    <div className="flex w-full items-center justify-between rounded-button bg-white p-[18px] shadow-md">
      <textarea
        value={message}
        onChange={(event) => {
          updateMessage(event.target.value);

          event.target.style.height = "auto";
          event.target.style.height = `${event.target.scrollHeight}px`;
        }}
        onKeyDown={handleKeyDown}
        placeholder={isLoading ? "필요한 서비스를 찾고 있어요..." : placeholder}
        rows={1}
        disabled={isLoading}
        className="
          min-h-6
          max-h-[120px]
          min-w-0
          flex-1
          resize-none
          overflow-y-auto
          bg-transparent
          p-0
          text-body-2
          leading-6
          outline-none
          placeholder:text-gray
          disabled:cursor-not-allowed
        "
      />

      <button
        type="button"
        onClick={() => handleButtonClick()}
        disabled={isLoading}
        aria-label={hasMessage ? "메시지 전송" : "음성 입력"}
        className="flex h-6 w-6 shrink-0 items-center justify-center disabled:opacity-40"
      >
        <Icon
          icon={hasMessage ? "mingcute:send-fill" : "mingcute:mic-fill"}
          className="h-6 w-6 text-gray"
        />
      </button>
    </div>
  );
}

export default Chat;
