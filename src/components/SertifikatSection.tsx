import React, { useState } from 'react';
import { SertifikatItem } from '../types';
import { Award, Search, CheckCircle, Printer, Copy, Check, ShieldCheck, Download, AlertCircle } from 'lucide-react';

interface SertifikatSectionProps {
  sertifikatList: SertifikatItem[];
}

export const SertifikatSection: React.FC<SertifikatSectionProps> = ({ sertifikatList }) => {
  const [searchInput, setSearchInput] = useState('');
  const [activeCert, setActiveCert] = useState<SertifikatItem | null>(sertifikatList[0] || null);
  const [notFound, setNotFound] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setNotFound(false);
    const query = searchInput.trim().toLowerCase();
    if (!query) return;

    const found = sertifikatList.find(
      (cert) =>
        cert.nomorSertifikat.toLowerCase() === query ||
        cert.nomorIndukSantri.toLowerCase() === query ||
        cert.namaSantri.toLowerCase().includes(query)
    );

    if (found) {
      setActiveCert(found);
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  };

  const handleSelectSample = (cert: SertifikatItem) => {
    setActiveCert(cert);
    setSearchInput(cert.nomorSertifikat);
    setNotFound(false);
  };

  const handleCopyLink = () => {
    if (activeCert) {
      navigator.clipboard.writeText(`${window.location.origin}/#sertifikat-${activeCert.nomorSertifikat}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <section id="sertifikat" className="py-16 sm:py-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400 mb-2">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>Verifikasi Keaslian & Kelulusan</span>
            <span aria-hidden="true">·</span>
            <span>E-Sertifikat TPQ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Sertifikasi Kelulusan Digital Santri
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
            Setiap santri yang telah lulus munaqasyah Al-Qur'an, khatam Iqro, dan tahfidz berhak memperoleh e-sertifikat resmi ber-barcode verifikasi autentik.
          </p>
        </div>

        {/* Verification Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Ketik No. Sertifikat (NH-2026-001) / NIS / Nama Santri..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 shadow-xs"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 rounded-xl transition-colors shrink-0 shadow-xs"
            >
              Cek Keaslian
            </button>
          </form>

          {/* Quick Search Samples */}
          <div className="mt-2.5 flex items-center gap-2 flex-wrap text-xs text-slate-500 dark:text-slate-400">
            <span>Contoh verifikasi cepat:</span>
            {sertifikatList.map((cert) => (
              <button
                key={cert.id}
                onClick={() => handleSelectSample(cert)}
                className="text-emerald-700 dark:text-emerald-400 font-mono font-semibold underline hover:text-emerald-800 dark:hover:text-emerald-300"
              >
                {cert.nomorSertifikat} ({cert.namaSantri.split(' ')[0]})
              </button>
            ))}
          </div>

          {notFound && (
            <div className="mt-3 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Sertifikat dengan kata kunci tersebut tidak ditemukan dalam pangkalan data resmi TPQ Nur Hidayah.</span>
            </div>
          )}
        </div>

        {/* Certificate Display Area */}
        {activeCert && (
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Status: {activeCert.statusVerifikasi}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Tautan Disalin' : 'Salin Tautan'}</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold transition-colors shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak / Simpan PDF</span>
                </button>
              </div>
            </div>

            {/* Authentic Digital Certificate Layout (Printable) */}
            <div
              id="printable-certificate"
              className="relative p-8 sm:p-12 rounded-2xl bg-amber-50/40 dark:bg-slate-950 border-8 border-double border-emerald-800 dark:border-emerald-600 shadow-xl overflow-hidden text-slate-900 dark:text-white"
            >
              {/* Corner Ornaments */}
              <div className="absolute top-2 left-2 w-10 h-10 border-t-2 border-l-2 border-amber-600 dark:border-amber-400" />
              <div className="absolute top-2 right-2 w-10 h-10 border-t-2 border-r-2 border-amber-600 dark:border-amber-400" />
              <div className="absolute bottom-2 left-2 w-10 h-10 border-b-2 border-l-2 border-amber-600 dark:border-amber-400" />
              <div className="absolute bottom-2 right-2 w-10 h-10 border-b-2 border-r-2 border-amber-600 dark:border-amber-400" />

              {/* Watermark Logo/Text */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.05] pointer-events-none select-none">
                <span className="font-arabic text-9xl">الله</span>
              </div>

              {/* Certificate Header */}
              <div className="text-center space-y-2 pb-6 border-b-2 border-emerald-800/30 dark:border-emerald-500/30 relative">
                <p className="font-arabic text-2xl text-emerald-800 dark:text-emerald-400">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
                <div className="space-y-0.5">
                  <h3 className="text-xs sm:text-sm font-bold tracking-widest uppercase text-emerald-800 dark:text-emerald-400">
                    TAMAN PENDIDIKAN AL-QUR'AN (TPQ) NUR HIDAYAH
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    HR9M+9C6, Kalibaru, Kec. Cilodong, Kota Depok, Jawa Barat 16414
                  </p>
                </div>

                <div className="pt-3">
                  <h2 className="text-xl sm:text-3xl font-extrabold tracking-wide uppercase text-slate-900 dark:text-white font-serif">
                    SYAHADAH / SERTIFIKAT KELULUSAN
                  </h2>
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                    Nomor: {activeCert.nomorSertifikat} · NIS: {activeCert.nomorIndukSantri}
                  </p>
                </div>
              </div>

              {/* Certificate Body */}
              <div className="text-center py-8 space-y-5 relative">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  Dewan Penguji & Pimpinan TPQ Nur Hidayah menerangkan bahwa santri:
                </p>

                <div className="py-2">
                  <p className="text-2xl sm:text-3xl font-extrabold text-emerald-800 dark:text-emerald-400 font-serif tracking-tight border-b-2 border-dashed border-slate-300 dark:border-slate-700 inline-block px-8 pb-1">
                    {activeCert.namaSantri}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
                  Telah mengikuti dan dinyatakan <strong className="text-slate-900 dark:text-white uppercase font-bold">LULUS</strong> dalam Munaqasyah evaluasi pembelajaran Al-Qur'an program:
                </p>

                <div className="bg-emerald-50/80 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 p-3.5 rounded-xl max-w-lg mx-auto">
                  <p className="text-base sm:text-lg font-bold text-emerald-900 dark:text-emerald-300">
                    {activeCert.programLulus}
                  </p>
                  <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mt-1">
                    Predikat: {activeCert.predikat}
                  </p>
                </div>

                <p className="text-xs italic text-slate-500 dark:text-slate-400 max-w-lg mx-auto pt-1">
                  "{activeCert.catatanPrestasi}"
                </p>
              </div>

              {/* Certificate Footer: Signatures & QR Code */}
              <div className="pt-6 border-t-2 border-emerald-800/30 dark:border-emerald-500/30 grid grid-cols-3 gap-4 items-center text-center text-xs relative">
                {/* Left: Penguji */}
                <div className="space-y-12">
                  <p className="text-slate-500 dark:text-slate-400">Penguji Munaqisy,</p>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white underline">{activeCert.penguji}</p>
                    <p className="text-[10px] text-slate-500">Dewan Penguji TPQ</p>
                  </div>
                </div>

                {/* Center: Official Seal & QR Code */}
                <div className="flex flex-col items-center justify-center space-y-1.5">
                  <div className="w-18 h-18 p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs flex items-center justify-center">
                    {/* SVG Vector QR Code representation */}
                    <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900 dark:text-white fill-current">
                      <rect x="10" y="10" width="25" height="25" />
                      <rect x="15" y="15" width="15" height="15" fill="white" />
                      <rect x="18" y="18" width="9" height="9" />
                      <rect x="65" y="10" width="25" height="25" />
                      <rect x="70" y="15" width="15" height="15" fill="white" />
                      <rect x="73" y="18" width="9" height="9" />
                      <rect x="10" y="65" width="25" height="25" />
                      <rect x="15" y="70" width="15" height="15" fill="white" />
                      <rect x="18" y="73" width="9" height="9" />
                      <rect x="42" y="20" width="8" height="8" />
                      <rect x="52" y="35" width="12" height="8" />
                      <rect x="45" y="50" width="10" height="10" />
                      <rect x="65" y="60" width="15" height="8" />
                      <rect x="75" y="75" width="12" height="12" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                    VERIFIED · DEPOK
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Depok, {activeCert.tanggalKelulusan}
                  </span>
                </div>

                {/* Right: Direktur TPQ */}
                <div className="space-y-12">
                  <p className="text-slate-500 dark:text-slate-400">Pimpinan TPQ Nur Hidayah,</p>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white underline">{activeCert.direkturTPQ}</p>
                    <p className="text-[10px] text-slate-500">Direktur Pendidikan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
