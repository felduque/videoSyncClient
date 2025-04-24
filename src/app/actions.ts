"use server";

import { cookies } from "next/headers";

export const getServerCookies = async () => {
  const cookieStore = await cookies();
  return {
    refreshToken: cookieStore.get("refreshToken"),
    tkAccess: cookieStore.get("tkAccess"),
  };
};

export async function updateAccessToken(token: string) {
  (await cookies()).set("tkAccess", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 15,
  });
}


export async function setCookie(name: string, value: string) {
  const cookieStore = await cookies()

  cookieStore.set(name, value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
  })

  return;
}