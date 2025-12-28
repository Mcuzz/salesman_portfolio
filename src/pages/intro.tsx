import { useRouter } from "next/router";
import IntroPage from "@/components/intro";

export default function Intro() {
  const router = useRouter();

  return (
    <IntroPage onFinish={() => router.push("/")} />
  );
}
