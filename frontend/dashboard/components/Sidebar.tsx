"use client";

import { useEffect, useState } from "react";
import { Layout, Plus, Star, Box, Settings } from "lucide-react";

interface Widget {
    id: string;
    businessName: string | null;
    title: string | null;
    placeId: string;
}

export default function Sidebar({
    onSelect,
    activeId,
    BACKEND_URL
}: {
    onSelect: (id: string) => void;
    activeId: string | null;
    BACKEND_URL: string;
}) {
    const [widgets, setWidgets] = useState<Widget[]>([]);

    useEffect(() => {
        fetch(`${BACKEND_URL}/api/widgets`)
            .then(res => res.json())
            .then(data => setWidgets(data.widgets || []))
            .catch(console.error);
    }, [BACKEND_URL, activeId]);

    return (
        <div className="w-80 bg-black/40 backdrop-blur-3xl border-r border-white/5 text-white min-h-screen p-8 flex flex-col relative z-20">
            <div className="flex items-center gap-4 mb-12 px-2">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[18px] flex items-center justify-center shadow-lg shadow-indigo-500/30 transform -rotate-6">
                    <Star className="text-white w-7 h-7 fill-white" />
                </div>
                <div>
                    <h1 className="text-xl font-black tracking-tight leading-none">REVIEW</h1>
                    <span className="text-[10px] font-black tracking-[0.3em] text-indigo-400 opacity-80">STUDIO AI</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-10 custom-scrollbar">
                <div>
                    <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6 px-2 opacity-50">Active Widgets</h2>
                    <ul className="space-y-2">
                        {widgets.map(w => (
                            <li key={w.id}>
                                <button
                                    onClick={() => onSelect(w.id)}
                                    className={`w-full text-left px-5 py-4 rounded-2xl transition-all duration-300 flex items-center gap-4 group relative overflow-hidden ${activeId === w.id
                                        ? "bg-indigo-600/10 text-white shadow-[0_0_20px_rgba(99,102,241,0.1)]"
                                        : "text-slate-400 hover:text-white hover:bg-white/5"
                                        } active:scale-[0.97]`}
                                >
                                    <div className={`w-2 h-2 rounded-full transition-all duration-500 ${activeId === w.id ? 'bg-indigo-500 scale-125 shadow-[0_0_10px_rgba(99,102,241,0.8)]' : 'bg-slate-700'}`} />
                                    <div className="flex-1 min-w-0 z-10">
                                        <div className="font-extrabold text-[15px] truncate tracking-tight">{w.businessName || w.title || "Untitled Widget"}</div>
                                    </div>
                                    {activeId === w.id && (
                                        <div className="absolute inset-y-0 left-0 w-1 bg-indigo-500 rounded-full" />
                                    )}
                                </button>
                            </li>
                        ))}
                        {widgets.length === 0 && (
                            <li className="px-6 py-10 text-center bg-white/5 rounded-[32px] border border-dashed border-white/10">
                                <p className="text-slate-500 text-xs font-bold leading-relaxed">READY TO START?<br />Create your first widget below.</p>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            <div className="mt-auto pt-8">
                <button
                    onClick={() => onSelect("")}
                    className="w-full flex items-center justify-center gap-3 px-6 py-5 bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-[24px] hover:bg-slate-100 transition-all transform active:scale-95 shadow-2xl shadow-white/10 group"
                >
                    <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center transition-transform group-hover:rotate-90 duration-500">
                        <Plus className="w-4 h-4 text-white stroke-[4px]" />
                    </div>
                    <span>Create New</span>
                </button>
            </div>
        </div>
    );
}
