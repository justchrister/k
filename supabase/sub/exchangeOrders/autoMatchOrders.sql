-- version 29.7.23
-- service autoMatchOrders
-- topic   exchangeOrders

--- create the table, with default values
CREATE TABLE "sub_exchangeOrders_autoMatchOrders" (
    "message_id"          uuid          NOT NULL  DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "message_entity"      uuid          NOT NULL  DEFAULT uuid_generate_v4(),
    "message_sent"        timestamptz   NOT NULL  DEFAULT (now() at time zone 'utc'),
    "message_sender"      text          NOT NULL,
    "message_read"        boolean       NOT NULL  DEFAULT FALSE
);

-- Create the replicate function 
CREATE OR REPLACE FUNCTION "replicate_exchangeOrders_autoMatchOrders"()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO "sub_exchangeOrders_autoMatchOrders" (message_id, message_entity, message_sender, message_sent)
  VALUES (NEW.message_id, NEW.message_entity, NEW.message_sender, NEW.message_sent);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create replicate trigger
CREATE TRIGGER "replicate"
AFTER INSERT ON "topic_exchangeOrders"
FOR EACH ROW
EXECUTE FUNCTION "replicate_exchangeOrders_autoMatchOrders"();


-- Set up webhook function 

CREATE OR REPLACE FUNCTION "webhook_exchangeOrders_autoMatchOrders"()
RETURNS TRIGGER AS $$
DECLARE 
  response RECORD;
  payload TEXT;
BEGIN
  -- Convert row data to json then to string format
  payload := row_to_json(NEW)::text;
  SELECT * INTO response FROM http_post(
    'https://ka.lt/api/autoMatchOrders/webhooks/exchangeOrders',
    payload,
    'application/json'
  );
  RAISE NOTICE 'API Response: %', response.content;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create webhook trigger
CREATE TRIGGER "webhook_exchangeOrders_autoMatchOrders"
AFTER INSERT ON "sub_exchangeOrders_autoMatchOrders"
FOR EACH ROW
EXECUTE FUNCTION sub_webhook(NEW);

-- Enable RLS
ALTER TABLE "sub_exchangeOrders_autoMatchOrders" ENABLE ROW LEVEL SECURITY;