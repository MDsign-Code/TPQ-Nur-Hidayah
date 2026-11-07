import React from 'react';
import { ArrowRight, Calendar, Instagram, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';

interface HeroProps {
  onOpenPsbModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPsbModal }) => {
  return (
    <section id="beranda" className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Subtle geometric Islamic pattern background accent */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Bismillah Header Calligraphy */}
        <div className="text-center mb-6">
          <p className="font-arabic text-2xl sm:text-3xl text-emerald-800/80 dark:text-emerald-400/80 tracking-wide select-none" dir="rtl">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <div className="mt-2 flex items-center justify-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 flex-wrap">
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">TPQ Nur Hidayah</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 font-mono">
              <MapPin className="w-3 h-3 text-emerald-600" />
              HR9M+9C6, Kalibaru, Kec. Cilodong 16414
            </span>
            <span aria-hidden="true">·</span>
            <span>Senin – Kamis (08.00 – 18.00 WIB)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
              <span>Metode Qiroati</span>
              <span aria-hidden="true">·</span>
              <span>Membaca Al-Qur'an Tartil Langsung</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] text-balance">
              Mendidik Generasi Qur'ani Tartil dengan Metode Qiroati di Kota Depok
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              Lembaga pendidikan Al-Qur'an terakreditasi Metode Qiroati, membimbing santri membaca kalam Ilahi secara tepat, cepat, dan tartil langsung tanpa dieja sejak dini. Berlokasi di Kalibaru, Kecamatan Cilodong.
            </p>

            {/* Value badges / Key Guarantees */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-2.5 rounded-lg shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Metode Qiroati Jilid 1-6</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-2.5 rounded-lg shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Asatidz Bersyahadah</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-2.5 rounded-lg shadow-xs col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Syahadah & E-Sertifikat</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenPsbModal}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <span>Daftar Santri Baru (PSB)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#jadwal"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-xl transition-colors shadow-xs"
              >
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>Jadwal Mengaji</span>
              </a>

              <a
                href="https://www.instagram.com/tpqnurhidayah_depok/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-pink-700 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-900/60 hover:bg-pink-100 rounded-xl transition-colors"
                title="Ikuti Instagram TPQ Nur Hidayah Depok"
              >
                <Instagram className="w-4 h-4 text-pink-600" />
                <span>@tpqnurhidayah_depok</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero High-Fidelity Photo Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-900 group">
              <img
                src="/src/assets/images/hero_tpq_nur_hidayah_1794034686887.jpg"
                alt="Suasana santri belajar mengaji di TPQ Nur Hidayah Kalibaru Cilodong"
                className="w-full h-80 sm:h-96 lg:h-[420px] object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback container ensures zero broken image display
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
              {/* Bottom Scrim with Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold mb-1">
                  Keluarga Besar TPQ Nur Hidayah
                </span>
                <p className="text-sm font-medium text-slate-100">
                  Pembinaan halaqah intensif dengan metode ramah anak, melahirkan hafizh dan hafizhah sejak dini.
                </p>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-300 border-t border-white/10 pt-2">
                  <span>Halaqah Sore & Maghrib</span>
                  <span>Kel. Kalibaru, Cilodong</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-KPI Stat Strip Row below Hero Split */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 tabular-nums">140+</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mt-1">Santri Terdaftar</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Iqro, Al-Qur'an & Tahfidz</p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 tabular-nums">8</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mt-1">Asatidz & Asatidzah</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Bersanad & Berpengalaman</p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 tabular-nums">1:12</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mt-1">Rasio Maksimal Halaqah</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Fokus bimbingan individual</p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 tabular-nums">100%</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mt-1">E-Sertifikat Digital</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Terverifikasi QR Code Resmi</p>
          </div>
        </div>
      </div>
    </section>
  );
};
