
import React from "react";
import { Shield, Activity } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="cyber-panel p-4 mb-6 flex justify-between items-center">
      <div className="flex items-center">
        <Shield className="h-6 w-6 text-cyber-accent mr-2" />
        <h1 className="text-xl font-bold text-cyber-accent">Ivyra.AI by DarkWave</h1>
      </div>
      
      <div className="flex items-center text-sm">
        <div className="flex items-center mr-4">
          <div className="status-indicator bg-cyber-accent animate-pulse"></div>
          <span>Engine Active</span>
        </div>
        
        <div className="flex items-center text-cyber-accent">
          <Activity className="h-4 w-4 mr-1" />
          <span>AI Powered</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
