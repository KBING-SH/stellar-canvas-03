import { useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "What is a free AI background remover?",
    a: "A free AI background remover is a tool that uses artificial intelligence to remove the background from images, isolating the subject to create clean visuals without manual editing.",
  },
  {
    q: "How does the free AI background remover handle cartoon-style portraits?",
    a: "The free AI background remover can process images with a cartoon effect and quickly isolate the subject, simplifying the editing process by removing backgrounds automatically.",
  },
  {
    q: "Can the free AI background remover create images with a transparent background?",
    a: "Yes, the tool can remove the background from images to produce pictures with a transparent background, suitable for various uses like avatars or portraits.",
  },
  {
    q: "Does the free AI background remover provide options for white backgrounds?",
    a: "Yes, it can replace backgrounds with a white backdrop, which is useful for product listings or professional profiles by creating a clean and polished look.",
  },
  {
    q: "Is the free AI background remover suitable for different types of images?",
    a: "The remover is mainly designed for portraits and cartoon-style images, focusing on isolating the subject effectively for clear visuals.",
  },
  {
    q: "What format are images saved in after using the free AI background remover?",
    a: "Images are typically saved as PNG files with transparent backgrounds to maintain clarity and ease of use in other designs.",
  },
  {
    q: "Does the free AI background remover require manual editing after background removal?",
    a: "No, the tool removes backgrounds automatically, allowing users to get clean results without needing additional manual editing.",
  },
  {
    q: "Can the free AI background remover be used for creating professional-looking images?",
    a: "Yes, by removing backgrounds and offering transparent or white backgrounds, the tool helps create clean and polished images suitable for professional use.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-10 md:py-24" itemScope itemType="https://schema.org/FAQPage">
      <div className="container px-4 md:px-8 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-6 md:mb-10">
          <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-md">
            <MessageCircleQuestion className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-title">FAQ</h2>
        </div>

        {/* FAQ list */}
        <div className="rounded-2xl border border-border/50 bg-card shadow-soft overflow-hidden">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            const isLast = i === faqs.length - 1;
            return (
              <div
                key={i}
                className={cn(!isLast && "border-b border-border/40")}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={cn(
                    "w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer group transition-colors duration-200",
                    isOpen ? "bg-primary/[0.04]" : "hover:bg-hover-bg"
                  )}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={cn(
                        "text-xs font-bold tabular-nums w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300",
                        isOpen
                          ? "gradient-primary text-white shadow-sm"
                          : "bg-muted text-body-desc"
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      itemProp="name"
                      className={cn(
                        "text-[15px] font-medium transition-colors",
                        isOpen ? "text-title" : "text-title group-hover:text-primary"
                      )}
                    >
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 transition-all duration-300",
                      isOpen
                        ? "rotate-180 text-primary"
                        : "text-body-desc group-hover:text-primary"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <div className="overflow-hidden">
                    <p itemProp="text" className="px-6 pb-5 pl-[3.75rem] text-sm text-body-desc leading-[1.8]">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
