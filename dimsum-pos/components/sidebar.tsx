'use client'

import { LayoutDashboard, ShoppingCart, Package, FileText } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/pos', label: 'Kasir (POS)', icon: ShoppingCart },
    { href: '/products', label: 'Produk', icon: Package },
    { href: '/reports', label: 'Laporan', icon: FileText },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-64 bg-white border-r h-screen hidden md:flex flex-col fixed left-0 top-0 z-50 shadow-sm">
            <div className="p-6">
                <h1 className="text-2xl font-extrabold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                    Dimsum POS
                </h1>
                <p className="text-slate-500 text-sm mt-1">Delicious Management</p>
            </div>
            <nav className="flex-1 px-4 space-y-2 mt-4">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium duration-200",
                                isActive
                                    ? "bg-orange-50 text-orange-600 shadow-sm ring-1 ring-orange-100"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:pl-5 transition-[padding]"
                            )}
                        >
                            <Icon size={20} className={cn(isActive && "text-orange-500")} />
                            {item.label}
                        </Link>
                    )
                })}
            </nav>
            <div className="p-4 border-t bg-slate-50/50">
                <div className="flex items-center gap-3 px-4 py-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-400 to-red-500 flex items-center justify-center text-white font-bold shadow-md">
                        AD
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-700">Admin</p>
                        <p className="text-xs text-slate-500">Owner</p>
                    </div>
                </div>
            </div>
        </aside>
    )
}
