import { useState, useEffect } from "react";
import OrderManagementServices from "@/services/OrderManagementServices";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


type AreaConfig = {
  dataKey: string;
  color: string;
};

type Props = {
  data: any[];
  xKey: string;
  areas: AreaConfig[];
};

const SimpleAreaChart = ({ data, xKey, areas }: Props) => {
    
  return (
    // <AreaChart
    //   style={{ width: '100%', maxHeight: '200px', aspectRatio: 1.618 }}
    //   responsive
    //   data={data}
    //   margin={{
    //     top: 20,
    //     right: 61,
    //     left: 19,
    //     bottom: 0,
    //   }}
    // >
    //   <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false}/>
    //   <XAxis 
    //   dataKey="name" />
    //   <YAxis 
    //   tickFormatter={(value) => `${value / 1000}k`}
    //   width="auto" />
    //   <Tooltip />
    //   <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#52A64E4D"  dot={false}/>
    // </AreaChart>

    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          
          {/* Gradients */}
          <defs>
            {areas.map((area, i) => (
              <linearGradient
                key={i}
                id={`gradient-${area.dataKey}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={area.color} stopOpacity={0.4} />
                <stop offset="100%" stopColor={area.color} stopOpacity={0.05} />
              </linearGradient>
            ))}
          </defs>

          {/* Axes */}
          <XAxis
            dataKey={xKey}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
            labelStyle={{ fontWeight: 600 }}
          />

          {/* Areas */}
          {areas.map((area, i) => (
            <Area
              key={i}
              type="monotone"
              dataKey={area.dataKey}
              stroke={area.color}
              strokeWidth={2}
              fill={`url(#gradient-${area.dataKey})`}
              dot={false}
              activeDot={{ r: 5 }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>

  );
};

export default SimpleAreaChart;

