"use client";

import { useFormState, useFormStatus } from "react-dom";

import { createPrediction, getPrediction } from "@/actions";
import { Prediction } from "@/types";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function FormContent() {
  const { pending } = useFormStatus();

  return (
    <>
      <input
        placeholder="https://replicate.delivery/pbxt/IJZOELWrncBcjdE1s5Ko8ou35ZOxjNxDqMf0BhoRUAtv76u4/room.png"
        defaultValue="https://replicate.delivery/pbxt/IJZOELWrncBcjdE1s5Ko8ou35ZOxjNxDqMf0BhoRUAtv76u4/room.png"
        type="file"
        name="image"
        className="my-2"
        accept="image/*"
      />
      <textarea name="prompt" placeholder="An industrial bedroom" />
      <button
        type="submit"
        className="bg-white w-full text-black p-3 rounded mt-2"
        disabled={pending}
      >
        Crear
      </button>
    </>
  );
}

export default function Home() {
  const [state, formAction] = useFormState(handleSubmit, null);

  async function handleSubmit(_state: null | Prediction, formData: FormData) {
    let prediction = await createPrediction(formData);

    while (["starting", "processing"].includes(prediction.status)) {
      prediction = await getPrediction(prediction.id);

      await sleep(4000);
    }

    return prediction;
  }

  return (
    <section className="px-12 pt-12 pb-4 min-h-screen max-w-[1250px] mx-auto md:px-20 md:pt-20">
      {state?.output && <img alt="Prev del render" src={state.output[1]} />}
      <form action={formAction}>
        <FormContent />
      </form>
    </section>
  );
}
