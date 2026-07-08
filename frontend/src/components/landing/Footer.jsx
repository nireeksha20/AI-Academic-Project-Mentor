import { GitBranch, Globe, Mail, ArrowUpRight } from "lucide-react";

const quickLinks = [
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "AI Agents", href: "#agents" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "FAQ", href: "#faq" },
];

const resources = [
  { name: "Documentation", href: "#" },
  { name: "Privacy Policy", href: "#" },
  { name: "Terms & Conditions", href: "#" },
];

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/nireeksha20",
    icon: GitBranch,
  },
  {
    name: "Portfolio",
    href: "#",
    icon: Globe,
  },
  {
    name: "Email",
    href: "mailto:nireeksha203@gmail.com",
    icon: Mail,
  },
];

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative mt-24 border-t border-cyan-400/10 bg-slate-950 text-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]">
          {/* Brand */}

          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,.15)]">
                AI
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  AI Academic Project Mentor
                </h3>

                <p className="text-sm text-slate-400">
                  Intelligent Project Guidance
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-sm leading-8 text-slate-400">
              Transform project ideas into complete software blueprints using
              collaborative AI agents designed for students, developers and
              innovators.
            </p>
          </div>

          {/* Quick Links */}

          <div>
            <h4 className="mb-5 text-lg font-semibold">Quick Links</h4>

            <ul className="space-y-4">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-slate-400 transition transition hover:text-cyan-300"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}

          <div>
            <h4 className="mb-5 text-lg font-semibold">Resources</h4>

            <ul className="space-y-4">
              {resources.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-slate-400 transition hover:text-cyan-300"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}

          <div>
            <h4 className="mb-5 text-lg font-semibold">Connect</h4>

            <div className="space-y-4">
              {socials.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 transition-all duration-300 hover:border-cyan-400/40 hover:bg-slate-900"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-cyan-300" />

                      <span className="text-slate-300">{item.name}</span>
                    </div>

                    <ArrowUpRight className="h-4 w-4 text-slate-500 transition group-hover:text-cyan-300" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-slate-500 md:flex-row">
          <p>© 2026 AI Academic Project Mentor. All rights reserved.</p>

          <p>Built with ❤️ using React, Tailwind CSS & Framer Motion</p>
        </div>
      </div>
    </footer>
  );
}
