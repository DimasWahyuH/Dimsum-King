'use client'
import { LayoutDashboard, ShoppingCart, Package, FileText } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function MobileNav() {
    const pathname = usePathname()

    const navItems = [
        { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/products', label: 'Produk', icon: Package },
        { href: '/pos', label: 'Kasir', icon: ShoppingCart },
        { href: '/reports', label: 'Laporan', icon: FileText },
    ]

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 flex justify-around items-center px-4 py-3 pb-6 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            {navItems.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex flex-col items-center gap-1 rounded-xl transition-all w-full",
                            isActive ? "text-orange-600" : "text-slate-400 hover:text-slate-600"
                        )}
                    >
                        <div className={cn("p-1.5 rounded-xl transition-all", isActive && "bg-orange-50 transform -translate-y-1")}>
                            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                        </div>
                        <span className={cn("text-[10px] font-bold", isActive ? "text-orange-600" : "text-transparent")}>{item.label}</span>
                    </Link>
                )
            })}
        </div>
    )
}
