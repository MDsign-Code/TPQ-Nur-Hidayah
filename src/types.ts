export type ProgramType = 
  | 'Metode Qiroati Pemula (Jilid 1-3)'
  | 'Metode Qiroati Lanjutan (Jilid 4-6)'
  | 'Pasca Qiroati (Ghorib & Tajwid)'
  | 'Tahfidz Juz 30'
  | 'Fiqih Ibadah & Doa Harian';

export type SesiMengaji = 
  | 'Sesi Pagi (09.00 - 10.30 WIB)'
  | 'Sesi Siang (13.30 - 15.00 WIB)'
  | 'Sesi Sore (15.45 - 17.30 WIB)';

export type StatusSantri = 'Menunggu Verifikasi' | 'Diterima' | 'Aktif' | 'Lulus';

export interface Santri {
  id: string;
  registrationNumber: string;
  namaLengkap: string;
  namaPanggilan: string;
  tanggalLahir: string;
  jenisKelamin: 'Laki-laki' | 'Perempuan';
  usia: number;
  pendidikanFormal: string;
  namaWali: string;
  nomorWhatsApp: string;
  alamat: string;
  kelurahan: string;
  program: ProgramType;
  sesi: SesiMengaji;
  catatan?: string;
  status: StatusSantri;
  tanggalDaftar: string;
}

export interface JadwalPelajaran {
  id: string;
  hari: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu' | 'Ahad';
  sesi: 'Sore (15.45 - 17.00 WIB)' | 'Ba\'da Maghrib (18.15 - 19.30 WIB)';
  program: ProgramType;
  tingkatan: string;
  pengajar: string;
  ruangHalaqah: string;
  materiPokok: string;
}

export interface Pengajar {
  id: string;
  nama: string;
  gelar: string;
  peran: string;
  pendidikan: string;
  keahlian: string[];
  pengalaman: string;
  pesanInspirasi: string;
  fotoUrl: string;
}

export interface GaleriItem {
  id: string;
  judul: string;
  kategori: 'Belajar Mengaji' | 'Wisuda Tahfidz' | 'Rihlah & Outdoor' | 'PHBI & Santunan';
  tanggal: string;
  deskripsi: string;
  imageUrl: string;
  highlight?: boolean;
}

export interface BeritaItem {
  id: string;
  judul: string;
  kategori: 'Agenda Bulanan' | 'Prestasi Santri' | 'Kajian & Dakwah' | 'Info Kurikulum';
  tanggal: string;
  penulis: string;
  ringkasan: string;
  kontenLengkap: string[];
  bacaMenit: number;
  imageUrl?: string;
}

export interface SertifikatItem {
  id: string;
  nomorSertifikat: string;
  nomorIndukSantri: string;
  namaSantri: string;
  jenisKelamin: 'Laki-laki' | 'Perempuan';
  programLulus: string;
  predikat: 'Mumtaz (Istimewa)' | 'Jayyid Jiddan (Sangat Baik)' | 'Jayyid (Baik)';
  tanggalKelulusan: string;
  penguji: string;
  direkturTPQ: string;
  catatanPrestasi: string;
  statusVerifikasi: 'Valid & Terverifikasi' | 'Dalam Proses';
}

export interface NotifikasiItem {
  id: string;
  judul: string;
  pesan: string;
  kategori: 'Penting' | 'Pengumuman' | 'Libur' | 'PSB';
  tanggal: string;
  sudahDibaca: boolean;
  linkAksi?: string;
}
