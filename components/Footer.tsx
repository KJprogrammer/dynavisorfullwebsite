const links = {
  Platform: ["TorrentPro™", "DynavisorPro™", "DIOVFS Architecture", "Patent Portfolio"],
  Solutions: ["AI / ML Training", "Cloud Acceleration", "HPC & Data Centers", "Edge Computing"],
  Company: ["About Dynavisor", "Hyperscalers Partnership", "Press & News", "Careers"],
  "Kaltech AI": ["Sovereign AI Platform", "AI Solutions", "About Kaltech", "Partnership"],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.04] pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="font-display text-2xl font-light mb-5">
              <span className="text-[#e2ddd4]">Dyna</span>
              <span className="text-[#c4a55a]">visor</span>
            </div>
            <p className="text-[#e2ddd4]/28 text-xs leading-relaxed mb-6">
              Supercomputing solutions for the AI era. From Kaltech AI × Dynavisor.
            </p>
            <div className="text-[10px] tracking-[0.22em] uppercase text-[#e2ddd4]/18">
              Sovereign AI Platform
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <div className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#e2ddd4]/22 mb-5">{group}</div>
              <ul className="space-y-3">
                {items.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-xs text-[#e2ddd4]/35 hover:text-[#e2ddd4]/65 transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rule-subtle" />
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-[#e2ddd4]/18 tracking-wide">
            © 2025 Dynavisor Inc. All rights reserved. US Patent — Dynamic Storage Scaling.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms"].map((l) => (
              <a key={l} href="#" className="text-[10px] text-[#e2ddd4]/18 hover:text-[#e2ddd4]/40 transition-colors tracking-wide">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
