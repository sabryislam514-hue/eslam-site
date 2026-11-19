// src/pages/Admin.jsx
import { useState, useEffect } from 'react'
import { supabase, phoneToEmail } from '../lib/supabase'
import { useSite } from '../context/SiteContext'

export default function Admin() {
  const { settings, updateSetting } = useSite()
  const [user, setUser] = useState(null)
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState('home') // home | teacher | restaurant | accessories
  const [msg, setMsg] = useState('')

  // شوف لو داخل قبل كده
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user || null))
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMsg('')
    const email = phoneToEmail(phone)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMsg('رقم التليفون او الباسورد غلط')
    else setUser(data.user)
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const save = async (key, value) => {
    await updateSetting(key, value)
    setMsg('تم الحفظ ✅')
    setTimeout(() => setMsg(''), 2000)
  }

  // لو مش داخل، اظهر شاشة الدخول
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black px-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl w-full max-w-sm space-y-4">
          <h1 className="text-2xl font-bold text-center">لوحة تحكم eslam</h1>
          <input
            value={phone} onChange={(e) => setPhone(e.target.value)}
            placeholder="رقم التليفون 01101627917"
            className="w-full border p-3 rounded-xl"
          />
          <input
            type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="الباسورد"
            className="w-full border p-3 rounded-xl"
          />
          <button className="w-full bg-violet-600 text-white p-3 rounded-xl font-bold">
            {loading ? 'جاري الدخول...' : 'دخول'}
          </button>
          {msg && <p className="text-red-500 text-center text-sm">{msg}</p>}
        </form>
      </div>
    )
  }

  // لو داخل، اظهر لوحة التحكم
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">اهلا يا اسلام 👋</h1>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-xl">خروج</button>
        </div>

        {msg && <p className="bg-green-100 text-green-700 p-3 rounded-xl mb-4 text-center">{msg}</p>}

        {/* التبويبات - التقسيمة اللي اتفقنا عليها */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { id: 'home', label: 'Home - موقعك' },
            { id: 'teacher', label: 'منصة المدرس' },
            { id: 'restaurant', label: 'مطعم / قهوة' },
            { id: 'accessories', label: 'اكسيسوريز' },
          ].map((t) => (
            <button
              key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap font-bold ${tab === t.id ? 'bg-black text-white' : 'bg-white'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* قسم Home */}
        {tab === 'home' && (
          <div className="bg-white p-6 rounded-2xl space-y-4">
            <h2 className="font-bold text-lg">تحكم الموقع الرئيسي</h2>
            <label className="block">اسم الموقع
              <input value={settings.site_title} onChange={(e) => save('site_title', e.target.value)} className="w-full border p-3 rounded-xl mt-1" />
            </label>
            <label className="block">الكلام تحت اسمك
              <input value={settings.hero_text} onChange={(e) => save('hero_text', e.target.value)} className="w-full border p-3 rounded-xl mt-1" />
            </label>
            <label className="block">رقم الواتساب
              <input value={settings.whatsapp_number} onChange={(e) => save('whatsapp_number', e.target.value)} className="w-full border p-3 rounded-xl mt-1" />
            </label>
            <div className="flex gap-4">
              <label>اللون الرئيسي
                <input type="color" value={settings.main_color} onChange={(e) => save('main_color', e.target.value)} className="w-full h-12" />
              </label>
              <label>اللون التانوي
                <input type="color" value={settings.secondary_color} onChange={(e) => save('secondary_color', e.target.value)} className="w-full h-12" />
              </label>
            </div>
          </div>
        )}

        {/* قسم المدرس */}
        {tab === 'teacher' && (
          <div className="bg-white p-6 rounded-2xl space-y-4">
            <h2 className="font-bold text-lg">الوان منصة المدرس</h2>
            <label>اللون الرئيسي
              <input type="color" value={settings.teacher_primary} onChange={(e) => save('teacher_primary', e.target.value)} className="w-full h-12" />
            </label>
          </div>
        )}

        {/* قسم المطعم */}
        {tab === 'restaurant' && (
          <div className="bg-white p-6 rounded-2xl space-y-4">
            <h2 className="font-bold text-lg">الوان المطعم / القهوة</h2>
            <label>اللون الرئيسي
              <input type="color" value={settings.restaurant_primary} onChange={(e) => save('restaurant_primary', e.target.value)} className="w-full h-12" />
            </label>
          </div>
        )}

        {/* قسم الاكسيسوريز */}
        {tab === 'accessories' && (
          <div className="bg-white p-6 rounded-2xl space-y-4">
            <h2 className="font-bold text-lg">الوان الاكسيسوريز</h2>
            <label>اللون الرئيسي
              <input type="color" value={settings.accessories_primary} onChange={(e) => save('accessories_primary', e.target.value)} className="w-full h-12" />
            </label>
          </div>
        )}
      </div>
    </div>
  )
}