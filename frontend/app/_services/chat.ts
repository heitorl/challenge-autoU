"use server";

import { revalidatePath } from "next/cache";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function sendMessageToAPI(message: string) {
  const response = await fetch(`${apiUrl}/api/classify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email_content: message }),
  });
  if (!response.ok) {
    throw new Error("Erro ao enviar mensagem");
  }

  const data = await response.json();
  revalidatePath(`/`);
  return data;
}

export async function sendFileToAPI(formData: FormData) {
  const response = await fetch(`${apiUrl}/api/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Erro ao enviar arquivo");
  }

  const data = await response.json();
  return data;
}
