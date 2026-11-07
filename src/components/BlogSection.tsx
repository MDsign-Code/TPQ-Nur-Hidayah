import React, { useState } from 'react';
import { BeritaItem } from '../types';
import { Newspaper, Calendar, Clock, User, ArrowRight, X, Search, Share2, Check } from 'lucide-react';

interface BlogSectionProps {
  beritaList: BeritaItem[];
}

export const BlogSection: React.FC<BlogSectionProps> = ({ beritaList }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKategori, setSelectedKategori] = useState<string>('Semua');
  const [readingArticle, setReadingArticle] = useState<BeritaItem | null>(null);
  const [shared, setShared] = useState(false);

  const categories = ['Semua', 'Agenda Bulanan', 'Prestasi Santri', 'Kajian & Dakwah', 'Info Kurikulum'];

  const filteredBerita = beritaList.filter((item) => {
    const matchesCategory = selectedKategori === 'Semua' || item.kategori === selectedKategori;
    const matchesSearch = item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.ringkasan.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleShare = (article: BeritaItem) => {
    navigator.clipboard.writeText(`${window.location.origin}#blog-${article.id}`);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  return (
    <section id="blog" className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400 mb-1">
              <span>Warta & Berita Kegiatan Bulanan</span>
              <span aria-hidden="true">·</span>
              <span>Kabar TPQ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Kabar & Berita Kegiatan TPQ Nur Hidayah
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
              Informasi terkini mengenai agenda evaluasi berkala, agenda bulanan santri, artikel parenting islami, dan prestasi munaqasyah.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari berita & agenda..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedKategori(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 ${
                selectedKategori === cat
                  ? 'bg-emerald-700 text-white dark:bg-emerald-600'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Grid */}
        {filteredBerita.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">Tidak ada berita yang sesuai dengan pencarian Anda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBerita.map((item) => (
              <article
                key={item.id}
                className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-700 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Article Thumbnail */}
                  {item.imageUrl && (
                    <div className="relative aspect-16/9 overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <img
                        src={item.imageUrl}
                        alt={item.judul}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                  <div className="p-5">
                    {/* Clean unboxed metadata with dot separators */}
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mb-2">
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400">{item.kategori}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.tanggal}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.bacaMenit} mnt
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                      {item.judul}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                      {item.ringkasan}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate max-w-[130px]">{item.penulis}</span>
                  </div>

                  <button
                    onClick={() => setReadingArticle(item)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Reading Full Article Modal */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">{readingArticle.kategori}</span>
                <span aria-hidden="true">·</span>
                <span>{readingArticle.tanggal}</span>
                <span aria-hidden="true">·</span>
                <span>Oleh {readingArticle.penulis}</span>
              </div>
              <button
                onClick={() => setReadingArticle(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 max-h-[75vh] overflow-y-auto space-y-4">
              {readingArticle.imageUrl && (
                <div className="rounded-xl overflow-hidden aspect-16/9 bg-slate-100 dark:bg-slate-800 mb-4">
                  <img
                    src={readingArticle.imageUrl}
                    alt={readingArticle.judul}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                {readingArticle.judul}
              </h2>

              <div className="space-y-3 pt-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {readingArticle.kontenLengkap.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between">
              <button
                onClick={() => handleShare(readingArticle)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {shared ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                <span>{shared ? 'Tautan Disalin!' : 'Bagikan Berita'}</span>
              </button>

              <button
                onClick={() => setReadingArticle(null)}
                className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
