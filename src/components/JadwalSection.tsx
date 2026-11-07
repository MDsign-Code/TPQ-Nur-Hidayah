import React, { useState } from 'react';
import { JadwalPelajaran, ProgramType } from '../types';
import { Calendar, Clock, UserCheck, MapPin, Printer } from 'lucide-react';

interface JadwalSectionProps {
  jadwalList: JadwalPelajaran[];
  onOpenPsbModal: () => void;
}

export const JadwalSection: React.FC<JadwalSectionProps> = ({ jadwalList, onOpenPsbModal }) => {
  const [selectedDay, setSelectedDay] = useState<string>('Semua');
  const [selectedProgram, setSelectedProgram] = useState<string>('Semua');

  const days = ['Semua', 'Senin', 'Selasa', 'Rabu', 'Kamis'];
  const programs = ['Semua', 'Metode Qiroati Pemula (Jilid 1-3)', 'Metode Qiroati Lanjutan (Jilid 4-6)', 'Pasca Qiroati (Ghorib & Tajwid)', 'Tahfidz Juz 30', 'Fiqih Ibadah & Doa Harian'];

  const filteredJadwal = jadwalList.filter((item) => {
    const matchDay = selectedDay === 'Semua' || item.hari === selectedDay;
    const matchProgram = selectedProgram === 'Semua' || item.program === selectedProgram;
    return matchDay && matchProgram;
  });

  return (
    <section id="jadwal" className="py-16 sm:py-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400 mb-1">
              <span>Kurikulum Metode Qiroati</span>
              <span aria-hidden="true">·</span>
              <span>Senin – Kamis (08.00 – 18.00 WIB)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Jadwal Mengaji Metode Qiroati & Halaqah
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
              Pembelajaran membaca Al-Qur'an tartil langsung berstandar syahadah Qiroati dengan pembina bersertifikasi resmi, berlangsung Senin s.d. Kamis.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Jadwal</span>
            </button>

            <button
              onClick={onOpenPsbModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 rounded-lg transition-colors"
            >
              <span>Pilih Sesi & Daftar</span>
            </button>
          </div>
        </div>

        {/* Filter Controls (Segmented clean buttons) */}
        <div className="space-y-3 mb-8">
          {/* Day Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500 mr-1 shrink-0">Hari:</span>
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 ${
                  selectedDay === day
                    ? 'bg-emerald-700 text-white dark:bg-emerald-600'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Program Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500 mr-1 shrink-0">Program:</span>
            {programs.map((prog) => (
              <button
                key={prog}
                onClick={() => setSelectedProgram(prog)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 ${
                  selectedProgram === prog
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {prog}
              </button>
            ))}
          </div>
        </div>

        {/* Jadwal Cards Grid */}
        {filteredJadwal.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-200 dark:border-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">Tidak ada jadwal yang sesuai dengan filter yang dipilih.</p>
            <button
              onClick={() => { setSelectedDay('Semua'); setSelectedProgram('Semua'); }}
              className="mt-3 text-xs font-semibold text-emerald-700 dark:text-emerald-400 underline"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredJadwal.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  {/* Clean unboxed metadata header */}
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.hari}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <Clock className="w-3 h-3" />
                      {item.sesi.includes('Sore') ? 'Sesi Sore' : 'Ba\'da Maghrib'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {item.program}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">
                    Tingkat: {item.tingkatan}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
                    {item.materiPokok}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-medium text-slate-700 dark:text-slate-300">{item.pengajar}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{item.ruangHalaqah}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
