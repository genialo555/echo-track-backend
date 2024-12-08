export interface DashboardStats {
    daily: {
      journeyCount: number;
      totalEmissions: number;
    };
    monthly: {
      journeyCount: number;
      totalEmissions: number;
    };
    history: JourneyHistoryEntry[];
  }
  
  export interface JourneyHistoryEntry {
    date: string;
    count: number;
    totalDistance: number;
    totalEmissions: number;
  }
  
  export interface UserStats {
    totalJourneys: number;
    totalEmissions: number;
    lastActive: Date;
    avgJourneysPerMonth: number;
  }