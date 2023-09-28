import { Item } from './types';

/*
  카피 온 라이트로 쓰기를 읽기로 바꾸자.
*/

{
	const removeItemByName = (cart: Item[], name: string) => {
		let idx: number | null = null;
		cart.forEach((item, i) => {
			if (item.name === name) {
				idx === i;
			}
		});
		if (idx) {
			cart.slice(idx, 1);
		}
	};
}

{
	let shoppingCart: Item[] = [];

	const deleteHandler = (cart: Item[], name: string) => {
		shoppingCart = removeItemByName(cart, name);
		// codes...
	};

	const removeItemByName = (cart: Item[], name: string) => {
		const newCart = cart.slice();
		let idx: number | null = null;
		newCart.forEach((item, i) => {
			if (item.name === name) {
				idx === i;
			}
		});
		if (idx) {
			newCart.slice(idx, 1);
		}
		return newCart;
	};
}

/*
  쓰기를 하면서 읽기도 하는 함수를 분리해보자.
*/

/*
  첫번째, 읽기와 쓰기 동작으로 분리하기
*/

{
	// 이 함수는 계산이다.
	const firstElement = <T>(array: T[]) => {
		return array[0];
	};

	// 이 함수는 쓰기이다.
	const dropFirst = <T>(array: T[]) => {
		array.shift();
	};
}

// 쓰기를 카피 온 라이트로 바꾸기

{
	const dropFirst = <T>(array: T[]) => {
		const arrayCopy = array.slice();
		arrayCopy.shift();
		return arrayCopy;
	};
}

/*
  두번째, 값을 두개 리턴하는 함수로 만들기
*/

// 동작을 감싼다.
{
	const shift = <T>(array: T[]) => {
		return array.shift();
	};
}

// 읽으면서 쓰기도 하는 함수를 읽기 함수로 바꾸기
{
	const shift = <T>(array: T[]) => {
		const arrayCopy = array.slice();
		const first = arrayCopy.shift();
		return {
			first,
			array: arrayCopy,
		};
	};
}

// 연습문제

{
	// 예시 o["price"] = 37;

	const objectSet = (object: object, key: string, value: any) => {
		const objectCopy = Object.assign({}, object);
		//@ts-ignore
		objectCopy[key] = value;
		return objectCopy;
	};
}

{
	/* 기존 코드
	const setPrice = (item: Item, newPrice: number) => {
		const itemCopy = Object.assign({}, item);
		itemCopy.price = newPrice;
		return itemCopy;
	};
  */

	const objectSet = (object: object, key: string, value: any) => {
		const objectCopy = Object.assign({}, object);
		//@ts-ignore
		objectCopy[key] = value;
		return objectCopy;
	};

	const setPrice = (item: Item, newPrice: number) => {
		return objectSet(item, 'price', newPrice);
	};
}

{
	const setQuantity = (item: Item, newQuantity: number) => {
		return objectSet(item, 'quantity', newQuantity);
	};

	const objectSet = (object: object, key: string, value: any) => {
		const objectCopy = Object.assign({}, object);
		//@ts-ignore
		objectCopy[key] = value;
		return objectCopy;
	};
}

{
	const objectDelete = <T extends object>(object: T, key: keyof T) => {
		const copyObj = Object.assign({}, object);
		delete copyObj[key];
		return copyObj;
	};
}

/* 
	깊디 깊은 객체 복사가 이루어져야지 진정한 불변 데이터이다.
*/

{
	const objectSet = (object: object, key: string, value: any) => {
		const objectCopy = Object.assign({}, object);
		//@ts-ignore
		objectCopy[key] = value;
		return objectCopy;
	};

	const setPrice = (item: Item, newPrice: number) => {
		return objectSet(item, 'price', newPrice);
	};

	const setPriceByName = (cart: Item[], name: string, price: number) => {
		const copyCart = cart.slice();
		copyCart.forEach((item) => {
			if (item.name === name) {
				const copyItem = Object.assign({}, item);
				setPrice(copyItem, price);
			}
		});
		return copyCart;
	};
}

// 연습문제

interface ItemWithQuantity extends Item {
	quantity: number;
}

{
	/*
		const setQuantityByName = (cart: ItemWithQuantity[], name: string, quantity: number) => {
			cart.forEach((item) => {
				if (item.name === name) {
					item.quantity = quantity;
				}
			});
		};
	*/
	const objectSet = (object: object, key: string, value: any) => {
		const objectCopy = Object.assign({}, object);
		//@ts-ignore
		objectCopy[key] = value;
		return objectCopy;
	};

	const setQuantity = (item: ItemWithQuantity, newQuantity: number) => {
		return objectSet(item, 'quantity', newQuantity);
	};

	const setQuantityByName = (cart: ItemWithQuantity[], name: string, quantity: number) => {
		const copyCart = cart.slice();
		copyCart.map((item, idx) => {
			if (item.name === name) {
				return setQuantity(item, quantity);
			}
			return item;
		});
	};
}
