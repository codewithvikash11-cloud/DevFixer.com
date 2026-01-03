"use client";

import React, { useState } from 'react';
import { Save, AlertOctagon, Download, Globe } from 'lucide-react';

export default function SettingsPage() {
    const [config, setConfig] = useState({
        siteName: 'DevFixer',
        maintenanceMode: false,
        registrationEnabled: true
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-black text-white mb-2">Platform Settings</h1>
                <p className="text-gray-500 text-sm">Global configuration and emergency controls.</p>
            </div>

            {/* General Settings */}
            <div className="grid gap-6">
                <section className="bg-[#0A0A0A] border border-[#222] rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Globe size={18} /> General Config
                    </h3>
                    <div className="grid gap-4 max-w-xl">
                        <div>
                            <label className="text-xs font-mono text-gray-500 uppercase">Website Name</label>
                            <input
                                type="text"
                                value={config.siteName}
                                onChange={(e) => setConfig({ ...config, siteName: e.target.value })}
                                className="w-full bg-[#111] border border-[#222] rounded-lg p-3 text-white mt-1 focus:border-accent-primary outline-none"
                            />
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-[#111] rounded-lg border border-[#222]">
                            <input
                                type="checkbox"
                                checked={config.registrationEnabled}
                                onChange={(e) => setConfig({ ...config, registrationEnabled: e.target.checked })}
                                className="w-4 h-4 accent-accent-primary"
                            />
                            <div>
                                <div className="text-white font-bold text-sm">Enable Cancellations</div>
                                <div className="text-gray-500 text-xs">Allow users to delete their own accounts.</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Danger Zone */}
                <section className="bg-red-500/5 border border-red-500/10 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-red-500 mb-4 flex items-center gap-2">
                        <AlertOctagon size={18} /> Danger Zone
                    </h3>
                    <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                        <div>
                            <div className="text-white font-bold">Maintenance Mode</div>
                            <div className="text-red-300/60 text-xs">Take the site offline immediately. Admins can still access.</div>
                        </div>
                        <button
                            onClick={() => setConfig({ ...config, maintenanceMode: !config.maintenanceMode })}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg text-sm transition-colors"
                        >
                            {config.maintenanceMode ? 'Disable' : 'Enable'}
                        </button>
                    </div>
                </section>

                {/* Data */}
                <section className="bg-[#0A0A0A] border border-[#222] rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Download size={18} /> Data Portability
                    </h3>
                    <div className="flex gap-4">
                        <button className="px-4 py-2 bg-[#111] border border-[#222] hover:bg-white/10 text-white font-bold rounded-lg text-sm transition-colors">
                            Export All Users (CSV)
                        </button>
                        <button className="px-4 py-2 bg-[#111] border border-[#222] hover:bg-white/10 text-white font-bold rounded-lg text-sm transition-colors">
                            Export System Logs (JSON)
                        </button>
                    </div>
                </section>
            </div>

            <div className="flex justify-end">
                <button className="px-6 py-3 bg-accent-primary text-black font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2">
                    <Save size={18} /> Save Changes
                </button>
            </div>
        </div>
    );
}
