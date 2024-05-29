"use client";

import { SyntheticEvent, useRef, useState } from "react";
import Loader from "@/app/components/loader";

function FileInput({
  status,
  state,
  button,
}: {
  status: boolean;
  state: string | undefined;
  button: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | undefined>(undefined);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const handleDownload = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (state) {
      try {
        const response = await fetch(state);
        if (!response.ok) {
          throw new Error("La respuesta de la red no fue correcta");
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "image-renew.png");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error al descargar la imagen:", error);
      }
    }
  };

  const renderImagePreview = () => (
    <two-up>
      <img
        src={preview}
        alt="Imagen subida por el usuario"
        className="rounded"
      />
      {state ? (
        <img
          src={state}
          alt="Imagen realizada por la IA de Replicate"
          className="rounded"
        />
      ) : (
        <img
          src={preview}
          alt="Imagen subida por el usuario blureada"
          className="rounded blur"
        />
      )}
    </two-up>
  );

  const renderButtons = () => {
    if (state) {
      return (
        <button
          className="mt-4 block w-full cursor-pointer rounded bg-green-500 p-3 text-center font-semibold text-white hover:bg-green-600 focus:outline-none"
          onClick={handleDownload}
        >
          Descargar
        </button>
      );
    }

    if (status) {
      return <Loader />;
    }
  };

  const renderUploadButton = () => {
    return (
      <div
        className={`flex flex-wrap ${
          preview ? "justify-between" : "flex-col items-center"
        }`}
      >
        <input
          type="file"
          name="image"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button
          type="button"
          onClick={handleButtonClick}
          className="mt-4 w-full rounded-full bg-blue-500 px-2 py-3 font-semibold text-white hover:bg-blue-600 focus:outline-none sm:w-[48%] sm:text-lg"
        >
          Cargar imagen
        </button>

        {preview && (
          <button
            type="submit"
            className="mt-4 w-full rounded-full bg-orange-500 px-2 py-3 font-semibold text-white hover:bg-orange-600 focus:outline-none sm:w-[48%] sm:text-lg"
            disabled={status}
          >
            {button}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="mx-auto md:w-2/3 lg:w-1/2">
      <div className="min-h-72 place-content-center border-4 border-dotted bg-[#fafafa] p-6 shadow-xl">
        {preview && renderImagePreview()}
        {status || state ? renderButtons() : renderUploadButton()}
      </div>
    </div>
  );
}

export default FileInput;
