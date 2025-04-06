
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ShieldAlert, ShieldCheck, BarChart3 } from "lucide-react";

interface StatsDisplayProps {
  totalScans: number;
  safeCount: number;
  phishingCount: number;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ 
  totalScans, 
  safeCount, 
  phishingCount 
}) => {
  const data = [
    { name: "Safe", value: safeCount },
    { name: "Phishing", value: phishingCount },
  ];

  const COLORS = ["#0AE99C", "#FF4757"];

  return (
    <div className="cyber-panel p-5">
      <h2 className="text-xl font-bold mb-4 text-cyber-accent flex items-center">
        <BarChart3 className="mr-2 h-5 w-5" />
        Scan Statistics
      </h2>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-cyber-dark rounded-md p-3 text-center">
          <div className="text-2xl font-bold">{totalScans}</div>
          <div className="text-xs text-muted-foreground">Total Scans</div>
        </div>
        
        <div className="bg-cyber-dark rounded-md p-3 text-center">
          <div className="text-2xl font-bold text-cyber-safe">{safeCount}</div>
          <div className="text-xs text-muted-foreground flex items-center justify-center">
            <ShieldCheck className="h-3 w-3 mr-1" />
            Safe
          </div>
        </div>
        
        <div className="bg-cyber-dark rounded-md p-3 text-center">
          <div className="text-2xl font-bold text-cyber-warning">{phishingCount}</div>
          <div className="text-xs text-muted-foreground flex items-center justify-center">
            <ShieldAlert className="h-3 w-3 mr-1" />
            Phishing
          </div>
        </div>
      </div>

      {totalScans > 0 && (
        <div className="h-36">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={60}
                paddingAngle={5}
                dataKey="value"
                strokeWidth={2}
                stroke="#0A1929"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {totalScans === 0 && (
        <div className="h-36 flex items-center justify-center text-muted-foreground">
          No data available yet
        </div>
      )}
    </div>
  );
};

export default StatsDisplay;
