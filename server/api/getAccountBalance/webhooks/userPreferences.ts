import { ok } from '~/composables/ok'
import { pub, sub } from '~/composables/messagingNext';
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const service = 'getAccountBalance';
  const topic = 'userPreferences';
  const serviceKebab = ok.camelToKebab(service);
  const topicKebab = ok.camelToKebab(topic);
  const query = getQuery(event);
  const body = await readBody(event);
  if(body.record.message_read) return 'message already read';

  const message = await messaging.getEntity(
    supabase,
    topic,
    body.record.message_entity)

  await messaging.read( supabase, topic, service, body.record.message_id)
  
  let json = {
    "userId": message.userId,
    "amount": null,
    "currency": message.currency
  }

  const getTransactions = async () => {
      const { data, error } = await supabase
      .from('topic_accountTransactions')
      .select()
      .or('transactionStatus.eq.paymentAccepted,transactionStatus.eq.withdrawalAccepted')
      .eq('userId', message.userId);
    return data
  }
  const transactions = await getTransactions();

  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    const amountConverted = await messaging.convertCurrency(
      supabase,
      transaction.amount, 
      transaction.currency,
      message.currency
    );
    json.amount += parseFloat(amountConverted);
  }

  const { data, error } = await supabase
    .from('getAccountBalance')
    .upsert(json)
    .select()
  
  if(data) return data
  if(error) return error
});