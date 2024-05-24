"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

import FileInput from "@/app/components/file-input";
import { removeBackground } from "@/actions";

function FormContent({ state }: { state: string | undefined }) {
  const { pending } = useFormStatus();

  return (
    <FileInput status={pending} state={state} button="Eliminar el fondo" />
  );
}

export default function PageRemove() {
  useEffect(() => {
    import("two-up-element");
  }, []);

  const [state, formAction] = useFormState(handleSubmit, null);

  async function handleSubmit(_state: null | object, formData: FormData) {
    let prediction = await removeBackground(formData);

    return prediction;
  }

  return (
    <section className="px-12 pt-12 min-h-screen max-w-[1250px] mx-auto md:px-20 md:pt-20">
      <h1 className="text-2xl lg:text-4xl text-center mt-10 mb-6 font-bold text-gray-700">
        Sube una imagen para
        <br />
        eliminar el fondo
      </h1>

      <form action={formAction}>
        <FormContent state={state} />
      </form>
    </section>
  );
}
