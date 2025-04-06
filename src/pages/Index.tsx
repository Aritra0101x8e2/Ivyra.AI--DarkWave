
import React, { useState, useEffect } from "react";
import ScannerComponent from "@/components/ScannerComponent";
import ResultsDisplay from "@/components/ResultsDisplay";
import ScanHistory from "@/components/ScanHistory";
import StatsDisplay from "@/components/StatsDisplay";
import Header from "@/components/Header";

interface ScanResultType {
  isSafe: boolean;
  score: number;
  message: string;
  timestamp: string;
}

const Index = () => {
  const [currentResult, setCurrentResult] = useState<ScanResultType | null>(null);
  const [scanHistory, setScanHistory] = useState<ScanResultType[]>([]);
  const [stats, setStats] = useState({
    totalScans: 0,
    safeCount: 0,
    phishingCount: 0
  });

  const handleScanComplete = (result: ScanResultType) => {
    setCurrentResult(result);
    
    // Add to history
    const updatedHistory = [result, ...scanHistory];
    setScanHistory(updatedHistory);
    
    // Update stats
    setStats({
      totalScans: stats.totalScans + 1,
      safeCount: stats.safeCount + (result.isSafe ? 1 : 0),
      phishingCount: stats.phishingCount + (result.isSafe ? 0 : 1)
    });
  };

  return (
    <div className="min-h-screen bg-cyber-dark text-foreground grid-bg">
      <div className="container mx-auto py-8 px-4">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <ScannerComponent onScanComplete={handleScanComplete} />
              <ResultsDisplay result={currentResult} />
            </div>
            
            <StatsDisplay 
              totalScans={stats.totalScans}
              safeCount={stats.safeCount}
              phishingCount={stats.phishingCount}
            />
          </div>
          
          <div className="lg:col-span-1">
            <ScanHistory history={scanHistory} />
          </div>
        </div>
        
        <footer className="mt-8 text-center text-sm text-muted-foreground">
          <p>IVYRA, an AI Based Phishing Detection System by DarkWave Solutions</p>
          <p className="text-xs mt-1">© 2025 - IVYRA.AI by Aritra. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
