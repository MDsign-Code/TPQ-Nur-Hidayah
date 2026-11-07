import React from 'react';
import { BookOpen, Instagram, MessageCircle, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { generateGeneralInquiryWhatsAppUrl } from '../utils/whatsapp';

interface FooterProps {
  onOpenPsbModal: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPsbModal, onOpenAdmin }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          {/* Brand and Mission */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">TPQ Nur Hidayah</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Lembaga pendidikan Al-Qur'an terpadu dengan Metode Qiroati di Kalibaru, Cilodong, Kota Depok. Membina generasi saleh, berilmu, dan membaca Al-Qur'an secara tartil langsung dengan pembina bersyahadah resmi.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.instagram.com/tpqnurhidayah_depok/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-pink-900/40 text-slate-300 hover:text-pink-400 flex items-center justify-center transition-colors border border-slate-700"
                title="Instagram @tpqnurhidayah_depok"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={generateGeneralInquiryWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-emerald-900/40 text-slate-300 hover:text-emerald-400 flex items-center justify-center transition-colors border border-slate-700"
                title="Hubungi Admin WhatsApp (+62 813-9870-5733)"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Menu Utama</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li><a href="#beranda" className="hover:text-emerald-400 transition-colors">Beranda</a></li>
              <li><button onClick={onOpenPsbModal} className="hover:text-emerald-400 transition-colors text-left">Pendaftaran Santri (PSB)</button></li>
              <li><a href="#jadwal" className="hover:text-emerald-400 transition-colors">Jadwal Metode Qiroati</a></li>
              <li><a href="#galeri" className="hover:text-emerald-400 transition-colors">Galeri Belajar Santri</a></li>
              <li><a href="#pengajar" className="hover:text-emerald-400 transition-colors">Profil Asatidz & Pembina</a></li>
              <li><a href="#blog" className="hover:text-emerald-400 transition-colors">Warta & Berita Kegiatan</a></li>
              <li><a href="#sertifikat" className="hover:text-emerald-400 transition-colors">Cek Syahadah / Sertifikat</a></li>
            </ul>
          </div>

          {/* Address & Operational Info */}
          <div className="lg:col-span-4 space-y-2.5 text-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Sekretariat & Lokasi</h4>
            <div className="space-y-2 text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>HR9M+9C6, Kalibaru, Kec. Cilodong, Kota Depok, Jawa Barat 16414</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href="https://wa.me/6281398705733" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">
                  +62 813-9870-5733 (WhatsApp Pelayanan)
                </a>
              </p>
              <p className="text-slate-400 pt-0.5">
                <span className="text-emerald-400 font-semibold">Jam Operasional:</span> Senin – Kamis pukul 08.00 – 18.00 WIB
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Login Pengurus & Asatidz TPQ</span>
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} TPQ Nur Hidayah Depok. Seluruh hak cipta dilindungi.</p>
          <div className="flex items-center gap-3">
            <span>Kalibaru · Cilodong · Kota Depok</span>
            <span aria-hidden="true">·</span>
            <a
              href="https://www.instagram.com/tpqnurhidayah_depok/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition-colors"
            >
              @tpqnurhidayah_depok
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
