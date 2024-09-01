import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-zinc-950">
      <div className="flex  items-center justify-center">
        <div className="text-8xl pi-4">🦧</div>
        <div>
          <h1 className="text-2xl font-bold uppercase">Reservapp</h1>
          <p className="text-xl">Welcome to the jungle!</p>
        </div>
      </div>
    </main>
  );
}
