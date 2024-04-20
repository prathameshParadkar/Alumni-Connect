"use client"
import { Box } from "@chakra-ui/layout";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const isTokenSetInCookie = () => {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find(cookie => cookie.startsWith("token="));
    return tokenCookie !== undefined;
    };
    if (!isTokenSetInCookie()){
      router.push("/signup");
    }
  }, []);
  return (
    <>
      Landing Info Page
    </>
  );
}
