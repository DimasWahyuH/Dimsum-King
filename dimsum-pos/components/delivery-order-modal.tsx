'use client'

import { useState, useEffect } from "react"
import { X, Search, ShoppingBag, Loader2, CheckCircle2, User, Phone, MapPin } from "lucide-react"
import { getProducts } from "@/app/actions/products"
import { createTransaction } from "@/app/actions/transactions"
import { formatRupiah } from "@/lib/utils"
import Image from "next/image"

export function DeliveryOrderModal({ onClose }: { onClose: () => void }) {
    const [step, setStep] = useState(1) // 1: Form, 2: Menu, 3: QRIS, 4: Success
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState<any[]>([])
    const [cart, setCart] = useState<any[]>([])
    const [search, setSearch] = useState('')

    // Customer Info
    const [customer, setCustomer] = useState({
        name: '',
        phone: '',
        address: ''
    })

    useEffect(() => {
        async function load() {
            const data = await getProducts()
            setProducts(data)
        }
        load()
    }, [])

    const total = cart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0)

    function addToCart(product: any) {
        const existing = cart.find(item => item.id === product.id)
        if (existing) {
            setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
        } else {
            setCart([...cart, { ...product, quantity: 1 }])
        }
    }

    function removeFromCart(id: number) {
        const existing = cart.find(item => item.id === id)
        if (existing.quantity > 1) {
            setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        } else {
            setCart(cart.filter(item => item.id !== id))
        }
    }

    async function handlePayment() {
        setStep(3)
        // Simulate 5 seconds QRIS
        setTimeout(async () => {
            setLoading(true)
            const res = await createTransaction(cart, total, { name: customer.name, phone: customer.phone }, 'DELIVERY')
            setLoading(false)
            if (res.success) {
                setStep(4)
            } else {
                alert(res.error || "Gagal memproses pesanan")
                setStep(2)
            }
        }, 5000)
    }

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-300">

                {/* Header */}
                <div className="p-6 border-b flex justify-between items-center bg-slate-50">
                    <div>
                        <h2 className="text-2xl font-black text-slate-800">Pesan Dimsum King</h2>
                        <div className="flex gap-2 mt-1">
                            {[1, 2, 3].map(i => (
                                <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${step >= i ? 'w-8 bg-orange-600' : 'w-4 bg-slate-200'}`} />
                            ))}
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition text-slate-400">
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">

                    {step === 1 && (
                        <div className="max-w-md mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                            <div className="text-center">
                                <p className="text-slate-500">Silakan isi data pengiriman Anda.</p>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-2">
                                        <User size={16} /> Nama Lengkap
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium"
                                        placeholder="Contoh: Budi Santoso"
                                        value={customer.name}
                                        onChange={e => setCustomer({ ...customer, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-2">
                                        <Phone size={16} /> Nomor WhatsApp
                                    </label>
                                    <input
                                        type="tel"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium"
                                        placeholder="0812xxxx"
                                        value={customer.phone}
                                        onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-2">
                                        <MapPin size={16} /> Alamat Pengiriman
                                    </label>
                                    <textarea
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium"
                                        placeholder="Jl. Mawar No. 123, Jakarta Selatan"
                                        value={customer.address}
                                        onChange={e => setCustomer({ ...customer, address: e.target.value })}
                                    />
                                </div>
                            </div>
                            <button
                                disabled={!customer.name || !customer.phone}
                                onClick={() => setStep(2)}
                                className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-slate-300 text-white font-black py-4 rounded-xl shadow-lg shadow-orange-200 transition-all"
                            >
                                Lanjut Pilih Menu
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="grid lg:grid-cols-3 gap-8 animate-in slide-in-from-right-4 duration-500">
                            <div className="lg:col-span-2 space-y-6">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Cari dimsum favoritmu..."
                                        className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-100 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all shadow-inner"
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {filtered.map(p => (
                                        <div key={p.id} className="p-3 bg-white border border-slate-100 rounded-2xl flex gap-4 hover:border-orange-300 transition-all cursor-pointer group" onClick={() => addToCart(p)}>
                                            <div className="w-20 h-20 bg-slate-100 rounded-xl relative overflow-hidden shrink-0">
                                                {p.imageUrl ? (
                                                    <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-slate-300"><ShoppingBag size={24} /></div>
                                                )}
                                            </div>
                                            <div className="flex flex-col justify-center overflow-hidden">
                                                <h4 className="font-bold text-slate-800 line-clamp-1">{p.name}</h4>
                                                <p className="text-orange-600 font-bold text-sm">{formatRupiah(Number(p.price))}</p>
                                                <p className="text-[10px] text-slate-400 uppercase font-black mt-1">{p.category}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex flex-col h-full sticky top-0">
                                <div className="flex items-center gap-2 mb-6">
                                    <ShoppingBag className="text-orange-600" />
                                    <h3 className="font-black text-slate-800">Pesanan Saya</h3>
                                </div>

                                <div className="flex-1 space-y-4 overflow-y-auto min-h-[200px]">
                                    {cart.length === 0 ? (
                                        <div className="h-full flex flex-col items-center justify-center text-center p-4">
                                            <ShoppingBag size={48} className="text-slate-200 mb-2" />
                                            <p className="text-slate-400 text-sm italic">Belum ada menu dipilih</p>
                                        </div>
                                    ) : cart.map(item => (
                                        <div key={item.id} className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                                            <div className="overflow-hidden mr-2">
                                                <p className="font-bold text-sm text-slate-800 line-clamp-1">{item.name}</p>
                                                <p className="text-xs text-slate-500">{formatRupiah(Number(item.price))}</p>
                                            </div>
                                            <div className="flex items-center gap-3 shrink-0">
                                                <button onClick={() => removeFromCart(item.id)} className="w-7 h-7 flex items-center justify-center bg-slate-100 rounded-lg hover:bg-slate-200 text-slate-600 transition">-</button>
                                                <span className="font-black text-sm w-4 text-center">{item.quantity}</span>
                                                <button onClick={() => addToCart(item)} className="w-7 h-7 flex items-center justify-center bg-orange-100 rounded-lg hover:bg-orange-200 text-orange-600 transition">+</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 pt-6 border-t border-dashed border-slate-300 space-y-4">
                                    <div className="flex justify-between items-center text-lg">
                                        <span className="font-bold text-slate-600">Total</span>
                                        <span className="font-black text-orange-600">{formatRupiah(total)}</span>
                                    </div>
                                    <button
                                        disabled={cart.length === 0}
                                        onClick={handlePayment}
                                        className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:opacity-50 text-white font-black py-4 rounded-xl shadow-lg shadow-orange-200 transition-all flex justify-center items-center gap-2"
                                    >
                                        Bayar via QRIS
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="max-w-xs mx-auto text-center py-10 animate-in fade-in zoom-in duration-500">
                            <h3 className="text-xl font-black text-slate-800 mb-2">Scan QRIS</h3>
                            <p className="text-slate-500 text-sm mb-8">Silakan scan kode QR di bawah ini untuk membayar.</p>

                            <div className="bg-white p-4 rounded-3xl border-4 border-slate-100 shadow-xl relative aspect-square">
                                {/* Simulated QRIS */}
                                <div className="w-full h-full bg-slate-50 flex items-center justify-center relative">
                                    <img
                                        src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=DIMSUMKING-PAYMENT"
                                        alt="QRIS Code"
                                        width={250}
                                        height={250}
                                        className="opacity-80"
                                    />
                                    <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] flex flex-col items-center justify-center">
                                        <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin shadow-lg"></div>
                                        <p className="mt-4 font-black text-orange-600 animate-pulse">Menunggu Pembayaran...</p>
                                    </div>
                                </div>
                            </div>

                            <p className="mt-8 text-xs text-slate-400">Otomatis dialihkan setelah pembayaran terdeteksi (5 detik)</p>

                            {loading && (
                                <div className="mt-4 flex items-center justify-center gap-2 text-slate-600 font-bold">
                                    <Loader2 className="animate-spin" /> Memproses Pesanan...
                                </div>
                            )}
                        </div>
                    )}

                    {step === 4 && (
                        <div className="max-w-md mx-auto text-center py-12 animate-in bounce-in duration-500">
                            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-100">
                                <CheckCircle2 size={64} />
                            </div>
                            <h2 className="text-3xl font-black text-slate-800 mb-2">Pesanan Diterima!</h2>
                            <p className="text-slate-600 mb-8 leading-relaxed">
                                Yeay! Pesanan kamu sedang diproses. <br />
                                Dimsum akan segera diantar ke alamatmu.
                            </p>
                            <div className="bg-slate-50 p-4 rounded-2xl text-left border border-slate-100 mb-8">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Status Pengiriman</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-orange-600 animate-ping"></div>
                                    <p className="font-bold text-slate-800">Menunggu Konfirmasi Admin</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-full bg-slate-900 hover:bg-black text-white font-black py-4 rounded-xl transition-all shadow-xl"
                            >
                                Kembali ke Beranda
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}
