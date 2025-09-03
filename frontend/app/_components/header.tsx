import { Mail } from "lucide-react";
import Link from "next/link";
export const Header = () => {
  return (
    <div className="flex justify-between items-center p-6 shadow-md">
      <div className="flex gap-1.5">
        <Mail />
        <h2 className="font-semibold">EmailManagerAutoU</h2>
      </div>

      <div className="flex gap-6">
        <Link href="/">
          <span className="cursor-pointer hover:text-blue-500">Home</span>
        </Link>
        <Link href="/classificar-email">
          <span className="cursor-pointer hover:text-blue-500">
            Classificar Email
          </span>
        </Link>
        <Link href="/relatorios-email">
          <span className="cursor-pointer hover:text-blue-500">Relatórios</span>
        </Link>
      </div>
    </div>
  );
};
