const StatisticCard = ({ statistic }) => {
  /**
   * Component is responsible for taking a statistic as prop and rendering same
   */

  return (
    <div className="w-full bg-white p-6 flex items-center justify-between rounded-md shadow-md">
      <div className="p-2 flex flex-col gap-8">
        <span className="text-3xl">
          {statistic.isCurrency && "#"}
          {statistic.amount}
        </span>
        <span>{statistic.name}</span>
      </div>
      {statistic.icon && (
        <div className="self-start p-2 bg-paleBlue rounded-sm shadow-sm">
          <img src={statistic.icon} alt={statistic.name} />
        </div>
      )}
    </div>
  );
};

export default StatisticCard;
