// src/context/SiteContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const SiteContext = createContext()

// الالوان الافتراضية - اللي انا دلعتك بيها من ذوقي
const defaultSettings = {
  // الموقع الرئيسي
  site_title: 'eslam',
  hero_text: 'بعمل مواقع تخلي شغلك يبان بروفيشنال',
  whatsapp_number: '01505132949',
  main_color: '#8b5cf6', // بنفسجي
  secondary_color: '#0a0a0a', // اسود
  bg_color: '#ffffff',

  // منصة المدرس
  teacher_primary: '#2563eb', // ازرق
  teacher_secondary: '#ffffff',

  // مطعم / قهوة
  restaurant_primary: '#78350f', // بني
  restaurant_secondary: '#fef3c7', // بيج

  // اكسيسوريز
  accessories_primary: '#ec4899', // وردي
  accessories_secondary: '#0a0a0a', // اسود
}

export function SiteProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings)
  const [loading, setLoading] = useState(true)

  // هات الاعدادات من Supabase اول ما الموقع يفتح
  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
    
    if (!error && data) {
      const newSettings = { ...defaultSettings }
      data.forEach((row) => {
        newSettings[row.key] = row.value
      })
      setSettings(newSettings)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchSettings()

    // Realtime: لو عدلت من الادمن، الموقع يتغير لوحده
    const channel = supabase
      .channel('site_settings_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_settings' }, () => {
        fetchSettings()
      })
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  // دالة التعديل - دي اللي الـ Admin هيستخدمها
  const updateSetting = async (key, value) => {
    // حدث في الشاشة على طول
    setSettings((prev) => ({ ...prev, [key]: value }))

    // احفظ في Supabase
    const { error } = await supabase
      .from('site_settings')
      .upsert({ key, value }, { onConflict: 'key' })

    if (error) console.log('Error saving:', error)
  }

  return (
    <SiteContext.Provider value={{ settings, updateSetting, loading, fetchSettings }}>
      {children}
    </SiteContext.Provider>
  )
}

export const useSite = () => useContext(SiteContext)