import React from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react';

export const InstagramSection: React.FC = () => {
  const instagramUrl = 'https://www.instagram.com/tpqnurhidayah_depok/';

  const posts = [
    {
      id: 'ig-1',
      imageUrl: '/src/assets/images/hero_tpq_nur_hidayah_1794034686887.jpg',
      caption: 'Alhamdulillah, halaqah sore hari ini berjalan lancar. Semangat ananda belajar tajwid & makharijul huruf bersama Ustadzah Siti. Barokallah fiik! ✨📖 #TPQNurHidayah #CilodongDepok #SantriHebat',
      likes: 128,
      comments: 14,
      date: 'Kemarin'
    },
    {
      id: 'ig-2',
      imageUrl: '/src/assets/images/galeri_wisuda_tahfidz_1794034687625.jpg',
      caption: 'Momen penuh haru saat penyerahan mahkota & sertifikat kelulusan munaqasyah Juz 30. Selamat untuk para santri berprestasi! Semoga ilmunya berkah dunia akhirat. 🎓✨ #WisudaSantri #TahfidzDepok',
      likes: 245,
      comments: 32,
      date: '3 hari yang lalu'
    },
    {
      id: 'ig-3',
      imageUrl: '/src/assets/images/galeri_rihlah_santri_1794034688737.jpg',
      caption: 'Rihlah Tadabbur Alam Santri TPQ Nur Hidayah! Belajar adab ukhuwah, game kekompakan, dan tadabbur ayat kauniyah. Senyum santri adalah kebahagiaan kami 🌿🍃 #RihlahSantri #SantriCeria',
      likes: 189,
      comments: 21,
      date: '1 pekan yang lalu'
    },
    {
      id: 'ig-4',
      imageUrl: '/src/assets/images/ustadzah_profile_1794034688370.jpg',
      caption: 'Kutipan inspirasi pekan ini: "Sebaik-baik kalian adalah orang yang belajar Al-Quran dan mengajarkannya." - HR. Bukhari. Mari luangkan waktu mendampingi anak mengaji di rumah 🤲 #QuotesIslami',
      likes: 162,
      comments: 18,
      date: '2 pekan yang lalu'
    }
  ];

  return (
    <section className="py-14 sm:py-18 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Instagram Profile Header Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-pink-50/60 via-purple-50/40 to-emerald-50/60 dark:from-pink-950/20 dark:via-purple-950/20 dark:to-emerald-950/20 border border-pink-100 dark:border-pink-900/40 mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 shrink-0">
              <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden">
                <Instagram className="w-8 h-8 text-pink-600" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">@tpqnurhidayah_depok</h3>
                <span className="text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                  Official
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-md">
                Dokumentasi resmi KBM, informasi agenda bulanan, kegiatan santri, dan mutiara hadits TPQ Nur Hidayah Kalibaru, Cilodong, Depok.
              </p>
            </div>
          </div>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 hover:opacity-95 shadow-md transition-opacity whitespace-nowrap shrink-0"
          >
            <Instagram className="w-4 h-4" />
            <span>Ikuti di Instagram</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </a>
        </div>

        {/* 4-Grid Instagram Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {posts.map((post) => (
            <a
              key={post.id}
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white dark:bg-slate-950 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs hover:border-pink-300 dark:hover:border-pink-800 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={post.imageUrl}
                    alt="Instagram post preview TPQ Nur Hidayah"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white font-bold text-xs">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4 fill-white" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4 fill-white" />
                      {post.comments}
                    </span>
                  </div>
                </div>

                <div className="p-3.5">
                  <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {post.caption}
                  </p>
                </div>
              </div>

              <div className="px-3.5 pb-3 pt-0 flex items-center justify-between text-[11px] text-slate-400">
                <span>{post.date}</span>
                <span className="text-pink-600 dark:text-pink-400 font-semibold group-hover:underline">Buka Postingan</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
