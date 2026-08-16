import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        alt?: string;
        exposure?: string;
        "shadow-intensity"?: string;
        "disable-zoom"?: boolean;
        "interaction-prompt"?: string;
      };
    }
  }
}

export {};
