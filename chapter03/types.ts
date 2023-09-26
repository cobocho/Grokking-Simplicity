export interface Subscriber {
	email: string;
	rec_count: number;
}

export type CouponRank = 'best' | 'good' | 'bad';

export interface Coupon {
	code: string;
	rank: CouponRank;
}

export interface Message {
	from: string;
	to: string;
	subject: string;
	body: string;
}

export interface Affiliate {
	sales: number;
	commission: number;
	bank_code: string;
}
