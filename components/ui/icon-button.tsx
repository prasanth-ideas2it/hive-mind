const IconButton = (props: any) => {
  const name = props.name;
  const icon = props.icon;

  return (
    <button className="bg-[#FFFFFF33] flex items-center justify-center rounded-[62px] gap-1 w-[97px] h-[24px]">
      <img src={icon} alt="cube" />
      <span className="text-white font-[500] text-[10px] leading-6">
        {name}
      </span>
    </button>
  );
};

export default IconButton;
