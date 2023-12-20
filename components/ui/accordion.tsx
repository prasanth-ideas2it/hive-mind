const Accordion = ({
  title,
  icon,
  buttonStyle,
  className,
  expanded,
  callback,
  data,
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
      {expanded && <div className="px-[24px] text-[#0F172A]">{data}</div>}
    </div>
  );
};

export default Accordion;
