import React, { useState } from 'react';
import { GaleriItem } from '../types';
import { X, Calendar, ZoomIn, Instagram, Tag } from 'lucide-react';

interface GaleriSectionProps {
  galeriList: GaleriItem[];
}

export const GaleriSection: React.FC<GaleriSectionProps> = ({ galeriList }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activeItem, setActiveItem] = useState<GaleriItem | null>(null);

  const categories = ['Semua', 'Belajar Mengaji', 'Wisuda Tahfidz', 'Rihlah & Outdoor', 'PHBI & Santunan'];

  const filteredItems = galeriList.filter(
    (item) => selectedCategory === 'Semua' || item.kategori === selectedCategory
  );

  return (
    <section id="galeri" className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400 mb-1">
              <span>Dokumentasi Belajar & Ukhuwah</span>
              <span aria-hidden="true">·</span>
              <span>TPQ Nur Hidayah</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Galeri Kegiatan Belajar Santri
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
              Potret keceriaan, kesungguhan belajar Al-Qur'an, wisuda tahfidz, serta kebersamaan santri dalam berbagai kegiatan positif.
            </p>
          </div>

          <a
            href="https://www.instagram.com/tpqnurhidayah_depok/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-pink-700 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-900/60 rounded-lg hover:bg-pink-100 transition-colors self-start md:self-auto"
          >
            <Instagram className="w-4 h-4 text-pink-600" />
            <span>Lihat Dokumentasi Lengkap di Instagram</span>
          </a>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white dark:bg-emerald-600'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group cursor-pointer bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              {/* Photo */}
              <div className="relative aspect-4/3 overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={item.imageUrl}
                  alt={item.judul}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to stylized SVG placeholder if external image fails
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2 rounded-full bg-white/90 text-slate-900 shadow-sm">
                    <ZoomIn className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mb-1.5">
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">{item.kategori}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.tanggal}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {item.judul}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
                    {item.deskripsi}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative max-w-3xl w-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-slate-900/60 text-white hover:bg-slate-900"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-16/10 bg-black flex items-center justify-center">
              <img
                src={activeItem.imageUrl}
                alt={activeItem.judul}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                <span className="font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  {activeItem.kategori}
                </span>
                <span aria-hidden="true">·</span>
                <span>{activeItem.tanggal}</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {activeItem.judul}
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                {activeItem.deskripsi}
              </p>

              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">TPQ Nur Hidayah · Kalibaru, Cilodong, Depok</span>
                <a
                  href="https://www.instagram.com/tpqnurhidayah_depok/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-600 dark:text-pink-400 hover:underline"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Buka di Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
