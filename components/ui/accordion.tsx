const Accordion = ({
  title,
  icon,
  buttonStyle,
  className,
  expanded,
  callback,
}: any) => {
  return (
    <div className={`${className}`}>
      <button
        className={`flex items-center justify-between w-full ${buttonStyle}`}
        onClick={callback}
      >
        <span className="text-black font-[500] text-sm">{title}</span>
        <img src={icon} alt="icon" />
      </button>
      {expanded && (
        <div className="px-[24px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit
        </div>
      )}
    </div>
  );
};

export default Accordion;
