import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { CartItem } from '../types/ecommerce';

const CART_STORAGE_KEY = 'ecommerce_cart';

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (productId: string, variant?: { type: string; value: string }) => void;
  updateQuantity: (productId: string, quantity: number, variant?: { type: string; value: string }) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function getCartKey(productId: string, variant?: { type: string; value: string }) {
  if (!variant) return productId;
  return `${productId}_${variant.type}_${variant.value}`;
}

function loadCartFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveCartToStorage(items: CartItem[]) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCartFromStorage);

  useEffect(() => {
    saveCartToStorage(items);
  }, [items]);

  const addItem = useCallback(
    (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
      const qty = item.quantity ?? 1;
      const key = getCartKey(item.productId, item.variant);
      setItems((prev) => {
        const existing = prev.find(
          (i) => getCartKey(i.productId, i.variant) === key
        );
        if (existing) {
          return prev.map((i) =>
            getCartKey(i.productId, i.variant) === key
              ? { ...i, quantity: i.quantity + qty }
              : i
          );
        }
        return [...prev, { ...item, quantity: qty }];
      });
    },
    []
  );

  const removeItem = useCallback(
    (productId: string, variant?: { type: string; value: string }) => {
      const key = getCartKey(productId, variant);
      setItems((prev) => prev.filter((i) => getCartKey(i.productId, i.variant) !== key));
    },
    []
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number, variant?: { type: string; value: string }) => {
      const key = getCartKey(productId, variant);
      if (quantity <= 0) {
        setItems((prev) => prev.filter((i) => getCartKey(i.productId, i.variant) !== key));
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          getCartKey(i.productId, i.variant) === key ? { ...i, quantity } : i
        )
      );
    },
    []
  );

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  const value = useMemo(
    () => ({ items, totalItems, addItem, removeItem, updateQuantity, clearCart }),
    [items, totalItems, addItem, removeItem, updateQuantity, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
