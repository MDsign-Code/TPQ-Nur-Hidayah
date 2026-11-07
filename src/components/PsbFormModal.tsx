import React, { useState } from 'react';
import { X, CheckCircle, MessageSquare, Printer, Copy, Check, User, Phone, MapPin, Calendar, BookOpen, AlertCircle } from 'lucide-react';
import { Santri, ProgramType, SesiMengaji } from '../types';
import { generateRegistrationWhatsAppUrl } from '../utils/whatsapp';

interface PsbFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterSuccess: (newSantri: Santri) => void;
}

export const PsbFormModal: React.FC<PsbFormModalProps> = ({
  isOpen,
  onClose,
  onRegisterSuccess
}) => {
  const [formData, setFormData] = useState({
    namaLengkap: '',
    namaPanggilan: '',
    tanggalLahir: '',
    jenisKelamin: 'Laki-laki' as 'Laki-laki' | 'Perempuan',
    usia: 7,
    pendidikanFormal: '',
    namaWali: '',
    nomorWhatsApp: '',
    alamat: 'Kalibaru, Kec. Cilodong 16414',
    kelurahan: 'Kalibaru',
    program: 'Metode Qiroati Pemula (Jilid 1-3)' as ProgramType,
    sesi: 'Sesi Sore (15.45 - 17.30 WIB)' as SesiMengaji,
    catatan: ''
  });

  const [submittedSantri, setSubmittedSantri] = useState<Santri | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.namaLengkap.trim()) {
      setErrorMsg('Nama lengkap santri wajib diisi.');
      return;
    }
    if (!formData.namaWali.trim()) {
      setErrorMsg('Nama orang tua / wali santri wajib diisi.');
      return;
    }
    if (!formData.nomorWhatsApp.trim() || formData.nomorWhatsApp.length < 9) {
      setErrorMsg('Nomor WhatsApp wali santri tidak valid.');
      return;
    }

    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const newRegNum = `REG-TPQ-2026-${randomSuffix}`;

    const newSantri: Santri = {
      id: `snt-${Date.now()}`,
      registrationNumber: newRegNum,
      namaLengkap: formData.namaLengkap.trim(),
      namaPanggilan: formData.namaPanggilan.trim() || formData.namaLengkap.trim().split(' ')[0],
      tanggalLahir: formData.tanggalLahir || '2019-01-01',
      jenisKelamin: formData.jenisKelamin,
      usia: Number(formData.usia) || 7,
      pendidikanFormal: formData.pendidikanFormal.trim() || 'SD / Sederajat',
      namaWali: formData.namaWali.trim(),
      nomorWhatsApp: formData.nomorWhatsApp.trim(),
      alamat: formData.alamat.trim() || 'Cilodong, Kota Depok',
      kelurahan: formData.kelurahan,
      program: formData.program,
      sesi: formData.sesi,
      catatan: formData.catatan.trim(),
      status: 'Menunggu Verifikasi',
      tanggalDaftar: new Date().toISOString().split('T')[0]
    };

    onRegisterSuccess(newSantri);
    setSubmittedSantri(newSantri);
  };

  const handleCopyRegNumber = () => {
    if (submittedSantri) {
      navigator.clipboard.writeText(submittedSantri.registrationNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleResetAndClose = () => {
    setSubmittedSantri(null);
    setFormData({
      namaLengkap: '',
      namaPanggilan: '',
      tanggalLahir: '',
      jenisKelamin: 'Laki-laki',
      usia: 7,
      pendidikanFormal: '',
      namaWali: '',
      nomorWhatsApp: '',
      alamat: 'Kalibaru, Kec. Cilodong 16414',
      kelurahan: 'Kalibaru',
      program: 'Metode Qiroati Pemula (Jilid 1-3)',
      sesi: 'Sesi Sore (15.45 - 17.30 WIB)',
      catatan: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8">
        {/* Header Modal */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {submittedSantri ? 'Pendaftaran Berhasil Disimpan' : 'Penerimaan Santri Baru (PSB)'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">TPQ Nur Hidayah Kalibaru, Cilodong, Kota Depok</p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {submittedSantri ? (
            /* Registration Success View with WhatsApp Confirmation Link */
            <div className="space-y-6">
              <div className="text-center py-2">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Alhamdulillah, Data Telah Diterima!</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                  Nomor registrasi santri telah dibuat. Silakan klik tombol di bawah untuk mengirim konfirmasi langsung ke WhatsApp Admin TPQ.
                </p>
              </div>

              {/* Registration summary card */}
              <div className="bg-slate-50 dark:bg-slate-950/80 rounded-xl p-5 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Nomor Registrasi:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono font-bold text-emerald-700 dark:text-emerald-400">
                      {submittedSantri.registrationNumber}
                    </span>
                    <button
                      onClick={handleCopyRegNumber}
                      className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded"
                      title="Salin No. Registrasi"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Nama Santri:</span>
                    <p className="font-semibold text-slate-900 dark:text-white mt-0.5">{submittedSantri.namaLengkap}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Panggilan:</span>
                    <p className="font-semibold text-slate-900 dark:text-white mt-0.5">{submittedSantri.namaPanggilan}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Program:</span>
                    <p className="font-semibold text-slate-900 dark:text-white mt-0.5">{submittedSantri.program}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Pilihan Sesi:</span>
                    <p className="font-semibold text-slate-900 dark:text-white mt-0.5">{submittedSantri.sesi}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Wali Santri:</span>
                    <p className="font-semibold text-slate-900 dark:text-white mt-0.5">{submittedSantri.namaWali}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">WhatsApp Wali:</span>
                    <p className="font-semibold text-slate-900 dark:text-white mt-0.5">{submittedSantri.nomorWhatsApp}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <a
                  href={generateRegistrationWhatsAppUrl(submittedSantri)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-colors text-sm"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Kirim Konfirmasi Otomatis ke WhatsApp Admin</span>
                </a>

                <div className="flex items-center justify-between gap-3">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-lg transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Cetak Bukti Pendaftaran</span>
                  </button>

                  <button
                    onClick={handleResetAndClose}
                    className="flex-1 py-2.5 px-4 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg transition-colors"
                  >
                    Selesai & Tutup
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Registration Form View */
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 rounded-lg text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Data Calon Santri */}
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-3 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>1. Identitas Calon Santri</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Nama Lengkap Santri <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Muhammad Al-Fatih"
                      value={formData.namaLengkap}
                      onChange={(e) => setFormData({ ...formData, namaLengkap: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Nama Panggilan
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Fatih"
                      value={formData.namaPanggilan}
                      onChange={(e) => setFormData({ ...formData, namaPanggilan: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Jenis Kelamin
                    </label>
                    <select
                      value={formData.jenisKelamin}
                      onChange={(e) => setFormData({ ...formData, jenisKelamin: e.target.value as 'Laki-laki' | 'Perempuan' })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Laki-laki">Laki-laki (Ikhwan)</option>
                      <option value="Perempuan">Perempuan (Akhwat)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Usia (Tahun)
                      </label>
                      <input
                        type="number"
                        min="4"
                        max="16"
                        value={formData.usia}
                        onChange={(e) => setFormData({ ...formData, usia: parseInt(e.target.value) || 7 })}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Tgl Lahir
                      </label>
                      <input
                        type="date"
                        value={formData.tanggalLahir}
                        onChange={(e) => setFormData({ ...formData, tanggalLahir: e.target.value })}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Sekolah Formal & Jenjang
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: SDN Kalibaru 1 (Kelas 2) / Belum Sekolah"
                      value={formData.pendidikanFormal}
                      onChange={(e) => setFormData({ ...formData, pendidikanFormal: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Pilihan Program & Sesi */}
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-3 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>2. Pilihan Program & Sesi Belajar</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Program Pembelajaran (Metode Qiroati)
                    </label>
                    <select
                      value={formData.program}
                      onChange={(e) => setFormData({ ...formData, program: e.target.value as ProgramType })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Metode Qiroati Pemula (Jilid 1-3)">Metode Qiroati Pemula (Jilid 1 - 3)</option>
                      <option value="Metode Qiroati Lanjutan (Jilid 4-6)">Metode Qiroati Lanjutan (Jilid 4 - 6)</option>
                      <option value="Pasca Qiroati (Ghorib & Tajwid)">Pasca Qiroati (Ghorib & Tajwid)</option>
                      <option value="Tahfidz Juz 30">Tahfidz Juz 30 (Juz 'Amma)</option>
                      <option value="Fiqih Ibadah & Doa Harian">Fiqih Ibadah & Doa Harian</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Pilihan Sesi (Senin – Kamis 08.00 – 18.00 WIB)
                    </label>
                    <select
                      value={formData.sesi}
                      onChange={(e) => setFormData({ ...formData, sesi: e.target.value as SesiMengaji })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Sesi Pagi (09.00 - 10.30 WIB)">Sesi Pagi (09.00 - 10.30 WIB)</option>
                      <option value="Sesi Siang (13.30 - 15.00 WIB)">Sesi Siang (13.30 - 15.00 WIB)</option>
                      <option value="Sesi Sore (15.45 - 17.30 WIB)">Sesi Sore (15.45 - 17.30 WIB)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Data Orang Tua & Alamat */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-3 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  <span>3. Kontak Orang Tua / Wali & Domisili</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Nama Orang Tua / Wali <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nama Ayah atau Ibu"
                      value={formData.namaWali}
                      onChange={(e) => setFormData({ ...formData, namaWali: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Nomor WhatsApp Aktif <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0812xxxxxxxx"
                      value={formData.nomorWhatsApp}
                      onChange={(e) => setFormData({ ...formData, nomorWhatsApp: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Kelurahan
                    </label>
                    <select
                      value={formData.kelurahan}
                      onChange={(e) => setFormData({ ...formData, kelurahan: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Kalibaru">Kalibaru (Kec. Cilodong)</option>
                      <option value="Cilodong">Cilodong (Kec. Cilodong)</option>
                      <option value="Kalimulya">Kalimulya (Kec. Cilodong)</option>
                      <option value="Sukamaju">Sukamaju (Kec. Cilodong)</option>
                      <option value="Jatimulya">Jatimulya (Kec. Cilodong)</option>
                      <option value="Lainnya">Wilayah Depok Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Alamat Rumah Lengkap
                    </label>
                    <input
                      type="text"
                      placeholder="Jl. H. Dimun / RT 03 RW 04"
                      value={formData.alamat}
                      onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Catatan / Riwayat Belajar Santri (Opsional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Contoh: Sudah pernah belajar Iqro jilid 2 di rumah, butuh bimbingan makharijul huruf..."
                      value={formData.catatan}
                      onChange={(e) => setFormData({ ...formData, catatan: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 rounded-lg shadow-sm transition-colors"
                >
                  Simpan & Dapatkan Bukti Pendaftaran
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
