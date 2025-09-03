"use client";

import EmailClassificationCard from "../_components/email-classification-card";
import { Button } from "../_components/ui/button";
import { Loader2Icon } from "lucide-react";
import { startTransition, useRef, useState } from "react";
import { sendFileToAPI, sendMessageToAPI } from "../_services/chat";
import { FeedbackContainer } from "../_components/feedback-container";

interface EmailStats {
  total: number;
  productive: number;
  unproductive: number;
}

const ClassifyEmail = () => {
  const [content, setContent] = useState("");
  const [classification, setClassification] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [stats, setStats] = useState<EmailStats>({
    total: 0,
    productive: 0,
    unproductive: 0,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateStats = (category: string) => {
    const newStats = { ...stats, total: stats.total + 1 };

    if (category === "produtivo") newStats.productive += 1;
    else if (category === "improdutivo") newStats.unproductive += 1;

    setStats(newStats);
    localStorage.setItem("emailStats", JSON.stringify(newStats));

    const history = JSON.parse(localStorage.getItem("emailHistory") || "[]");

    const newEntry = {
      date: new Date().toLocaleTimeString(),
      total: newStats.total,
      productive: newStats.productive,
      unproductive: newStats.unproductive,
    };

    history.push(newEntry);
    localStorage.setItem("emailHistory", JSON.stringify(history));
  };

  const handleClassify = async () => {
    if (!content.trim() && !file) return;

    setLoading(true);
    try {
      startTransition(async () => {
        let category;
        if (content.trim()) {
          const response = await sendMessageToAPI(content);
          category = response.data.category.toLowerCase();
          setClassification(category);
          updateStats(category);
        }

        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          const uploadResponse = await sendFileToAPI(formData);
          console.log("Upload realizado:", uploadResponse.data);
          category = uploadResponse.data.category.toLowerCase();
          setClassification(category);
          updateStats(category);
        }

        setContent("");
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-4 p-6 mt-4">
      <div className="w-full lg:w-[70%] bg-gray-50 p-4 rounded-lg shadow-md flex flex-col gap-4">
        <div className="w-full flex flex-col gap-4 ">
          <span className="font-semibold text-xl">Classificar Email</span>

          <div className="">
            <label>Conteúdo do E-mail</label>
            <textarea
              className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 bg-white"
              placeholder="Digite ou cole o conteúdo do email aqui..."
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setClassification(null);
              }}
            />
          </div>

          <label className="w-full bg-white flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer hover:border-primary transition">
            <span className="text-gray-500">
              Clique ou arraste um .pdf ou .txt
            </span>
            <input
              type="file"
              accept=".pdf,.txt"
              className="hidden"
              ref={fileInputRef}
              onChange={(e) => {
                setFile(e.target.files?.[0] || null);
                setClassification(null);
              }}
            />
            {file && (
              <span className="mt-2 text-sm text-gray-700">
                Arquivo selecionado: {file.name}
              </span>
            )}
          </label>

          <Button
            className="w-36 py-4 cursor-pointer"
            onClick={handleClassify}
            disabled={loading}
          >
            {loading && <Loader2Icon className="animate-spin" size={16} />}
            {loading ? "Classificando..." : "Classificar Email"}
          </Button>
        </div>

        {classification && (
          <EmailClassificationCard
            type={classification as "produtivo" | "improdutivo"}
          />
        )}
      </div>

      {classification && <FeedbackContainer />}
    </div>
  );
};

export default ClassifyEmail;
