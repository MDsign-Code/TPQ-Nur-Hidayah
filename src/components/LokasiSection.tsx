import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Phone, ExternalLink, Compass, ZoomIn, ZoomOut, MessageCircle } from 'lucide-react';
import { ADMIN_WHATSAPP_NUMBER, TPQ_ADDRESS, OPERATIONAL_HOURS } from '../data/mockData';

export const LokasiSection: React.FC = () => {
  const [mapMode, setMapMode] = useState<'jalan' | 'satelit'>('jalan');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedLandmark, setSelectedLandmark] = useState<number | null>(null);

  // Exact Google Maps link using the provided Plus Code and address
  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=HR9M%2B9C6+Kalibaru+Kec+Cilodong+Kota+Depok+Jawa+Barat+16414';

  const landmarks = [
    { nama: 'Grand Depok City (GDC)', jarak: '2.1 km', estimasi: '± 5 menit via Jl. H. Dimun' },
    { nama: 'Pasar Pucung Cilodong', jarak: '1.4 km', estimasi: '± 4 menit' },
    { nama: 'Alun-Alun Kota Depok (GDC)', jarak: '3.2 km', estimasi: '± 8 menit' },
    { nama: 'Stasiun Depok Lama (KRL)', jarak: '4.5 km', estimasi: '± 12 menit' },
  ];

  return (
    <section id="lokasi" className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400 mb-1">
              <span>Informasi Lokasi & Kontak Resmi</span>
              <span aria-hidden="true">·</span>
              <span>Kalibaru, Cilodong, Kota Depok</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Lokasi Interaktif & Kontak TPQ Nur Hidayah
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
              Berada di lokasi strategis Kalibaru, Cilodong. Melayani bimbingan Al-Qur'an Metode Qiroati dengan suasana belajar yang kondusif.
            </p>
          </div>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 rounded-lg shadow-xs transition-colors self-start md:self-auto"
          >
            <Navigation className="w-4 h-4" />
            <span>Petunjuk Arah Google Maps (HR9M+9C6)</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Map Visualizer */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm relative">
            {/* Interactive Map Controls Top Bar */}
            <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
              <div className="pointer-events-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2 shadow-xs">
                <Compass className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold font-mono text-[11px]">HR9M+9C6 · Kalibaru, Cilodong 16414</span>
              </div>

              <div className="pointer-events-auto flex items-center gap-1.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs p-1 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs">
                <button
                  onClick={() => setMapMode('jalan')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                    mapMode === 'jalan'
                      ? 'bg-emerald-700 text-white dark:bg-emerald-600'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                  }`}
                >
                  Peta Jalan
                </button>
                <button
                  onClick={() => setMapMode('satelit')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                    mapMode === 'satelit'
                      ? 'bg-emerald-700 text-white dark:bg-emerald-600'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                  }`}
                >
                  Satelit
                </button>
              </div>
            </div>

            {/* Custom Interactive Stylized Vector & Map Canvas */}
            <div className={`relative h-96 sm:h-[420px] w-full overflow-hidden transition-colors ${
              mapMode === 'jalan' ? 'bg-[#f1f5f0] dark:bg-[#111e18]' : 'bg-[#1b2b20]'
            }`}>
              {/* SVG vector stylized map of Cilodong / Kalibaru Depok */}
              <svg 
                className="w-full h-full"
                viewBox="0 0 600 400" 
                preserveAspectRatio="xMidYMid slice"
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center', transition: 'transform 0.3s ease' }}
              >
                {/* Roads and geographic contours */}
                <path d="M 0,220 Q 200,200 400,240 T 600,230" fill="none" stroke={mapMode === 'jalan' ? '#e2e8f0' : '#22382a'} strokeWidth="28" />
                <path d="M 280,0 Q 290,180 320,400" fill="none" stroke={mapMode === 'jalan' ? '#cbd5e1' : '#2c4735'} strokeWidth="18" />
                <path d="M 100,120 Q 300,150 500,100" fill="none" stroke={mapMode === 'jalan' ? '#e2e8f0' : '#22382a'} strokeWidth="14" />
                <path d="M 180,260 Q 340,280 480,340" fill="none" stroke={mapMode === 'jalan' ? '#e2e8f0' : '#22382a'} strokeWidth="12" />

                {/* Main Arterial Road (Jl. Raya Kalimulya / Cilodong) */}
                <path d="M 40,360 L 560,80" fill="none" stroke={mapMode === 'jalan' ? '#fcd34d' : '#854d0e'} strokeWidth="8" strokeDasharray="6,4" />

                {/* River / Kali Ciliwung Branch */}
                <path d="M 500,0 Q 460,180 520,400" fill="none" stroke={mapMode === 'jalan' ? '#93c5fd' : '#1e3a5f'} strokeWidth="10" />

                {/* Neighborhood Zone Greenery */}
                <rect x="80" y="50" width="140" height="90" rx="8" fill={mapMode === 'jalan' ? '#dcfce7' : '#143823'} opacity="0.6" />
                <rect x="360" y="270" width="180" height="80" rx="8" fill={mapMode === 'jalan' ? '#dcfce7' : '#143823'} opacity="0.6" />

                {/* Street Names */}
                <text x="330" y="90" fontSize="11" fill={mapMode === 'jalan' ? '#64748b' : '#94a3b8'} fontWeight="bold">Kalibaru, Cilodong (16414)</text>
                <text x="120" y="210" fontSize="10" fill={mapMode === 'jalan' ? '#94a3b8' : '#64748b'}>Arah Grand Depok City</text>
                <text x="380" y="360" fontSize="10" fill={mapMode === 'jalan' ? '#94a3b8' : '#64748b'}>Arah Pasar Pucung Cilodong</text>

                {/* TPQ Nur Hidayah Main Pin (Interactive) */}
                <g transform="translate(300, 200)">
                  {/* Pulse circle */}
                  <circle r="22" fill="#059669" opacity="0.25" className="animate-ping" />
                  <circle r="12" fill="#059669" />
                  <circle r="5" fill="#ffffff" />
                  
                  {/* Pin label bubble */}
                  <rect x="-105" y="-58" width="210" height="38" rx="8" fill="#0f172a" />
                  <path d="M -5,-20 L 0,-14 L 5,-20 Z" fill="#0f172a" />
                  <text x="0" y="-40" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                    TPQ Nur Hidayah
                  </text>
                  <text x="0" y="-27" textAnchor="middle" fill="#34d399" fontSize="9" fontFamily="monospace">
                    HR9M+9C6 · Kalibaru Cilodong
                  </text>
                </g>
              </svg>

              {/* Bottom right zoom buttons */}
              <div className="absolute bottom-3 right-3 z-10 flex flex-col gap-1 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs p-1 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs">
                <button
                  onClick={() => setZoomLevel((prev) => Math.min(prev + 0.25, 2))}
                  className="p-1.5 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
                  title="Perbesar"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75))}
                  className="p-1.5 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
                  title="Perkecil"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Address Details, Hours, & WhatsApp */}
          <div className="lg:col-span-5 space-y-6">
            {/* Address & Operational Card */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Alamat Lengkap & Titik Plus Code
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 mt-1 leading-relaxed">
                    {TPQ_ADDRESS}
                  </p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mt-1">
                    Metode Pembelajaran: Metode Qiroati (Membaca Al-Qur'an Tartil Langsung)
                  </p>
                </div>
              </div>

              {/* Operational Hours */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-start gap-3 text-xs">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white block">
                    Jam Operasional TPQ:
                  </span>
                  <div className="text-slate-700 dark:text-slate-300 space-y-0.5">
                    <p className="font-semibold text-emerald-700 dark:text-emerald-400">
                      • {OPERATIONAL_HOURS}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400">
                      • Jumat – Ahad: Libur KBM Rutin (Kecuali Kegiatan / Munaqasyah Khusus)
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Call & Chat */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Telepon / WhatsApp Resmi:</span>
                  <a
                    href={`https://wa.me/${ADMIN_WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono font-bold text-emerald-700 dark:text-emerald-400 text-sm hover:underline flex items-center gap-1.5 mt-0.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    +62 813-9870-5733
                  </a>
                </div>

                <a
                  href={`https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=Assalamu%27alaikum%20Admin%20TPQ%20Nur%20Hidayah%20Depok`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors shrink-0 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Estimated Distance from Landmarks in Depok */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                Akses & Jarak Tempuh dari Titik Terdekat di Depok
              </h3>

              <div className="space-y-2.5">
                {landmarks.map((lm, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedLandmark(selectedLandmark === idx ? null : idx)}
                    className="w-full text-left p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 bg-slate-50/50 dark:bg-slate-950/40 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{lm.nama}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{lm.estimasi}</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded">
                      {lm.jarak}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
