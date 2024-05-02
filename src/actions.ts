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
    "https://replicate.com/api/models/jagilley/controlnet-hough/versions/854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b/predictions",
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
      referrer: "https://replicate.com/jagilley/controlnet-hough",
      referrerPolicy: "same-origin",
      body: JSON.stringify({
        input: {
          eta: 0,
          image: imageUrl,
          scale: 9,
          prompt: formData.get("prompt") as string,
          a_prompt:
            "best quality, extremely detailed, 4k, octane render, sharp, bloom, daylight",
          n_prompt:
            "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
          ddim_steps: 20,
          num_samples: "1",
          value_threshold: 0.1,
          image_resolution: "512",
          detect_resolution: 512,
          distance_threshold: 0.1,
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
        "sentry-public_key=3dc017e574684610bbc7fd3b5519a4e8,sentry-trace_id=194f3a579ab047e3ad359084fab690d7,sentry-sample_rate=0.1",
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
      "sentry-trace": "194f3a579ab047e3ad359084fab690d7-9ac61b2719042eec-0",
    },
    referrer:
      "https://replicate.com/jagilley/controlnet-hough?prediction=fahj5wjchdrgm0cf2vkr83h9pc",
    referrerPolicy: "same-origin",
    body: null,
    method: "GET",
    mode: "cors",
    credentials: "include",
  }).then((res) => res.json() as Promise<Prediction>);
}
