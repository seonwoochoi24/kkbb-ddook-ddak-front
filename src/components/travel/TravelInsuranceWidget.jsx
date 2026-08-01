import { useState } from "react";
import Title from "../Title.jsx";
import IconCard from "../IconCard.jsx";
import Button from "../Button.jsx";
import shield from "../../assets/icons/shield.svg"

function TravelInsuranceWidget({
  title,
  description,
  plans = [],
  greeting,
  onSubmit,
  completedPlanName,
}) {
  const [selectedType, setSelectedType] = useState(null);
  const selectedPlan =
    selectedType === null ? null : plans[Number(selectedType) - 1];

  return (
    <section className="flex flex-col items-start justify-between gap-3 rounded-card bg-white px-4 py-5 shadow-card">
      <Title title={title} icon={shield} />

      <span className="text-caption-1 text-gray">
        {description}
      </span>

      {!completedPlanName && (
        <div className="flex w-full items-stretch justify-center gap-10 rounded-button">
          {plans.map((plan, index) => {
            const type = String(index + 1);

            return (
              <IconCard
                key={plan.planName}
                type={type}
                planName={plan.planName}
                recommended={plan.recommended}
                summary={plan.summary}
                finalPrice={plan.finalPrice}
                selected={selectedType === type}
                onClick={() => setSelectedType(type)}
              />
            );
          })}
        </div>
      )}

      <Button
        text={completedPlanName ? `${completedPlanName} 가입 완료` : "3초만에 뚝딱 가입하기"}
        disabled={selectedType === null || Boolean(completedPlanName)}
        completed={Boolean(completedPlanName)}
        onClick={() => onSubmit?.({ ...selectedPlan, greeting })}
      />
    </section>
  );
}

export default TravelInsuranceWidget;
