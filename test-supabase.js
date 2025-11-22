// Test Supabase connection
import { supabase } from './src/lib/supabase.js'

async function testConnection() {
  try {
    console.log('Testing Supabase connection...')
    
    // Test basic connection
    const { data, error } = await supabase
      .from('church_registrations')
      .select('count', { count: 'exact' })
    
    if (error) {
      console.error('Connection error:', error)
    } else {
      console.log('✅ Connected successfully!')
      console.log('Church registrations table exists')
    }
  } catch (err) {
    console.error('❌ Connection failed:', err.message)
  }
}

testConnection()