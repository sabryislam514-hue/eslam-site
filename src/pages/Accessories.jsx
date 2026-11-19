// src/pages/Accessories.jsx
import { useSite } from '../context/SiteContext'

export default function Accessories() {
  const { settings } = useSite()

  const products = [
    { name: 'سلسلة قلب دهبي', price: '150 ج', old: '220 ج', emoji: '💛' },
    { name: 'حلق لولي', price: '120 ج', old: '180 ج', emoji: '🤍' },
    { name: 'خاتم فراشة', price: '90 ج', old: '140 ج', emoji: '🦋' },
    { name: 'اسورة نجوم', price: '110 ج', old: '160 ج', emoji: '⭐' },
    { name: 'سلسلة اسم', price: '200 ج', old: '280 ج', emoji: '✨' },
    { name: 'توكة ورد', price: '75 ج', old: '110 ج', emoji: '🌸' },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fff5f7' }}>
      {/* Hero */}
      <div className="text-center py-16 px-4 text-white" style={{ backgroundColor: settings.accessories_primary }}>
        <h1 className="text-4xl font-black mb-2">اكسيسوريز لولي ✨</h1>
        <p className="opacity-90">حاجات كيوت، اسعار على قد الايد، وشحن لكل مكان</p>
      </div>

      {/* المنتجات */}
      <div className="max-w-5xl mx-auto py-12 px-4 grid grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.name} className="bg-white rounded-3xl p-5 shadow-sm border text-center">
            <div className="text-6xl mb-3">{p.emoji}</div>
            <h2 className="font-bold">{p.name}</h2>
            <div className="mt-2">
              <span className="font-black" style={{ color: settings.accessories_primary }}>{p.price}</span>
              <span className="text-gray-400 line-through text-sm mr-2">{p.old}</span>
            </div>
            <a href={`https://wa.me/${settings.whatsapp_number}?text=عايزة اطلب ${p.name}`} target="_blank" className="inline-block mt-3 text-white px-5 py-2 rounded-full text-sm font-bold w-full" style={{ backgroundColor: settings.accessories_primary }}>
              اطلبي واتساب
            </a>
          </div>
        ))}
      </div>

      <div className="text-center pb-12 text-gray-500 text-sm">
        توصيل لكل المحافظات - الدفع عند الاستلام
      </div>
    </div>
  )
}