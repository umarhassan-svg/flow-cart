import React, { createContext, useContext, useEffect, useReducer } from "react";
import type { ReactNode } from "react";
import type { OrderItem, BulkOrder } from "../types/orderTypes"; // adjust path if you store types in services

// Cart item (we'll use productId as key)
export type CartItem = OrderItem & {
  // optional human-friendly title / name; backend can resolve if missing
  name?: string;
};

type State = {
  items: CartItem[]; // aggregated by productId
};

const STORAGE_KEY = "flowcart_cart_v1";

const initialState: State = { items: [] };

type Action =
  | { type: "SET"; payload: State }
  | { type: "CLEAR" }
  | { type: "ADD_OR_INCREMENT"; payload: CartItem } // adds single item (merge by productId)
  | { type: "ADD_ITEMS"; payload: CartItem[] } // add multiple items
  | { type: "UPDATE_QTY"; payload: { productId: string; quantity: number } }
  | { type: "REMOVE"; payload: { productId: string } };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "CLEAR":
      return { items: [] };
    case "ADD_OR_INCREMENT": {
      const it = action.payload;
      const found = state.items.find((x) => x.productId === it.productId);
      if (found) {
        return {
          items: state.items.map((x) =>
            x.productId === it.productId
              ? { ...x, quantity: x.quantity + it.quantity }
              : x
          ),
        };
      }
      return { items: [...state.items, it] };
    }
    case "ADD_ITEMS": {
      // merge items by productId
      const next = [...state.items];
      for (const incoming of action.payload) {
        const idx = next.findIndex((x) => x.productId === incoming.productId);
        if (idx >= 0)
          next[idx] = {
            ...next[idx],
            quantity: next[idx].quantity + incoming.quantity,
          };
        else next.push(incoming);
      }
      return { items: next };
    }
    case "UPDATE_QTY": {
      const { productId, quantity } = action.payload;
      if (quantity <= 0)
        return { items: state.items.filter((x) => x.productId !== productId) };
      return {
        items: state.items.map((x) =>
          x.productId === productId ? { ...x, quantity } : x
        ),
      };
    }
    case "REMOVE":
      return {
        items: state.items.filter(
          (x) => x.productId !== action.payload.productId
        ),
      };
    default:
      return state;
  }
}

type CartContextType = {
  items: CartItem[];
  count: number;
  total: number; // numeric sum (price * qty) if price present
  addItem: (item: CartItem) => void;
  addItems: (items: CartItem[]) => void;
  addBulkOrder: (bulk: BulkOrder) => void; // convert bulk -> cart items (add all)
  updateQty: (productId: string, qty: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as State) : init;
    } catch {
      return init;
    }
  });

  // persist to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  // cross-tab sync
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      try {
        const next = e.newValue
          ? (JSON.parse(e.newValue) as State)
          : initialState;
        dispatch({ type: "SET", payload: next });
      } catch {
        // ignore
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const items = state.items;
  const count = items.reduce((s, it) => s + it.quantity, 0);
  const total = items.reduce(
    (s, it) => s + Number(it.price ?? 0) * it.quantity,
    0
  );

  const addItem = (item: CartItem) =>
    dispatch({ type: "ADD_OR_INCREMENT", payload: item });
  const addItems = (items: CartItem[]) =>
    dispatch({ type: "ADD_ITEMS", payload: items });
  const addBulkOrder = (bulk: BulkOrder) => {
    // convert bulk.items -> CartItem[]
    const mapped: CartItem[] = bulk.items.map((it) => ({ ...it }));
    dispatch({ type: "ADD_ITEMS", payload: mapped });
  };
  const updateQty = (productId: string, qty: number) =>
    dispatch({ type: "UPDATE_QTY", payload: { productId, quantity: qty } });
  const removeItem = (productId: string) =>
    dispatch({ type: "REMOVE", payload: { productId } });
  const clear = () => dispatch({ type: "CLEAR" });

  return (
    <CartContext.Provider
      value={{
        items,
        count,
        total,
        addItem,
        addItems,
        addBulkOrder,
        updateQty,
        removeItem,
        clear,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
