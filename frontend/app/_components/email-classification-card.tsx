import { Check, X } from "lucide-react";
import { Card } from "./ui/card";

interface EmailClassificationCardProps {
  type: "produtivo" | "improdutivo";
}

const EmailClassificationCard = ({ type }: EmailClassificationCardProps) => {
  const isProdutivo = type === "produtivo";

  return (
    <Card
      className={`w-full p-6 flex flex-row gap-2 border-2 ${
        isProdutivo ? "border-green-400" : "border-red-400"
      } rounded-lg`}
    >
      {isProdutivo ? (
        <Check className="text-green-400" />
      ) : (
        <X className="text-red-400" />
      )}
      <span className="font-semibold">
        {isProdutivo ? "Produtivo" : "Improdutivo"}
      </span>
    </Card>
  );
};

export default EmailClassificationCard;
