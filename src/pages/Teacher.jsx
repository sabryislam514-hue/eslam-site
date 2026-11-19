// src/pages/Teacher.jsx
import { useSite } from '../context/SiteContext'

export default function Teacher() {
  const { settings } = useSite()

  const courses = [
    { title: 'فيزياء - 3 ثانوي', price: '250 ج / الشهر', lessons: '12 حصة', emoji: '⚡' },
    { title: 'كيمياء - 3 ثانوي', price: '200 ج / الشهر', lessons: '10 حصص', emoji: '🧪' },
    { title: 'رياضة - 2 ثانوي', price: '180 ج / الشهر', lessons: '8 حصص', emoji: '📐' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="text-center py-16 px-4 text-white" style={{ backgroundColor: settings.teacher_primary }}>
        <h1 className="text-4xl font-black mb-2">منصة مستر أحمد 📚</h1>
        <p className="opacity-90">شرح بسيط، واجبات، ومتابعة مع ولي الأمر</p>
        <a href={`https://wa.me/${settings.whatsapp_number}`} target="_blank" className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-full font-bold">
          اشترك دلوقتي واتساب
        </a>
      </div>

      {/* الكورسات */}
      <div className="max-w-5xl mx-auto py-12 px-4 grid md:grid-cols-3 gap-5">
        {courses.map((c) => (
          <div key={c.title} className="bg-white rounded-3xl p-6 shadow-sm border">
            <div className="text-5xl mb-4">{c.emoji}</div>
            <h2 className="text-xl font-bold mb-1">{c.title}</h2>
            <p className="text-gray-500 text-sm mb-4">{c.lessons}</p>
            <div className="flex justify-between items-center">
              <span className="font-bold" style={{ color: settings.teacher_primary }}>{c.price}</span>
              <button className="text-white px-4 py-2 rounded-full text-sm font-bold" style={{ backgroundColor: settings.teacher_primary }}>
                اشترك
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pb-12 text-gray-500 text-sm">
        دي صفحة ديمو - تقدر تتحكم في لونها من الـ Admin
      </div>
    </div>
  )
}