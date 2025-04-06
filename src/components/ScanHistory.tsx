
import React from "react";
import { Link2, Mail, Clock, ShieldAlert, ShieldCheck } from "lucide-react";

interface ScanResultType {
  isSafe: boolean;
  score: number;
  message: string;
  timestamp: string;
}

interface ScanHistoryProps {
  history: ScanResultType[];
}

const ScanHistory: React.FC<ScanHistoryProps> = ({ history }) => {
  if (history.length === 0) {
    return (
      <div className="cyber-panel p-5">
        <h2 className="text-xl font-bold mb-4 text-cyber-accent">Recent Scans</h2>
        <div className="text-center py-6 text-muted-foreground">
          <p>No scan history yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cyber-panel p-5">
      <h2 className="text-xl font-bold mb-4 text-cyber-accent">Recent Scans</h2>
      <div className="space-y-3">
        {history.slice(0, 5).map((scan, index) => (
          <div key={index} className="bg-cyber-dark rounded-md p-3 flex items-center">
            <div className="mr-3">
              {scan.isSafe ? (
                <div className="h-8 w-8 rounded-full bg-cyber-safe/10 flex items-center justify-center">
                  <ShieldCheck className="h-4 w-4 text-cyber-safe" />
                </div>
              ) : (
                <div className="h-8 w-8 rounded-full bg-cyber-warning/10 flex items-center justify-center">
                  <ShieldAlert className="h-4 w-4 text-cyber-warning" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <span className={`font-medium truncate ${scan.isSafe ? "text-cyber-safe" : "text-cyber-warning"}`}>
                  {scan.isSafe ? "Safe Content" : "Phishing Detected"}
                </span>
                <span className="text-xs text-muted-foreground ml-2 whitespace-nowrap">
                  {new Date(scan.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Score: {scan.score}/100
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScanHistory;
