import { useState } from "react";
import Title from "../Title.jsx";
import shield from "../../assets/icons/shield.svg";

function CardSafety({ title, toggles = [] }) {
  const [toggleStates, setToggleStates] = useState(() => toggles.map((toggle) => toggle.enabled));

  const handleToggle = (index) => {
    setToggleStates((prev) => prev.map((value, i) => (i === index ? !value : value)));
  };

  return (
    <div className="flex flex-col gap-3 rounded-card bg-white px-4 py-5">
      <Title icon={shield} title={title} />

      {toggles.map((toggle, index) => {
        const isEnabled = toggleStates[index];

        return (
          <div key={toggle.label} className="flex flex-col gap-2 rounded-button bg-background p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-body-1 text-darkgray">{toggle.label}</span>
              <button
                type="button"
                onClick={() => handleToggle(index)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${isEnabled ? "bg-yellow" : "bg-gray"}`}
                aria-pressed={isEnabled}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${isEnabled ? "right-0.5" : "left-0.5"}`}
                />
              </button>
            </div>
            <span className="text-caption-1 text-gray">{toggle.description}</span>
          </div>
        );
      })}
    </div>
  );
}

export default CardSafety;
