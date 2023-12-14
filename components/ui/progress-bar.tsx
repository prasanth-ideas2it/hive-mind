const ProgressBar = ({ height, bgColor, barColor, percentage }: any) => {
  return (
    <div
      style={{ height: height, backgroundColor: bgColor }}
      className="w-full rounded-full"
    >
      <div
        className="h-full rounded-full"
        style={{ width: percentage, backgroundColor: barColor }}
      ></div>
    </div>
  );
};

export default ProgressBar;
