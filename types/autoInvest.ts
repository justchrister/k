export { autoInvest };

declare global {
  interface autoInvest {
    userId?: string;
    amount?: number;
    active?: boolean;
    interval?: autoInvestIntervals;
    charged?: string;

    message_entity?: string;
    message_id?: string;
    message_sender?: string;
    message_sent?: string;
  }
}