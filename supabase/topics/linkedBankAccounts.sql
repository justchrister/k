-- create a topic, by simply renaming all instances of <<topic_name>
-- version 6.4.23
-- topic   "topic_linkedBankAccounts"

--- create the table, with default values
CREATE TABLE "topic_linkedBankAccounts" (
-- meta information used for processing
    "message_id"          uuid                            NOT NULL        DEFAULT uuid_generate_v4()         PRIMARY KEY,
    "message_entity"      uuid                            NOT NULL        DEFAULT uuid_generate_v4(),
    "message_sent"        timestamptz                     NOT NULL        DEFAULT (now() at time zone 'utc'),
    "message_sender"      text                            NOT NULL,
-- 
    "userId"              uuid                            NOT NULL,
    "reference"           text,
    "iban"                text,
    "bankCode"            text
);

--- row level security
ALTER TABLE "topic_linkedBankAccounts" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "SELF — Insert" ON public."topic_linkedBankAccounts"
  AS PERMISSIVE FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = "userId");


CREATE POLICY "SELF — Select" ON "public"."topic_linkedBankAccounts"
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (auth.uid() = "userId")