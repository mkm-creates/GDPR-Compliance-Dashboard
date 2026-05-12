import { BarChart, Bar, ResponsiveContainer, Cell } from "recharts";

const data = [
  { value: 30 },
  { value: 45 },
  { value: 40 },
  { value: 65 },
  { value: 80 },
  { value: 75 },
  { value: 100 },
];

export function LaunchProbabilityChart() {
  return (
    <div className="w-full h-full relative">
      <ResponsiveContainer width="100%" height="100%" className={"absolute inset-0 z-10"}>
        <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <Bar dataKey="value" radius={[2, 2, 0, 0]} isAnimationActive={true}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={`url(#bentoGradient)`} 
                fillOpacity={0.7 + (index * 0.05)}
              />
            ))}
          </Bar>
          <defs>
            <linearGradient id="bentoGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#BF8B4D" stopOpacity={1} />
              <stop offset="100%" stopColor="#BF8B4D" stopOpacity={0.4} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-bento-dark z-0" />
      <div className="absolute inset-x-0 top-[25%] h-[1px] bg-bento-dark/10 z-0 border-t border-dashed border-bento-dark/20" />
      <div className="absolute inset-x-0 top-[50%] h-[1px] bg-bento-dark/10 z-0 border-t border-dashed border-bento-dark/20" />
      <div className="absolute inset-x-0 top-[75%] h-[1px] bg-bento-dark/10 z-0 border-t border-dashed border-bento-dark/20" />
    </div>
  );
}
