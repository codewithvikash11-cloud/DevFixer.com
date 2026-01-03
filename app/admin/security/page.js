"use client";

import React, { useEffect, useState } from 'react';
import { adminService } from '@/lib/admin-service';
import { ShieldAlert, CheckCircle, XCircle, Search, Filter, AlertTriangle } from 'lucide-react';

export default function SecurityCenter() {
    const [logs, setLogs] = useState([]);
    const [filter, setFilter] = useState('ALL'); // ALL, REJECTED, APPROVED
    const [search, setSearch] = useState('');

    useEffect(() => {
        setLogs(adminService.getSecurityLogs());
        const interval = setInterval(() => {
            setLogs(adminService.getSecurityLogs());
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const filteredLogs = logs.filter(log => {
        const matchesFilter = filter === 'ALL' || log.status === filter;
        const matchesSearch = log.id.toLowerCase().includes(search.toLowerCase()) ||
            (log.rejectionReason && log.rejectionReason.toLowerCase().includes(search.toLowerCase()));
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-black text-white mb-2">Security Center</h1>
                <p className="text-gray-500 text-sm">Monitor and audit every content submission threat.</p>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div className="flex items-center gap-2 bg-[#0A0A0A] border border-[#222] p-1 rounded-xl">
                    {['ALL', 'REJECTED', 'APPROVED'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filter === f ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input
                        type="text"
                        placeholder="Search logs..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-[#0A0A0A] border border-[#222] text-white text-sm rounded-xl pl-10 pr-4 py-2.5 focus:border-accent-primary outline-none w-full md:w-64"
                    />
                </div>
            </div>

            {/* Logs Table */}
            <div className="bg-[#0A0A0A] border border-[#222] rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#111] text-xs font-bold text-gray-400 uppercase tracking-wider">
                        <tr>
                            <th className="p-4">Status</th>
                            <th className="p-4">Timestamp</th>
                            <th className="p-4">Threat Analysis</th>
                            <th className="p-4">Scores</th>
                            <th className="p-4">User Trust</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#222]">
                        {filteredLogs.map(log => (
                            <tr key={log.id} className="hover:bg-white/5 transition-colors group">
                                <td className="p-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${log.status === 'REJECTED' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'
                                        }`}>
                                        {log.status === 'REJECTED' ? <XCircle size={12} /> : <CheckCircle size={12} />}
                                        {log.status}
                                    </span>
                                </td>
                                <td className="p-4 text-xs font-mono text-gray-500">
                                    {new Date(log.timestamp).toLocaleString()}
                                </td>
                                <td className="p-4">
                                    <div className="text-sm font-medium text-gray-300">
                                        {log.rejectionReason || "Clean Content"}
                                    </div>
                                    <div className="text-[10px] text-gray-500 mt-1 font-mono">{log.id}</div>
                                </td>
                                <td className="p-4">
                                    <div className="flex flex-col gap-1 text-xs">
                                        <div className="flex items-center justify-between gap-4 w-32">
                                            <span className="text-gray-500">AI Prob:</span>
                                            <span className={`font-bold ${log.ai?.score > 40 ? 'text-red-400' : 'text-gray-300'}`}>{log.ai?.score}%</span>
                                        </div>
                                        <div className="flex items-center justify-between gap-4 w-32">
                                            <span className="text-gray-500">Plagiarism:</span>
                                            <span className={`font-bold ${log.plagiarism?.score > 15 ? 'text-red-400' : 'text-gray-300'}`}>{log.plagiarism?.score}%</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-20 h-1.5 bg-[#222] rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${log.behavior?.trustScore > 80 ? 'bg-green-500' : log.behavior?.trustScore > 50 ? 'bg-orange-500' : 'bg-red-500'}`}
                                                style={{ width: `${log.behavior?.trustScore}%` }}
                                            />
                                        </div>
                                        <span className="text-xs font-bold text-gray-400">{log.behavior?.trustScore}</span>
                                    </div>
                                    {log.behavior?.isSuspicious && (
                                        <div className="flex items-center gap-1 text-[10px] text-orange-400 mt-1">
                                            <AlertTriangle size={10} /> Suspicious Behavior
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredLogs.length === 0 && (
                    <div className="p-10 text-center text-gray-600">No logs found matching filters.</div>
                )}
            </div>
        </div>
    );
}
