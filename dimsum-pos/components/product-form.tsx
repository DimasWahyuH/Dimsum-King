'use client'

import { useState } from 'react'
import { createProduct, updateProduct } from '@/app/actions/products'
import { Loader2, Save } from 'lucide-react'

export function ProductForm({ onClose, product }: { onClose: () => void; product?: { id: number; name: string; category: string; costPrice: number; price: number; stock: number; imageUrl?: string } }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        setError('')
        let res
        if (product?.id) {
            res = await updateProduct(product.id, formData)
        } else {
            res = await createProduct(formData)
        }
        setLoading(false)
        if (res?.error) {
            setError(res.error)
        } else {
            onClose()
        }
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl border w-full max-w-lg mx-auto relative animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold mb-4 text-slate-800">{product ? 'Edit Produk' : 'Tambah Produk Baru'}</h3>
            <form action={handleSubmit} className="space-y-4">
                {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Nama Produk</label>
                        <input name="name" required defaultValue={product?.name} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="e.g. Siomay Udang" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
                        <input name="category" required defaultValue={product?.category} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="e.g. Kukus" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Harga Modal</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2 text-slate-400">Rp</span>
                            <input name="costPrice" type="number" required defaultValue={product?.costPrice?.toString()} className="w-full pl-10 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="3000" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Harga Jual</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2 text-slate-400">Rp</span>
                            <input name="price" type="number" required defaultValue={product?.price?.toString()} className="w-full pl-10 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="5000" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Stok Awal</label>
                        <input name="stock" type="number" required defaultValue={product?.stock?.toString()} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="100" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">URL Gambar</label>
                        <input name="imageUrl" type="url" defaultValue={product?.imageUrl} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="https://..." />
                    </div>
                </div>

                <div className="flex justify-end pt-4 gap-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium">Batal</button>
                    <button type="submit" disabled={loading} className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 font-bold shadow-lg shadow-orange-200 transition-all">
                        {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                        {product ? 'Simpan Perubahan' : 'Simpan Produk'}
                    </button>
                </div>
            </form>
        </div>
    )
}
