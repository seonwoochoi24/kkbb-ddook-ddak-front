// src/components/WidgetRenderer.jsx
import TravelCardChargeWidget from "./travel/TravelCardChargeWidget.jsx";
import OverseasQrPaymentWidget from "./travel/OverseasQrPaymentWidget.jsx";
import TravelInsuranceWidget from "./travel/TravelInsuranceWidget.jsx";
import Plan from "./travel/Plan.jsx";

import GroupAccount from "./widgets/GroupAccount.jsx";
import ExpenseReport from "./widgets/ExpenseReport.jsx";
import CardSafety from "./widgets/CardSafety.jsx";

import CardFreezeAll from "./lost/CardFreezeAll.jsx";
import IdCard from "./lost/IdCard.jsx";
import AtmSmartWithdrawal from "./lost/AtmSmartWithdrawal.jsx";
import Done from "./widgets/Done.jsx";
import ReceiveInfo from "./lost/ReceiveInfo.jsx";

function WidgetRenderer({
  widget,
  onSheetOpenChanged,
  onIdReissueSubmit,
  onTravelInsuranceSubmit,
  onTravelInsuranceBack,
  completedInsurancePlanName,
  idReissueSelectedTypes,
}) {
  let component;

  switch (widget.type) {
    case "travel_card_charge_widget":
      component = <TravelCardChargeWidget {...widget} onSheetOpenChanged={onSheetOpenChanged} />;
      break;

    case "overseas_qr_payment_widget":
      component = <OverseasQrPaymentWidget {...widget} onSheetOpenChanged={onSheetOpenChanged} />;
      break;

    case "travel_insurance_widget":
      component = (
        <TravelInsuranceWidget
          {...widget}
          onSubmit={onTravelInsuranceSubmit}
          completedPlanName={completedInsurancePlanName}
        />
      );
      break;

    case "travel_insurance_plan_widget":
      component = <Plan {...widget} onConnect={onTravelInsuranceBack} />;
      break;

    case "group_account_status":
      return <GroupAccount {...widget} />;

    case "expense_report_widget":
      return <ExpenseReport {...widget} onSheetOpenChanged={onSheetOpenChanged} />;
 
    case "group_card_safety_widget":
      return <CardSafety {...widget} />;

    case "card_freeze_all":
      component = <CardFreezeAll {...widget} />;
      break;

    case "atm_smart_withdrawal":
      component = <AtmSmartWithdrawal {...widget} />;
      break;

    case "id_reissue_status_widget":
      component = <IdCard {...widget} onSubmit={onIdReissueSubmit} initialSelectedTypes={idReissueSelectedTypes} />;
      break;

    case "id_reissue_done_widget":
      component = <Done {...widget} />;
      break;

    case "id_reissue_receive_info_widget":
      component = <ReceiveInfo {...widget} />;
      break;

    default:
      console.warn("지원하지 않는 위젯 타입:", widget.type);
      return null;
  }

  return component;
}

export default WidgetRenderer;
