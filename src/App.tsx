import React, { useState, useEffect } from 'react';
import { 
  Santri, 
  JadwalPelajaran, 
  Pengajar, 
  GaleriItem, 
  BeritaItem, 
  SertifikatItem, 
  NotifikasiItem, 
  StatusSantri 
} from './types';
import { 
  INITIAL_SANTRI, 
  INITIAL_JADWAL, 
  INITIAL_PENGAJAR, 
  INITIAL_GALERI, 
  INITIAL_BERITA, 
  INITIAL_SERTIFIKAT, 
  INITIAL_NOTIFIKASI 
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PsbFormModal } from './components/PsbFormModal';
import { JadwalSection } from './components/JadwalSection';
import { GaleriSection } from './components/GaleriSection';
import { PengajarSection } from './components/PengajarSection';
import { LokasiSection } from './components/LokasiSection';
import { InstagramSection } from './components/InstagramSection';
import { BlogSection } from './components/BlogSection';
import { SertifikatSection } from './components/SertifikatSection';
import { NotificationCenter } from './components/NotificationCenter';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { MessageCircle } from 'lucide-react';
import { generateGeneralInquiryWhatsAppUrl } from './utils/whatsapp';

export default function App() {
  // 1. Dark Mode State
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('tpq_theme');
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('tpq_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('tpq_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // 2. Persistent State for Santri, Berita, Sertifikat, and Notifikasi
  const [santriList, setSantriList] = useState<Santri[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tpq_santri_data_v2');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return INITIAL_SANTRI;
        }
      }
    }
    return INITIAL_SANTRI;
  });

  useEffect(() => {
    localStorage.setItem('tpq_santri_data_v2', JSON.stringify(santriList));
  }, [santriList]);

  const [sertifikatList, setSertifikatList] = useState<SertifikatItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tpq_sertifikat_data_v2');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return INITIAL_SERTIFIKAT;
        }
      }
    }
    return INITIAL_SERTIFIKAT;
  });

  useEffect(() => {
    localStorage.setItem('tpq_sertifikat_data_v2', JSON.stringify(sertifikatList));
  }, [sertifikatList]);

  const [notifikasiList, setNotifikasiList] = useState<NotifikasiItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tpq_notifikasi_data_v2');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return INITIAL_NOTIFIKASI;
        }
      }
    }
    return INITIAL_NOTIFIKASI;
  });

  useEffect(() => {
    localStorage.setItem('tpq_notifikasi_data_v2', JSON.stringify(notifikasiList));
  }, [notifikasiList]);

  const [jadwalList] = useState<JadwalPelajaran[]>(INITIAL_JADWAL);
  const [pengajarList] = useState<Pengajar[]>(INITIAL_PENGAJAR);
  const [galeriList] = useState<GaleriItem[]>(INITIAL_GALERI);
  const [beritaList] = useState<BeritaItem[]>(INITIAL_BERITA);

  // 3. Modals and Interactive Panels State
  const [isPsbModalOpen, setIsPsbModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 4. Handlers
  const handleRegisterSantriSuccess = (newSantri: Santri) => {
    setSantriList((prev) => [newSantri, ...prev]);
    // Also push a notification
    const newNotif: NotifikasiItem = {
      id: `notif-${Date.now()}`,
      judul: 'Pendaftaran Baru Diterima',
      pesan: `Santri baru ${newSantri.namaLengkap} (${newSantri.registrationNumber}) berhasil mendaftar untuk program ${newSantri.program}.`,
      kategori: 'PSB',
      tanggal: 'Hari ini',
      sudahDibaca: false
    };
    setNotifikasiList((prev) => [newNotif, ...prev]);
    showToast(`Pendaftaran ${newSantri.namaLengkap} berhasil disimpan!`);
  };

  const handleUpdateSantriStatus = (id: string, newStatus: StatusSantri) => {
    setSantriList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
    showToast(`Status santri diperbarui menjadi ${newStatus}`);
  };

  const handleAddSantriManual = (santri: Santri) => {
    setSantriList((prev) => [santri, ...prev]);
    showToast(`Santri ${santri.namaLengkap} ditambahkan`);
  };

  const handleDeleteSantri = (id: string) => {
    setSantriList((prev) => prev.filter((s) => s.id !== id));
    showToast('Data santri berhasil dihapus');
  };

  const handleIssueCertificate = (newCert: SertifikatItem) => {
    setSertifikatList((prev) => [newCert, ...prev]);
    // Also dispatch notification
    const newNotif: NotifikasiItem = {
      id: `notif-${Date.now()}`,
      judul: 'Sertifikat Kelulusan Baru Diterbitkan',
      pesan: `E-Sertifikat resmi untuk ananda ${newCert.namaSantri} (${newCert.nomorSertifikat}) telah dapat dicek online.`,
      kategori: 'Pengumuman',
      tanggal: 'Hari ini',
      sudahDibaca: false,
      linkAksi: '#sertifikat'
    };
    setNotifikasiList((prev) => [newNotif, ...prev]);
    showToast(`E-Sertifikat ${newCert.nomorSertifikat} berhasil diterbitkan!`);
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifikasiList((prev) => prev.map((n) => ({ ...n, sudahDibaca: true })));
    showToast('Semua notifikasi telah ditandai dibaca');
  };

  const handleSendTestNotification = (
    judul: string,
    pesan: string,
    kategori: 'Penting' | 'Pengumuman' | 'Libur' | 'PSB'
  ) => {
    const newNotif: NotifikasiItem = {
      id: `notif-${Date.now()}`,
      judul,
      pesan,
      kategori,
      tanggal: 'Baru saja',
      sudahDibaca: false
    };
    setNotifikasiList((prev) => [newNotif, ...prev]);
    showToast(`Pengumuman "${judul}" berhasil disiarkan!`);
  };

  const unreadNotificationsCount = notifikasiList.filter((n) => !n.sudahDibaca).length;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors selection:bg-emerald-500 selection:text-white">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white dark:bg-emerald-600 px-4 py-2 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        unreadNotificationsCount={unreadNotificationsCount}
        onOpenNotifications={() => setIsNotificationOpen(true)}
        onOpenPsbModal={() => setIsPsbModalOpen(true)}
        isAdminMode={isAdminModalOpen}
        onToggleAdminModal={() => setIsAdminModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero onOpenPsbModal={() => setIsPsbModalOpen(true)} />

        {/* 2. Jadwal Mengaji */}
        <JadwalSection
          jadwalList={jadwalList}
          onOpenPsbModal={() => setIsPsbModalOpen(true)}
        />

        {/* 3. Galeri Kegiatan Belajar */}
        <GaleriSection galeriList={galeriList} />

        {/* 4. Profil Pengajar */}
        <PengajarSection pengajarList={pengajarList} />

        {/* 5. Instagram Preview Feed */}
        <InstagramSection />

        {/* 6. Blog / Berita Kegiatan Bulanan */}
        <BlogSection beritaList={beritaList} />

        {/* 7. Sertifikasi Kelulusan Digital */}
        <SertifikatSection sertifikatList={sertifikatList} />

        {/* 8. Lokasi Interaktif */}
        <LokasiSection />
      </main>

      {/* Quiet Footer */}
      <Footer
        onOpenPsbModal={() => setIsPsbModalOpen(true)}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
      />

      {/* Floating WhatsApp Fast Consultation Button */}
      <a
        href={generateGeneralInquiryWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 group text-xs font-semibold"
        title="Konsultasi WhatsApp Admin TPQ"
        aria-label="Konsultasi WhatsApp Admin TPQ"
      >
        <MessageCircle className="w-5 h-5 text-white" />
        <span className="hidden sm:inline">Tanya TPQ</span>
      </a>

      {/* PSB Online Form & WhatsApp Confirmation Modal */}
      <PsbFormModal
        isOpen={isPsbModalOpen}
        onClose={() => setIsPsbModalOpen(false)}
        onRegisterSuccess={handleRegisterSantriSuccess}
      />

      {/* Real-time Admin Panel Modal */}
      <AdminPanel
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        santriList={santriList}
        onUpdateSantriStatus={handleUpdateSantriStatus}
        onAddSantri={handleAddSantriManual}
        onDeleteSantri={handleDeleteSantri}
        onIssueCertificate={handleIssueCertificate}
      />

      {/* Notification Center Tray */}
      <NotificationCenter
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifikasiList={notifikasiList}
        onMarkAllAsRead={handleMarkAllNotificationsAsRead}
        onSendTestNotification={handleSendTestNotification}
      />
    </div>
  );
}
