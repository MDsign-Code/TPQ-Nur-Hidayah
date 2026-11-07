import { Santri } from '../types';
import { ADMIN_WHATSAPP_NUMBER } from '../data/mockData';

export function getCleanPhoneNumber(phone: string): string {
  let cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.substring(1);
  }
  return cleaned;
}

export function generateRegistrationWhatsAppUrl(santri: Santri, adminPhone: string = ADMIN_WHATSAPP_NUMBER): string {
  const targetNumber = getCleanPhoneNumber(adminPhone);
  
  const text = `Assalamu'alaikum Warahmatullahi Wabarakatuh, Admin TPQ Nur Hidayah Depok.

Saya bermaksud melakukan konfirmasi pendaftaran santri baru:
• *No. Registrasi:* ${santri.registrationNumber}
• *Nama Santri:* ${santri.namaLengkap} (${santri.namaPanggilan})
• *Jenis Kelamin:* ${santri.jenisKelamin}
• *Usia & Sekolah:* ${santri.usia} Tahun (${santri.pendidikanFormal})
• *Program Pilihan:* ${santri.program}
• *Pilihan Sesi:* ${santri.sesi}
• *Nama Wali:* ${santri.namaWali}
• *WhatsApp Wali:* ${santri.nomorWhatsApp}
• *Alamat:* ${santri.alamat}, Kel. ${santri.kelurahan}, Cilodong, Depok
${santri.catatan ? `• *Catatan:* ${santri.catatan}\n` : ''}
Mohon konfirmasi langkah verifikasi berkas dan jadwal halaqah berikutnya. Jazakumullah khairan katsiran.`;

  return `https://wa.me/${targetNumber}?text=${encodeURIComponent(text)}`;
}

export function generateAdminFollowUpUrl(santri: Santri): string {
  const targetNumber = getCleanPhoneNumber(santri.nomorWhatsApp);
  
  const text = `Assalamu'alaikum Wr. Wb. Bapak/Ibu ${santri.namaWali},
Kami dari Sekretariat TPQ Nur Hidayah Kalibaru, Cilodong, Kota Depok.

Terkait pendaftaran ananda *${santri.namaLengkap}* (No. Registrasi: *${santri.registrationNumber}*), data telah kami terima dan terverifikasi dengan status *${santri.status}*.

Silakan konfirmasi kehadiran untuk sesi penempatan halaqah:
• Program: ${santri.program}
• Sesi: ${santri.sesi}

Alamat TPQ: HR9M+9C6, Kalibaru, Kec. Cilodong, Kota Depok 16414.
Jam Operasional: Senin – Kamis pukul 08.00 – 18.00 WIB.
Terima kasih atas kepercayaan Bapak/Ibu. Wassalamu'alaikum Wr. Wb.`;

  return `https://wa.me/${targetNumber}?text=${encodeURIComponent(text)}`;
}

export function generateGeneralInquiryWhatsAppUrl(adminPhone: string = ADMIN_WHATSAPP_NUMBER): string {
  const targetNumber = getCleanPhoneNumber(adminPhone);
  const text = `Assalamu'alaikum Warahmatullahi Wabarakatuh, Pengurus TPQ Nur Hidayah Depok. Saya ingin menanyakan informasi seputar kegiatan belajar dan pendaftaran santri baru.`;
  return `https://wa.me/${targetNumber}?text=${encodeURIComponent(text)}`;
}
