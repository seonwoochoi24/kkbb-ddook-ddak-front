// src/components/Chat.jsx
import { useState } from "react";
import { Icon } from "@iconify/react";

function Chat({ type = "chat" }) {
  const [message, setMessage] = useState("");

  const hasMessage = message.trim().length > 0;

  const placeholder =
    type === "chat"
      ? "필요한 상황을 자유롭게 말해주세요."
      : "나 지갑을 잃어벼렸는데 어떡하지?";

  const handleButtonClick = () => {
    if (hasMessage) {
      console.log("전송할 메시지:", message);

      // 전송 후 입력창 비우기
      setMessage("");
    } else {
      console.log("음성 입력 시작");
    }
  };

  return (
    <div className="flex w-full items-center justify-between rounded-button bg-white p-[18px] shadow-md">
    <textarea
  value={message}
  onChange={(event) => {
    setMessage(event.target.value);

    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  }}
  placeholder={placeholder}
  rows={1}
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
  "
/>

      <button
        type="button"
        onClick={handleButtonClick}
        aria-label={hasMessage ? "메시지 전송" : "음성 입력"}
        className="flex h-6 w-6 shrink-0 items-center justify-center"
      >
        <Icon
          icon={
            hasMessage
              ? "mingcute:send-fill"
              : "mingcute:mic-fill"
          }
          className="h-6 w-6 text-gray"
        />
      </button>
    </div>
  );
}

export default Chat;