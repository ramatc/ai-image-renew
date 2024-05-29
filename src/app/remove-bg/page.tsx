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
    <section className="mx-auto min-h-screen max-w-[1250px] px-12 pt-12 md:px-20 md:pt-20">
      <h1 className="mb-6 mt-10 text-center text-2xl font-bold text-gray-700 lg:text-4xl">
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
