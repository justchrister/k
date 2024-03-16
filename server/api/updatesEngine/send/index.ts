import { ok } from '~/composables/ok'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const cohortsNew = await fetch('http://localhost:3000/api/updatesEngine/send/general/welcome', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return 'Engine updated'
});