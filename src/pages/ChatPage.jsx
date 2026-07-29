// src/pages/MainPage.jsx
import Chat from "../components/Chat.jsx";
import MakeCard from "../components/widgets/MakeCard.jsx";
import More from "../components/widgets/More.jsx";
import StopCard from "../components/widgets/StopCard.jsx";
import FreezeCard from "../components/widgets/FreezeCard.jsx";
import Atm from "../components/widgets/Atm.jsx";
import ChatOrigin from "../components/common/ChatOrigin.jsx";
import AtmNum from "../components/widgets/AtmNum.jsx";
import AtmPlace from "../components/widgets/AtmPlace.jsx";
import AtmDes from "../components/widgets/AtmDes.jsx";
import Done from "../components/widgets/Done.jsx";
import ReceiveInfo from "../components/widgets/ReceiveInfo.jsx";
import Exchange from "../components/widgets/Exchange.jsx";
import Plan from "../components/widgets/Plan.jsx";

function ChatPage() {
  return (
    <main className="min-h-dvh pb-[100px] flex flex-col gap-3">
      <Exchange />
      <Plan />
      <MakeCard />
      <More />
      <StopCard />
      <FreezeCard />
      <Atm />
      {/* <ChatOrigin /> */}
      <AtmNum />
      <AtmPlace />
      <AtmDes />
      <Done />
      <ReceiveInfo />
      <div className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[375px] px-[10px] pb-[12px]">
        <Chat />
      </div>
    </main>
  );
}

export default ChatPage;