const Button = ({ onPress = () => {}, disabled = false, value = "Button", customColors = {} }) => {
  const {
    textColor = "var(--color-text-light)",
    bgColor = "var(--color-btn-submit-bg)",
    hoverFillColor = "var(--color-btn-submit-hover)",
    hoverTextColor = "var(--color-text-light)",
  } = customColors;

  return (
    <button
      onClick={onPress}
      disabled={disabled}
      className={`relative overflow-hidden px-6 py-3 font-semibold rounded-lg shadow-lg group 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
      style={{
        color: textColor,
        backgroundColor: bgColor,
      }}
    >
      <span
        className="relative z-10 transition duration-1000 group-hover:text-inherit"
        style={{
          color: textColor,
          transition: "color 0.3s ease-in-out",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = hoverTextColor;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = textColor;
        }}
      >
        {value}
      </span>

      <span
        className="absolute left-0 top-0 h-full w-0 transition-all duration-[800ms] ease-in-out group-hover:w-full"
        style={{ backgroundColor: hoverFillColor }}
      ></span>
    </button>
  );
};

export default Button;
