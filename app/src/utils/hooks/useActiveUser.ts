import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_USERS } from "../../gql_crud/user/queries";
import { setActiveUser, getActiveUser } from "../session";

export type UserBase = {
  id: string;
  name: string;
  surname: string;
  nickname: string | null;
  password: string | null;
};

export function useActiveUser() {
  const [activeUserId, setActiveUserIdState] = useState<string | null>(getActiveUser());

  const { data, loading, error } = useQuery<{ users: UserBase[] }>(GET_USERS);
  if (error) console.error("[useActiveUser] GET_USERS error:", error);
  const users = data?.users ?? [];

  // Imposta l'utente attivo; ritorna false se la password non corrisponde.
  // Se l'utente non ha password (stringa vuota), qualsiasi input viene accettato.
  const selectUser = (id: string, password?: string): boolean => {
    const user = users.find((u) => u.id === id);
    if (!user) return false;
    const hasPassword = (user.password ?? "").trim().length > 0;
    if (hasPassword && password !== user.password) return false;
    setActiveUser(id);
    setActiveUserIdState(id);
    return true;
  };

  const clearUser = () => {
    setActiveUserIdState(null);
  };

  return { users, loading, error, activeUserId, selectUser, clearUser };
}
