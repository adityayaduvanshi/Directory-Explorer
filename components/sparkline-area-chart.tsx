import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from 'recharts';
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';
export const SparklineAreaCell: React.FC<{ data: number[] }> = ({ data }) => {
  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);

  const chartData = data.map((value, index) => ({ value, period: index + 1 }));

  return (
    <ResponsiveContainer width={120} height={40}>
      <AreaChart
        data={chartData}
        // margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
      >
        <defs>
          <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#3b82f6"
          fill="url(#blueGradient)"
          isAnimationActive={false}
          baseValue={minValue}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
const CustomTooltip = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 p-2 shadow-md rounded-md">
        <p className="text-sm font-medium text-gray-900">{`${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};
