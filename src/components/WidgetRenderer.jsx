// src/components/WidgetRenderer.jsx
import TravelCardChargeWidget from "./travel/TravelCardChargeWidget.jsx";
import Plan from "./travel/Plan.jsx";
import OverseasQrPaymentWidget from "./travel/OverseasQrPaymentWidget.jsx";
import TravelInsuranceWidget from "./travel/TravelInsuranceWidget.jsx";

import GroupAccount from "./widgets/GroupAccount.jsx";
import ExpenseReport from "./widgets/ExpenseReport.jsx";
import CardSafety from "./widgets/CardSafety.jsx";

import More from "./widgets/More.jsx";
import CardFreezeAll from "./lost/CardFreezeAll.jsx";
import FreezeCard from "./lost/FreezeCard.jsx";
import AtmSmartWithdrawal from "./lost/AtmSmartWithdrawal.jsx";
import Done from "./widgets/Done.jsx";
import ReceiveInfo from "./widgets/ReceiveInfo.jsx";

function WidgetRenderer({ widget, onSheetOpenChanged }) {
  let component = null;

  switch (widget.type) {
    case "travel_card_charge_widget":
      component = <TravelCardChargeWidget {...widget} onSheetOpenChanged={onSheetOpenChanged} />;
      break;

    case "overseas_qr_payment_widget":
      component = <OverseasQrPaymentWidget {...widget} onSheetOpenChanged={onSheetOpenChanged} />;
      break;

    case "travel_insurance_widget":
      component = <TravelInsuranceWidget {...widget} />;
      break;

    case "group_account_status":
      component = <More {...widget} />;
      break;

    case "expense_report_widget":
      component = <CardFreezeAll {...widget} />;
      break;

    case "group_card_safety_widget":
      component = <FreezeCard {...widget} />;
      break;
      return <GroupAccount {...widget} />;

    case "expense_report_widget":
      return <ExpenseReport {...widget} onSheetOpenChanged={onSheetOpenChanged} />;
 
    case "group_card_safety_widget":
      return <CardSafety {...widget} />;
      component = <More {...widget} />;
      break;

    case "expense_report_widget":
      component = <CardFreezeAll {...widget} />;
      break;

    case "group_card_safety_widget":
      component = <FreezeCard {...widget} />;
      break;

    case "card_freeze_all":
      component = <CardFreezeAll {...widget} />;
      break;

    case "atm_smart_withdrawal":
      component = <AtmSmartWithdrawal {...widget} />;
      break;

    case "id_reissue_status_widget":
      component = (
        <div className="flex flex-col gap-3">
          <Done {...widget} />
          <ReceiveInfo {...widget} />
        </div>
      );
      break;

    default:
      console.warn("지원하지 않는 위젯 타입:", widget.type);
      return null;
  }

  return component;
}

export default WidgetRenderer;