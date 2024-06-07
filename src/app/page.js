import { ToggleTheme } from "@/components/toggle-theme";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ToggleTheme />
      <p className="">Hello world!</p>
    </main>
  );
}
