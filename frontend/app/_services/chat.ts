"use server";

import { revalidatePath } from "next/cache";

export async function sendMessageToAPI(message: string) {
  const response = await fetch(`http://127.0.0.1:5000/api/classify`, {
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
  const response = await fetch(`http://127.0.0.1:5000/api/upload`, {
    method: "POST",
    body: formData, // multipart/form-data
  });

  if (!response.ok) {
    throw new Error("Erro ao enviar arquivo");
  }

  const data = await response.json();
  return data;
}
