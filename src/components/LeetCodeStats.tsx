import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Code, Award } from 'lucide-react';

interface LeetCodeData {
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    acceptanceRate: number;
    ranking: number;
    totalQuestions: number;
    totalEasy: number;
    totalMedium: number;
    totalHard: number;
    submissionCalendar: { [key: string]: number };
}

const LeetCodeStats: React.FC = () => {
    const [data, setData] = useState<LeetCodeData | null>(null);
    const [loading, setLoading] = useState(true);



    // Replace with your LeetCode username
    const username = 'leetcode';

    useEffect(() => {
        const fetchLeetCodeData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch LeetCode data');
                }
                const result = await response.json();

                if (result.status === 'error') {
                    throw new Error(result.message);
                }

                setData(result);



            } catch (err) {
                // Fallback to mock data on error for demonstration
                setData({
                    totalSolved: 450,
                    easySolved: 180,
                    mediumSolved: 220,
                    hardSolved: 50,
                    acceptanceRate: 65.4,
                    ranking: 125000,
                    totalQuestions: 2000,
                    totalEasy: 500,
                    totalMedium: 1000,
                    totalHard: 500,
                    submissionCalendar: {}
                });

            } finally {
                setLoading(false);
            }
        };

        fetchLeetCodeData();
    }, []);

    // Calculate advanced stats
    const calculateAdvancedStats = () => {
        if (!data?.submissionCalendar) return { totalInYear: 0, activeDays: 0, maxStreak: 0, calendar: [] };

        const timestamps = Object.keys(data.submissionCalendar).map(t => parseInt(t));
        const countMap = new Map<string, number>();
        timestamps.forEach(ts => {
            const dateStr = new Date(ts * 1000).toISOString().split('T')[0];
            countMap.set(dateStr, (countMap.get(dateStr) || 0) + (data.submissionCalendar[ts] || 0));
        });

        let totalInYear = 0;
        let activeDays = 0;
        let currentStreak = 0;
        let maxStreak = 0;

        // Iterate last 365 days
        const days: { date: string; count: number; level: number }[] = [];

        for (let i = 0; i < 365; i++) {
            const d = new Date();
            d.setDate(d.getDate() - (364 - i));
            const dateStr = d.toISOString().split('T')[0];
            const count = countMap.get(dateStr) || 0;

            if (count > 0) {
                totalInYear += count;
                activeDays++;
                currentStreak++;
                maxStreak = Math.max(maxStreak, currentStreak);
            } else {
                currentStreak = 0;
            }

            // Level 0-4
            let level = 0;
            if (count > 0) level = 1;
            if (count > 2) level = 2;
            if (count > 5) level = 3;
            if (count > 10) level = 4;

            days.push({ date: dateStr, count, level });
        }

        return { totalInYear, activeDays, maxStreak, calendar: days };
    };

    const { totalInYear, activeDays, maxStreak, calendar } = calculateAdvancedStats();

    // Mock recent activity since API doesn't provide it easily in this format
    const recentActivity = [
        { id: 1, problem: "Two Sum", difficulty: "Easy", status: "Solved", date: "2 days ago" },
        { id: 2, problem: "Add Two Numbers", difficulty: "Medium", status: "Solved", date: "3 days ago" },
        { id: 3, problem: "Median of Two Sorted Arrays", difficulty: "Hard", status: "Attempted", date: "5 days ago" },
    ];

    if (loading) {
        return (
            <div className="h-full glass-card p-6 border border-neutral-800 bg-black/40 backdrop-blur-md rounded-2xl flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    // Use data or mock fallback
    const displayData = data || {
        totalSolved: 0,
        easySolved: 0,
        mediumSolved: 0,
        hardSolved: 0,
        acceptanceRate: 0,
        ranking: 0,
        totalQuestions: 0,
        totalEasy: 0,
        totalMedium: 0,
        totalHard: 0,
        submissionCalendar: {}
    };

    return (
        <div className="h-full flex flex-col">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-card p-6 h-full border border-neutral-800 bg-black/40 backdrop-blur-md rounded-2xl flex flex-col"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-yellow-500/10 rounded-lg">
                        <Code className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-white">LeetCode</h3>
                        <p className="text-white/50 terminal-text text-sm">@{username}</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-black/60 p-3 rounded-xl border border-neutral-800/50">
                        <div className="text-white/50 text-xs mb-1">Total Solved</div>
                        <div className="text-2xl font-bold text-white">{displayData.totalSolved}</div>
                    </div>
                    <div className="bg-black/60 p-3 rounded-xl border border-neutral-800/50">
                        <div className="text-white/50 text-xs mb-1">Acceptance</div>
                        <div className="text-2xl font-bold text-emerald-400">{displayData.acceptanceRate}%</div>
                    </div>
                </div>

                {/* Contribution Graph */}
                <div className="mb-4 p-4 bg-black/60 rounded-xl border border-neutral-800/50">
                    <div className="flex items-center justify-between mb-3 text-xs">
                        <div className="text-white/70">{totalInYear} submissions in the past year</div>
                        <div className="flex gap-3 text-white/50">
                            <span>Active: {activeDays}</span>
                            <span>Max Streak: {maxStreak}</span>
                        </div>
                    </div>
                    {/* Heatmap Grid - Simplified for width */}
                    <div className="flex gap-1 overflow-hidden" style={{ height: '60px' }}>
                        {/* We'll render roughly 52 columns (weeks) x 7 rows (days) */}
                        {Array.from({ length: 20 }).map((_, weekIndex) => (
                            <div key={weekIndex} className="flex flex-col gap-1 flex-1">
                                {Array.from({ length: 7 }).map((_, dayIndex) => {
                                    // Pick a random sample or map real data if we aligned it perfectly.
                                    // For this compact view, we'll map the last ~140 days (20 weeks * 7) from the calendar array
                                    const dateIndex = 365 - (20 * 7) + (weekIndex * 7) + dayIndex;
                                    const dayData = calendar[dateIndex] || { level: 0 };

                                    let colorClass = 'bg-neutral-800/50';
                                    if (dayData.level === 1) colorClass = 'bg-emerald-900';
                                    if (dayData.level === 2) colorClass = 'bg-emerald-700';
                                    if (dayData.level === 3) colorClass = 'bg-emerald-500';
                                    if (dayData.level === 4) colorClass = 'bg-emerald-400';

                                    return (
                                        <div key={dayIndex} className={`w-full aspect-square rounded-[2px] ${colorClass}`}></div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Difficulty Bars */}
                <div className="space-y-3 mb-4">
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-emerald-400">Easy</span>
                            <span className="text-white/60">{displayData.easySolved} / {displayData.totalEasy || 100}</span>
                        </div>
                        <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: `${(displayData.easySolved / (displayData.totalEasy || 1)) * 100}%` }}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-yellow-400">Medium</span>
                            <span className="text-white/60">{displayData.mediumSolved} / {displayData.totalMedium || 100}</span>
                        </div>
                        <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-500" style={{ width: `${(displayData.mediumSolved / (displayData.totalMedium || 1)) * 100}%` }}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-red-400">Hard</span>
                            <span className="text-white/60">{displayData.hardSolved} / {displayData.totalHard || 100}</span>
                        </div>
                        <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500" style={{ width: `${(displayData.hardSolved / (displayData.totalHard || 1)) * 100}%` }}></div>
                        </div>
                    </div>
                </div>

                {/* Badges & Achievements */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Trophy className="w-4 h-4 text-yellow-400" />
                        <span className="text-white/80 font-medium text-sm">Achievements</span>
                    </div>
                    <div className="flex gap-2">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center group relative cursor-help">
                                <Award className="w-5 h-5 text-yellow-500/80" />
                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black border border-white/10 px-2 py-1 rounded text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    Badge Name
                                </div>
                            </div>
                        ))}
                        <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs text-white/40">
                            +9
                        </div>
                    </div>
                </div>

                {/* Recent Activity Mini List */}
                <div className="flex-1 min-h-0 flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                        <Code className="w-4 h-4 text-white/40" />
                        <span className="text-white/60 font-medium text-xs uppercase tracking-wider">Latest Activity</span>
                    </div>
                    <div className="space-y-2 overflow-y-auto pr-1 custom-scrollbar">
                        {recentActivity.map((activity) => (
                            <div key={activity.id} className="flex items-center justify-between text-xs p-2 hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-white/5">
                                <span className="text-white/70 truncate max-w-[140px]">{activity.problem}</span>
                                <span className={`px-1.5 py-0.5 rounded text-[10px] ${activity.status === 'Solved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-400'
                                    }`}>
                                    {activity.status}
                                </span>
                            </div>
                        ))}
                        {/* Duplicate for visual filtering if needed or just show mock */}
                        {[4, 5, 6].map((i) => (
                            <div key={i} className="flex items-center justify-between text-xs p-2 hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-white/5 opacity-50">
                                <span className="text-white/70 truncate max-w-[140px]">Older Problem {i}</span>
                                <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400">
                                    Solved
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </motion.div >
        </div >
    );
};

export default LeetCodeStats;
