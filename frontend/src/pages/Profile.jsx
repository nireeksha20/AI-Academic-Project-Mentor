import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  User,
  Mail,
  GraduationCap,
  School,
  Link as LinkIcon,
  Pencil,
  Save,
} from "lucide-react";

export default function Profile() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const assessment = JSON.parse(
    localStorage.getItem(`assessment_${currentUser?.email}`),
  );

  const [profile, setProfile] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    college: currentUser?.college || "",
    department: currentUser?.department || "",
    github: "",
    linkedin: "",
    bio: "",
  });

  const [editing, setEditing] = useState(false);

  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  }

  function handleSave() {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((user) =>
      user.email === currentUser.email ? { ...user, ...profile } : user,
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        ...currentUser,
        ...profile,
      }),
    );

    setEditing(false);

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-8 py-10">
        {/* Header */}

        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="font-semibold uppercase tracking-widest text-cyan-400">
              Student Profile
            </p>

            <h1 className="mt-3 text-5xl font-bold">My Profile</h1>

            <p className="mt-4 max-w-2xl text-slate-400">
              Manage your academic profile, portfolio links and personal
              information.
            </p>
          </div>

          <RouterLink
            to="/dashboard"
            className="rounded-xl border border-white/10 px-6 py-3 transition hover:bg-white/5"
          >
            Dashboard
          </RouterLink>
        </div>

        {saved && (
          <div className="mb-6 rounded-xl bg-green-600 p-4 text-center text-xl font-bold text-white">
            Profile Updated Successfully!
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          {/* Left */}

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8">
            <div className="flex flex-col items-center">
              <div className="flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 text-6xl font-bold">
                {profile.name.charAt(0).toUpperCase()}
              </div>

              <h2 className="mt-6 text-2xl font-bold">{profile.name}</h2>

              <p className="mt-2 text-slate-400 text-center">
                {profile.department}
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <StatCard
                title="Projects"
                value={
                  JSON.parse(localStorage.getItem("projects"))?.length || 0
                }
              />

              <StatCard title="AI Sessions" value="0" />

              <StatCard title="Completion" value="0%" />
            </div>
          </div>

          {/* Right */}

          <div className="space-y-8">
            <SectionCard title="Personal Information">
              <Input
                icon={<User />}
                label="Full Name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                disabled={!editing}
              />

              <Input
                icon={<Mail />}
                label="Email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!editing}
              />

              <Input
                icon={<School />}
                label="College"
                name="college"
                value={profile.college}
                onChange={handleChange}
                disabled={!editing}
              />

              <Input
                icon={<GraduationCap />}
                label="Department"
                name="department"
                value={profile.department}
                onChange={handleChange}
                disabled={!editing}
              />
            </SectionCard>

            {/* <SectionCard title="Portfolio Links">
              <Input
                icon={<LinkIcon />}
                label="GitHub"
                name="github"
                value={profile.github}
                onChange={handleChange}
                disabled={!editing}
              />

              <Input
                icon={<LinkIcon />}
                label="LinkedIn"
                name="linkedin"
                value={profile.linkedin}
                onChange={handleChange}
                disabled={!editing}
              />
            </SectionCard>

            <SectionCard title="About Me">
              <label className="mb-2 block text-sm text-slate-300">Bio</label> */}

            {/* <textarea
                disabled={!editing}
                rows={5}
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-slate-950 px-5 py-4 outline-none transition focus:border-cyan-400 disabled:text-slate-400"
              /> */}
            {/* </SectionCard> */}
            {/* Skills */}

            {/* <SectionCard title="Skills">
              <div className="flex flex-wrap gap-3">
                {[
                  assessment?.programming,
                  assessment?.frontend,
                  assessment?.backend,
                  assessment?.database,
                  assessment?.ai,
                  assessment?.role,
                ]
                  .filter(Boolean)
                  .map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300"
                    >
                      {skill}
                    </span>
                  ))}
              </div>
            </SectionCard> */}

            {/* Achievements */}

            <SectionCard title="Skill Assessment Summary">
              <div className="space-y-4">
                <Achievement
                  title="Programming Level"
                  desc={assessment?.programming || "Not Selected"}
                />

                <Achievement
                  title="Development Experience"
                  desc={assessment?.experience || "Not Selected"}
                />

                <Achievement
                  title="Preferred Role"
                  desc={assessment?.role || "Not Selected"}
                />

                <Achievement
                  title="AI / Machine Learning"
                  desc={assessment?.ai || "Not Selected"}
                />
              </div>
            </SectionCard>

            {/* Buttons */}

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setEditing(true)}
                className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 px-6 py-3 transition hover:bg-white/5"
              >
                <Pencil size={18} />
                Edit Profile
              </button>

              <button
                disabled={!editing}
                onClick={handleSave}
                className="flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 px-6 py-3 font-semibold transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Save size={18} />
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function SectionCard({ title, children }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8">
      <h2 className="mb-6 text-2xl font-semibold">{title}</h2>

      {children}
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 text-center">
      <p className="text-slate-400">{title}</p>

      <h3 className="mt-2 text-3xl font-bold text-cyan-400">{value}</h3>
    </div>
  );
}

function Input({ icon, label, name, value, onChange, disabled }) {
  return (
    <div className="mb-5">
      <label className="mb-2 block text-sm text-slate-300">{label}</label>

      <div className="flex items-center rounded-xl border border-white/10 bg-slate-950/60 px-4">
        <div className="mr-3 text-cyan-400">{icon}</div>

        <input
          disabled={disabled}
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent py-4 outline-none disabled:text-slate-400"
        />
      </div>
    </div>
  );
}

function Achievement({ title, desc }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/60 p-5">
      <h3 className="font-semibold">{title}</h3>

      <p className="mt-2 text-slate-400">{desc}</p>
    </div>
  );
}
