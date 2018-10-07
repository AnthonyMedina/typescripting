interface CartItem {
  name: string;
  price: number;
  qty: number;
}

interface CartAPI {
  length: number;
  total: number;
  add(name: string, price: number, qty: number): CartAPI;
  addItem(item: CartItem): CartAPI;
}

export function cashier(): CartAPI {
  const items: CartItem[] = [];
  return {
    get length(): number {
      return items.reduce((length, item) => length + item.qty, 0);
    },
    get total(): number {
      return items.reduce((total, item) => total + item.price * item.qty, 0);
    },
    add(name, price, qty = 1): CartAPI {
      items.push({
        name,
        price,
        qty
      });
      return this;
    },
    addItem(item): CartAPI {
      items.push(item);
      return this;
    }
  };
}
