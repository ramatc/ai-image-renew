"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import { annotate, annotationGroup } from "rough-notation";

export default function Home() {
  const e1Ref = useRef<HTMLHeadingElement>(null);
  const e2Ref = useRef<HTMLDivElement>(null);
  const e3Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    import("two-up-element");

    const e1 = e1Ref.current;
    const e2 = e2Ref.current;
    const e3 = e3Ref.current;

    const annotations: any = [];

    if (e1) {
      const a1 = annotate(e1, {
        type: "highlight",
        color: "#b8fadd",
      });
      annotations.push(a1);
    }

    if (e2) {
      const a2 = annotate(e2, {
        type: "bracket",
        brackets: ["right", "left"],
        color: "#f5b8cf",
      });
      annotations.push(a2);
    }

    if (e3) {
      const a3 = annotate(e3, {
        type: "box",
        color: "#f2e2b8",
      });
      annotations.push(a3);
    }

    setTimeout(() => {
      const ag = annotationGroup(annotations);
      ag.show();
    }, 100);
  }, []);

  return (
    <section className="px-12 pt-12 pb-4 min-h-screen max-w-[1250px] mx-auto md:px-20 md:pt-20 page-wrapper">
      <h1 className="text-5xl text-center mb-24 font-bold" ref={e1Ref}>
        Elimina el fondo de las imágenes y restaura los colores originales
      </h1>

      <article className="mb-28 flex flex-wrap justify-between">
        <div className="w-1/2">
          <two-up>
            <Image
              src={"/input-1.jpg"}
              alt="Imágen con fondo subida por el usuario"
              width={500}
              height={500}
              className="w-full rounded"
              priority
            />
            <Image
              src={"/out-1.png"}
              alt="Imágen sin fondo realizada por la IA"
              width={500}
              height={500}
              className="w-full rounded"
            />
          </two-up>
        </div>

        <div className="w-2/5">
          <div ref={e2Ref}>
            <h3 className="text-3xl mb-2">
              Quita fondos de manera automática en pocos segundos
            </h3>
            <p>¡Aprovecha la IA de Replicate para ahorrar tiempo de edición!</p>
          </div>
        </div>
      </article>

      <article className="flex flex-wrap justify-between">
        <div className="w-2/5">
          <div ref={e3Ref} className="p-2">
            <h3 className="text-3xl mb-2">
              Restaura los colores de tus imágenes al instante
            </h3>
            <p>
              Restaura los colores de tus imágenes automáticamente con la IA de
              Replicate.
            </p>
          </div>
        </div>

        <div className="w-1/2">
          <two-up>
            <Image
              src={"/input-2.jpg"}
              alt="Imágen sin color subida por el usuario"
              width={500}
              height={500}
              className="w-full rounded"
            />
            <Image
              src={"/out-2.png"}
              alt="Imágen con color realizada por la IA"
              width={500}
              height={500}
              className="w-full rounded"
            />
          </two-up>
        </div>
      </article>
    </section>
  );
}
