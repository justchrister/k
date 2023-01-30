import { createClient } from '@supabase/supabase-js'
import { oklog } from '~/composables/oklog'
import { v4 as uuidv4 } from 'uuid';

export default defineEventHandler( async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const supabase = createClient("https://urgitfsodtrsbtcbwnpv.supabase.co", runtimeConfig.supabase_service_role)
  const body = await readBody(event)
  const random_uuid = uuidv4()

  function random(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const {data: random_node, error: random_node_error} = await supabase
    .from('nodes')
    .select('node_id')
    .gte('node_id', random_uuid)
  if(random_node_error){
    oklog('error', 'could not get a random node_id: '+ random_error.message)
    return {
      "error": random_node_error.message
    }
  }
  const {data: currencies, error: currencies_error} = await supabase
    .from('currencies')
    .select()
    .eq('available', true)

  let node_id, currency, amount;
  let result = []
  let count = 0;
  for (let i = 0; i < random(100,500); i++) {
    node_id = random_node[random(0, random_node.length-1)].node_id; 
    currency = currencies[random(0, currencies.length-1)].iso;
    amount = random(2, 200)
    
    const {data, error} = await supabase
      .from('dividends')
      .insert({ 
        'node_id': node_id,
        'amount': amount,
        'currency': currency,
        'status': 0
      })
      .select()
      .single()

    if (error) oklog('warn', 'failed to create dividend')
    if (data) {
      result.push({
        'dividend_id': data.dividend_id,
        'amount': amount,
        'currency': currency
      })
      count = count + 1
      oklog('success', 'dividend registered')
    }
  }
  return { 'created dividends' : count, result }
});