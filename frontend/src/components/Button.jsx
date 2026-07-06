export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white",

    secondary: "bg-purple-600 hover:bg-purple-500 text-white",

    outline: "border border-white/20 bg-white/10 hover:bg-white/20 text-white",
  };

  return (
    <button
      className={`
        px-6
        py-3
        rounded-xl
        font-semibold
        transition-all
        duration-300
        hover:scale-105
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
