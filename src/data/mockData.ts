import { Santri, JadwalPelajaran, Pengajar, GaleriItem, BeritaItem, SertifikatItem, NotifikasiItem } from '../types';

import heroImg from '../assets/images/hero_tpq_nur_hidayah_1794034686887.jpg';
import wisudaImg from '../assets/images/galeri_wisuda_tahfidz_1794034687625.jpg';
import rihlahImg from '../assets/images/galeri_rihlah_santri_1794034688737.jpg';
import ustadzahImg from '../assets/images/ustadzah_profile_1794034688370.jpg';
import ustadzImg from '../assets/images/ustadz_ahmad_fauzi_1794035651141.jpg';
import wudhuImg from '../assets/images/praktik_wudhu_shalat_1794036039453.jpg';
import santunanImg from '../assets/images/santunan_yatim_kalibaru_1794036038338.jpg';

export { heroImg, wisudaImg, rihlahImg, ustadzahImg, ustadzImg, wudhuImg, santunanImg };

export const ADMIN_WHATSAPP_NUMBER = '6281398705733'; // Official TPQ Admin WhatsApp: +62 813-9870-5733
export const TPQ_ADDRESS = 'HR9M+9C6, Kalibaru, Kec. Cilodong, Kota Depok, Jawa Barat 16414';
export const OPERATIONAL_HOURS = 'Senin – Kamis pukul 08.00 – 18.00 WIB';

export const INITIAL_SANTRI: Santri[] = [
  {
    id: 'snt-001',
    registrationNumber: 'REG-TPQ-2026-001',
    namaLengkap: 'Muhammad Al-Fatih Pratama',
    namaPanggilan: 'Fatih',
    tanggalLahir: '2018-04-12',
    jenisKelamin: 'Laki-laki',
    usia: 8,
    pendidikanFormal: 'SDN Kalibaru 1 (Kelas 2)',
    namaWali: 'Hendri Pratama',
    nomorWhatsApp: '081298765432',
    alamat: 'HR9M+9C6, Kalibaru, Kec. Cilodong, Kota Depok 16414',
    kelurahan: 'Kalibaru',
    program: 'Tahfidz Juz 30',
    sesi: 'Sesi Sore (15.45 - 17.30 WIB)',
    catatan: 'Lulus Qiroati Jilid 6, lanjut tahfidz & tajwid',
    status: 'Aktif',
    tanggalDaftar: '2026-10-15'
  },
  {
    id: 'snt-002',
    registrationNumber: 'REG-TPQ-2026-002',
    namaLengkap: 'Aisyah Humaira Zahra',
    namaPanggilan: 'Aisyah',
    tanggalLahir: '2019-09-20',
    jenisKelamin: 'Perempuan',
    usia: 7,
    pendidikanFormal: 'TK Islam Terpadu Kalibaru',
    namaWali: 'Rina Marlina',
    nomorWhatsApp: '085712349876',
    alamat: 'Cilodong, Kota Depok 16414',
    kelurahan: 'Cilodong',
    program: 'Metode Qiroati Lanjutan (Jilid 4-6)',
    sesi: 'Sesi Siang (13.30 - 15.00 WIB)',
    catatan: 'Lulus Qiroati Jilid 3 dengan tartil lancar',
    status: 'Aktif',
    tanggalDaftar: '2026-10-22'
  },
  {
    id: 'snt-003',
    registrationNumber: 'REG-TPQ-2026-003',
    namaLengkap: 'Farhan Nur Ramadhan',
    namaPanggilan: 'Farhan',
    tanggalLahir: '2020-03-10',
    jenisKelamin: 'Laki-laki',
    usia: 6,
    pendidikanFormal: 'PAUD Permata Hati Cilodong',
    namaWali: 'Agus Setiawan',
    nomorWhatsApp: '087855667788',
    alamat: 'Kalibaru RT 02/RW 04, Kec. Cilodong 16414',
    kelurahan: 'Kalibaru',
    program: 'Metode Qiroati Pemula (Jilid 1-3)',
    sesi: 'Sesi Pagi (09.00 - 10.30 WIB)',
    catatan: 'Mulai belajar Qiroati Jilid 1 langsung tartil tanpa dieja',
    status: 'Diterima',
    tanggalDaftar: '2026-11-01'
  },
  {
    id: 'snt-004',
    registrationNumber: 'REG-TPQ-2026-004',
    namaLengkap: 'Khansa Naura Putri',
    namaPanggilan: 'Naura',
    tanggalLahir: '2017-11-05',
    jenisKelamin: 'Perempuan',
    usia: 9,
    pendidikanFormal: 'SDIT Al-Hikmah Cilodong (Kelas 3)',
    namaWali: 'Dewi Lestari',
    nomorWhatsApp: '081344556677',
    alamat: 'Kalibaru Permai Blok C, Cilodong 16414',
    kelurahan: 'Kalibaru',
    program: 'Pasca Qiroati (Ghorib & Tajwid)',
    sesi: 'Sesi Sore (15.45 - 17.30 WIB)',
    catatan: 'Persiapan munaqasyah syahadah Qiroati tingkat cabang',
    status: 'Menunggu Verifikasi',
    tanggalDaftar: '2026-11-05'
  }
];

export const INITIAL_JADWAL: JadwalPelajaran[] = [
  {
    id: 'jdw-01',
    hari: 'Senin',
    sesi: 'Sore (15.45 - 17.00 WIB)',
    program: 'Metode Qiroati Pemula (Jilid 1-3)',
    tingkatan: 'Qiroati Jilid 1 - 3',
    pengajar: 'Ustadzah Siti Rohmah, S.Pd.I',
    ruangHalaqah: 'Halaqah 1 (Ruang Utama)',
    materiPokok: 'Metode Qiroati: Membaca Al-Qur\'an Langsung Lancar, Cepat & Tartil Tanpa Dieja'
  },
  {
    id: 'jdw-02',
    hari: 'Senin',
    sesi: 'Ba\'da Maghrib (18.15 - 19.30 WIB)',
    program: 'Pasca Qiroati (Ghorib & Tajwid)',
    tingkatan: 'Ghorib & Tajwid Praktis',
    pengajar: 'Ustadz Ahmad Fauzi, Al-Hafizh',
    ruangHalaqah: 'Halaqah 2 (Serambi Utama)',
    materiPokok: 'Kaidah Bacaan Khusus Ghoribul Qur\'an, Sifatul Huruf & Talaqqi Tajwid Bersanad'
  },
  {
    id: 'jdw-03',
    hari: 'Selasa',
    sesi: 'Sore (15.45 - 17.00 WIB)',
    program: 'Metode Qiroati Lanjutan (Jilid 4-6)',
    tingkatan: 'Qiroati Jilid 4 - 6',
    pengajar: 'Ustadzah Nurul Hidayati, S.Pd',
    ruangHalaqah: 'Halaqah 1 (Ruang Utama)',
    materiPokok: 'Kaidah Mad Wajib, Mad Jaiz, Sukun, Tasydid, Waqaf & Ibtida Metode Qiroati'
  },
  {
    id: 'jdw-04',
    hari: 'Selasa',
    sesi: 'Ba\'da Maghrib (18.15 - 19.30 WIB)',
    program: 'Tahfidz Juz 30',
    tingkatan: 'Surah An-Naba s.d An-Nas',
    pengajar: 'Ustadz Ahmad Fauzi, Al-Hafizh',
    ruangHalaqah: 'Halaqah Tahfidz',
    materiPokok: 'Setoran Hafalan Harian, Tasmi\' Berpasangan & Muraja\'ah Berstandar Qiroati'
  },
  {
    id: 'jdw-05',
    hari: 'Rabu',
    sesi: 'Sore (15.45 - 17.00 WIB)',
    program: 'Fiqih Ibadah & Doa Harian',
    tingkatan: 'Seluruh Santri',
    pengajar: 'Ustadz Muhammad Rizky, S.Ag',
    ruangHalaqah: 'Ruang Aula Bersama',
    materiPokok: 'Praktik Wudhu Tertib, Gerakan & Bacaan Shalat Fardhu, serta Doa Harian Santri'
  },
  {
    id: 'jdw-06',
    hari: 'Kamis',
    sesi: 'Sore (15.45 - 17.00 WIB)',
    program: 'Metode Qiroati Lanjutan (Jilid 4-6)',
    tingkatan: 'Persiapan Pra-Munaqasyah',
    pengajar: 'Ustadzah Siti Rohmah, S.Pd.I',
    ruangHalaqah: 'Halaqah 2',
    materiPokok: 'Simulasi Ujian Kenaikan Jilid Qiroati & Uji Kelancaran Fashahah'
  },
  {
    id: 'jdw-07',
    hari: 'Kamis',
    sesi: 'Ba\'da Maghrib (18.15 - 19.30 WIB)',
    program: 'Tahfidz Juz 30',
    tingkatan: 'Khotmil Al-Qur\'an',
    pengajar: 'Ustadz Ahmad Fauzi, Al-Hafizh',
    ruangHalaqah: 'Halaqah Tahfidz',
    materiPokok: 'Tasmi\' Akbar Juz 30 Sekali Duduk & Pembinaan Adab Hamalatul Qur\'an'
  }
];

export const INITIAL_PENGAJAR: Pengajar[] = [
  {
    id: 'pgj-01',
    nama: 'Ustadzah Siti Rohmah',
    gelar: 'S.Pd.I',
    peran: 'Kepala Pengajar & Pembina Syahadah Qiroati',
    pendidikan: 'S1 Pendidikan Agama Islam UIN Syarif Hidayatullah Jakarta',
    keahlian: ['Pemegang Syahadah Guru Qiroati', 'Tahsin & Makhorijul Huruf', 'Psikologi Pendidikan Anak'],
    pengalaman: '11 Tahun Membina Santri Qiroati di Kalibaru Cilodong',
    pesanInspirasi: '"Metode Qiroati menuntun anak membaca Al-Qur\'an secara tartil langsung dengan cinta dan kedisiplinan."',
    fotoUrl: ustadzahImg
  },
  {
    id: 'pgj-02',
    nama: 'Ustadz Ahmad Fauzi',
    gelar: 'Al-Hafizh',
    peran: 'Pengampu Tahfidz, Ghorib & Tajwid Qiroati',
    pendidikan: 'Alumni Pesantren Tahfidz Al-Qur\'an Kudus (Pemegang Sanad Riwayat Hafsh \'an \'Ashim & Syahadah Qiroati)',
    keahlian: ['Tahfidz 30 Juz', 'Pengajar Ghorib & Musykilat Qiroati', 'Dewan Munaqisy Kelulusan'],
    pengalaman: '8 Tahun Membimbing Santri Tahfidz Berprestasi di Depok',
    pesanInspirasi: '"Sebaik-baik kalian adalah orang yang belajar Al-Qur\'an dan mengajarkannya."',
    fotoUrl: ustadzImg
  },
  {
    id: 'pgj-03',
    nama: 'Ustadz Muhammad Rizky',
    gelar: 'S.Ag',
    peran: 'Pengajar Fiqih Ibadah & Karakter Santri',
    pendidikan: 'S1 Ilmu Al-Qur\'an dan Tafsir Institut PTIQ Jakarta',
    keahlian: ['Fiqih Shalat Praktis', 'Kisah Sirah Nabawiyah', 'Kaligrafi Islam'],
    pengalaman: '6 Tahun Aktif Dakwah Komunitas Pemuda & TPQ Kalibaru',
    pesanInspirasi: '"Bukan hanya fasih membaca kalam Ilahi, namun juga santun budi pekertinya di rumah dan masyarakat."',
    fotoUrl: ustadzImg
  },
  {
    id: 'pgj-04',
    nama: 'Ustadzah Nurul Hidayati',
    gelar: 'S.Pd',
    peran: 'Koordinator Qiroati Jilid 1-3 & Doa Harian',
    pendidikan: 'S1 Pendidikan Guru Madrasah Ibtidaiyah (Tersertifikasi Penataran Guru Qiroati)',
    keahlian: ['Metode Fonetik Qiroati', 'Media Belajar Interaktif', 'Hafalan Juz Amma Tematik'],
    pengalaman: '5 Tahun Mengajar Anak Usia Dini & TK/SD',
    pesanInspirasi: '"Kesabaran dan kelembutan seorang guru membuka hati anak untuk mencintai firman Allah SWT sejak belia."',
    fotoUrl: ustadzahImg
  }
];

export const INITIAL_GALERI: GaleriItem[] = [
  {
    id: 'glr-01',
    judul: 'Kegiatan Belajar Metode Qiroati Langsung Tartil',
    kategori: 'Belajar Mengaji',
    tanggal: '4 November 2026',
    deskripsi: 'Suasana santri tekun menyimak bimbingan ustadzah pada halaqah Qiroati di TPQ Nur Hidayah, Kalibaru, Cilodong.',
    imageUrl: heroImg,
    highlight: true
  },
  {
    id: 'glr-02',
    judul: 'Wisuda Santri & Haflah Kelulusan Syahadah Qiroati & Tahfidz',
    kategori: 'Wisuda Tahfidz',
    tanggal: '18 Oktober 2026',
    deskripsi: 'Pemberian sertifikat digital syahadah Qiroati dan Juz 30 bagi santri yang lulus munaqasyah dengan nilai Mumtaz.',
    imageUrl: wisudaImg,
    highlight: true
  },
  {
    id: 'glr-03',
    judul: 'Rihlah Ceria & Tadabbur Alam Santri di Depok',
    kategori: 'Rihlah & Outdoor',
    tanggal: '27 September 2026',
    deskripsi: 'Kegiatan edukasi outdoor, game kekompakan islami, dan tadabbur kebesaran ciptaan Allah di ruang terbuka hijau Kota Depok.',
    imageUrl: rihlahImg,
    highlight: true
  },
  {
    id: 'glr-04',
    judul: 'Praktik Wudhu Sempurna & Shalat Berjamaah',
    kategori: 'Belajar Mengaji',
    tanggal: '12 September 2026',
    deskripsi: 'Bimbingan tatacara bersuci wudhu yang tertib dan pembiasaan shalat fardhu berjamaah di musholla TPQ Nur Hidayah.',
    imageUrl: wudhuImg
  },
  {
    id: 'glr-05',
    judul: 'Santunan Anak Yatim & Dhuafa Kalibaru',
    kategori: 'PHBI & Santunan',
    tanggal: '16 September 2026',
    deskripsi: 'Pemberian paket tas sekolah, perlengkapan belajar, dan santunan kasih sayang kepada anak-anak yatim binaan TPQ di Kalibaru, Cilodong.',
    imageUrl: santunanImg
  },
  {
    id: 'glr-06',
    judul: 'Simulasi Munaqasyah & Uji Fashahah Qiroati',
    kategori: 'Belajar Mengaji',
    tanggal: '15 Agustus 2026',
    deskripsi: 'Ajang mengasah ketepatan makhraj dan panjang-pendek bacaan sesuai standar mutu metode Qiroati.',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800'
  }
];

export const INITIAL_BERITA: BeritaItem[] = [
  {
    id: 'brt-01',
    judul: 'Penerimaan Santri Baru (PSB) Metode Qiroati Periode Terbaru Dibuka',
    kategori: 'Info Kurikulum',
    tanggal: '1 November 2026',
    penulis: 'Sekretariat TPQ Nur Hidayah',
    ringkasan: 'TPQ Nur Hidayah Kalibaru Cilodong membuka pendaftaran santri baru untuk kelas Qiroati Jilid 1-6, Ghorib Tajwid, dan Tahfidz Juz 30. Jam operasional Senin-Kamis 08.00-18.00 WIB.',
    kontenLengkap: [
      'Alhamdulillah, TPQ Nur Hidayah yang berlokasi di HR9M+9C6, Kalibaru, Kec. Cilodong, Kota Depok secara resmi membuka Penerimaan Santri Baru (PSB).',
      'Kami menerapkan Metode Qiroati, yaitu metode pembelajaran membaca Al-Qur\'an secara langsung, praktis, dan tartil tanpa perlu dieja, dengan standar mutu bimbingan asatidz bersyahadah resmi.',
      'Jadwal operasional TPQ adalah setiap hari Senin hingga Kamis pukul 08.00 – 18.00 WIB dengan pilihan sesi pagi, siang, dan sore.',
      'Pendaftaran dapat dilakukan secara online melalui website ini dengan konfirmasi otomatis via WhatsApp resmi (+62 813-9870-5733).'
    ],
    bacaMenit: 3,
    imageUrl: heroImg
  },
  {
    id: 'brt-02',
    judul: 'Haflah Khotmil Qur\'an & Wisuda Syahadah Qiroati Angkatan Ke-7',
    kategori: 'Prestasi Santri',
    tanggal: '20 Oktober 2026',
    penulis: 'Ustadz Ahmad Fauzi',
    ringkasan: 'Sebanyak 24 santri berhasil menyelesaikan ujian munaqasyah Qiroati dan hafalan Juz \'Amma serta mendapatkan sertifikat kelulusan digital.',
    kontenLengkap: [
      'Kegiatan wisuda tahunan TPQ Nur Hidayah berlangsung khidmat dihadiri oleh para wali santri, tokoh masyarakat Kalibaru, dan asatidz munaqisy.',
      'Para santri diuji langsung membaca ayat-ayat ghoribah, kaidah tajwid, dan sambung ayat Juz 30 dengan kelancaran istimewa.',
      'Sertifikat kelulusan digital kini dapat dicek langsung keasliannya melalui pangkalan data website resmi TPQ Nur Hidayah.'
    ],
    bacaMenit: 4,
    imageUrl: wisudaImg
  },
  {
    id: 'brt-03',
    judul: 'Keunggulan Metode Qiroati: Membaca Tartil Langsung Tanpa Dieja Sejak Usia Dini',
    kategori: 'Kajian & Dakwah',
    tanggal: '29 September 2026',
    penulis: 'Ustadzah Siti Rohmah',
    ringkasan: 'Mengapa Metode Qiroati sangat efektif untuk anak-anak? Simak prinsip ketelitian bacaan dan disiplin fashahah yang diterapkan di TPQ Nur Hidayah Kalibaru.',
    kontenLengkap: [
      'Metode Qiroati mengedepankan prinsip bacaan tartil sesuai kaidah tajwid yang benar sejak huruf pertama dipelajari.',
      'Anak tidak diajarkan mengeja, melainkan langsung membaca bunyi huruf dengan ketukan tempo yang konsisten (Cepat, Tepat, Benar).',
      'Guru pengampu di TPQ Nur Hidayah telah melalui penataran dan pemegang syahadah resmi sehingga kualitas bacaan santri terjaga.'
    ],
    bacaMenit: 3,
    imageUrl: rihlahImg
  }
];

export const INITIAL_SERTIFIKAT: SertifikatItem[] = [
  {
    id: 'cert-001',
    nomorSertifikat: 'NH-2026-001',
    nomorIndukSantri: 'NIS-2401',
    namaSantri: 'Muhammad Al-Fatih Pratama',
    jenisKelamin: 'Laki-laki',
    programLulus: 'Syahadah Khatam Metode Qiroati & Juz 30',
    predikat: 'Mumtaz (Istimewa)',
    tanggalKelulusan: '18 Oktober 2026',
    penguji: 'Ustadz Ahmad Fauzi, Al-Hafizh',
    direkturTPQ: 'Ustadzah Siti Rohmah, S.Pd.I',
    catatanPrestasi: 'Lulus Munaqasyah Qiroati Jilid 1-6 dan Ghorib Tajwid serta 37 Surah Juz 30 dengan tartil sangat fasih.',
    statusVerifikasi: 'Valid & Terverifikasi'
  },
  {
    id: 'cert-002',
    nomorSertifikat: 'NH-2026-002',
    nomorIndukSantri: 'NIS-2402',
    namaSantri: 'Aisyah Humaira Zahra',
    jenisKelamin: 'Perempuan',
    programLulus: 'Khatam Metode Qiroati Jilid 1 - 6',
    predikat: 'Jayyid Jiddan (Sangat Baik)',
    tanggalKelulusan: '18 Oktober 2026',
    penguji: 'Ustadzah Nurul Hidayati, S.Pd',
    direkturTPQ: 'Ustadzah Siti Rohmah, S.Pd.I',
    catatanPrestasi: 'Tuntas mempelajari seluruh kaidah mad, tanda waqaf Qiroati, dan siap melanjutkan ke jenjang Al-Qur\'an besar.',
    statusVerifikasi: 'Valid & Terverifikasi'
  },
  {
    id: 'cert-003',
    nomorSertifikat: 'NH-2026-003',
    nomorIndukSantri: 'NIS-2398',
    namaSantri: 'Rafi Rayyan Ardiansyah',
    jenisKelamin: 'Laki-laki',
    programLulus: 'Standarisasi Ghorib & Tajwid Qiroati',
    predikat: 'Mumtaz (Istimewa)',
    tanggalKelulusan: '18 Oktober 2026',
    penguji: 'Ustadz Ahmad Fauzi, Al-Hafizh',
    direkturTPQ: 'Ustadzah Siti Rohmah, S.Pd.I',
    catatanPrestasi: 'Menguasai bacaan musykilat, ahkamul madd, serta sifatul huruf dengan predikat Mumtaz nilai 96.',
    statusVerifikasi: 'Valid & Terverifikasi'
  }
];

export const INITIAL_NOTIFIKASI: NotifikasiItem[] = [
  {
    id: 'notif-01',
    judul: 'Penerimaan Santri Baru Metode Qiroati Dibuka!',
    pesan: 'Pendaftaran gelombang baru santri TPQ Nur Hidayah Kalibaru Cilodong resmi dibuka. Jam operasional Senin-Kamis 08.00-18.00 WIB.',
    kategori: 'PSB',
    tanggal: '6 November 2026',
    sudahDibaca: false,
    linkAksi: '#pendaftaran'
  },
  {
    id: 'notif-02',
    judul: 'Jadwal Munaqasyah Kenaikan Jilid Qiroati',
    pesan: 'Ujian kenaikan jilid Qiroati akan dilaksanakan setiap Kamis pekan ketiga. Mohon orang tua mendampingi muraja\'ah tartil di rumah.',
    kategori: 'Pengumuman',
    tanggal: '3 November 2026',
    sudahDibaca: false,
    linkAksi: '#jadwal'
  },
  {
    id: 'notif-03',
    judul: 'Informasi Jam Operasional & Layanan TPQ',
    pesan: 'Layanan administrasi, konsultasi, dan KBM TPQ beroperasi setiap Senin – Kamis pukul 08.00 – 18.00 WIB di Kalibaru, Cilodong.',
    kategori: 'Penting',
    tanggal: '28 Oktober 2026',
    sudahDibaca: true,
    linkAksi: '#lokasi'
  }
];
