import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistItem {
  _id: string;
  title: string;
  price: number;
  image: string;
}

interface WishlistStore {
  items: WishlistItem[];
  toggleItem: (item: WishlistItem) => void;
  isInWishlist: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (item) => {
        const items = get().items;
        const exists = items.find((i) => i._id === item._id);
        if (exists) {
          set({ items: items.filter((i) => i._id !== item._id) });
        } else {
          set({ items: [...items, item] });
        }
      },
      isInWishlist: (id) => get().items.some((i) => i._id === id),
    }),
    {
      name: "dreamy-drops-wishlist",
    }
  )
);
