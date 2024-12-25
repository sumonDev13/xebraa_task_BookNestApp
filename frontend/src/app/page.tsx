import Image from "next/image";

export default function Home() {
  return (
    <>
      <h1>BookNest</h1>
      <Image src="/booknest.png" alt="BookNest" width={200} height={200} />
    </>
  );
}
