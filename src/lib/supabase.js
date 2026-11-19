// src/lib/supabase.js
// ده ملف الربط بين الموقع و Supabase

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uqradczopxutdhtcnln.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxcmFkY3pvb3B4dXRkaHRjbmxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUwODUxNjUsImV4cCI6MjExMDY2MTE2NX0.EYqiJZWrLlC_-URgYY0SEpi0Y1gwUnaal1Ph82z-iFU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// دالة مساعدة: بتحول رقم التليفون لايميل عشان Supabase Auth
// انت هتدخل بـ 01101627917 في الـ Admin
// وهي هتتحول لوحدها لـ 01101627917@eslam-eg.com جوه Supabase
export const phoneToEmail = (phone) => {
  const cleanPhone = phone.replace(/\s+/g, '').trim()
  return `${cleanPhone}@eslam-eg.com`
}