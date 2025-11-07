"use client";

import { useMemo, useState, useCallback } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type Item = {
  _id: string;
  url: string;
  alt: string;
};

export default function GalleryGrid({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // slides for lightbox
  const slides = useMemo(
    () =>
      items.map((img) => ({
        src: img.url,
        alt: img.alt,
      })),
    [items]
  );

  const openAt = useCallback((i: number) => {
    setIndex(i);
    setOpen(true);
  }, []);

  // Custom floating circular arrow buttons
  const ArrowButton = ({
    onClick,
    dir,
  }: {
    onClick?: () => void;
    dir: "prev" | "next";
  }) => (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous" : "Next"}
      className={`pointer-events-auto fixed top-1/2 -translate-y-1/2 z-[60] h-12 w-12 rounded-full bg-black/60 backdrop-blur
                  hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60
                  flex items-center justify-center shadow-lg
                  ${dir === "prev" ? "left-4 sm:left-6" : "right-4 sm:right-6"}`}
    >
      {/* Chevron icon */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        {dir === "prev" ? (
          <path d="M15 18l-6-6 6-6" />
        ) : (
          <path d="M9 6l6 6-6 6" />
        )}
      </svg>
    </button>
  );

  return (
    <>
      {/* Grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((img, i) => (
          <figure
            key={img._id}
            className="group overflow-hidden rounded-xl border bg-card"
          >
            <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
              <img
                src={img.url}
                alt={img.alt}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] cursor-pointer"
                loading="lazy"
                decoding="async"
                onClick={() => openAt(i)}
              />
            </div>
            {/* No caption/title block to keep UI clean */}
          </figure>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        // Mobile swipe is built-in
        // Keyboard navigation is built-in (arrows + ESC)
        render={{
            buttonPrev: () =>
              index > 0 ? (
                <ArrowButton dir="prev" onClick={() => setIndex(index - 1)} />
              ) : null,
          
            buttonNext: () =>
              index < slides.length - 1 ? (
                <ArrowButton dir="next" onClick={() => setIndex(index + 1)} />
              ) : null,
          }}
          
        // Tweak overlay/animation defaults as needed
      />

      {/* Dark + Blur backdrop override */}
      <style jsx global>{`
        /* Lightbox backdrop: dark + blur */
        .yarl__backdrop {
          backdrop-filter: blur(8px);
          background-color: rgba(0, 0, 0, 0.65) !important;
        }
        /* Remove default control backgrounds so our custom arrows shine */
        .yarl__button {
          background: transparent;
          box-shadow: none;
        }
      `}</style>
    </>
  );
}
