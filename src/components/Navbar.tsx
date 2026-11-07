import React, { useState } from 'react';
import { Moon, Sun, Bell, Menu, X, ShieldCheck, BookOpen, MessageCircle } from 'lucide-react';
import { generateGeneralInquiryWhatsAppUrl } from '../utils/whatsapp';

interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  unreadNotificationsCount: number;
  onOpenNotifications: () => void;
  onOpenPsbModal: () => void;
  isAdminMode: boolean;
  onToggleAdminModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onToggleDarkMode,
  unreadNotificationsCount,
  onOpenNotifications,
  onOpenPsbModal,
  isAdminMode,
  onToggleAdminModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Beranda', href: '#beranda' },
    { label: 'Pendaftaran', href: '#pendaftaran' },
    { label: 'Jadwal', href: '#jadwal' },
    { label: 'Galeri', href: '#galeri' },
    { label: 'Pengajar', href: '#pengajar' },
    { label: 'Blog Kegiatan', href: '#blog' },
    { label: 'Sertifikat', href: '#sertifikat' },
    { label: 'Lokasi', href: '#lokasi' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-16">
          {/* Zone 1: Single Brand Wordmark */}
          <a 
            href="#beranda" 
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-emerald-800 dark:text-emerald-400 whitespace-nowrap shrink-0 group"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-600 dark:bg-emerald-500 text-white flex items-center justify-center shadow-xs">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="leading-tight font-extrabold text-slate-900 dark:text-white">TPQ Nur Hidayah</span>
              <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400">Kalibaru · Cilodong · Depok</span>
            </div>
          </a>

          {/* Zone 2: 4-5+ Clean Single-line Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Notification Bell with Badge */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Pemberitahuan & Pengumuman TPQ"
              aria-label="Pemberitahuan"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center min-w-4.5 h-4.5 px-1 text-[10px] font-bold text-white bg-rose-600 rounded-full">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={darkMode ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
              aria-label="Toggle Mode Gelap"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Admin Portal Toggle Button */}
            <button
              onClick={onToggleAdminModal}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap ${
                isAdminMode 
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700' 
                  : 'text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Panel Manajemen Pengurus & Asatidz"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{isAdminMode ? 'Mode Admin Aktif' : 'Panel Admin'}</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onOpenPsbModal}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0"
            >
              Daftar Santri Baru
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onToggleAdminModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{isAdminMode ? 'Tutup Panel Admin' : 'Buka Panel Admin TPQ'}</span>
            </button>

            <a
              href={generateGeneralInquiryWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Konsultasi WhatsApp Admin</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
