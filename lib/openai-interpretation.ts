import { buildInterpretationPrompt, fallbackInterpretation } from "@/lib/studio-content";
import { OrderDraft } from "@/lib/order-store";

const OPENAI_RESPONSES_ENDPOINT = "https://api.openai.com/v1/responses";

type OpenAITextContent = { type?: string; text?: string };
type OpenAIOutputItem = { type?: string; content?: OpenAITextContent[] };
type OpenAIResponsePayload = { output_text?: string; output?: OpenAIOutputItem[]; error?: { message?: string } };

function maxOutputTokensFor(order: OrderDraft) {
  if (order.productSlug.includes("ultimate-ai-kampanya")) return Number(process.env.OPENAI_MAX_OUTPUT_TOKENS_PREMIUM || 7000);
  if (order.productSlug.includes("viral")) return Number(process.env.OPENAI_MAX_OUTPUT_TOKENS_DETAILED || 5400);
  if (order.productSlug.includes("pro")) return Number(process.env.OPENAI_MAX_OUTPUT_TOKENS_DEEP || 4300);
  return Number(process.env.OPENAI_MAX_OUTPUT_TOKENS_DEFAULT || 3200);
}

function extractText(payload: OpenAIResponsePayload) {
  if (payload.output_text?.trim()) return payload.output_text.trim();
  const pieces = payload.output
    ?.flatMap((item) => item.content || [])
    .map((content) => content.text || "")
    .filter(Boolean) || [];
  return pieces.join("\n").trim();
}

export async function generateInterpretation(order: OrderDraft) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.warn("OPENAI_API_KEY missing. Sending fallback panel file.");
    return fallbackInterpretation(order);
  }

  const imageLimit = Number(process.env.OPENAI_IMAGE_INPUT_LIMIT || 4);
  const imageContent = order.images.slice(0, imageLimit).map((image) => ({
    type: "input_image",
    image_url: `data:${image.mimeType || "image/jpeg"};base64,${image.base64}`
  }));

  const response = await fetch(OPENAI_RESPONSES_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: buildInterpretationPrompt(order) },
            ...imageContent
          ]
        }
      ],
      max_output_tokens: maxOutputTokensFor(order),
      store: false
    })
  });

  const payload = (await response.json().catch(() => ({}))) as OpenAIResponsePayload;
  if (!response.ok) throw new Error(payload.error?.message || "OpenAI kreatif dosya üretimi başarısız oldu.");
  const text = extractText(payload);
  if (!text) throw new Error("OpenAI boş dosya döndürdü.");
  return text;
}
