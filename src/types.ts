export interface Prediction {
  status: "starting" | "processing" | "succeeded";
  id: string;
  output: string;
  input: {
    image: string;
  };
}

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    orientation?: "horizontal" | "vertical";
    legacyClipCompat?: boolean;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "two-up": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
