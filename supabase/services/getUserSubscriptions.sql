--- create the table, with default values
CREATE TABLE "getUserSubscriptions" (
  "userId"             uuid        PRIMARY KEY, 
  "amount"             numeric,
  "currency"           CHAR(3)     default 'EUR',
  "active"             boolean     default false,
  "days"               integer[]
);

ALTER TABLE "getUserSubscriptions" ENABLE ROW LEVEL SECURITY;

--- Create RLS policy
CREATE POLICY "SELF — Select" ON "public"."getUserSubscriptions"
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (auth.uid() = "userId");