const StatisticCard = ({ statistic }) => {
  /**
   * Component is responsible for taking a statistic as prop and rendering same
   */

  return (
    <div className="w-full bg-white p-6 flex items-center justify-between rounded-md shadow-md">
      <div className="p-2 flex flex-col gap-8">
        <span className="text-3xl">
          {statistic.isCurrency && "#"}
          {statistic.amount.toLocaleString()}
        </span>
        <span>{statistic.name}</span>
      </div>
      <div className="self-start w-16 h-16 bg-gray-100 rounded-sm shadow-sm"></div>
    </div>
  );
};

export default StatisticCard;
