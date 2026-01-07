"use client";

import React, { useState, useEffect } from 'react';
import {
    Settings,
    Save,
    Image as ImageIcon,
    Type,
    Palette,
    AlertTriangle,
    ToggleLeft,
    ToggleRight
} from 'lucide-react';
import { getPostBySlug, createPost, updatePost } from '@/lib/posts';
import { useAuth } from '@/context/AuthContext';

const DEFAULT_SETTINGS = {
    brandName: "Rovio Tech",
    logoUrl: "/logo.png",
    primaryColor: "#008000",
    maintenanceMode: false,
    announcement: {
        active: false,
        text: "We are currently experiencing high traffic.",
        link: ""
    }
};

export default function SettingsManager() {
    const { user } = useAuth();
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [post, setPost] = useState(null);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        setLoading(true);
        try {
            const data = await getPostBySlug('system-settings');
            if (data && data.content) {
                setPost(data);
                try {
                    const parsed = JSON.parse(data.content);
                    setSettings({ ...DEFAULT_SETTINGS, ...parsed });
                } catch (e) {
                    console.error("Failed to parse settings JSON", e);
                }
            }
        } catch (error) {
            console.error("Failed to load settings:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        const payload = {
            slug: 'system-settings',
            title: 'System Settings',
            content: JSON.stringify(settings),
            language: 'system:settings',
            status: 'published',
            description: 'Global website configuration',
            authorId: user.$id,
            authorName: user.name
        };

        try {
            if (post) {
                await updatePost('system-settings', payload);
            } else {
                await createPost(payload);
            }
            // Start reload to sync
            await loadSettings();
            alert("Settings saved successfully!");
        } catch (error) {
            console.error("Save failed:", error);
            alert("Failed to save settings: " + error.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-10 text-center">Loading settings...</div>;

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-text-primary tracking-tight">Global Settings</h1>
                    <p className="text-text-secondary">Configure branding, maintenance mode, and system defaults.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-2 bg-accent-primary text-white rounded-xl font-bold shadow-lg shadow-accent-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                >
                    {saving ? "Saving..." : <><Save size={18} /> Save Changes</>}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Branding */}
                <div className="bg-panel border border-border rounded-2xl p-6 space-y-6">
                    <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                        <Type size={20} className="text-accent-primary" />
                        Branding
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-text-secondary uppercase mb-1">Brand Name</label>
                            <input
                                type="text"
                                value={settings.brandName}
                                onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                                className="w-full bg-surface border border-border rounded-xl px-4 py-2 focus:outline-none focus:border-accent-primary transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-text-secondary uppercase mb-1">Logo URL</label>
                            <div className="flex gap-2">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={settings.logoUrl}
                                        onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                                        className="w-full bg-surface border border-border rounded-xl px-4 py-2 focus:outline-none focus:border-accent-primary transition-colors"
                                    />
                                </div>
                                <div className="w-10 h-10 bg-surface border border-border rounded-lg flex items-center justify-center overflow-hidden">
                                    <img src={settings.logoUrl} alt="Logo" className="w-full h-full object-contain" onError={(e) => e.target.style.display = 'none'} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Theme */}
                <div className="bg-panel border border-border rounded-2xl p-6 space-y-6">
                    <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                        <Palette size={20} className="text-purple-500" />
                        Theme
                    </h2>

                    <div>
                        <label className="block text-xs font-bold text-text-secondary uppercase mb-1">Primary Color (Hex)</label>
                        <div className="flex items-center gap-3">
                            <input
                                type="color"
                                value={settings.primaryColor}
                                onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                                className="w-12 h-12 rounded-lg bg-transparent cursor-pointer border-none p-0"
                            />
                            <input
                                type="text"
                                value={settings.primaryColor}
                                onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                                className="flex-1 bg-surface border border-border rounded-xl px-4 py-2 font-mono uppercase focus:outline-none focus:border-accent-primary transition-colors"
                            />
                        </div>
                        <p className="text-xs text-text-tertiary mt-2">
                            * Note: Changing this requires a hard refresh as CSS variables are processed on load.
                            Frontend integration needed for dynamic update.
                        </p>
                    </div>
                </div>

                {/* System Status */}
                <div className="bg-panel border border-border rounded-2xl p-6 space-y-6 md:col-span-2">
                    <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                        <AlertTriangle size={20} className="text-orange-500" />
                        System Status
                    </h2>

                    <div className="flex items-center justify-between p-4 bg-surface border border-border rounded-xl">
                        <div>
                            <h3 className="font-bold text-text-primary">Maintenance Mode</h3>
                            <p className="text-sm text-text-secondary">Disable site access for non-admins.</p>
                        </div>
                        <button
                            onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
                            className={`text-3xl transition-colors ${settings.maintenanceMode ? 'text-accent-primary' : 'text-text-tertiary'}`}
                        >
                            {settings.maintenanceMode ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
                        </button>
                    </div>

                    <div className="p-4 bg-surface border border-border rounded-xl space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-text-primary">Announcement Banner</h3>
                                <p className="text-sm text-text-secondary">Show a global alert at the top of the site.</p>
                            </div>
                            <button
                                onClick={() => setSettings({
                                    ...settings,
                                    announcement: { ...settings.announcement, active: !settings.announcement.active }
                                })}
                                className={`text-3xl transition-colors ${settings.announcement.active ? 'text-accent-primary' : 'text-text-tertiary'}`}
                            >
                                {settings.announcement.active ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
                            </button>
                        </div>

                        {settings.announcement.active && (
                            <div className="animate-in fade-in slide-in-from-top-2 pt-2">
                                <label className="block text-xs font-bold text-text-secondary uppercase mb-1">Banner Text</label>
                                <input
                                    type="text"
                                    value={settings.announcement.text}
                                    onChange={(e) => setSettings({
                                        ...settings,
                                        announcement: { ...settings.announcement, text: e.target.value }
                                    })}
                                    className="w-full bg-panel border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent-primary mb-2"
                                />
                                <label className="block text-xs font-bold text-text-secondary uppercase mb-1">Link (Optional)</label>
                                <input
                                    type="text"
                                    value={settings.announcement.link}
                                    placeholder="/blog/updates"
                                    onChange={(e) => setSettings({
                                        ...settings,
                                        announcement: { ...settings.announcement, link: e.target.value }
                                    })}
                                    className="w-full bg-panel border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent-primary"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
