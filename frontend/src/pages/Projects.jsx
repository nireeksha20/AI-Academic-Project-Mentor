import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { projectService } from "../services/projectService";
import {
  LayoutDashboard,
  FolderOpen,
  BrainCircuit,
  User,
  Settings,
  LogOut,
  PlusCircle,
  ChevronRight,
  Trash2,
} from "lucide-react";

export default function Projects() {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const res = await projectService.getProjects();
    setProjects(res.data.projects || []);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project permanently?")) return;
    await projectService.deleteProject(id);
    setProjects((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <div className="min-h-screen flex bg-slate-950 text-white">
      <aside className="w-72 border-r border-white/10 bg-slate-900/60 p-6 flex flex-col">
        <h1 className="text-2xl font-bold text-cyan-400">AI Mentor</h1>
        <p className="text-sm text-slate-400 mb-10">Academic Project Mentor</p>

        <nav className="space-y-2">
          <Item
            icon={<LayoutDashboard size={20} />}
            title="Dashboard"
            to="/dashboard"
          />
          <Item
            icon={<FolderOpen size={20} />}
            title="Projects"
            to="/projects"
            active
          />
          <Item
            icon={<BrainCircuit size={20} />}
            title="AI Mentor"
            to="/mentor"
          />
          <Item icon={<User size={20} />} title="Profile" to="/profile" />
          <Item icon={<Settings size={20} />} title="Settings" to="/settings" />
        </nav>

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="mt-auto flex items-center gap-3 rounded-xl border border-red-500/20 px-4 py-3 text-red-400 hover:bg-red-500/10"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      <main className="flex-1 p-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-bold">My Projects</h2>
            <p className="text-slate-400 mt-2">
              {projects.length} projects created by {user?.name}
            </p>
          </div>

          <Link
            to="/new-project"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3 font-semibold"
          >
            <PlusCircle size={18} />
            New Project
          </Link>
        </div>

        <div className="space-y-5">
          {projects.map((project) => (
            <div
              key={project._id}
              className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 flex justify-between items-center"
            >
              <div>
                <h3 className="text-2xl font-semibold">{project.title}</h3>
                <p className="text-slate-400 mt-1">{project.description}</p>
                <p className="text-sm mt-3">Domain: {project.domain}</p>
              </div>

              <div className="flex gap-3">
                <Link
                  to={`/project-dashboard/${project._id}`}
                  className="px-5 py-3 rounded-xl border border-cyan-400/30 text-cyan-300 flex items-center gap-2"
                >
                  Open
                  <ChevronRight size={18} />
                </Link>

                <button
                  onClick={() => handleDelete(project._id)}
                  className="px-4 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function Item({ icon, title, to, active }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
        active
          ? "bg-cyan-500/20 text-cyan-300"
          : "text-slate-300 hover:bg-white/5"
      }`}
    >
      {icon}
      <span>{title}</span>
    </Link>
  );
}
