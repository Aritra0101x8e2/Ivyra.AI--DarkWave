
import React from "react";
import { ShieldAlert, ShieldCheck, Clock, AlertTriangle } from "lucide-react";

interface ScanResultType {
  isSafe: boolean;
  score: number;
  message: string;
  timestamp: string;
}

interface ResultsDisplayProps {
  result: ScanResultType | null;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  if (!result) {
    return (
      <div className="cyber-panel p-5 h-full flex items-center justify-center text-center">
        <div className="text-muted-foreground">
          <AlertTriangle className="mx-auto mb-3 h-12 w-12 text-muted-foreground/50" />
          <h3 className="text-lg font-medium">No Scan Results</h3>
          <p className="mt-1">Submit a URL or email text to analyze for phishing threats.</p>
        </div>
      </div>
    );
  }

  const formattedTime = new Date(result.timestamp).toLocaleTimeString();
  const formattedDate = new Date(result.timestamp).toLocaleDateString();

  return (
    <div className={`cyber-panel p-5 h-full relative overflow-hidden ${result.isSafe ? "border-cyber-safe/30" : "border-cyber-warning/30"}`}>
      {result.isSafe ? (
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-cyber-safe/10"></div>
      ) : (
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-cyber-warning/10"></div>
      )}

      <div className="mb-5 flex justify-between items-center">
        <h2 className="text-xl font-bold">
          Scan Result
        </h2>
        <div className="text-xs text-muted-foreground flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {formattedTime} • {formattedDate}
        </div>
      </div>

      <div className="mb-6 flex items-center justify-center py-6">
        {result.isSafe ? (
          <div className="text-center animate-fade-in">
            <div className="inline-block p-4 mb-3 rounded-full bg-cyber-safe/10 text-cyber-safe">
              <ShieldCheck className="h-12 w-12 animate-pulse-glow" />
            </div>
            <h3 className="text-2xl font-bold text-cyber-safe mb-1">Safe Content</h3>
            <p className="text-muted-foreground">{result.message}</p>
          </div>
        ) : (
          <div className="text-center animate-fade-in">
            <div className="inline-block p-4 mb-3 rounded-full bg-cyber-warning/10 text-cyber-warning">
              <ShieldAlert className="h-12 w-12 animate-pulse-glow" />
            </div>
            <h3 className="text-2xl font-bold text-cyber-warning mb-1">Phishing Detected</h3>
            <p className="text-muted-foreground">{result.message}</p>
          </div>
        )}
      </div>

      <div className="bg-cyber-dark rounded-md p-4">
        <div className="mb-2 flex justify-between items-center">
          <span className="text-sm font-medium">Threat Score</span>
          <span className={`text-sm font-bold ${result.score > 60 ? "text-cyber-warning" : "text-cyber-safe"}`}>
            {result.score}/100
          </span>
        </div>
        <div className="h-2 bg-cyber-navy rounded overflow-hidden">
          <div 
            className={`h-full ${result.score > 60 ? "bg-cyber-warning" : "bg-cyber-safe"}`}
            style={{ width: `${result.score}%` }}
          ></div>
        </div>
        <div className="mt-1 text-xs text-muted-foreground">
          {result.score < 30 && "Very Low Risk"}
          {result.score >= 30 && result.score < 60 && "Low Risk"}
          {result.score >= 60 && result.score < 80 && "Medium Risk"}
          {result.score >= 80 && "High Risk"}
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
