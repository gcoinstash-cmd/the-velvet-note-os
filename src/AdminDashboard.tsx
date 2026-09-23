import React, { useState } from 'react';
import { 
  Wine, 
  Users, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight, 
  LogOut, 
  Sparkles, 
  GlassWater,
  Music,
  Lock,
  Search,
  Key,
  Layers,
  Award
} from 'lucide-react';

export interface VIPReservation {
  id: string;
  resCode: string;
  guestName: string;
  tier: 'Patron Private Cellar' | 'Velvet Tier VIP' | 'Listening Room Front Table' | 'Executive Booth';
  table: string;
  partySize: number;
  timeSlot: string;
  spendCommitment: number;
  status: 'Confirmed' | 'Seated' | 'Bottles Pre-Poured' | 'Completed';
  cellarRequest: string;
}

export interface CellarLocker {
  lockerId: string;
  patronName: string;
  tier: 'Founding Member' | 'Black Card Vinyl' | 'Master Sommelier Reserve';
  bottlesStored: number;
  featuredVintage: string;
  annualDues: number;
  status: 'Active' | 'Renewal Due' | 'Restocking';
}

interface AdminDashboardProps {
  onExit: () => void;
}

export default function AdminDashboard({ onExit }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'reservations' | 'cellar' | 'revenue'>('reservations');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const [reservations, setReservations] = useState<VIPReservation[]>([
    {
      id: 'RES-801',
      resCode: 'VN-984210',
      guestName: 'Julian Vance & Associates',
      tier: 'Patron Private Cellar',
      table: 'Vault Booth 01 (Acoustic Center)',
      partySize: 6,
      timeSlot: '8:30 PM (Dinner & Live Quintet)',
      spendCommitment: 2400,
      status: 'Bottles Pre-Poured',
      cellarRequest: '1996 Château Margaux + 1942 Don Julio Flight'
    },
    {
      id: 'RES-802',
      resCode: 'VN-762149',
      guestName: 'Soren K. & Guest',
      tier: 'Listening Room Front Table',
      table: 'Stage Table 04',
      partySize: 2,
      timeSlot: '10:45 PM (Late Midnight Set)',
      spendCommitment: 850,
      status: 'Confirmed',
      cellarRequest: 'Japanese Highball Omotenashi Service + Caviar Tartlet'
    },
    {
      id: 'RES-803',
      resCode: 'VN-552091',
      guestName: 'Elena Rostova Group',
      tier: 'Velvet Tier VIP',
      table: 'Mezzanine Banquette A',
      partySize: 8,
      timeSlot: '8:30 PM (Dinner Seating)',
      spendCommitment: 3800,
      status: 'Seated',
      cellarRequest: 'Dom Pérignon P2 Vintage 2004 (2 Bottles)'
    },
    {
      id: 'RES-804',
      resCode: 'VN-441029',
      guestName: 'Marcus Sterling',
      tier: 'Executive Booth',
      table: 'Rear Mahogany Booth 03',
      partySize: 4,
      timeSlot: '6:00 PM (Early Dinner)',
      spendCommitment: 1200,
      status: 'Completed',
      cellarRequest: 'Reserve Oregon Pinot Noir + Prime Wagyu Striploin'
    }
  ]);

  const [cellarLockers] = useState<CellarLocker[]>([
    {
      lockerId: 'LCK-01',
      patronName: 'Sterling Family Trust',
      tier: 'Founding Member',
      bottlesStored: 18,
      featuredVintage: '1982 Château Lafite Rothschild',
      annualDues: 12000,
      status: 'Active'
    },
    {
      lockerId: 'LCK-02',
      patronName: 'Julian Vance',
      tier: 'Master Sommelier Reserve',
      bottlesStored: 24,
      featuredVintage: 'Karuizawa 1981 Single Cask Whisky',
      annualDues: 15000,
      status: 'Active'
    },
    {
      lockerId: 'LCK-03',
      patronName: 'Rostova Capital Holdings',
      tier: 'Black Card Vinyl',
      bottlesStored: 12,
      featuredVintage: '2008 Louis Roederer Cristal Rosé',
      annualDues: 9500,
      status: 'Restocking'
    },
    {
      lockerId: 'LCK-04',
      patronName: 'Dr. Alistair Chen',
      tier: 'Founding Member',
      bottlesStored: 16,
      featuredVintage: '2010 Domaine de la Romanée-Conti',
      annualDues: 18000,
      status: 'Active'
    }
  ]);

  const handleUpdateStatus = (id: string, newStatus: VIPReservation['status']) => {
    setReservations(prev => prev.map(res => res.id === id ? { ...res, status: newStatus } : res));
  };

  const filteredReservations = reservations.filter(res => {
    const matchesSearch = res.guestName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          res.resCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          res.table.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'All' || res.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalCommitted = reservations.reduce((acc, r) => acc + r.spendCommitment, 0);
  const totalLockerDues = cellarLockers.reduce((acc, l) => acc + l.annualDues, 0);

  return (
    <div className="min-h-screen bg-[#070509] text-stone-200 font-sans selection:bg-[#C5A85C]/30 selection:text-[#C5A85C]">
      {/* Top Telemetry HUD */}
      <header className="sticky top-0 z-50 bg-[#0B090E]/95 backdrop-blur-md border-b border-[#C5A85C]/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-[#C5A85C]/10 border border-[#C5A85C]/30 flex items-center justify-center text-[#C5A85C]">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-[0.2em] uppercase font-serif text-white">THE VELVET NOTE</h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#C5A85C]/20 text-[#C5A85C] border border-[#C5A85C]/30 font-bold">
                  SOMMELIER & VIP MAÎTRE D'
                </span>
              </div>
              <p className="text-xs text-stone-400 font-mono">Cellar Lockers & High-Table Acoustic Orchestration OS</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded bg-black/60 border border-stone-800 text-xs font-mono text-stone-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>PASSCODE: <strong className="text-[#C5A85C]">velvet2026</strong></span>
            </div>
            <button
              onClick={onExit}
              className="flex items-center gap-2 px-4 py-2 rounded-sm border border-stone-700 bg-stone-900/60 hover:bg-[#C5A85C] hover:text-black hover:border-[#C5A85C] text-xs font-mono tracking-wider transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span>RETURN TO GUEST EXPERIENCE</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-sm bg-[#0E0C12] border border-stone-800 relative overflow-hidden">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">Tonight's VIP Minimums</span>
              <DollarSign className="w-4 h-4 text-[#C5A85C]" />
            </div>
            <div className="text-2xl font-bold font-mono text-white">${totalCommitted.toLocaleString()}</div>
            <div className="text-[11px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>+34% vs prior evening</span>
            </div>
          </div>

          <div className="p-5 rounded-sm bg-[#0E0C12] border border-stone-800 relative overflow-hidden">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">Private Cellar Dues</span>
              <Wine className="w-4 h-4 text-[#C5A85C]" />
            </div>
            <div className="text-2xl font-bold font-mono text-[#C5A85C]">${totalLockerDues.toLocaleString()}<span className="text-xs text-stone-400 font-normal">/yr</span></div>
            <div className="text-[11px] font-mono text-stone-400 mt-1">4 of 4 VIP Lockers Sealed</div>
          </div>

          <div className="p-5 rounded-sm bg-[#0E0C12] border border-stone-800 relative overflow-hidden">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">Acoustic Stage Tables</span>
              <Music className="w-4 h-4 text-[#C5A85C]" />
            </div>
            <div className="text-2xl font-bold font-mono text-white">100%</div>
            <div className="text-[11px] font-mono text-amber-400 mt-1">Sold out for late quintet session</div>
          </div>

          <div className="p-5 rounded-sm bg-[#0E0C12] border border-stone-800 relative overflow-hidden">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">Maître D' Security</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-emerald-400">ACTIVE</div>
            <div className="text-[11px] font-mono text-stone-400 mt-1">RLS Protected · Supabase 2.4</div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 border-b border-stone-800 mb-6 font-mono text-xs">
          <button
            onClick={() => setActiveTab('reservations')}
            className={`px-4 py-2.5 border-b-2 font-bold transition-colors ${
              activeTab === 'reservations'
                ? 'border-[#C5A85C] text-[#C5A85C]'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            TONIGHT'S VIP MANIFEST ({reservations.length})
          </button>
          <button
            onClick={() => setActiveTab('cellar')}
            className={`px-4 py-2.5 border-b-2 font-bold transition-colors ${
              activeTab === 'cellar'
                ? 'border-[#C5A85C] text-[#C5A85C]'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            PATRON CELLAR LOCKERS ({cellarLockers.length})
          </button>
          <button
            onClick={() => setActiveTab('revenue')}
            className={`px-4 py-2.5 border-b-2 font-bold transition-colors ${
              activeTab === 'revenue'
                ? 'border-[#C5A85C] text-[#C5A85C]'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            SOMMELIER REVENUE LEDGER
          </button>
        </div>

        {/* Tab 1: VIP Reservations */}
        {activeTab === 'reservations' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0E0C12] p-4 rounded-sm border border-stone-800 font-mono text-xs">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-500" />
                <input
                  type="text"
                  placeholder="Search guest, code, or table..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-black/60 border border-stone-700 rounded-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#C5A85C]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-stone-500 uppercase">Filter:</span>
                {['All', 'Bottles Pre-Poured', 'Confirmed', 'Seated', 'Completed'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className={`px-2.5 py-1 rounded text-[11px] border ${
                      filterStatus === s
                        ? 'border-[#C5A85C] bg-[#C5A85C]/10 text-[#C5A85C]'
                        : 'border-stone-800 text-stone-400 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto rounded-sm border border-stone-800 bg-[#0E0C12]">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-black/60 text-stone-400 border-b border-stone-800 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Pass & Code</th>
                    <th className="py-3 px-4">Guest & Tier</th>
                    <th className="py-3 px-4">Table & Seating</th>
                    <th className="py-3 px-4">Vintage / Cellar Request</th>
                    <th className="py-3 px-4">Minimum</th>
                    <th className="py-3 px-4">Status & Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60">
                  {filteredReservations.map((res) => (
                    <tr key={res.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-bold text-[#C5A85C]">{res.resCode}</div>
                        <div className="text-[10px] text-stone-500">{res.id}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-white">{res.guestName}</div>
                        <div className="text-[10px] text-stone-400">{res.tier} · Party of {res.partySize}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-stone-200">{res.table}</div>
                        <div className="text-[10px] text-stone-500">{res.timeSlot}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-stone-300 text-[11px] max-w-xs">{res.cellarRequest}</div>
                      </td>
                      <td className="py-3 px-4 font-bold text-white">
                        ${res.spendCommitment.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            res.status === 'Bottles Pre-Poured' ? 'bg-purple-900/40 text-purple-300 border border-purple-800' :
                            res.status === 'Confirmed' ? 'bg-amber-900/40 text-amber-300 border border-amber-800' :
                            res.status === 'Seated' ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-800' :
                            'bg-stone-800 text-stone-400'
                          }`}>
                            {res.status}
                          </span>
                          <select
                            value={res.status}
                            onChange={(e) => handleUpdateStatus(res.id, e.target.value as VIPReservation['status'])}
                            className="bg-black border border-stone-700 text-stone-300 rounded px-1.5 py-0.5 text-[10px] focus:outline-none focus:border-[#C5A85C]"
                          >
                            <option value="Confirmed">Mark Confirmed</option>
                            <option value="Bottles Pre-Poured">Pre-Pour Bottles</option>
                            <option value="Seated">Seat Guest</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Patron Cellar Lockers */}
        {activeTab === 'cellar' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cellarLockers.map((locker) => (
              <div key={locker.lockerId} className="p-6 rounded-sm bg-[#0E0C12] border border-stone-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-[#C5A85C]" />
                      <span className="font-mono font-bold text-white text-sm">{locker.lockerId}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-[#C5A85C] border border-[#C5A85C]/30">
                        {locker.tier}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
                      {locker.status}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-white mb-1">{locker.patronName}</h3>
                  <div className="font-mono text-xs text-stone-400 mb-4">
                    Bottles in vault: <strong className="text-white">{locker.bottlesStored} bottles</strong>
                  </div>

                  <div className="p-3 bg-black/50 border border-stone-800/80 rounded-sm mb-4 font-mono text-xs">
                    <div className="text-[10px] text-stone-500 uppercase tracking-wider mb-1">Featured Reserve Vintage:</div>
                    <div className="text-[#C5A85C] font-semibold">{locker.featuredVintage}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-stone-800/80 font-mono text-xs">
                  <div>
                    <span className="text-stone-500">Annual Locker Dues: </span>
                    <strong className="text-white">${locker.annualDues.toLocaleString()}/yr</strong>
                  </div>
                  <button className="text-[11px] text-[#C5A85C] hover:underline flex items-center gap-1 font-bold">
                    <span>Manage Cellar</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Sommelier Revenue Ledger */}
        {activeTab === 'revenue' && (
          <div className="space-y-6">
            <div className="p-6 rounded-sm bg-[#0E0C12] border border-stone-800 font-mono">
              <h3 className="text-base font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#C5A85C]" />
                <span>30-Day Turnkey Performance Architecture</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-black/60 rounded border border-stone-800">
                  <div className="text-stone-500 mb-1">Cover & Table Revenue</div>
                  <div className="text-2xl font-bold text-white">$64,800</div>
                  <div className="text-stone-400 text-[11px] mt-1">28 nights @ 98% occupancy</div>
                </div>
                <div className="p-4 bg-black/60 rounded border border-stone-800">
                  <div className="text-stone-500 mb-1">Cellar Bottle Locker Dues</div>
                  <div className="text-2xl font-bold text-[#C5A85C]">$54,500</div>
                  <div className="text-stone-400 text-[11px] mt-1">4 corporate private vaults</div>
                </div>
                <div className="p-4 bg-black/60 rounded border border-stone-800">
                  <div className="text-stone-500 mb-1">Craft Cocktail Flights</div>
                  <div className="text-2xl font-bold text-emerald-400">$38,200</div>
                  <div className="text-stone-400 text-[11px] mt-1">Average $165 ticket size</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-sm bg-[#0E0C12] border border-[#C5A85C]/20 font-mono text-xs">
              <div className="flex items-center gap-2 text-[#C5A85C] font-bold text-sm uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Turnkey Commercial Acquisition Note</span>
              </div>
              <p className="text-stone-300 leading-relaxed">
                The Velvet Note is engineered as an ultra-luxury hospitality management portal combining guest-facing reservations with sommelier inventory controls, live jazz ticket tiers, and private bottle locker accounting. Ready for immediate whitelabel deployment or direct venue acquisition.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
