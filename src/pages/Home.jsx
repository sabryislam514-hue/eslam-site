// src/pages/Home.jsx
import { Link } from 'react-router-dom'
import { useSite } from '../context/SiteContext'

export default function Home() {
  const { settings } = useSite()
  const whatsappLink = `https://wa.me/${settings.whatsapp_number}`

  const demos = [
    { to: '/teacher', title: 'منصة مدرس', desc: 'كورسات، واجبات، واشتراكات', color: settings.teacher_primary, emoji: '📚' },
    { to: '/restaurant', title: 'مطعم / قهوة', desc: 'مينيو شيك بأسعار وصور', color: settings.restaurant_primary, emoji: '☕' },
    { to: '/accessories', title: 'اكسيسوريز', desc: 'سلاسل وحلقان بشكل بناتي شيك', color: settings.accessories_primary, emoji: '✨' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="text-center py-20 px-4" style={{ backgroundColor: settings.secondary_color }}>
        <h1 className="text-5xl font-black text-white mb-4">{settings.site_title}</h1>
        <p className="text-gray-300 text-lg mb-8">{settings.hero_text}</p>
        <div className="flex gap-3 justify-center">
          <a href={whatsappLink} target="_blank" className="px-6 py-3 rounded-full text-white font-bold" style={{ backgroundColor: settings.main_color }}>
            كلمني واتساب
          </a>
          <a href="#demos" className="px-6 py-3 rounded-full bg-white font-bold">شوف شغلي</a>
        </div>
      </div>

      {/* الديموهات */}
      <div id="demos" className="max-w-5xl mx-auto py-14 px-4 grid md:grid-cols-3 gap-5">
        {demos.map((d) => (
          <Link key={d.to} to={d.to} className="border rounded-3xl p-6 hover:shadow-xl transition bg-white">
            <div className="text-5xl mb-4">{d.emoji}</div>
            <h2 className="text-xl font-bold mb-1">{d.title}</h2>
            <p className="text-gray-500 text-sm mb-4">{d.desc}</p>
            <span className="text-white px-4 py-2 rounded-full text-sm font-bold inline-block" style={{ backgroundColor: d.color }}>
              شوف الديمو →
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}