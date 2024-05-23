"use server";

import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function removeBackground(formData: FormData): Promise<any> {
  const imageUrl = await fetch(
    `https://api.cloudinary.com/v1_1/ramatc/image/upload?upload_preset=replicate&folder=replicate`,
    {
      method: "PUT",
      body: formData.get("image") as File,
    }
  )
    .then((res) => res.json() as Promise<{ secure_url: string }>)
    .then(({ secure_url }) => secure_url);

  const output = await replicate.run(
    "cjwbw/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003",
    {
      input: {
        image: imageUrl,
      },
    }
  );

  return output;
}

export async function restoreColor(formData: FormData): Promise<any> {
  const imageUrl = await fetch(
    `https://api.cloudinary.com/v1_1/ramatc/image/upload?upload_preset=replicate&folder=replicate`,
    {
      method: "PUT",
      body: formData.get("image") as File,
    }
  )
    .then((res) => res.json() as Promise<{ secure_url: string }>)
    .then(({ secure_url }) => secure_url);

  const output = await replicate.run(
    "piddnad/ddcolor:ca494ba129e44e45f661d6ece83c4c98a9a7c774309beca01429b58fce8aa695",
    {
      input: {
        image: imageUrl,
        model_size: "large",
      },
    }
  );

  return output;
}
