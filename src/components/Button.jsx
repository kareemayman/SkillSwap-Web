const Button = ({
  variant = "primary",
  icon = null,
  onPress = () => {},
  disabled = false,
  value = "Button",
}) => {
  const baseStyle = `
    group relative overflow-hidden py-2 px-6 rounded-lg font-semibold
    transition-all duration-300 ease-linear text-center
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
  `;

  const primaryStyle = `text-white border bg-blue-500`;
  const secondaryStyle = `text-black border bg-gray-300`;

  const slideFillColor = variant === "primary" ? "bg-black" : "bg-blue-400";

  const iconColor = variant === "primary" ? "text-white" : "text-black";

  return (
    <button
      className={`${baseStyle} ${
        variant === "primary" ? primaryStyle : secondaryStyle
      }`}
      onClick={onPress}
      disabled={disabled}
    >
      {/* Slide-fill effect background */}
      <span
        className={`
          absolute inset-0 -left-full
          w-full h-full ${slideFillColor}
          transition-transform duration-300 ease-in-out
          transform group-hover:translate-x-full
          z-0
        `}
      ></span>

      {/* Text sliding left */}
      <span
        className={`
          relative z-10 block transition-transform duration-300 ease-linear
          ${icon ? `group-hover:-translate-x-3` : ``}
        `}
      >
        {value}
      </span>

      {/* Arrow icon slides in */}
      {icon && (
        <span
          className={`
          absolute top-1/2 right-4 transform -translate-y-1/2 translate-x-2 opacity-0
          transition-all duration-300 ease-linear
          group-hover:opacity-100 group-hover:translate-x-0
          ${iconColor} z-10
        `}
        >
          {icon}
        </span>
      )}
    </button>
  );
};

export default Button;
