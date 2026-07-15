import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { projectService } from "../services/projectService";
import {
  FolderOpen,
  PlusCircle,
  BrainCircuit,
  BarChart3,
  User,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const username = user?.name || "User";
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectService.getProjects();
        setProjects(response.data?.projects || []);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
  }, [user]);

  function handleLogout() {
    logout();
    navigate("/login");
  }
  return (
    <div className="min-h-screen flex bg-slate-950 text-white">
      {/* Sidebar */}

      <aside className="flex w-72 flex-col border-r border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
        <h1 className="text-2xl font-bold text-cyan-400">AI Mentor</h1>

        <p className="mb-10 text-sm text-slate-400">Academic Project Mentor</p>

        <nav className="space-y-3">
          <SidebarItem
            icon={<BarChart3 size={20} />}
            title="Dashboard"
            to="/dashboard"
            active
          />

          <SidebarItem
            icon={<FolderOpen size={20} />}
            title="Projects"
            to={
              projects.length
                ? `/project-dashboard/${projects[0]._id}`
                : "/dashboard"
            }
          />

          <SidebarItem
            icon={<BrainCircuit size={20} />}
            title="AI Mentor"
            to={
              projects.length
                ? `/requirements/${projects[0]._id}`
                : "/dashboard"
            }
          />

          <SidebarItem
            icon={<User size={20} />}
            title="Profile"
            to="/profile"
          />

          <SidebarItem
            icon={<Settings size={20} />}
            title="Settings"
            to="/settings"
          />
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 rounded-xl border border-red-500/20 px-4 py-3 text-red-400 transition hover:bg-red-500/10"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Main */}

      <main className="flex-1 p-10">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold">Welcome, {username} 👋</h2>

            <p className="mt-2 text-slate-400">
              Continue building your AI-powered academic projects.
            </p>
          </div>

          <Link
            to="/new-project"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 px-6 py-3 font-semibold transition hover:scale-105"
          >
            <PlusCircle size={18} />
            New Project
          </Link>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <StatCard title="Projects" value={projects.length} />

          <StatCard
            title="Completed"
            value={projects.filter((p) => p.status === "Completed").length}
          />

          <StatCard title="AI Sessions" value="0" />
        </div>

        {/* Recent Projects */}

        <div className="mt-10">
          <h3 className="mb-5 text-2xl font-semibold">Recent Projects</h3>

          <div className="grid gap-5">
            {projects.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-cyan-400/20 p-12 text-center">
                <h3 className="text-2xl font-semibold">No Projects Yet</h3>

                <p className="mt-3 text-slate-400">
                  Create your first AI project to get started.
                </p>
              </div>
            ) : (
              projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon, title, active, to = "#" }) {
  return (
    <Link
      to={to}
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition ${
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

function StatCard({ title, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
      <p className="text-slate-400">{title}</p>

      <h3 className="mt-3 text-4xl font-bold text-cyan-400">{value}</h3>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-900/60 p-6 transition hover:border-cyan-400/30 hover:bg-slate-900">
      <div>
        <h4 className="text-xl font-semibold">{project.title}</h4>
        <p className="mt-1 text-sm text-slate-400">Domain: {project.domain}</p>

        <p className="mt-2">
          Status :
          <span
            className={`ml-2 font-semibold ${
              project.status === "Completed"
                ? "text-green-400"
                : project.status === "In Progress"
                  ? "text-cyan-400"
                  : "text-yellow-400"
            }`}
          >
            {project.status}
          </span>
        </p>
        <p className="mt-2 text-sm text-slate-500">
          {new Date(project.createdAt).toLocaleDateString()}
        </p>
      </div>

      <Link
        to={`/requirements/${project._id}`}
        className="flex items-center gap-2 rounded-xl border border-cyan-400/30 px-5 py-3 text-cyan-300 transition hover:bg-cyan-500/10"
      >
        Open
        <ChevronRight size={18} />
      </Link>
    </div>
  );
}
