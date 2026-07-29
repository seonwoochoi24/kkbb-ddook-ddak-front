// src/components/WidgetRenderer.jsx
import TravelCardChargeWidget from "./travel/TravelCardChargeWidget.jsx";
import Plan from "./travel/Plan.jsx";
import OverseasQrPaymentWidget from "./travel/OverseasQrPaymentWidget.jsx";
import TravelInsuranceWidget from "./travel/TravelInsuranceWidget.jsx";

import More from "./widgets/More.jsx";
import StopCard from "./widgets/StopCard.jsx";
import FreezeCard from "./widgets/FreezeCard.jsx";
import Atm from "./widgets/Atm.jsx";
import AtmNum from "./widgets/AtmNum.jsx";
import AtmPlace from "./widgets/AtmPlace.jsx";
import AtmDes from "./widgets/AtmDes.jsx";
import Done from "./widgets/Done.jsx";
import ReceiveInfo from "./widgets/ReceiveInfo.jsx";

function WidgetRenderer({ widget, onSheetOpenChanged }) {
  switch (widget.type) {
    case "travel_card_charge_widget":
      return <TravelCardChargeWidget {...widget} onSheetOpenChanged={onSheetOpenChanged} />;

    case "overseas_qr_payment_widget":
      return <OverseasQrPaymentWidget {...widget} onSheetOpenChanged={onSheetOpenChanged} />;

    case "travel_insurance_widget":
      return <TravelInsuranceWidget {...widget} />;

    case "group_account_status":
      return <More {...widget} />;

    case "expense_report_widget":
      return <StopCard {...widget} />;

    case "group_card_safety_widget":
      return <FreezeCard {...widget} />;

    case "card_freeze_all":
      return <StopCard {...widget} />;

    case "atm_smart_withdrawal":
      return (
        <div className="flex flex-col gap-3">
          <AtmNum {...widget} />
          <AtmPlace {...widget} />
          <AtmDes {...widget} />
        </div>
      );

    case "id_reissue_status_widget":
      return (
        <div className="flex flex-col gap-3">
          <Done {...widget} />
          <ReceiveInfo {...widget} />
        </div>
      );

    default:
      console.warn("지원하지 않는 위젯 타입:", widget.type);
      return null;
  }
}

export default WidgetRenderer;