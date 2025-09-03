import Image from "next/image";
import { Card } from "./_components/ui/card";
import personalEmail from "@/app/_assets/personal-email.png";
import { ChartSpline, Funnel } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full p-4 bg-gray-100 mt-4">
        <span className="py-2 font-semibold text-gray-800 text-2xl">
          Bem vindo! ao EmailManagerAutoU
        </span>
        <span className="py-2 font-semibold text-gray-800 text-lg">
          Classifique seus e-mails facilmente em categorias produtivas e
          improdutivas, ajudando você a se concentrar no que realmente importa.
        </span>
        <div className="w-full min-h-[300px] sm:min-h-[400px] md:min-h-[480px] lg:min-h-[560px] relative">
          <Image
            src={personalEmail}
            alt="Imagem apresentação"
            fill
            className="object-contain cursor-pointer"
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-6 w-full pt-4 px-4">
        <Link href="/classificar-email" className="w-full sm:w-auto">
          <Card
            className="p-10 flex flex-col gap-2 items-center text-center shadow-md cursor-pointer 
                   transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          >
            <Funnel className="w-8 h-8" />
            <span className="font-semibold text-lg">
              Classifique seus E-mails
            </span>
            <span>Classifique seus emails de forma rápida e prática.</span>
          </Card>
        </Link>
        <Link href="/relatorios-email" className="w-full sm:w-auto">
          <Card
            className="p-10 flex flex-col gap-2 items-center text-center shadow-md cursor-pointer 
                   transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          >
            <ChartSpline className="w-8 h-8" />
            <span className="font-semibold text-lg">
              Relatórios de produtividade
            </span>
            <span>Classifique seus emails de forma rápida e prática.</span>
          </Card>
        </Link>
      </div>
    </>
  );
}
