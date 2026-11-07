import React, { useState, useEffect } from 'react';
import { NotifikasiItem } from '../types';
import { Bell, X, CheckCheck, Send, ShieldAlert, Sparkles, Volume2, Info, Calendar } from 'lucide-react';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifikasiList: NotifikasiItem[];
  onMarkAllAsRead: () => void;
  onSendTestNotification: (judul: string, pesan: string, kategori: 'Penting' | 'Pengumuman' | 'Libur' | 'PSB') => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  notifikasiList,
  onMarkAllAsRead,
  onSendTestNotification
}) => {
  const [filter, setFilter] = useState<string>('Semua');
  const [pushSupported, setPushSupported] = useState(false);
  const [permissionState, setPermissionState] = useState<NotificationPermission>('default');
  const [showSimulateForm, setShowSimulateForm] = useState(false);
  const [simJudul, setSimJudul] = useState('Ujian Kenaikan Jilid Pekan Depan');
  const [simPesan, setSimPesan] = useState('Diberitahukan kepada seluruh santri Iqro 1-6 untuk mempersiapkan muraja\'ah.');
  const [simKategori, setSimKategori] = useState<'Penting' | 'Pengumuman' | 'Libur' | 'PSB'>('Penting');

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPushSupported(true);
      setPermissionState(Notification.permission);
    }
  }, []);

  if (!isOpen) return null;

  const requestPushPermission = async () => {
    if ('Notification' in window) {
      try {
        const perm = await Notification.requestPermission();
        setPermissionState(perm);
        if (perm === 'granted') {
          new Notification('TPQ Nur Hidayah Depok', {
            body: 'Notifikasi push berhasil diaktifkan! Anda akan menerima update pengumuman penting.',
            icon: '/src/assets/images/hero_tpq_nur_hidayah_1794034686887.jpg'
          });
        }
      } catch {
        // Fallback gracefully for iframe restrictions
      }
    }
  };

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simJudul.trim() || !simPesan.trim()) return;

    onSendTestNotification(simJudul.trim(), simPesan.trim(), simKategori);

    // If native notification granted, dispatch browser push
    if (pushSupported && permissionState === 'granted') {
      try {
        new Notification(`[TPQ Nur Hidayah] ${simJudul}`, {
          body: simPesan,
          icon: '/src/assets/images/hero_tpq_nur_hidayah_1794034686887.jpg'
        });
      } catch {
        // Safe catch
      }
    }

    setShowSimulateForm(false);
  };

  const filteredNotif = notifikasiList.filter(
    (n) => filter === 'Semua' || n.kategori === filter
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Pemberitahuan & Pengumuman</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">TPQ Nur Hidayah Kalibaru Cilodong</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Push Notification Permission Box */}
        <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/40 border-b border-emerald-100 dark:border-emerald-900/40">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Sistem Notifikasi Push Aman
              </span>
              <p className="text-[11px] text-emerald-800/80 dark:text-emerald-400">
                {permissionState === 'granted'
                  ? '✓ Notifikasi aktif. Anda akan menerima pembaruan jadwal dan pengumuman mendesak.'
                  : 'Aktifkan notifikasi peramban agar tidak tertinggal info libur atau agenda santri.'}
              </p>
            </div>

            {permissionState !== 'granted' && (
              <button
                onClick={requestPushPermission}
                className="px-3 py-1 text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition-colors shrink-0 shadow-xs"
              >
                Izinkan
              </button>
            )}
          </div>
        </div>

        {/* Filter & Actions Strip */}
        <div className="px-5 py-2.5 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1 overflow-x-auto">
            {['Semua', 'Penting', 'Pengumuman', 'Libur', 'PSB'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  filter === cat
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onMarkAllAsRead}
              className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1"
              title="Tandai semua telah dibaca"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Tandai Baca</span>
            </button>
          </div>
        </div>

        {/* Notification List */}
        <div className="p-4 max-h-[50vh] overflow-y-auto space-y-2.5">
          {filteredNotif.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">
              Tidak ada notifikasi dalam kategori ini.
            </div>
          ) : (
            filteredNotif.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-xl border transition-colors ${
                  item.sudahDibaca
                    ? 'bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800/80 text-slate-600 dark:text-slate-400'
                    : 'bg-emerald-50/40 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60 text-slate-900 dark:text-white'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">
                    {item.kategori}
                  </span>
                  <span className="text-slate-400">{item.tanggal}</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold leading-tight">
                  {item.judul}
                </h4>
                <p className="text-xs mt-1 text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.pesan}
                </p>

                {item.linkAksi && (
                  <a
                    href={item.linkAksi}
                    onClick={onClose}
                    className="inline-block mt-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
                  >
                    Buka Info Terkait →
                  </a>
                )}
              </div>
            ))
          )}
        </div>

        {/* Simulate Broadcast Form toggle */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          {!showSimulateForm ? (
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowSimulateForm(true)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Simulasikan Kirim Notifikasi Pengumuman Baru</span>
              </button>
              <button
                onClick={onClose}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                Tutup
              </button>
            </div>
          ) : (
            <form onSubmit={handleSimulate} className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Kirim Pengumuman Instan</span>
                <button
                  type="button"
                  onClick={() => setShowSimulateForm(false)}
                  className="text-xs text-slate-400 hover:text-slate-600"
                >
                  Batal
                </button>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Judul pengumuman..."
                  value={simJudul}
                  onChange={(e) => setSimJudul(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <textarea
                  rows={2}
                  placeholder="Isi pengumuman singkat..."
                  value={simPesan}
                  onChange={(e) => setSimPesan(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white resize-none"
                  required
                />
              </div>

              <div className="flex items-center justify-between gap-2">
                <select
                  value={simKategori}
                  onChange={(e) => setSimKategori(e.target.value as any)}
                  className="px-2 py-1 text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                >
                  <option value="Penting">Penting</option>
                  <option value="Pengumuman">Pengumuman</option>
                  <option value="Libur">Libur</option>
                  <option value="PSB">PSB</option>
                </select>

                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs"
                >
                  Broadcast Sekarang
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
