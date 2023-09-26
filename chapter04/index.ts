import { Item, ItemButton } from './types';

// 장바구니 금액 합계 기능

let shoppingCart: Item[] = [];
let shoppingCartTotal = 0;

const getBuyButtonDom = (): ItemButton[] => {
	return [];
};

const updateShoppingIcons = () => {
	const buyButtons = getBuyButtonDom();
	buyButtons.forEach((button) => {
		const item = button.item;
		if (item.price + shoppingCartTotal >= 20) {
			button.showFreeShippingIcon();
		} else {
			button.hideFreeShippingIcon();
		}
	});
};

const setTaxDom = (tax: number) => {
	console.log(tax);
};

const updateTaxDom = () => {
	setTaxDom(shoppingCartTotal * 0.1);
};

const setCartTotalDom = () => {
	console.log(shoppingCartTotal);
};

const calcCartTotal = () => {
	shoppingCartTotal = shoppingCart.reduce((acc, { price }) => (acc += price), 0);
	setCartTotalDom();
	updateShoppingIcons();
	updateTaxDom();
};

const addItemToCart = (name: string, price: number) => {
	shoppingCart.push({
		name,
		price,
	});
	calcCartTotal();
};

/*
  코드를 테스터블하게 바꿔보자.

  (테스트 팀의 모토 "100% 테스트 커버리지가 아니라면 집에 못간다!")

  1. DOM 업데이트와 비즈니스 규칙을 분리한다.
  2. 전역변수가 없어야한다.
*/

// 액션과 계산 데이터를 구분하기

{
	const shoppingCart: Item[] = []; // 전역변수라 변경이 가능하므로 액션
	let shoppingCartTotal = 0; // 전역변수라 변경이 가능하므로 액션

	const getBuyButtonDom = (): ItemButton[] => {
		return [];
	}; // 액션

	const updateShoppingIcons = () => {
		const buyButtons = getBuyButtonDom();
		buyButtons.forEach((button) => {
			const item = button.item;
			if (item.price + shoppingCartTotal >= 20) {
				button.showFreeShippingIcon();
			} else {
				button.hideFreeShippingIcon();
			}
		});
	}; // 액션

	const setTaxDom = (tax: number) => {
		console.log(tax);
	}; // 액션

	const updateTaxDom = () => {
		setTaxDom(shoppingCartTotal * 0.1);
	}; // 액션

	const setCartTotalDom = () => {
		console.log(shoppingCartTotal);
	}; // 액션

	const calcCartTotal = () => {
		shoppingCartTotal = shoppingCart.reduce((acc, { price }) => (acc += price), 0);
		setCartTotalDom();
		updateShoppingIcons();
		updateTaxDom();
	}; // 액션

	const addItemToCart = (name: string, price: number) => {
		shoppingCart.push({
			name,
			price,
		});
		calcCartTotal();
	}; // 액션

	// 모두 액션이다.
}

/*
  1. 인자를 사용하는 것은 "명시적 입력"이다.
  2. 인자가 아닌 전역 변수를 사용하는 것은 "암묵적 입력"이다.
  3. 인자가 DOM을 변경하는 것은 "암묵적 출력"이다.
  4. 리턴은 "명시적 출력"이다.

  이때 "암묵적 입력"과 "암묵적 출력"이 존재하면 해당 함수는 "액션"이다.
*/

// 액션에서 계산 빼내기

{
	// 암묵적 출력 (전역 변수 변경)을 제거한다.

	const calcCartTotal = () => {
		shoppingCartTotal = calcTotal(); // 계산
		setCartTotalDom();
		updateShoppingIcons();
		updateTaxDom();
	}; // 액션

	const calcTotal = () => {
		let total = 0;
		total = shoppingCart.reduce((acc, { price }) => (acc += price), 0);
		return total;
	}; // 액션
}

{
	// 암묵적 입력 (전역 변수 사욜)을 제거한다.

	const calcCartTotal = () => {
		shoppingCartTotal = calcTotal(shoppingCart); // 계산
		setCartTotalDom();
		updateShoppingIcons();
		updateTaxDom();
	}; // 액션

	const calcTotal = (cart: Item[]) => {
		let total = 0;
		total = cart.reduce((acc, { price }) => (acc += price), 0);
		return total;
	}; // 계산
}

{
	const addItemToCart = (name: string, price: number) => {
		shoppingCart = addItem(shoppingCart, name, price);
		calcCartTotal();
	}; // 액션

	const addItem = (cart: Item[], name: string, price: number) => {
		const newCart: Item[] = cart.slice();
		newCart.push({
			name,
			price,
		});
		return newCart;
	}; // 계산
}

{
	const updateTaxDom = () => {
		const tax = calcTax(shoppingCartTotal);
		setTaxDom(tax);
	}; // 액션

	const calcTax = (amount: number) => {
		return amount * 0.1;
	}; // 계산
}

{
	const updateShoppingIcons = () => {
		const buyButtons = getBuyButtonDom();
		buyButtons.forEach((button) => {
			const item = button.item;
			if (getFreeShipping(item.price, shoppingCartTotal)) {
				button.showFreeShippingIcon();
			} else {
				button.hideFreeShippingIcon();
			}
		});
	};

	const getFreeShipping = (price: number, total: number) => {
		return price + total >= 20;
	};
}

// 최종 코드

{
	let shoppingCart: Item[] = []; // 액션
	let shoppingCartTotal = 0; // 액션

	const getBuyButtonDom = (): ItemButton[] => {
		return [];
	}; // 액션

	const setTaxDom = (tax: number) => {
		console.log(tax);
	}; // 액션

	const updateTaxDom = () => {
		const tax = calcTax(shoppingCartTotal);
		setTaxDom(tax);
	}; // 액션

	const setCartTotalDom = () => {
		console.log(shoppingCartTotal);
	}; // 액션

	const calcCartTotal = () => {
		shoppingCartTotal = calcTotal(shoppingCart); // 계산
		setCartTotalDom();
		updateShoppingIcons();
		updateTaxDom();
	}; // 액션

	const addItemToCart = (name: string, price: number) => {
		shoppingCart = addItem(shoppingCart, name, price);
		calcCartTotal();
	}; // 액션

	const updateShoppingIcons = () => {
		const buyButtons = getBuyButtonDom();
		buyButtons.forEach((button) => {
			const item = button.item;
			if (getFreeShipping(item.price, shoppingCartTotal)) {
				button.showFreeShippingIcon();
			} else {
				button.hideFreeShippingIcon();
			}
		});
	}; // 액션

	const calcTotal = (cart: Item[]) => {
		let total = 0;
		total = cart.reduce((acc, { price }) => (acc += price), 0);
		return total;
	}; // 계산

	const addItem = (cart: Item[], name: string, price: number) => {
		const newCart: Item[] = cart.slice();
		newCart.push({
			name,
			price,
		});
		return newCart;
	}; // 계산

	const getFreeShipping = (price: number, total: number) => {
		return price + total >= 20;
	}; // 계산

	const calcTax = (amount: number) => {
		return amount * 0.1;
	}; // 계산
}
