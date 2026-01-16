'use client'

import { useState } from "react"
import { ProductForm } from "@/components/product-form"
import { Plus, Search, Trash2, Pencil } from "lucide-react"
import { deleteProduct } from "@/app/actions/products"
import { formatRupiah } from "@/lib/utils"

export function ProductsClient({ initialProducts }: { initialProducts: any[] }) {
    const [showForm, setShowForm] = useState(false)
    const [search, setSearch] = useState('')
    const [editingProduct, setEditingProduct] = useState<any>(null)

    const filtered = initialProducts.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    )

    async function handleDelete(id: number) {
        if (confirm('Yakin ingin menghapus produk ini?')) {
            await deleteProduct(id)
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">Manajemen Produk</h2>
                    <p className="text-slate-500">Kelola daftar menu dan stok dimsum.</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-orange-200 flex items-center gap-2 transition hover:-translate-y-0.5"
                >
                    <Plus size={20} /> Tambah Produk
                </button>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
                    <ProductForm onClose={() => { setShowForm(false); setEditingProduct(null); }} product={editingProduct} />
                </div>
            )}

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Cari nama dimsum atau kategori..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all shadow-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-100 text-slate-500 text-sm font-semibold uppercase tracking-wider">
                                <th className="py-4 px-4 pl-6">Nama Produk</th>
                                <th className="py-4 px-4">Kategori</th>
                                <th className="py-4 px-4">Harga Modal</th>
                                <th className="py-4 px-4">Harga Jual</th>
                                <th className="py-4 px-4">Stok</th>
                                <th className="py-4 px-4 pr-6 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-12 text-center text-slate-400 italic">Tidak ada produk ditemukan</td>
                                </tr>
                            ) : filtered.map((product) => (
                                <tr key={product.id} className="hover:bg-orange-50/50 transition duration-150">
                                    <td className="py-4 px-4 pl-6 font-semibold text-slate-800">{product.name}</td>
                                    <td className="py-4 px-4">
                                        <span className="px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-slate-500 font-mono text-sm">{formatRupiah(Number(product.costPrice))}</td>
                                    <td className="py-4 px-4 font-bold text-orange-600 font-mono">{formatRupiah(Number(product.price))}</td>
                                    <td className={`py-4 px-4 font-medium ${product.stock <= 10 ? 'text-red-500' : 'text-slate-700'}`}>
                                        {product.stock} {product.stock <= 10 && <span className="text-xs ml-1 bg-red-100 text-red-600 px-1.5 py-0.5 rounded">Low</span>}
                                    </td>
                                    <td className="py-4 px-4 pr-6 text-right">
                                        <button
                                            onClick={() => { setEditingProduct(product); setShowForm(true); }}
                                            className="text-slate-400 hover:text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition"
                                            title="Edit"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                                            title="Hapus"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
