// src/components/Chat.jsx
import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

const SPEECH_ERROR_MESSAGES = {
  "not-allowed": "마이크 권한이 필요해요. 브라우저 설정에서 권한을 허용해 주세요.",
  "service-not-allowed": "이 브라우저에서는 음성 인식을 사용할 수 없어요.",
  "audio-capture": "마이크를 찾을 수 없어요. 기기 연결 상태를 확인해 주세요.",
  network: "네트워크 문제로 음성을 인식하지 못했어요. 다시 시도해 주세요.",
  "no-speech": "음성이 들리지 않았어요. 마이크 가까이에서 다시 말해 주세요.",
};

const joinTranscript = (baseMessage, transcript) => {
  const trimmedBase = baseMessage.trimEnd();
  const trimmedTranscript = transcript.trim();

  if (!trimmedTranscript) return trimmedBase;
  return trimmedBase ? `${trimmedBase} ${trimmedTranscript}` : trimmedTranscript;
};

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
  const [isListening, setIsListening] = useState(false);
  const [speechMessage, setSpeechMessage] = useState("");
  const recognitionRef = useRef(null);

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

  const stopListening = () => {
    recognitionRef.current?.stop();
  };

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ?? window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechMessage(
        "이 브라우저는 음성 인식을 지원하지 않아요. Chrome 또는 Edge에서 이용해 주세요.",
      );
      return;
    }

    const recognition = new SpeechRecognition();
    const baseMessage = message;

    recognition.lang = "ko-KR";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setSpeechMessage("듣고 있어요. 말씀을 마치면 버튼을 눌러 주세요.");
    };

    recognition.onresult = (event) => {
      let transcript = "";

      for (let index = 0; index < event.results.length; index += 1) {
        transcript += event.results[index][0].transcript;
      }

      updateMessage(joinTranscript(baseMessage, transcript));
    };

    recognition.onerror = (event) => {
      if (event.error === "aborted") return;

      setSpeechMessage(
        SPEECH_ERROR_MESSAGES[event.error] ??
          "음성을 인식하지 못했어요. 잠시 후 다시 시도해 주세요.",
      );
    };

    recognition.onend = () => {
      recognitionRef.current = null;
      setIsListening(false);
      setSpeechMessage((currentMessage) =>
        currentMessage.startsWith("듣고 있어요") ||
        currentMessage.startsWith("마이크에 연결")
          ? "음성 입력이 끝났어요. 내용을 확인하고 전송해 주세요."
          : currentMessage,
      );
    };

    recognitionRef.current = recognition;
    setIsListening(true);
    setSpeechMessage("마이크에 연결하고 있어요...");

    try {
      recognition.start();
    } catch {
      recognitionRef.current = null;
      setIsListening(false);
      setSpeechMessage("음성 인식을 시작하지 못했어요. 다시 시도해 주세요.");
    }
  };

  const handleButtonClick = async (nextMessage = message) => {
    const trimmedMessage = (nextMessage ?? "").trim();

    if (!trimmedMessage) {
      startListening();
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

    stopListening();
    updateMessage(autoSubmitMessage);
    handleButtonClick(autoSubmitMessage);
  }, [autoSubmitMessage]);

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      if (isListening) {
        stopListening();
        return;
      }

      handleButtonClick();
    }
  };

  return (
    <div className="w-full rounded-button bg-white px-[18px] py-3 shadow-md">
      <div className="flex items-center justify-between">
        <textarea
          value={message}
          onChange={(event) => {
            if (isListening) stopListening();
            setSpeechMessage("");
            updateMessage(event.target.value);

            event.target.style.height = "auto";
            event.target.style.height = `${event.target.scrollHeight}px`;
          }}
          onKeyDown={handleKeyDown}
          placeholder={
            isLoading
              ? "필요한 서비스를 찾고 있어요..."
              : isListening
                ? "말씀해 주세요..."
                : placeholder
          }
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
          onClick={() => {
            if (isListening) {
              stopListening();
              return;
            }

            handleButtonClick();
          }}
          disabled={isLoading}
          aria-label={
            isListening ? "음성 입력 중지" : hasMessage ? "메시지 전송" : "음성 입력 시작"
          }
          aria-pressed={isListening || undefined}
          className={`ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors disabled:opacity-40 ${
            isListening ? "animate-pulse bg-yellow text-darkgray" : "text-gray"
          }`}
        >
          <Icon
            icon={
              isListening
                ? "mingcute:stop-fill"
                : hasMessage
                  ? "mingcute:send-fill"
                  : "mingcute:mic-fill"
            }
            className="h-6 w-6"
          />
        </button>
      </div>

      {speechMessage && (
        <p
          role="status"
          aria-live="polite"
          className={`mt-2 text-caption-1 ${isListening ? "text-darkgray" : "text-gray"}`}
        >
          {speechMessage}
        </p>
      )}
    </div>
  );
}

export default Chat;
