import LoginForm from "../components/auth/LoginForm";

export default function Login() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16">
      <div className="mx-auto flex min-h-[80vh] max-w-7xl items-center justify-center">
        <LoginForm />
      </div>
    </main>
  );
}
