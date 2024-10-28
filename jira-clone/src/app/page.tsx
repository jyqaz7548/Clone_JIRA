"use client";
import { useCurrent } from "@/features/auth/api/use-current";
import { useLogout } from "@/features/auth/api/use-logout";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import { Button } from "react-day-picker";

export default function Home() {
  const router = useRouter();
  const { data, isLoading } = useCurrent();
  const { mutate } = useLogout();

  useEffect(() => {
    if (!data && !isLoading) {
      router.push("/sign-in");
    }
  }, [data]);

  return (
    <div className="">
      Only visible to authorized users.
      <Button onClick={() => mutate()}>Logout</Button>
    </div>
  );
}
