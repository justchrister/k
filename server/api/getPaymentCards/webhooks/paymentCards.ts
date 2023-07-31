import { ok } from '~/composables/ok';
import { pub, sub } from '~/composables/messagingNext';
import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const service = 'getPaymentCards';
  const serviceKebab = ok.camelToKebab(service);
  const topic = 'paymentCards';
  const body = await readBody(event);
  
  if (body.record.message_read) return 'message already read';

  const message = await sub(supabase, topic).entity(body.record.message_entity);
  await sub(supabase, topic).read(service, body.record.message_id);

  const json = await {
    'userId': message.userId,
    'last_four_digits': message.last_four_digits,
    'card_number': message.card_number,
    'cardId': message.card_id,
    'expiry_month': message.expiry_month,
    'expiry_year': message.expiry_year,
    'default': message.default,
    'cvc': message.cvc
  } as any;
  const { data, error } = await supabase
    .from(serviceKebab)
    .upsert(json)
    .select();
  
  if(data) return data;
  if(error) return error;
});