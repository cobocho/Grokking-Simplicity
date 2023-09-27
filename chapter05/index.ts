import { Item, ItemButton } from './types';

// 중복 코드 제거하여 추상화하기

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
			const newCart = addItem(shoppingCart, item.name, item.price);
			if (getFreeShipping(newCart)) {
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

	const getFreeShipping = (cart: Item[]) => {
		return calcTotal(cart) >= 20;
	}; // 계산

	const calcTax = (amount: number) => {
		return amount * 0.1;
	}; // 계산
}

// 액션에도 암묵적 입출력을 최소화하기

{
	let shoppingCart: Item[] = []; // 액션

	const addItemToCart = (name: string, price: number) => {
		shoppingCart = addItem(shoppingCart, name, price);
		const total = calcTotal(shoppingCart); // 계산
		setCartTotalDom(total);
		updateShoppingIcons(shoppingCart);
		updateTaxDom(total);
	}; // 액션

	const updateShoppingIcons = (cart: Item[]) => {
		const buyButtons = getBuyButtonDom();
		buyButtons.forEach((button) => {
			const item = button.item;
			const newCart = addItem(cart, item.name, item.price);
			if (getFreeShipping(newCart)) {
				button.showFreeShippingIcon();
			} else {
				button.hideFreeShippingIcon();
			}
		});
	}; // 액션

	const setCartTotalDom = (total: number) => {
		console.log(total);
	}; // 액션

	const getBuyButtonDom = (): ItemButton[] => {
		return [];
	}; // 액션

	const updateTaxDom = (total: number) => {
		const tax = calcTax(total);
		setTaxDom(tax);
	}; // 액션

	const setTaxDom = (tax: number) => {
		console.log(tax);
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

	const getFreeShipping = (cart: Item[]) => {
		return calcTotal(cart) >= 20;
	}; // 계산

	const calcTax = (amount: number) => {
		return amount * 0.1;
	}; // 계산
}

/*
  계산 분리하기

  계층을 들여다보자. C는 카트에 대한 동작, I는 Item에 대한 동작, B는 비즈니스 규칙이다.
*/

{
	let shoppingCart: Item[] = [];

	const addItemToCart = (name: string, price: number) => {
		shoppingCart = addItem(shoppingCart, name, price);
		const total = calcTotal(shoppingCart);
		setCartTotalDom(total);
		updateShoppingIcons(shoppingCart);
		updateTaxDom(total);
	};

	const updateShoppingIcons = (cart: Item[]) => {
		const buyButtons = getBuyButtonDom();
		buyButtons.forEach((button) => {
			const item = button.item;
			const newCart = addItem(cart, item.name, item.price);
			if (getFreeShipping(newCart)) {
				button.showFreeShippingIcon();
			} else {
				button.hideFreeShippingIcon();
			}
		});
	};

	const setCartTotalDom = (total: number) => {
		console.log(total);
	};

	const getBuyButtonDom = (): ItemButton[] => {
		return [];
	};

	const updateTaxDom = (total: number) => {
		const tax = calcTax(total);
		setTaxDom(tax);
	};

	const setTaxDom = (tax: number) => {
		console.log(tax);
	};

	// I C B
	const calcTotal = (cart: Item[]) => {
		let total = 0;
		total = cart.reduce((acc, { price }) => (acc += price), 0); // 비즈니스 규칙
		return total;
	};

	// I C
	const addItem = (cart: Item[], name: string, price: number) => {
		const newCart: Item[] = cart.slice();
		newCart.push({
			name,
			price,
		});
		return newCart;
	};

	// B
	const getFreeShipping = (cart: Item[]) => {
		return calcTotal(cart) >= 20;
	};

	// B
	const calcTax = (amount: number) => {
		return amount * 0.1;
	};
}

/*
  addItem() 분리하기

  addItem() 함수는를 쪼개보자
*/

{
	const addItem = (cart: Item[], name: string, price: number) => {
		const newCart: Item[] = cart.slice(); // 1. 배열 복사
		newCart.push({
			// Item 객체 생성
			name,
			price,
		}); // 복사본에 객체 추가
		return newCart; // 복사본 반환
	};
}

{
	const addItem = (cart: Item[], item: Item) => {
		const newCart: Item[] = cart.slice();
		newCart.push(item);
		return newCart;
	};

	const makeCartItem = (name: string, price: number): Item => {
		return {
			name,
			price,
		};
	};
}

/*
  카피 온 라이트 패턴 제거하기
*/

{
	// 유틸리티 함수로 변경
	const addElementLast = <T>(list: T[], item: T) => {
		const newList: T[] = list.slice();
		newList.push(item);
		return newList;
	};

	const addItem = (cart: Item[], item: Item) => {
		return addElementLast<Item>(cart, item);
	};
}

/*
  최종 코드

  계산을 분류해보자.  C는 카트에 대한 동작, I는 Item에 대한 동작, B는 비즈니스 규칙, U는 배열 유틸리티이다.
*/

{
	let shoppingCart: Item[] = [];

	const updateShoppingIcons = (cart: Item[]) => {
		const buyButtons = getBuyButtonDom();
		buyButtons.forEach((button) => {
			const item = button.item;
			const newCart = addItem(cart, makeCartItem(item.name, item.price));
			if (getFreeShipping(newCart)) {
				button.showFreeShippingIcon();
			} else {
				button.hideFreeShippingIcon();
			}
		});
	};

	const setCartTotalDom = (total: number) => {
		console.log(total);
	};

	const getBuyButtonDom = (): ItemButton[] => {
		return [];
	};

	const updateTaxDom = (total: number) => {
		const tax = calcTax(total);
		setTaxDom(tax);
	};

	const setTaxDom = (tax: number) => {
		console.log(tax);
	};

	// U
	const addElementLast = <T>(list: T[], item: T) => {
		const newList: T[] = list.slice();
		newList.push(item);
		return newList;
	};

	// C
	const addItem = (cart: Item[], item: Item) => {
		return addElementLast<Item>(cart, item);
	};

	// I
	const makeCartItem = (name: string, price: number): Item => {
		return {
			name,
			price,
		};
	};

	// C I B
	const calcTotal = (cart: Item[]) => {
		let total = 0;
		total = cart.reduce((acc, { price }) => (acc += price), 0); // 비즈니스 규칙
		return total;
	};

	// B
	const getFreeShipping = (cart: Item[]) => {
		return calcTotal(cart) >= 20;
	};

	// B
	const calcTax = (amount: number) => {
		return amount * 0.1;
	};
}

/*
  연습문제
  
  updateShoppingIcons를 나누어보자.
*/

{
	let shoppingCart: Item[] = [];

	const updateShoppingIcons = (cart: Item[]) => {
		const buyButtons = getBuyButtonDom();
		buyButtons.forEach((button) => {
			setFreeShippingIcon(button, getFreeShippingWithItem(cart, button.item));
		});
	};

	const getFreeShippingWithItem = (cart: Item[], item: Item) => {
		const newCart = addItem(cart, makeCartItem(item.name, item.price));
		return getFreeShipping(newCart);
	};

	const setFreeShippingIcon = (buttonItem: ItemButton, isShown: boolean) => {
		if (isShown) {
			buttonItem.showFreeShippingIcon();
		} else {
			buttonItem.hideFreeShippingIcon();
		}
	};

	const setCartTotalDom = (total: number) => {
		console.log(total);
	};

	const getBuyButtonDom = (): ItemButton[] => {
		return [];
	};

	const updateTaxDom = (total: number) => {
		const tax = calcTax(total);
		setTaxDom(tax);
	};

	const setTaxDom = (tax: number) => {
		console.log(tax);
	};

	// U
	const addElementLast = <T>(list: T[], item: T) => {
		const newList: T[] = list.slice();
		newList.push(item);
		return newList;
	};

	// C
	const addItem = (cart: Item[], item: Item) => {
		return addElementLast<Item>(cart, item);
	};

	// I
	const makeCartItem = (name: string, price: number): Item => {
		return {
			name,
			price,
		};
	};

	// C I B
	const calcTotal = (cart: Item[]) => {
		let total = 0;
		total = cart.reduce((acc, { price }) => (acc += price), 0); // 비즈니스 규칙
		return total;
	};

	// B
	const getFreeShipping = (cart: Item[]) => {
		return calcTotal(cart) >= 20;
	};

	// B
	const calcTax = (amount: number) => {
		return amount * 0.1;
	};
}
