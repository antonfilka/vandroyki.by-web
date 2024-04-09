import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware"; // Import persist middleware

interface User {
  id: number;
  email: string;
  role: string;
  username?: string;
  picture?: string;
  firstName?: string;
  lastName?: string;
}

type UserStore = {
  user: User | null;
  login: (userData: User) => void;
  logOut: () => void;
};

export const useUserStore = create<UserStore>(
  persist(
    (set) => ({
      user: null,
      login: (user: User) => set({ user }),
      logOut: () => set({ user: null }),
    }),
    {
      name: "user-store",
    }
  ) as StateCreator<UserStore>
);
