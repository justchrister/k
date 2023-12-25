drop type public."accountTransactions_statuses";
create type public."accountTransactions_statuses" as enum (
    'incomplete',
    'pending',
    'processing',
    'complete',
    'failed'
);
drop type public."accountTransactions_types";
create type public."accountTransactions_types" as enum (
    'deposit',
    'withdraw'
);
drop type public."accountTransactions_subTypes";
create type public."accountTransactions_subTypes" as enum (
    'card',
    'wireTransfer',
    'dividend',
    'internal'
);
drop type public."paymentCards_statuses";
create type public."paymentCards_statuses" as enum (
    'incomplete',
    'active',
    'rejected',
    'expired'
);
drop type public."exchangeOrder_types";
create type public."exchangeOrder_types" as enum (
    'buy',
    'sell'
);
drop type public."exchangeOrder_statuses";
create type public."exchangeOrder_statuses" as enum (
    'open',
    'processing',
    'fulfilled',
    'cancelled',
    'split'
);
drop type public."paymentsPending_statuses";
create type public."paymentsPending_statuses" as enum (
    'pending',
    'processing',
    'failed',
    'complete'
);
drop type public."paymentProviders";
create type public."paymentProviders" as enum (
    'stripe'
);
drop type public."transferProviders";
create type public."transferProviders" as enum (
    'wise'
);
drop type public."autoInvest_intervals";
create type public."autoInvest_intervals" as enum (
    'daily',
    'weekly',
    'monthlyBeginning',
    'monthlyMiddle',
    'monthlyEnd'
);
drop type public."tickers";
create type public."tickers" as enum (
    'ffe',
    'vc',
    'smb',
    'art',
    'ah'
);