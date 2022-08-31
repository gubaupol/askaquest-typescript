import { useEffect, useState } from "react";

//  a service that we call to update the local storage, we will introduce its name and the new value
export const updateLocalStorage = (name: string, value: any) => {
  useEffect(() => {
    return localStorage.setItem(name, JSON.stringify(value));
  }, []);
};
//  a service that we call to get the local storage, we will introduce its name and the new value
export const getLocalStorage = (name: string) => {
  const [user, setUser] = useState();
  useEffect(() => {
    const res = localStorage.getItem(name);
    setUser(res ? JSON.parse(res) : {});
  }, []);
  return user;
};
//  a service that we call to remove the local storage, we will introduce its name and the new value
export const removeLocalStorage = (name: string) => {
  useEffect(() => {
    localStorage.removeItem(name);
  }, []);
};
//  a service that we call to clear the local storage, we will introduce its name and the new value
export const clearLocalStorage = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);
};
