"use client"; //

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useLogout } from "@/features/auth/api/use-logout";
import { useCurrent } from "@/features/auth/api/use-current";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter(); //화면 이동할때 쓰는 함수 ,useclinet의 유무에 따라 사용법이 바뀜
  const { data, isLoading } = useCurrent(); //useCurrent가 다 로딩 되면 isLoading에는 false가 됨
  const { mutate } = useLogout();

  useEffect(() => {
    if (!data && !isLoading) {
      //!data = data가 존재하지 않으면,!isLoading = isLoading이 fasle면 참
      router.push("/sign-in");
    }
  }, [data]); //[] 안의 값이 바뀔때마다 안쪽 코드 실행
  //useEffect는 클라이언트가 렌더링이 다 되면 작동됨,사이트가 두번 로딩 1.div안에 있는거(서버렌더링) 2.기능렌더링(클라이언트 렌더링)
  return (
    <div>
      Only visible to authorized users.
      <Button onClick={() => mutate()}>Logout</Button>
    </div>
  );
}
