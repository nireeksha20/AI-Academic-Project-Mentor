import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Settings as SettingsIcon,
  Bell,
  BrainCircuit,
  Moon,
  Globe,
  RotateCcw,
  Save,
} from "lucide-react";

const defaultSettings = {
  notifications: true,
  emailNotifications: true,
  aiSuggestions: true,
  autoSave: true,
  theme: "Dark",
  language: "English",
};

export default function Settings() {
  const [settings, setSettings] = useState(defaultSettings);

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("settings");

    if (stored) {
      setSettings(JSON.parse(stored));
    }
  }, []);

  function handleToggle(name) {
    setSettings((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  }

  function handleChange(e) {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  }

  function handleSave() {
    localStorage.setItem("settings", JSON.stringify(settings));

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  }

  function handleReset() {
    setSettings(defaultSettings);

    localStorage.removeItem("settings");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-8 py-10">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="font-semibold uppercase tracking-widest text-cyan-400">
              Preferences
            </p>

            <h1 className="mt-3 text-5xl font-bold">Settings</h1>

            <p className="mt-3 text-slate-400">
              Customize your AI Mentor experience.
            </p>
          </div>

          <Link
            to="/dashboard"
            className="rounded-xl border border-white/10 px-6 py-3 transition hover:bg-white/5"
          >
            Dashboard
          </Link>
        </div>

        {saved && (
          <div className="mb-6 rounded-xl border border-green-500/30 bg-green-500/10 px-5 py-4 text-green-400">
            ✓ Settings saved successfully.
          </div>
        )}

        <div className="grid gap-8">
          {/* Notifications */}

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8">
            <div className="mb-6 flex items-center gap-3">
              <Bell className="text-cyan-400" />

              <h2 className="text-2xl font-semibold">Notifications</h2>
            </div>

            <ToggleRow
              title="Enable Notifications"
              checked={settings.notifications}
              onChange={() => handleToggle("notifications")}
            />

            <ToggleRow
              title="Email Notifications"
              checked={settings.emailNotifications}
              onChange={() => handleToggle("emailNotifications")}
            />
          </div>

          {/* AI */}

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8">
            <div className="mb-6 flex items-center gap-3">
              <BrainCircuit className="text-cyan-400" />

              <h2 className="text-2xl font-semibold">AI Preferences</h2>
            </div>

            <ToggleRow
              title="Enable AI Suggestions"
              checked={settings.aiSuggestions}
              onChange={() => handleToggle("aiSuggestions")}
            />

            <ToggleRow
              title="Auto Save AI Sessions"
              checked={settings.autoSave}
              onChange={() => handleToggle("autoSave")}
            />
          </div>
          {/* Appearance */}

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8">
            <div className="mb-6 flex items-center gap-3">
              <Moon className="text-cyan-400" />

              <h2 className="text-2xl font-semibold">Appearance</h2>
            </div>

            <label className="mb-2 block text-slate-300">Theme</label>

            <select
              name="theme"
              value={settings.theme}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-4 outline-none"
            >
              <option>Dark</option>
              <option>Light</option>
              <option>System Default</option>
            </select>
          </div>

          {/* Language */}

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8">
            <div className="mb-6 flex items-center gap-3">
              <Globe className="text-cyan-400" />

              <h2 className="text-2xl font-semibold">Language</h2>
            </div>

            <label className="mb-2 block text-slate-300">
              Preferred Language
            </label>

            <select
              name="language"
              value={settings.language}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-4 outline-none"
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Kannada</option>
            </select>
          </div>

          {/* Buttons */}

          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleReset}
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 px-6 py-3 transition hover:bg-white/5"
            >
              <RotateCcw size={18} />
              Reset Settings
            </button>

            <button
              onClick={handleSave}
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 px-6 py-3 font-semibold transition hover:scale-105"
            >
              <Save size={18} />
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function ToggleRow({ title, checked, onChange }) {
  return (
    <div className="mb-5 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/60 px-5 py-4">
      <span className="text-slate-200">{title}</span>

      <button
        onClick={onChange}
        className={`relative h-7 w-14 rounded-full transition ${
          checked ? "bg-cyan-400" : "bg-slate-700"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            checked ? "left-8" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}
