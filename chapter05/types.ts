export interface Item {
	name: string;
	price: number;
}

export interface ItemButton {
	item: Item;
	showFreeShippingIcon: () => void;
	hideFreeShippingIcon: () => void;
}
