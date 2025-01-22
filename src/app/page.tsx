import Aside from "@/components/Aside";
import Main from "@/components/Main";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] md:grid-cols-4 md:grid-rows-none items-center min-h-screen p-4 gap-4 md:p-8 md:gap-8 font-[family-name:var(--font-geist-sans)] bg-blue-500">
      <div className="w-full h-full md:col-span-1">
        <Aside />
      </div>
      <div className="w-full h-full md:col-span-3">
        <Main />
      </div>
    </div>
  );
}
