import { Button } from "./ui/button";

export const FeedbackContainer = () => {
  return (
    <div className="w-full lg:w-[30%] bg-gray-50 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">Feedback</h2>

      <p className="text-gray-700">
        Contamos com o seu feedback para treinar nosso sistema e garantir
        melhores acertos.
      </p>

      <div className="flex gap-4  flex-col pt-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="feedback"
            value="Sim"
            className="form-radio h-5 w-5 text-green-500"
          />
          <span>Sim</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="feedback"
            value="Não"
            className="form-radio h-5 w-5 text-red-500"
          />
          <span>Não</span>
        </label>
        <Button className="w-36 cursor-pointer">Enviar</Button>
      </div>
    </div>
  );
};
