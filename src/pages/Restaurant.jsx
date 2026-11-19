// src/pages/Restaurant.jsx
import { useSite } from '../context/SiteContext'
import { useState } from 'react'

export default function Restaurant() {
  const { settings } = useSite()
  const [cat, setCat] = useState('all')

  const items = [
    { name: 'قهوة تركي', price: '35 ج', cat: 'drinks', emoji: '☕' },
    { name: 'كابتشينو', price: '55 ج', cat: 'drinks', emoji: '🥤' },
    { name: 'برجر كلاسيك', price: '120 ج', cat: 'food', emoji: '🍔' },
    { name: 'بيتزا مارجريتا', price: '140 ج', cat: 'food', emoji: '🍕' },
    { name: 'تشيز كيك', price: '70 ج', cat: 'dessert', emoji: '🍰' },
    { name: 'ام علي', price: '60 ج', cat: 'dessert', emoji: '🍮' },
  ]

  const filtered = cat === 'all' ? items : items.filter(i => i.cat === cat)

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fffbeb' }}>
      {/* Hero */}
      <div className="text-center py-16 px-4 text-white" style={{ backgroundColor: settings.restaurant_primary }}>
        <h1 className="text-4xl font-black mb-2">قهوة ومطعم المزاج ☕</h1>
        <p className="opacity-90">اكل بيتي، قهوة مظبوطة، وقعدة تروق</p>
      </div>

      {/* الفلاتر */}
      <div className="flex justify-center gap-2 py-6 px-4">
        {[
          { id: 'all', label: 'الكل' },
          { id: 'drinks', label: 'مشروبات' },
          { id: 'food', label: 'اكل' },
          { id: 'dessert', label: 'حلويات' },
        ].map((b) => (
          <button
            key={b.id} onClick={() => setCat(b.id)}
            className={`px-5 py-2 rounded-full font-bold ${cat === b.id ? 'text-white' : 'bg-white border'}`}
            style={cat === b.id ? { backgroundColor: settings.restaurant_primary } : {}}
          >
            {b.label}
          </button>
        ))}
      </div>

      {/* المينيو */}
      <div className="max-w-5xl mx-auto pb-12 px-4 grid md:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <div key={item.name} className="bg-white rounded-3xl p-6 shadow-sm border text-center">
            <div className="text-6xl mb-3">{item.emoji}</div>
            <h2 className="font-bold text-lg">{item.name}</h2>
            <p className="font-bold mt-2" style={{ color: settings.restaurant_primary }}>{item.price}</p>
            <a href={`https://wa.me/${settings.whatsapp_number}?text=عايز اطلب ${item.name}`} target="_blank" className="inline-block mt-3 text-white px-5 py-2 rounded-full text-sm font-bold" style={{ backgroundColor: settings.restaurant_primary }}>
              اطلب واتساب
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}