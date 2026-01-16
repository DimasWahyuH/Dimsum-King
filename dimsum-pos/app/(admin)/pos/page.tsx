import { getProducts } from "@/app/actions/products"
import { PosSystem } from "@/components/pos-system"

export const dynamic = 'force-dynamic'

export default async function PosPage() {
    const products = await getProducts()
    return (
        <div className="h-full">
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-slate-800">Kasir (Point of Sales)</h1>
                <p className="text-slate-500 text-sm">Pilih menu dan proses pembayaran.</p>
            </div>
            <PosSystem products={products} />
        </div>
    )
}
