import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen pb-20 md:pb-0 bg-slate-50">
            <Sidebar />
            <main className="flex-1 ml-0 md:ml-64 p-4 md:p-8 min-h-screen w-full">
                {children}
            </main>
            <MobileNav />
        </div>
    );
}
