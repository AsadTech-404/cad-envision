import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";

export default async function AdminLayout({ children }) {
  const session = await auth();

  if (!session || session.user.role !== "admin") {
    redirect("/login");
  }

  // Server Action for SignOut
  const handleSignOut = async () => {
    "use server";
    await signOut({ redirectTo: "/login" });
  };

  return (
    <div className="h-screen bg-blueprint-950 flex flex-col lg:flex-row overflow-hidden">
      <Sidebar signOutAction={handleSignOut} />

      {/* Main Content Area */}
      <main className="flex-1 w-full relative hide-scrollbar overflow-y-auto">
        {/* Subtle Background Decoration */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] pointer-events-none" />
        
        <div className="p-4 md:p-8 lg:p-12 max-w-400 mx-auto relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}