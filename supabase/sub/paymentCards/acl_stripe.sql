-- version 29.7.23
-- service acl_stripe
-- topic   paymentCards

--- create the table, with default values
CREATE TABLE "sub_paymentCards_acl_stripe" (
    "message_id"          uuid          NOT NULL  DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "message_entity"      uuid          NOT NULL  DEFAULT uuid_generate_v4(),
    "message_sent"        timestamptz   NOT NULL  DEFAULT (now() at time zone 'utc'),
    "message_sender"      text          NOT NULL,
    "message_read"        boolean       NOT NULL  DEFAULT FALSE
);

-- Create the replicate function 
CREATE OR REPLACE FUNCTION "replicate_paymentCards_acl_stripe"()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO "sub_paymentCards_acl_stripe" (message_id, message_entity, message_sender, message_sent)
  VALUES (NEW.message_id, NEW.message_entity, NEW.message_sender, NEW.message_sent);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create replicate trigger
CREATE TRIGGER "replicate_paymentCards_acl_stripe"
AFTER INSERT ON "topic_paymentCards"
FOR EACH ROW
EXECUTE FUNCTION "replicate_paymentCards_acl_stripe"();


-- Set up webhook function 

CREATE OR REPLACE FUNCTION "webhook_paymentCards_acl_stripe"()
RETURNS TRIGGER AS $$
DECLARE 
  response RECORD;
  payload TEXT;
BEGIN
  -- Convert row data to json then to string format
  payload := row_to_json(NEW)::text;
  SELECT * INTO response FROM http_post(
    'https://ka.lt/api/acl/stripe/webhooks/paymentCards',
    payload,
    'application/json'
  );
  RAISE NOTICE 'API Response: %', response.content;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create webhook trigger
CREATE TRIGGER "webhook_paymentCards_acl_stripe"
AFTER INSERT ON "sub_paymentCards_acl_stripe"
FOR EACH ROW
EXECUTE FUNCTION "webhook_paymentCards_acl_stripe"(NEW);

-- Enable RLS
ALTER TABLE "sub_paymentCards_acl_stripe" ENABLE ROW LEVEL SECURITY;