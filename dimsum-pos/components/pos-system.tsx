'use client'

import { useState } from 'react'
import { useCartStore } from '@/lib/store'
import { formatRupiah, cn } from '@/lib/utils'
import { Search, Plus, Minus, Trash2, ShoppingCart, Loader2 } from 'lucide-react'
import { createTransaction } from '@/app/actions/transactions'

export function PosSystem({ products }: { products: any[] }) {
    const [search, setSearch] = useState('')
    const { items, addItem, removeItem, updateQuantity, getTotal, clearCart } = useCartStore()
    const [processing, setProcessing] = useState(false)

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    )

    async function handleCheckout() {
        if (items.length === 0) return
        if (!confirm('Proses transaksi ini?')) return

        setProcessing(true)
        const res = await createTransaction(items, getTotal())
        setProcessing(false)

        if (res?.success) {
            alert('Transaksi Berhasil!')
            clearCart()
        } else {
            alert(`Gagal: ${res?.error}`)
        }
    }

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)] animate-in fade-in duration-500">
            {/* Product Grid */}
            <div className="flex-1 flex flex-col gap-6">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-orange-500 text-lg transition-all"
                        placeholder="Cari menu dimsum..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 pb-4 custom-scrollbar">
                    {filtered.map(product => (
                        <button
                            key={product.id}
                            disabled={product.stock === 0}
                            onClick={() => addItem(product)}
                            className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-lg transition-all text-left flex flex-col justify-between group border border-transparent hover:border-orange-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none hover:-translate-y-1"
                        >
                            <div className="w-full">
                                <div className="h-32 bg-slate-100 rounded-xl mb-4 bg-cover bg-center relative overflow-hidden group-disabled:grayscale" style={{ backgroundImage: `url(${product.imageUrl || 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&q=80&w=300&h=300'})` }}>
                                    {product.stock === 0 && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold">Habis</div>
                                    )}
                                </div>
                                <h3 className="font-bold text-slate-800 group-hover:text-orange-600 transition line-clamp-2 leading-tight">{product.name}</h3>
                                <p className="text-xs text-slate-500 mt-1 uppercase tracking-wide">{product.category}</p>
                            </div>
                            <div className="mt-3 flex justify-between items-end">
                                <div className="font-bold text-orange-600 text-lg">{formatRupiah(Number(product.price))}</div>
                                <div className={`text-xs ${product.stock <= 5 ? 'text-red-500 font-bold' : 'text-slate-400'}`}>Stok: {product.stock}</div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Cart Sidebar */}
            <div className="w-full lg:w-96 bg-white rounded-3xl shadow-xl flex flex-col h-full overflow-hidden border border-slate-100">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                            <ShoppingCart size={18} />
                        </div>
                        Keranjang
                    </h2>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                            <ShoppingCart size={48} className="opacity-20" />
                            <p>Keranjang masih kosong</p>
                        </div>
                    ) : items.map(item => (
                        <div key={item.id} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 hover:border-orange-200 hover:shadow-sm transition group">
                            <div className="w-12 h-12 rounded-lg bg-slate-100 bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url(${item.imageUrl || 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&q=80&w=100&h=100'})` }}></div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-sm text-slate-800 truncate">{item.name}</h4>
                                <p className="text-xs text-orange-600 font-bold">{formatRupiah(item.price * item.quantity)}</p>
                            </div>
                            <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} className="w-6 h-6 flex items-center justify-center hover:bg-white rounded shadow-sm disabled:opacity-50 transition"><Minus size={12} /></button>
                                <span className="text-sm font-bold w-6 text-center tabular-nums">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center hover:bg-white rounded shadow-sm transition"><Plus size={12} /></button>
                            </div>
                            <button onClick={() => removeItem(item.id)} className="text-slate-300 hover:text-red-500 p-1.5 transition"><Trash2 size={16} /></button>
                        </div>
                    ))}
                </div>

                <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-slate-500">
                            <span>Subtotal</span>
                            <span>{formatRupiah(getTotal())}</span>
                        </div>
                        <div className="flex justify-between items-center text-xl font-bold text-slate-900 border-t border-slate-200 pt-2">
                            <span>Total</span>
                            <span>{formatRupiah(getTotal())}</span>
                        </div>
                    </div>

                    <button
                        onClick={handleCheckout}
                        disabled={items.length === 0 || processing}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold shadow-lg shadow-orange-200 transition-all flex justify-center items-center gap-2 transform active:scale-95"
                    >
                        {processing ? <Loader2 className="animate-spin" /> : 'Bayar Sekarang'}
                    </button>
                </div>
            </div>
        </div>
    )
}
