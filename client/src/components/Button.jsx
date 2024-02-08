const Button = ({ children, bgColor, ...props }) => {
  const classes = `${bgColor} w-full text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80`;
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
