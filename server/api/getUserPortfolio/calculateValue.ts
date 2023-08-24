//@ts-nocheck
import { pub, sub } from '~/composables/messaging';
import { ok } from '~/composables/ok';
import { serverSupabaseServiceRole } from '#supabase/server'
export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const body = await readBody(event);

  const getUsers = async () => {
    const { data, error } = await supabase
      .from('getUser')
      .select('userId')
    if(data) ok.log('success', 'got all users: ', data)
    if(error) ok.log('error', 'could not get all users: ', error)
    return data
  };
  const getUserCurrency = async (user) => {
    const { data, error } = await supabase
      .from('getUser')
      .select('currency')
      .eq('userId', user)
      .limit(1)
      .single();
    if(error){
      return 'EUR'
    } else {
      return data.currency;
    }
  };
  const getUserPortfolio = async (user) => {
    const { data, error } = await supabase
      .from('getUserPortfolio')
      .select()
      .eq('userId', user)
      .eq('ticker', 'gi.ddf')
    return data;
  }


  const getAssetPrice = async (currency, ticker) => {
    const { data, error } = await supabase
      .from('getAssetPrice')
      .select()
      .eq('currency', currency)
      .eq('ticker', ticker)
      .order('date', { ascending: false })
      .limit(1)
      .single();
    if(error) {
      return error
    } else {
      return data.price
    }
  }

  const calculateValues = async (user, portfolio, assetPrice, currency) => {
    const array = []
    let value = 0;
    for (let i = 0; i < portfolio.length; i++) {
      value = portfolio[i].quantityToday/assetPrice;
      array.push({
        'userId': user,
        'date': portfolio[i].date,
        'ticker': portfolio[i].ticker,
        'valueCurrency': currency,
        'value': value
      })
    }
    return array
  }

  const calculateAndAdd = async (user) => {
    const currency = await getUserCurrency(user);
    const portfolio = await getUserPortfolio(user);
    const assetPrice = await getAssetPrice(currency, 'gi.ddf');
    const calculatedValue = await calculateValues(user, portfolio, assetPrice, currency);
    for (let i = 0; i < calculatedValue.length; i++) {
      const { data, error } = await supabase
        .from('getUserPortfolio')
        .update(calculatedValue[i])
        .eq('ticker', calculatedValue[i].ticker)
        .eq('date', calculatedValue[i].date)
        .eq('userId', calculatedValue[i].userId)
        .select()
    }
  }
  if(body){
    await calculateAndAdd(body.record.userId);
    return 'array'
  }
  if(!body){
    const users = await getUsers();
    for (let i = 0; i < users.length; i++) {
      await calculateAndAdd(users[i].userId);
    }
    return 'updated for all'
  }
});