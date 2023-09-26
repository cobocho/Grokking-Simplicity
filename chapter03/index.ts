import { Affiliate, Coupon, CouponRank, Message, Subscriber } from './types';

/*
	쿠폰독 프로그램
*/

const emailSystem = {
	send: (email: Message) => console.log(email),
};

const subscribers: Subscriber[] = [
	{
		email: 'jhon@coldmail.com',
		rec_count: 2,
	},
	{
		email: 'sma@pmail.co',
		rec_count: 16,
	},
	{
		email: 'linda1989@oal.com',
		rec_count: 1,
	},
	{
		email: 'jan1940@ahoy.com',
		rec_count: 0,
	},
	{
		email: 'mrbig@pmail.co',
		rec_count: 25,
	},
	{
		email: 'lol@lol.lol',
		rec_count: 0,
	},
];

const coupons: Coupon[] = [
	{
		code: 'MAYDISCOUNT',
		rank: 'good',
	},
	{
		code: '10PERCENT',
		rank: 'bad',
	},
	{
		code: 'PROMOTION45',
		rank: 'best',
	},
	{
		code: 'IHEARTYOU',
		rank: 'bad',
	},
	{
		code: 'GETADEAL',
		rank: 'best',
	},
	{
		code: 'ILIKEDISCOUNTS',
		rank: 'good',
	},
];

// DB로부터 쿠폰 목록을 가져온다 (액션)
const fetchCouponsFromDB = () => {
	return coupons;
};

// DB로부터 쿠폰 목록을 가져온다 (액션)
const fetchSubscribersFromDB = () => {
	return subscribers;
};

// 사용자가 받을 쿠폰 등급을 계산한다 (계산)
const subCouponRank = (subscriber: Subscriber): CouponRank => {
	if (subscriber.rec_count >= 10) {
		return 'best';
	} else {
		return 'good';
	}
};

// 쿠폰 목록에서 쿠폰 등급에 맞는 쿠폰을 계산한다 (계산)
const selectCouponByRank = (coupons: Coupon[], rank: CouponRank) => {
	const ret = [];
	for (const coupon of coupons) {
		if (coupon.rank === rank) {
			ret.push(coupon);
		}
	}
	return ret;
};

// 이메일 목록을 계산한다 (계산)
const emailForSubscriber = (subscriber: Subscriber, goods: Coupon[], bests: Coupon[]): Message => {
	const rank = subCouponRank(subscriber);
	if (rank === 'good') {
		return {
			from: 'nnewsletter@coupon.co',
			to: subscriber.email,
			subject: 'Your weekly coupons inside',
			body: 'Here are your coupons : ' + goods.join(', '),
		};
	} else {
		return {
			from: 'nnewsletter@coupon.co',
			to: subscriber.email,
			subject: 'Your weekly coupons inside',
			body: 'Here are your coupons : ' + bests.join(', '),
		};
	}
};

// 이메일 목록을 계산한다 (계산)
const emailsForSubscribers = (subscribers: Subscriber[], goods: Coupon[], bests: Coupon[]) => {
	return subscribers.map((subscriber) => emailForSubscriber(subscriber, goods, bests));
};

// 이메일을 보낸다 (액션)
const sendIssue = () => {
	const coupons = fetchCouponsFromDB(); // 액션
	const goodCoupons = selectCouponByRank(coupons, 'good'); // 계산
	const bestCoupons = selectCouponByRank(coupons, 'best'); // 계산
	const subscribers = fetchSubscribersFromDB(); // 액션
	const emails = emailsForSubscribers(subscribers, goodCoupons, bestCoupons); // 계산
	emails.forEach(emailSystem.send); // 액션
};

sendIssue();

/*
	기존의 코드에 함수형 사고 적용하기

	자회사 수수료 송금 프로그램
*/

// 송금한다 (액션)
const sendPayout = (bankCode: string, owed: number) => {
	console.log(bankCode, owed);
};

// 송금액 계산 (액션)
// 액션 영역
const figurePayout = (affiliate: Affiliate) => {
	const owed = affiliate.sales * affiliate.commission;
	if (owed > 100) {
		sendPayout(affiliate.bank_code, owed); // 액션
	}
};
// 액션 영역

// 자회사별 송금 여부 계산 (액션)
// 액션 영역
const affiliatePayout = (affiliates: Affiliate[]) => {
	affiliates.forEach(figurePayout);
};
// 액션 영역

// 액션 영역
const main = (affiliates: Affiliate[]) => {
	affiliatePayout(affiliates);
};
// 액션 영역

// 즉 액션을 내부에서 호출하면 그 함수는 모두 액션이 된다.
