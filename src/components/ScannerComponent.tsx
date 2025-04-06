
import React, { useState, useEffect } from "react";
import { ArrowRight, ShieldAlert, ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ScanResultType {
  isSafe: boolean;
  score: number;
  message: string;
  timestamp: string;
}

interface ScannerComponentProps {
  onScanComplete: (result: ScanResultType) => void;
}

const ScannerComponent: React.FC<ScannerComponentProps> = ({ onScanComplete }) => {
  const [input, setInput] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [inputType, setInputType] = useState<"url" | "text">("url");

  const isValidUrl = (text: string): boolean => {
    try {
      new URL(text);
      return true;
    } catch {
      return false;
    }
  };

  const handleScan = () => {
    if (!input.trim()) {
      toast.error("Please enter a URL or email text to scan");
      return;
    }

    if (inputType === "url" && !isValidUrl(input)) {
      toast.error("Please enter a valid URL");
      return;
    }

    setIsScanning(true);

    // Simulate API call to backend
    setTimeout(() => {
      // Simulate analysis - in a real app, this would be a call to a backend API
      // For demo purposes: URLs with "phish", "scam", or "hack" are detected as phishing
      const isPotentialPhish = input.toLowerCase().includes("phish") || 
                              input.toLowerCase().includes("scam") || 
                              input.toLowerCase().includes("hack");
      
      // Generate a randomized score but weighted based on our detection
      const baseScore = isPotentialPhish ? 75 + Math.random() * 25 : Math.random() * 40;
      const score = Math.min(Math.round(baseScore), 100);
      
      // Determine if it's unsafe based on score
      const isSafe = score < 60;
      
      const result: ScanResultType = {
        isSafe,
        score,
        message: isSafe 
          ? "This content appears to be safe" 
          : "This content contains phishing indicators",
        timestamp: new Date().toISOString()
      };
      
      onScanComplete(result);
      setIsScanning(false);
      
      // Show toast notification
      if (isSafe) {
        toast.success("Analysis complete: Content appears safe");
      } else {
        toast.error("Analysis complete: Potential phishing detected");
      }
      
    }, 2000); // 2 second delay to simulate processing
  };

  return (
    <div className="cyber-panel p-5 relative overflow-hidden">
      {isScanning && (
        <div className="scanning-line animate-scanning"></div>
      )}
      <h2 className="text-xl font-bold mb-4 text-cyber-accent">Phishing Detection Scanner</h2>
      
      <div className="mb-4">
        <div className="flex mb-2 space-x-2">
          <button
            className={`py-1 px-3 rounded-md transition-colors ${inputType === "url" ? "bg-cyber-accent text-cyber-dark" : "bg-cyber-navy text-foreground"}`}
            onClick={() => setInputType("url")}
          >
            URL
          </button>
          <button
            className={`py-1 px-3 rounded-md transition-colors ${inputType === "text" ? "bg-cyber-accent text-cyber-dark" : "bg-cyber-navy text-foreground"}`}
            onClick={() => setInputType("text")}
          >
            Email Text
          </button>
        </div>

        <textarea
          className="cyber-input w-full p-3 h-32 text-sm"
          placeholder={inputType === "url" ? "Enter URL to scan..." : "Paste email content to analyze..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isScanning}
        />
      </div>
      
      <button
        className="cyber-button py-2 px-4 w-full flex items-center justify-center"
        onClick={handleScan}
        disabled={isScanning}
      >
        {isScanning ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing Content...
          </>
        ) : (
          <>
            Scan for Phishing <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </button>
    </div>
  );
};

export default ScannerComponent;
