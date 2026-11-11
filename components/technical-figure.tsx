import Image from "next/image";

export function TechnicalFigure({ src, alt, caption, children }: { src: string; alt: string; caption: string; children?: React.ReactNode }) {
  return (
    <figure className="technical-figure">
      <Image src={src} alt={alt} width={1000} height={500} />
      <figcaption>{caption}</figcaption>
      {children && <div className="figure-text"><strong>Padanan teks:</strong> {children}</div>}
    </figure>
  );
}
