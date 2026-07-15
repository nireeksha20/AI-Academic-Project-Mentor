import { useEffect, useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { authService } from "../services/authService";
import { projectService } from "../services/projectService";

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
  const { user, updateUser } = useContext(AuthContext);

  const defaultProfile = {
    name: "",
    email: "",
    college: "",
    department: "",
    github: "",
    linkedin: "",
    bio: "",
  };

  const [profile, setProfile] = useState(defaultProfile);

  const [skillAssessment, setSkillAssessment] = useState({
    programming: "",
    frontend: "",
    backend: "",
    database: "",
    ai: "",
    experience: "",
    role: "",
    interests: [],
    preferredTech: "",
  });

  const [projects, setProjects] = useState([]);

  const [editing, setEditing] = useState(false);
  const [editingSkills, setEditingSkills] = useState(false);

  const [showGithub, setShowGithub] = useState(false);
  const [showLinkedin, setShowLinkedin] = useState(false);
  const [showBio, setShowBio] = useState(false);

  const [saved, setSaved] = useState(false);

  const hasChanges =
    JSON.stringify(profile) !==
    JSON.stringify({
      name: user.name,
      email: user.email,
      college: user.profile?.college || "",
      department: user.profile?.department || "",
      github: user.profile?.github || "",
      linkedin: user.profile?.linkedin || "",
      bio: user.profile?.bio || "",
    });

  function handleChange(e) {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  }

  function handleSkillChange(e) {
    setSkillAssessment({
      ...skillAssessment,
      [e.target.name]: e.target.value,
    });
  }

  function handleInterestChange(e) {
    const { value, checked } = e.target;

    if (checked) {
      setSkillAssessment({
        ...skillAssessment,
        interests: [...skillAssessment.interests, value],
      });
    } else {
      setSkillAssessment({
        ...skillAssessment,
        interests: skillAssessment.interests.filter((item) => item !== value),
      });
    }
  }

  useEffect(() => {
    if (!user) return;

    setProfile({
      name: user.name || "",
      email: user.email || "",
      college: user.profile?.college || "",
      department: user.profile?.department || "",
      github: user.profile?.github || "",
      linkedin: user.profile?.linkedin || "",
      bio: user.profile?.bio || "",
    });

    setShowGithub(!!user.profile?.github);
    setShowLinkedin(!!user.profile?.linkedin);
    setShowBio(!!user.profile?.bio);

    setSkillAssessment({
      programming: user.skillAssessment?.programming || "",
      frontend: user.skillAssessment?.frontend || "",
      backend: user.skillAssessment?.backend || "",
      database: user.skillAssessment?.database || "",
      ai: user.skillAssessment?.ai || "",
      experience: user.skillAssessment?.experience || "",
      role: user.skillAssessment?.role || "",
      interests: user.skillAssessment?.interests || [],
      preferredTech: user.skillAssessment?.preferredTech || "",
    });

    loadProjects();
  }, [user]);

  async function loadProjects() {
    try {
      const res = await projectService.getProjects();

      setProjects(res.data.data?.projects || []);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSave() {
    if (profile.github && !profile.github.startsWith("https://github.com/")) {
      alert("Please enter a valid GitHub URL.");
      return;
    }

    if (
      profile.linkedin &&
      !profile.linkedin.startsWith("https://www.linkedin.com/")
    ) {
      alert("Please enter a valid LinkedIn URL.");
      return;
    }

    try {
      const profileResponse = await authService.updateProfile({
        college: profile.college,
        department: profile.department,
        github: profile.github,
        linkedin: profile.linkedin,
        bio: profile.bio,
      });

      const skillResponse =
        await authService.updateSkillAssessment(skillAssessment);

      const updatedUser = skillResponse.data.data.user;

      updateUser(updatedUser);

      setProfile({
        name: updatedUser.name,
        email: updatedUser.email,
        college: updatedUser.profile.college,
        department: updatedUser.profile.department,
        github: updatedUser.profile.github,
        linkedin: updatedUser.profile.linkedin,
        bio: updatedUser.profile.bio,
      });

      setEditing(false);
      setEditingSkills(false);

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    }
  }

  const completedFields = [
    profile.name,
    profile.email,
    profile.college,
    profile.department,
    profile.github,
    profile.linkedin,
    profile.bio,

    user?.skillAssessment?.programming,
    user?.skillAssessment?.frontend,
    user?.skillAssessment?.backend,
    user?.skillAssessment?.database,
    user?.skillAssessment?.ai,
    user?.skillAssessment?.experience,
    user?.skillAssessment?.role,

    user?.skillAssessment?.preferredTech,
  ];

  const completion = Math.round(
    (completedFields.filter(Boolean).length / completedFields.length) * 100,
  );

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
            className="rounded-xl border border-white/10 px-5 py-2 transition hover:bg-white/5"
          >
            Dashboard
          </RouterLink>
        </div>

        {saved && (
          <div className="fixed right-8 top-8 z-50 rounded-xl bg-green-600 px-6 py-4 font-semibold shadow-lg">
            ✅ Profile updated successfully
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          {/* Left */}

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8">
            <div className="flex flex-col items-center">
              <div className="flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 text-6xl font-bold shadow-xl">
                {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
              </div>

              <h2 className="mt-6 text-2xl font-bold">{profile.name}</h2>

              <p className="mt-2 text-slate-400 text-center">
                {profile.department}
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <StatCard title="Projects" value={projects?.length || 0} />

              <StatCard title="AI Sessions" value="--" />

              <StatCard
                title={
                  completion === 100 ? "Profile Complete ✅" : "Completion"
                }
                value={`${completion}%`}
              />
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

            {showGithub ? (
              <>
                <Input
                  icon={<LinkIcon />}
                  label="GitHub"
                  name="github"
                  value={profile.github}
                  onChange={handleChange}
                  disabled={!editing}
                />

                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-cyan-400 hover:underline"
                  >
                    Open GitHub →
                  </a>
                )}
              </>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-700 p-5">
                <p className="text-slate-400">No GitHub profile added.</p>

                <button
                  onClick={() => {
                    setShowGithub(true);
                  }}
                  className="mt-3 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 px-5 py-2 font-semibold transition hover:scale-105"
                >
                  + Add GitHub
                </button>
              </div>
            )}

            {showLinkedin ? (
              <>
                <Input
                  icon={<LinkIcon />}
                  label="LinkedIn"
                  name="linkedin"
                  value={profile.linkedin}
                  onChange={handleChange}
                  disabled={!editing}
                />

                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-cyan-400 hover:underline"
                  >
                    Open GitHub →
                  </a>
                )}
              </>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-700 p-5">
                <p className="text-slate-400">No LinkedIn profile added.</p>

                <button
                  onClick={() => {
                    setShowLinkedin(true);
                  }}
                  className="mt-3 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 px-5 py-2 font-semibold transition hover:scale-105"
                >
                  + Add LinkedIn
                </button>
              </div>
            )}

            {showBio ? (
              <SectionCard title="About Me">
                <textarea
                  disabled={!editing}
                  rows={5}
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950 px-5 py-4 outline-none transition focus:border-cyan-400 disabled:text-slate-400"
                />
              </SectionCard>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-700 p-5">
                <h3>No bio added</h3>

                <p className="text-slate-400">Tell others about yourself.</p>

                <button
                  onClick={() => {
                    setShowBio(true);
                  }}
                  className="rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 px-5 py-2 font-semibold transition hover:scale-105"
                >
                  + Add Bio
                </button>
              </div>
            )}

            <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Skill Assessment</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <SelectCard
                  title="Programming"
                  name="programming"
                  value={skillAssessment.programming}
                  onChange={handleSkillChange}
                  disabled={!editingSkills}
                />

                <SelectCard
                  title="Frontend"
                  name="frontend"
                  value={skillAssessment.frontend}
                  onChange={handleSkillChange}
                  disabled={!editingSkills}
                />

                <SelectCard
                  title="Backend"
                  name="backend"
                  value={skillAssessment.backend}
                  onChange={handleSkillChange}
                  disabled={!editingSkills}
                />

                <SelectCard
                  title="Database"
                  name="database"
                  value={skillAssessment.database}
                  onChange={handleSkillChange}
                  disabled={!editingSkills}
                />

                <SelectCard
                  title="AI / ML"
                  name="ai"
                  value={skillAssessment.ai}
                  onChange={handleSkillChange}
                  disabled={!editingSkills}
                />
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <SelectInput
                  label="Experience"
                  name="experience"
                  value={skillAssessment.experience}
                  onChange={handleSkillChange}
                  disabled={!editingSkills}
                  options={[
                    "0-6 Months",
                    "6-12 Months",
                    "1-2 Years",
                    "2+ Years",
                  ]}
                />

                <SelectInput
                  label="Preferred Role"
                  name="role"
                  value={skillAssessment.role}
                  onChange={handleSkillChange}
                  disabled={!editingSkills}
                  options={[
                    "Frontend Developer",
                    "Backend Developer",
                    "Full Stack Developer",
                    "AI Engineer",
                    "Data Scientist",
                    "Software Engineer",
                  ]}
                />
              </div>

              <div className="mt-8">
                <h3 className="mb-4 text-xl font-semibold">
                  Areas of Interest
                </h3>

                <div className="grid gap-3 md:grid-cols-3">
                  {[
                    "Web Development",
                    "Artificial Intelligence",
                    "Machine Learning",
                    "Cyber Security",
                    "Cloud Computing",
                    "Data Science",
                    "Mobile Development",
                    "UI / UX Design",
                    "DevOps",
                  ].map((item) => (
                    <label key={item}>
                      <input
                        type="checkbox"
                        value={item}
                        checked={skillAssessment.interests.includes(item)}
                        onChange={handleInterestChange}
                        disabled={!editingSkills}
                      />

                      <span className="ml-2">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <label className="mb-2 block">Preferred Tech Stack</label>

                <textarea
                  disabled={!editingSkills}
                  name="preferredTech"
                  value={skillAssessment.preferredTech}
                  onChange={handleSkillChange}
                  rows={4}
                  className="w-full rounded-xl border border-white/10 bg-slate-950 p-4"
                />
              </div>
            </div>

            {/* Buttons */}

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  setEditing(true);
                  setEditingSkills(true);
                  setSaved(false);
                }}
                className="flex h-14 w-48 items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-900 font-semibold transition hover:bg-white/5"
              >
                <Pencil size={18} />
                Edit Profile
              </button>

              <button
                disabled={!editing && !editingSkills}
                onClick={() => {
                  handleSave();
                }}
                className="flex h-14 w-48 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 font-semibold transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Save size={18} />
                {editing || editingSkills ? "Save Profile" : "Saved"}
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

function Info({ title, children }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
      <p className="text-sm text-slate-400">{title}</p>

      <p className="mt-2 font-semibold text-cyan-300">{children}</p>
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

function SelectCard({ title, name, value, onChange, disabled }) {
  const levels = ["Beginner", "Intermediate", "Advanced"];

  return (
    <div className="mb-4">
      <label className="mb-2 block text-sm text-slate-300">{title}</label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 outline-none disabled:text-slate-400"
      >
        <option value="">Select Level</option>
        {levels.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>
    </div>
  );
}

function SelectInput({ label, name, value, onChange, disabled, options }) {
  return (
    <div>
      <label className="mb-2 block text-sm text-slate-300">{label}</label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 outline-none disabled:text-slate-400"
      >
        <option value="">Select</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
