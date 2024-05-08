"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { createRestorePrediction, getRestorePrediction } from "@/actions";
import { Prediction } from "@/types";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function FormContent() {
  const { pending } = useFormStatus();

  return (
    <>
      <input type="file" name="image" className="my-2" accept="image/*" />
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

export default function PageRestore() {
  useEffect(() => {
    import("two-up-element");
  }, []);

  const [state, formAction] = useFormState(handleSubmit, null);

  async function handleSubmit(_state: null | Prediction, formData: FormData) {
    let prediction = await createRestorePrediction(formData);

    while (["starting", "processing"].includes(prediction.status)) {
      prediction = await getRestorePrediction(prediction.id);

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
      {state?.output && <img alt="Prev del render" src={state.output} />}

      <form action={formAction}>
        <FormContent />
      </form>
      <button>Descargar imágen</button>
    </section>
  );
}
