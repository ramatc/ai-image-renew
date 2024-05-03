"use client";

import "two-up-element";
import { useFormState, useFormStatus } from "react-dom";

import { createPrediction, getPrediction } from "@/actions";
import { Prediction } from "@/types";

function FormContent() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? <p>Loading...</p> : null}
      <input
        type="file"
        name="image"
        className="my-2 p-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
        accept="image/*"
      />

      <button
        type="submit"
        className="bg-black text-white p-3 rounded-lg mt-2"
        disabled={pending}
      >
        Cargar imagen
      </button>
    </>
  );
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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
      {/* <two-up>
        {state?.input.image && (
          <img alt="Prev del render" src={state.input.image} />
        )}

        {state?.output && <img alt="Prev del render" src={state.output} />}
      </two-up> */}

      <form action={formAction} className="p-20 border-double rounded">
        <FormContent />
      </form>
    </section>
  );
}
