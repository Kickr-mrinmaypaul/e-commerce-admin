import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// #region Sample data
const data = [
  {
    name: 'Sun',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Mon',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Tue',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Wed',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Thu',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Fri',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Sat',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

// #endregion
const SimpleAreaChart = () => {
  return (
    <AreaChart
      style={{ width: '100%', maxHeight: '200px', aspectRatio: 1.618 }}
      responsive
      data={data}
      margin={{
        top: 20,
        right: 61,
        left: 19,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false}/>
      <XAxis 
      dataKey="name" />
      <YAxis 
      tickFormatter={(value) => `${value / 1000}k`}
      width="auto" />
      <Tooltip />
      <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#52A64E4D"  dot={false}/>
    </AreaChart>
  );
};

export default SimpleAreaChart;