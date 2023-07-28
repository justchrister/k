-- subscribe to topic, by simply renaming all instances of <<topic name>__<service name>
-- version 6.4.23
-- service get_user_portfolio
-- topic   exchange_orders

--- create the table, with default values
CREATE TABLE get_user_portfolio__exchange_orders (
    message_id          uuid        NOT NULL  DEFAULT uuid_generate_v4()         PRIMARY KEY,
    message_entity   uuid        NOT NULL  DEFAULT uuid_generate_v4(),
    message_sent     timestamptz NOT NULL  DEFAULT (now() at time zone 'utc'),
    message_sender      text        NOT NULL,
    message_read        boolean     NOT NULL  DEFAULT FALSE
);

--- add row level security
ALTER TABLE get_user_portfolio__exchange_orders ENABLE ROW LEVEL SECURITY;

-- Create the trigger function on the exchange_orders
CREATE OR REPLACE FUNCTION get_user_portfolio__exchange_orders()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO get_user_portfolio__exchange_orders (message_id, message_entity, message_sender, message_sent)
  VALUES (NEW.message_id, NEW.message_entity, NEW.message_sender, NEW.message_sent);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger on the topic table and event
CREATE TRIGGER get_user_portfolio__exchange_orders
AFTER INSERT ON exchange_orders
FOR EACH ROW
EXECUTE FUNCTION get_user_portfolio__exchange_orders();