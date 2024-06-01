"use client";

import { UserDTO } from "@/lib/actions";
import { PropsWithChildren, createContext, useContext } from "react";

const UserContext = createContext<UserDTO | null>(null);

export type UserProviderProps = PropsWithChildren<{ user: UserDTO | null }>;

export const UserProvider = ({ user, children }: UserProviderProps) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
