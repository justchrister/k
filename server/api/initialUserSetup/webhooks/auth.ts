import { ok } from '~/composables/ok'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const body = await readBody(event)
  const userId = body.record.id;

  const addPortfolioDays = async () => {
    
  }



  if(data) return data
  if(error) return error
});