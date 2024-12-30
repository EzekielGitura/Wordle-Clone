import { useEffect, useState } from "react";

export interface HistoryState {
  totalGamesPlayed: number;
  totalGamesWon: number;
  totalGamesLost: number;
}

const History = () => {
  const [history, setHistory] = useState<HistoryState>({
    totalGamesPlayed: 0,
    totalGamesWon: 0,
    totalGamesLost: 0,
  });

  useEffect(() => {
    const savedHistory = localStorage.getItem("history");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat().format(num);
  };

  const winRate = history.totalGamesPlayed > 0 ? Math.round((history.totalGamesWon / history.totalGamesPlayed) * 100) : 0;
  const loseRate = history.totalGamesPlayed > 0 ? Math.round((history.totalGamesLost / history.totalGamesPlayed) * 100) : 0;

  return (
    <div className="w-full py-6 px-4 border border-dashed border-zinc-700 bg-zinc-800 rounded-lg grid grid-cols-3 gap-4">
      <div className="flex flex-col justify-center items-center gap-1">
        <p className="text-2xl lg:text-3xl font-bold text-zinc-400">{formatNumber(history.totalGamesPlayed)}</p>
        <h3 className="text-xs text-zinc-400">Games Played</h3>
      </div>
      <div className="flex flex-col justify-center items-center gap-1">
        <p className="text-2xl lg:text-3xl font-bold text-emerald-400">
          {winRate}
          <span className="text-xs">%</span>
        </p>
        <h3 className="text-xs text-zinc-400">Win Rate</h3>
      </div>
      <div className="flex flex-col justify-center items-center gap-1">
        <p className="text-2xl lg:text-3xl font-bold text-rose-400">
          {loseRate}
          <span className="text-xs">%</span>
        </p>
        <h3 className="text-xs text-zinc-400">Lose Rate</h3>
      </div>
    </div>
  );
};

export default History;
