import React from 'react';
import { Pengajar } from '../types';
import { Award, GraduationCap, Clock, MessageSquare, Quote } from 'lucide-react';
import { generateGeneralInquiryWhatsAppUrl } from '../utils/whatsapp';

interface PengajarSectionProps {
  pengajarList: Pengajar[];
}

export const PengajarSection: React.FC<PengajarSectionProps> = ({ pengajarList }) => {
  return (
    <section id="pengajar" className="py-16 sm:py-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400 mb-2">
            <span>Dewan Pendidik & Pembina</span>
            <span aria-hidden="true">·</span>
            <span>Amanah & Berdedikasi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Profil Asatidz & Asatidzah TPQ Nur Hidayah
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
            Dibimbing oleh pendidik berlatar belakang pesantren dan sarjana pendidikan Islam yang berkeahlian di bidang tahsin, tajwid bersanad, dan psikologi pendidikan anak.
          </p>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pengajarList.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-slate-50 dark:bg-slate-950 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-700 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Photo with clean badge overlay */}
                <div className="relative aspect-square overflow-hidden bg-slate-200 dark:bg-slate-800">
                  <img
                    src={teacher.fotoUrl}
                    alt={teacher.nama}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                    <div>
                      <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block">
                        {teacher.peran}
                      </span>
                      <h3 className="text-base font-bold text-white">
                        {teacher.nama}, {teacher.gelar}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Content details */}
                <div className="p-4 space-y-3">
                  <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-start gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-tight">{teacher.pendidikan}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{teacher.pengalaman}</span>
                    </div>
                  </div>

                  {/* Expertise list */}
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 block mb-1">
                      Fokus Pembinaan:
                    </span>
                    <div className="flex flex-wrap gap-1 text-[11px]">
                      {teacher.keahlian.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded text-slate-700 dark:text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/80">
                    <p className="text-[11px] italic text-slate-600 dark:text-slate-400 flex items-start gap-1">
                      <Quote className="w-3 h-3 text-emerald-600/60 shrink-0 mt-0.5" />
                      <span>{teacher.pesanInspirasi}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom consult link */}
              <div className="p-4 pt-0">
                <a
                  href={generateGeneralInquiryWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg hover:bg-emerald-100 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Tanya Bimbingan</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
