"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    import("two-up-element");
  }, []);

  return (
    <section className="px-12 pt-12 pb-4 min-h-screen max-w-[1250px] mx-auto md:px-20 md:pt-20 page-wrapper">
      <div className="w-1/2 mb-10">
        <two-up>
          <Image
            src={"/input-1.jpg"}
            alt="Prev del render"
            width={500}
            height={500}
            className="w-full"
            priority
          />
          <Image
            src={"/out-1.png"}
            alt="Prev del render"
            width={500}
            height={500}
            className="w-full"
          />
        </two-up>
      </div>

      <div className="w-1/2">
        <two-up>
          <Image
            src={"/input-2.jpg"}
            alt="Prev del render"
            width={500}
            height={500}
            className="w-full"
          />
          <Image
            src={"/out-2.jpg"}
            alt="Prev del render"
            width={500}
            height={500}
            className="w-full"
          />
        </two-up>
      </div>
    </section>
  );
}
