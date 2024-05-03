"use server";

import { Prediction } from "@/types";

import { unstable_noStore as noStore } from "next/cache";

export async function createPrediction(
  formData: FormData
): Promise<Prediction> {
  noStore();

  const imageUrl = await fetch(
    `https://api.cloudinary.com/v1_1/ramatc/image/upload?upload_preset=replicate&folder=replicate`,
    {
      method: "PUT",
      body: formData.get("image") as File,
    }
  )
    .then((res) => res.json() as Promise<{ secure_url: string }>)
    .then(({ secure_url }) => secure_url);

  const prediction = await fetch(
    "https://replicate.com/api/models/cjwbw/rembg/versions/fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003/predictions",
    {
      headers: {
        accept: "application/json",
        "accept-language": "es-ES,es;q=0.9",
        "cache-control": "no-cache",
        "content-type": "application/json",
        pragma: "no-cache",
        priority: "u=1, i",
        "sec-ch-ua":
          '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": '"Android"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-csrftoken": "A5sL51Out2VApJoQFJhlzUlGHa3UrENR",
      },
      referrer: "https://replicate.com/cjwbw/rembg",
      referrerPolicy: "same-origin",
      body: JSON.stringify({
        input: {
          image: imageUrl,
        },
        stream: false,
      }),
      method: "POST",
      mode: "cors",
      credentials: "include",
    }
  ).then((res) => res.json() as Promise<Prediction>);

  return prediction;
}

export async function getPrediction(id: string) {
  noStore();

  return fetch("https://replicate.com/api/predictions/" + id, {
    headers: {
      accept: "*/*",
      "accept-language": "es-ES,es;q=0.9",
      baggage:
        "sentry-public_key=3dc017e574684610bbc7fd3b5519a4e8,sentry-trace_id=0bdb5ebe88fe428ca6c35dd71bb846cf,sentry-sample_rate=0.1",
      "cache-control": "no-cache",
      pragma: "no-cache",
      priority: "u=1, i",
      "sec-ch-ua":
        '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
      "sec-ch-ua-mobile": "?1",
      "sec-ch-ua-platform": '"Android"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "sentry-trace": "0bdb5ebe88fe428ca6c35dd71bb846cf-8176464f7e4193e6-0",
    },
    referrer:
      "https://replicate.com/cjwbw/rembg?prediction=avetbx74r5rgm0cf7ax9azw27w",
    referrerPolicy: "same-origin",
    body: null,
    method: "GET",
    mode: "cors",
    credentials: "include",
  }).then((res) => res.json() as Promise<Prediction>);
}
