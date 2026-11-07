import React, { useState } from 'react';
import { Santri, StatusSantri, ProgramType, SesiMengaji, SertifikatItem } from '../types';
import { generateAdminFollowUpUrl } from '../utils/whatsapp';
import { 
  ShieldCheck, 
  Users, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Trash2, 
  CheckCircle, 
  Clock, 
  MessageSquare, 
  X, 
  Award, 
  FileSpreadsheet, 
  Lock, 
  Unlock, 
  ChevronDown,
  Phone,
  Calendar
} from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  santriList: Santri[];
  onUpdateSantriStatus: (id: string, newStatus: StatusSantri) => void;
  onAddSantri: (santri: Santri) => void;
  onDeleteSantri: (id: string) => void;
  onIssueCertificate: (cert: SertifikatItem) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  santriList,
  onUpdateSantriStatus,
  onAddSantri,
  onDeleteSantri,
  onIssueCertificate
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // default true for seamless AI Studio testing with PIN lock option
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Semua');
  const [programFilter, setProgramFilter] = useState<string>('Semua');

  // New Santri manual modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSantriForm, setNewSantriForm] = useState({
    namaLengkap: '',
    namaPanggilan: '',
    usia: 7,
    jenisKelamin: 'Laki-laki' as 'Laki-laki' | 'Perempuan',
    pendidikanFormal: 'SDN Kalibaru',
    namaWali: '',
    nomorWhatsApp: '',
    alamat: 'HR9M+9C6, Kalibaru, Cilodong 16414',
    kelurahan: 'Kalibaru',
    program: 'Metode Qiroati Pemula (Jilid 1-3)' as ProgramType,
    sesi: 'Sesi Sore (15.45 - 17.30 WIB)' as SesiMengaji,
    status: 'Aktif' as StatusSantri
  });

  // Issue certificate modal state
  const [selectedSantriForCert, setSelectedSantriForCert] = useState<Santri | null>(null);
  const [certForm, setCertForm] = useState({
    programLulus: 'Syahadah Kelulusan Metode Qiroati',
    predikat: 'Mumtaz (Istimewa)' as 'Mumtaz (Istimewa)' | 'Jayyid Jiddan (Sangat Baik)' | 'Jayyid (Baik)',
    penguji: 'Ustadz Ahmad Fauzi, Al-Hafizh',
    catatanPrestasi: 'Lulus evaluasi hafalan dan munaqasyah Qiroati dengan tartil sangat fasih.'
  });

  if (!isOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '123456' || pinInput === 'admin') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleExportCSV = () => {
    const headers = [
      'No. Registrasi',
      'Nama Lengkap',
      'Panggilan',
      'Jenis Kelamin',
      'Usia',
      'Program',
      'Sesi Mengaji',
      'Nama Wali',
      'WhatsApp Wali',
      'Kelurahan',
      'Alamat',
      'Status',
      'Tanggal Daftar'
    ];

    const rows = santriList.map((s) => [
      `"${s.registrationNumber}"`,
      `"${s.namaLengkap}"`,
      `"${s.namaPanggilan}"`,
      `"${s.jenisKelamin}"`,
      s.usia,
      `"${s.program}"`,
      `"${s.sesi}"`,
      `"${s.namaWali}"`,
      `"${s.nomorWhatsApp}"`,
      `"${s.kelurahan}"`,
      `"${s.alamat.replace(/"/g, '""')}"`,
      `"${s.status}"`,
      `"${s.tanggalDaftar}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Data_Santri_TPQ_Nur_Hidayah_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveNewSantri = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSantriForm.namaLengkap || !newSantriForm.namaWali) return;

    const newId = `snt-${Date.now()}`;
    const newReg = `REG-TPQ-2026-${Math.floor(100 + Math.random() * 900)}`;

    const santriObj: Santri = {
      id: newId,
      registrationNumber: newReg,
      namaLengkap: newSantriForm.namaLengkap,
      namaPanggilan: newSantriForm.namaPanggilan || newSantriForm.namaLengkap.split(' ')[0],
      tanggalLahir: '2019-01-01',
      jenisKelamin: newSantriForm.jenisKelamin,
      usia: newSantriForm.usia,
      pendidikanFormal: newSantriForm.pendidikanFormal,
      namaWali: newSantriForm.namaWali,
      nomorWhatsApp: newSantriForm.nomorWhatsApp,
      alamat: newSantriForm.alamat,
      kelurahan: newSantriForm.kelurahan,
      program: newSantriForm.program,
      sesi: newSantriForm.sesi,
      status: newSantriForm.status,
      tanggalDaftar: new Date().toISOString().split('T')[0]
    };

    onAddSantri(santriObj);
    setIsAddModalOpen(false);
    setNewSantriForm({
      namaLengkap: '',
      namaPanggilan: '',
      usia: 7,
      jenisKelamin: 'Laki-laki',
      pendidikanFormal: 'SDN Kalibaru',
      namaWali: '',
      nomorWhatsApp: '',
      alamat: 'HR9M+9C6, Kalibaru, Cilodong 16414',
      kelurahan: 'Kalibaru',
      program: 'Metode Qiroati Pemula (Jilid 1-3)',
      sesi: 'Sesi Sore (15.45 - 17.30 WIB)',
      status: 'Aktif'
    });
  };

  const handleIssueCertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSantriForCert) return;

    const certSuffix = Math.floor(100 + Math.random() * 900);
    const newCert: SertifikatItem = {
      id: `cert-${Date.now()}`,
      nomorSertifikat: `NH-2026-${certSuffix}`,
      nomorIndukSantri: `NIS-${Math.floor(2400 + Math.random() * 50)}`,
      namaSantri: selectedSantriForCert.namaLengkap,
      jenisKelamin: selectedSantriForCert.jenisKelamin,
      programLulus: certForm.programLulus,
      predikat: certForm.predikat,
      tanggalKelulusan: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      penguji: certForm.penguji,
      direkturTPQ: 'Ustadzah Siti Rohmah, S.Pd.I',
      catatanPrestasi: certForm.catatanPrestasi,
      statusVerifikasi: 'Valid & Terverifikasi'
    };

    onIssueCertificate(newCert);
    setSelectedSantriForCert(null);
    alert(`Sertifikat Digital berhasil diterbitkan dengan No: ${newCert.nomorSertifikat}`);
  };

  const filteredSantri = santriList.filter((s) => {
    const matchesSearch = 
      s.namaLengkap.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.namaWali.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.alamat.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'Semua' || s.status === statusFilter;
    const matchesProgram = programFilter === 'Semua' || s.program === programFilter;
    return matchesSearch && matchesStatus && matchesProgram;
  });

  const totalSantri = santriList.length;
  const totalMenunggu = santriList.filter((s) => s.status === 'Menunggu Verifikasi').length;
  const totalDiterima = santriList.filter((s) => s.status === 'Diterima').length;
  const totalAktif = santriList.filter((s) => s.status === 'Aktif').length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-6xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-4 flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Panel Manajemen Santri Real-Time
                </h2>
                <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                  Admin TPQ
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Penerimaan Santri Baru, Verifikasi WhatsApp, Status Halaqah & E-Sertifikat
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAuthenticated(!isAuthenticated)}
              className="p-1.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 border border-slate-200 dark:border-slate-800 rounded-lg"
              title="Kunci / Buka Sesi Admin"
            >
              {isAuthenticated ? <Unlock className="w-4 h-4 text-emerald-600" /> : <Lock className="w-4 h-4 text-amber-600" />}
              <span className="hidden sm:inline">{isAuthenticated ? 'Sesi Terbuka' : 'Terkunci'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Tutup Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PIN Authentication Screen (if locked) */}
        {!isAuthenticated ? (
          <div className="p-12 text-center max-w-md mx-auto my-auto space-y-4">
            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Masukkan PIN Akses Pengurus</h3>
            <p className="text-xs text-slate-500">
              Gunakan PIN default: <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono font-bold">123456</code>
            </p>

            <form onSubmit={handlePinSubmit} className="space-y-3">
              <input
                type="password"
                placeholder="Masukkan PIN (123456)..."
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full text-center tracking-widest text-lg font-mono px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950"
                autoFocus
              />
              {pinError && <p className="text-xs text-rose-600">PIN salah. Silakan masukkan 123456.</p>}

              <button
                type="submit"
                className="w-full py-2.5 font-bold text-sm bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow-xs"
              >
                Buka Panel Admin
              </button>
            </form>
          </div>
        ) : (
          /* Main Admin Content */
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Quick Stat Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Pendaftar</span>
                <p className="text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums mt-1">{totalSantri}</p>
              </div>
              <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40">
                <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">Menunggu Verifikasi</span>
                <p className="text-2xl font-extrabold text-amber-700 dark:text-amber-400 tabular-nums mt-1">{totalMenunggu}</p>
              </div>
              <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40">
                <span className="text-xs font-semibold text-blue-700 dark:text-blue-400">Status Diterima</span>
                <p className="text-2xl font-extrabold text-blue-700 dark:text-blue-400 tabular-nums mt-1">{totalDiterima}</p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40">
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Santri Aktif</span>
                <p className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-400 tabular-nums mt-1">{totalAktif}</p>
              </div>
            </div>

            {/* Filter and Actions Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 flex-1">
                {/* Search */}
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Cari santri, no. reg, wali, alamat..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-2.5 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
                >
                  <option value="Semua">Semua Status</option>
                  <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                  <option value="Diterima">Diterima</option>
                  <option value="Aktif">Aktif</option>
                  <option value="Lulus">Lulus</option>
                </select>

                {/* Program Filter */}
                <select
                  value={programFilter}
                  onChange={(e) => setProgramFilter(e.target.value)}
                  className="px-2.5 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
                >
                  <option value="Semua">Semua Program</option>
                  <option value="Metode Qiroati Pemula (Jilid 1-3)">Qiroati Pemula (1-3)</option>
                  <option value="Metode Qiroati Lanjutan (Jilid 4-6)">Qiroati Lanjutan (4-6)</option>
                  <option value="Pasca Qiroati (Ghorib & Tajwid)">Pasca Qiroati (Ghorib)</option>
                  <option value="Tahfidz Juz 30">Tahfidz Juz 30</option>
                  <option value="Fiqih Ibadah & Doa Harian">Fiqih Ibadah</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Unduh Data Format CSV"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  <span>Ekspor CSV</span>
                </button>

                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white transition-colors shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Santri</span>
                </button>
              </div>
            </div>

            {/* Real-time Santri Table */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-950">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                      <th className="py-3 px-4">No. Registrasi</th>
                      <th className="py-3 px-4">Nama Santri</th>
                      <th className="py-3 px-4">Program & Sesi</th>
                      <th className="py-3 px-4">Orang Tua / Kontak</th>
                      <th className="py-3 px-4">Alamat Domisili</th>
                      <th className="py-3 px-4">Status Halaqah</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                    {filteredSantri.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-400">
                          Tidak ada data santri yang cocok.
                        </td>
                      </tr>
                    ) : (
                      filteredSantri.map((santri) => (
                        <tr key={santri.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                            {santri.registrationNumber}
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-bold text-slate-900 dark:text-white">{santri.namaLengkap}</p>
                            <p className="text-[11px] text-slate-400">
                              {santri.jenisKelamin} · {santri.usia} Thn · {santri.pendidikanFormal}
                            </p>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-semibold text-emerald-800 dark:text-emerald-400 block">{santri.program}</span>
                            <span className="text-[11px] text-slate-500">{santri.sesi}</span>
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-medium text-slate-900 dark:text-white">{santri.namaWali}</p>
                            <a
                              href={`https://wa.me/${santri.nomorWhatsApp.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 mt-0.5"
                            >
                              <Phone className="w-3 h-3" />
                              {santri.nomorWhatsApp}
                            </a>
                          </td>
                          <td className="py-3 px-4 text-slate-600 dark:text-slate-300 max-w-[180px] truncate" title={santri.alamat}>
                            <p className="truncate">{santri.alamat}</p>
                            <span className="text-[10px] text-slate-400">Kel. {santri.kelurahan}</span>
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={santri.status}
                              onChange={(e) => onUpdateSantriStatus(santri.id, e.target.value as StatusSantri)}
                              className={`px-2 py-1 text-[11px] font-semibold rounded-md border ${
                                santri.status === 'Aktif'
                                  ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                                  : santri.status === 'Menunggu Verifikasi'
                                  ? 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                                  : santri.status === 'Diterima'
                                  ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                                  : 'bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
                              }`}
                            >
                              <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                              <option value="Diterima">Diterima</option>
                              <option value="Aktif">Aktif</option>
                              <option value="Lulus">Lulus</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* WhatsApp Direct follow-up button */}
                              <a
                                href={generateAdminFollowUpUrl(santri)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950"
                                title="Kirim Pesan WhatsApp Follow-up ke Wali Santri"
                              >
                                <MessageSquare className="w-4 h-4" />
                              </a>

                              {/* Issue Digital Certificate */}
                              <button
                                onClick={() => {
                                  setSelectedSantriForCert(santri);
                                  setCertForm({
                                    programLulus: santri.program === 'Metode Qiroati Pemula (Jilid 1-3)' ? 'Khatam Metode Qiroati Jilid 1 - 6' : santri.program,
                                    predikat: 'Mumtaz (Istimewa)',
                                    penguji: 'Ustadz Ahmad Fauzi, Al-Hafizh',
                                    catatanPrestasi: `Tuntas menyelesaikan bimbingan ${santri.program} dengan hasil sangat baik.`
                                  });
                                }}
                                className="p-1.5 rounded-lg text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950"
                                title="Terbitkan E-Sertifikat Kelulusan"
                              >
                                <Award className="w-4 h-4" />
                              </button>

                              {/* Delete */}
                              <button
                                onClick={() => {
                                  if (confirm(`Hapus data santri ${santri.namaLengkap}?`)) {
                                    onDeleteSantri(santri.id);
                                  }
                                }}
                                className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950"
                                title="Hapus Data"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Tambah Santri Manual */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Tambah Data Santri Manual</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveNewSantri} className="space-y-3 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={newSantriForm.namaLengkap}
                    onChange={(e) => setNewSantriForm({ ...newSantriForm, namaLengkap: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Nama Wali</label>
                    <input
                      type="text"
                      required
                      value={newSantriForm.namaWali}
                      onChange={(e) => setNewSantriForm({ ...newSantriForm, namaWali: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">No. WhatsApp</label>
                    <input
                      type="tel"
                      required
                      placeholder="0812xxxxxxxx"
                      value={newSantriForm.nomorWhatsApp}
                      onChange={(e) => setNewSantriForm({ ...newSantriForm, nomorWhatsApp: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Program</label>
                    <select
                      value={newSantriForm.program}
                      onChange={(e) => setNewSantriForm({ ...newSantriForm, program: e.target.value as ProgramType })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950"
                    >
                      <option value="Metode Qiroati Pemula (Jilid 1-3)">Metode Qiroati Pemula (Jilid 1-3)</option>
                      <option value="Metode Qiroati Lanjutan (Jilid 4-6)">Metode Qiroati Lanjutan (Jilid 4-6)</option>
                      <option value="Pasca Qiroati (Ghorib & Tajwid)">Pasca Qiroati (Ghorib & Tajwid)</option>
                      <option value="Tahfidz Juz 30">Tahfidz Juz 30</option>
                      <option value="Fiqih Ibadah & Doa Harian">Fiqih Ibadah & Doa Harian</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Sesi (Senin - Kamis)</label>
                    <select
                      value={newSantriForm.sesi}
                      onChange={(e) => setNewSantriForm({ ...newSantriForm, sesi: e.target.value as SesiMengaji })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950"
                    >
                      <option value="Sesi Pagi (09.00 - 10.30 WIB)">Sesi Pagi (09.00 - 10.30 WIB)</option>
                      <option value="Sesi Siang (13.30 - 15.00 WIB)">Sesi Siang (13.30 - 15.00 WIB)</option>
                      <option value="Sesi Sore (15.45 - 17.30 WIB)">Sesi Sore (15.45 - 17.30 WIB)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 border rounded-lg text-slate-600"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-700 text-white font-bold rounded-lg"
                  >
                    Simpan Santri
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Terbitkan E-Sertifikat */}
        {selectedSantriForCert && (
          <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Terbitkan E-Sertifikat Kelulusan</h3>
                </div>
                <button onClick={() => setSelectedSantriForCert(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg text-xs">
                <p className="text-slate-500">Santri yang diterbitkan:</p>
                <p className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">{selectedSantriForCert.namaLengkap}</p>
                <p className="text-[11px] text-slate-400">{selectedSantriForCert.registrationNumber}</p>
              </div>

              <form onSubmit={handleIssueCertSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Program Kelulusan</label>
                  <input
                    type="text"
                    required
                    value={certForm.programLulus}
                    onChange={(e) => setCertForm({ ...certForm, programLulus: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Predikat</label>
                  <select
                    value={certForm.predikat}
                    onChange={(e) => setCertForm({ ...certForm, predikat: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950"
                  >
                    <option value="Mumtaz (Istimewa)">Mumtaz (Istimewa)</option>
                    <option value="Jayyid Jiddan (Sangat Baik)">Jayyid Jiddan (Sangat Baik)</option>
                    <option value="Jayyid (Baik)">Jayyid (Baik)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Dewan Penguji</label>
                  <input
                    type="text"
                    required
                    value={certForm.penguji}
                    onChange={(e) => setCertForm({ ...certForm, penguji: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Catatan Prestasi</label>
                  <textarea
                    rows={2}
                    value={certForm.catatanPrestasi}
                    onChange={(e) => setCertForm({ ...certForm, catatanPrestasi: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedSantriForCert(null)}
                    className="px-4 py-2 border rounded-lg text-slate-600"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg"
                  >
                    Terbitkan Sertifikat
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
