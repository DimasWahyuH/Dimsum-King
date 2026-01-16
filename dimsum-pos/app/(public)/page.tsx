'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ShoppingBag, Star, ShieldCheck, Truck } from 'lucide-react'
import { formatRupiah } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { DeliveryOrderModal } from '@/components/delivery-order-modal'

const LandingPage = () => {
    const router = useRouter()
    const [showOrderModal, setShowOrderModal] = React.useState(false)

    return (
        <div className="font-sans text-slate-900">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-extrabold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent tracking-tight">Dimsum King</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
                        <a href="#menu" className="hover:text-orange-600 transition">Menu</a>
                        <a href="#features" className="hover:text-orange-600 transition">Keunggulan</a>
                        <a href="#about" className="hover:text-orange-600 transition">Tentang Kami</a>
                    </div>
                    {/* Admin Login Button Removed as requested */}
                    <div className="w-8"></div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
                {/* Background Blob */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-60 pointer-events-none" />

                <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-bold animate-pulse">
                            <span className="w-2 h-2 rounded-full bg-orange-600" />
                            Promo Spesial Hari Ini!
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black leading-tight text-slate-900">
                            Rasakan <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Dimsum Premium</span>
                            <br /> yang Asli.
                        </h1>
                        <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
                            Dibuat dengan bahan pilihan dan resep rahasia koki berpengalaman. Lembut, gurih, dan bikin nagih di setiap gigitan.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button
                                onClick={() => setShowOrderModal(true)}
                                className="bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-orange-200 hover:bg-orange-700 transition flex items-center justify-center gap-2 group"
                            >
                                Pesan Sekarang <ArrowRight className="group-hover:translate-x-1 transition" />
                            </button>
                        </div>

                        <div className="flex items-center gap-6 pt-6 opacity-80">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden relative">
                                        <Image
                                            src={`https://i.pravatar.cc/150?u=${i + 30}`}
                                            alt="User"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm font-semibold text-slate-600">
                                <span className="text-orange-600 font-bold">5000+</span> Pelanggan Puas
                            </div>
                        </div>
                    </div>

                    <div className="relative flex justify-center lg:justify-end animate-in fade-in zoom-in duration-1000 delay-200">
                        {/* 3D Floating Image with Custom Animation */}
                        <div className="relative w-[300px] h-[300px] lg:w-[500px] lg:h-[500px]">
                            <style jsx>{`
                  @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0px); }
                  }
                  .animate-float {
                    animation: float 4s ease-in-out infinite;
                  }
                `}</style>
                            <div className="animate-float relative z-10 w-full h-full drop-shadow-2xl">
                                {/* Using the cloud-based placeholder if generated image isn't perfect, but trying to use local first if available */}
                                <Image
                                    src="/dimsum-ori.png"
                                    alt="Floating Dimsum Basket"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>

                            {/* Floating Cards */}
                            <div className="absolute top-20 -left-6 lg:-left-2 bg-white p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] animate-bounce delay-1000 z-20 hidden md:block border border-slate-50">
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-100 p-2 rounded-full text-green-600"><ShieldCheck size={20} /></div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Kualitas</p>
                                        <p className="font-bold text-slate-800 text-sm">100% Halal</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute bottom-20 -right-6 lg:-right-2 bg-white p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] animate-bounce delay-[2000ms] z-20 hidden md:block border border-slate-50">
                                <div className="flex items-center gap-3">
                                    <div className="bg-orange-100 p-2 rounded-full text-orange-600"><Star size={20} fill="currentColor" /></div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Rating</p>
                                        <p className="font-bold text-slate-800 text-sm">4.9/5.0</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-slate-50/50">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900">Kenapa Harus Dimsum King?</h2>
                        <p className="text-slate-600">Kami tidak hanya menjual dimsum, kami menyajikan pengalaman kuliner yang tak terlupakan.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Star, title: "Premium Quality", desc: "Dibuat dari daging pilihan tanpa bahan pengawet berbahaya." },
                            { icon: Truck, title: "Pengiriman Cepat", desc: "Layanan pesan antar cepat menjamin dimsum tetap hangat saat tiba." },
                            { icon: ShieldCheck, title: "Higienis & Halal", desc: "Proses produksi yang bersih dan tersertifikasi halal MUI." }
                        ].map((feature, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition duration-300 group border border-slate-100">
                                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition">
                                    <feature.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-slate-800">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Menu Preview */}
            <section id="menu" className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold mb-2 text-slate-900">Menu Terfavorit</h2>
                            <p className="text-slate-600">Pilihan menu best-seller yang wajib kamu coba.</p>
                        </div>
                        <Link href="/pos" className="hidden md:flex items-center gap-2 text-orange-600 font-bold hover:text-orange-700 transition">
                            Lihat Semua Menu <ArrowRight size={20} />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { name: "Siomay Ayam Udang", price: 15000, img: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=600&auto=format&fit=crop" },
                            { name: "Hakau Udang", price: 18000, img: "/hakau.png" },
                            { name: "Lumpia Kulit Tahu", price: 16000, img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=600&auto=format&fit=crop" },
                            { name: "Bakpao Telur Asin", price: 14000, img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600&auto=format&fit=crop" }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-orange-200 transition-all duration-300 group hover:shadow-lg">
                                <div className="h-48 overflow-hidden relative bg-slate-100">
                                    <Image
                                        src={item.img}
                                        alt={item.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition duration-500"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-orange-600 shadow-sm">
                                        Best Seller
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-lg text-slate-800 mb-1 line-clamp-1">{item.name}</h3>
                                    <div className="flex justify-between items-center mt-3">
                                        <span className="text-slate-500 text-sm">3 Pcs/Porsi</span>
                                        <span className="font-bold text-orange-600">{formatRupiah(item.price)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center md:hidden">
                        <Link href="/pos" className="inline-flex items-center gap-2 text-orange-600 font-bold hover:text-orange-700 transition">
                            Lihat Semua Menu <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-50 py-12 border-t border-slate-100">
                <div className="container mx-auto px-6 text-center">
                    <h3 className="text-2xl font-extrabold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent mb-4">Dimsum King</h3>
                    <p className="text-slate-500 mb-8 max-w-md mx-auto">Menyajikan kebahagiaan dalam setiap keranjang bambu hangat.</p>
                    <div className="border-t border-slate-200 pt-8 text-sm text-slate-400">
                        &copy; {new Date().getFullYear()} Dimsum King Project. All rights reserved.
                    </div>
                </div>
            </footer>

            {showOrderModal && (
                <DeliveryOrderModal onClose={() => setShowOrderModal(false)} />
            )}
        </div>
    )
}

export default LandingPage
