function Button({ text = "Button", disabled = false, onClick }) {
  const stateClass = disabled
    ? "bg-darkgray text-white cursor-not-allowed"
    : "bg-yellow text-darkgray cursor-pointer";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-title p-4 rounded-button w-full transition-colors ${stateClass}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;