import { cn } from "@/lib/utils";
import { useDraggableMarquee } from "@/hooks/use-draggable-marquee";

const testimonials = [
  {
    name: "Maria Gonzalez",
    role: "Small Business Owner",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    content: "I found this free AI background remover easy to use. Uploading my product photos and getting clean backgrounds was straightforward and effective. The transparent background output helped me create better listings without extra effort. It's a useful tool for anyone needing quick background removal.",
  },
  {
    name: "James Lee",
    role: "Freelance Graphic Designer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    content: "This free AI background remover provides clean results with little effort. I liked how it preserved fine details like hair edges and allowed me to download images with transparent backgrounds. It's a dependable option when I need to isolate subjects for design projects without spending too much time.",
  },
  {
    name: "Aisha Khan",
    role: "Social Media Manager",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    content: "Using this free AI background remover has made editing photos for social media more efficient. The tool removes backgrounds with reasonable accuracy, letting me focus more on content creation. The transparent PNG downloads work well for integrating images into posts.",
  },
  {
    name: "Lukas Schmidt",
    role: "Photographer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    content: "As a photographer, I often need to remove distracting backgrounds from portraits. This free AI background remover performs well for that. It keeps edges natural and usually doesn't require manual touch-ups. The process is simple, and the output suits further editing or client previews.",
  },
  {
    name: "Priya Patel",
    role: "E-commerce Seller",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    content: "The free AI background remover helped me create clean product images with white or transparent backgrounds, which is important for my online store. The tool's accuracy in detecting product edges made my photos look more professional without extra editing. It's a valuable resource for sellers.",
  },
  {
    name: "David Johnson",
    role: "Content Creator",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    content: "I used this free AI background remover to prepare images for my videos and presentations. It removes backgrounds neatly and outputs transparent PNGs that I can easily layer over different visuals. The simple upload and download process fits well into my workflow.",
  },
  {
    name: "Yuki Tanaka",
    role: "Marketing Assistant",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    content: "This free AI background remover is a practical tool for marketing materials. I often need images without backgrounds to create clean layouts, and this tool's precision helps maintain image quality. It's easy to use, and the transparent background files integrate well into various projects.",
  },
  {
    name: "Ahmed El-Sayed",
    role: "Web Designer",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    content: "The free AI background remover works well for isolating subjects in web design. It handles complex edges like hair and fur reasonably well, which is important for my clients' profile pictures and product images. Downloading transparent PNGs makes placing images on different backgrounds easier.",
  },
  {
    name: "Sophie Martin",
    role: "Blogger",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    content: "I rely on this free AI background remover to create clean images for my blog posts. The tool's accuracy in removing backgrounds means my photos look polished without spending much time on manual edits. The transparent backgrounds allow me to customize visuals easily.",
  },
  {
    name: "Carlos Ramirez",
    role: "Digital Artist",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop",
    content: "This free AI background remover is a helpful part of my creative process. It quickly removes backgrounds from my artwork photos, preserving details and edges well. The transparent PNG output lets me integrate my images into new compositions without difficulty.",
  },
];

const row1 = testimonials.slice(0, 5);
const row2 = testimonials.slice(5, 10);

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: typeof testimonials;
  reverse?: boolean;
}) {
  const { scrollRef, handlers } = useDraggableMarquee();

  return (
    <div
      className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] cursor-grab active:cursor-grabbing select-none touch-none scrollbar-hide"
      {...handlers}
    >
      <div
        ref={scrollRef}
        className={cn(
          "flex gap-3 md:gap-5 w-max",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
        style={{ willChange: "transform" }}
      >
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <li
            key={i}
            className="w-[260px] md:w-[380px] shrink-0 rounded-xl md:rounded-2xl border border-border/50 bg-card p-3 md:p-5 shadow-soft hover:shadow-soft-lg transition-shadow duration-300"
          >
            <figure>
              <blockquote className="text-xs md:text-sm text-body2 leading-relaxed md:leading-[1.75] mb-2 md:mb-4 line-clamp-3">
                "{t.content}"
              </blockquote>
              <figcaption className="flex items-center gap-2 md:gap-3">
                <img
                  src={t.avatar}
                  alt={`${t.name}, ${t.role}`}
                  className="h-7 w-7 md:h-9 md:w-9 rounded-full object-cover"
                  loading="lazy"
                  width="36"
                  height="36"
                  draggable={false}
                />
                <div>
                  <p className="text-xs md:text-sm font-semibold text-title leading-snug">
                    {t.name}
                  </p>
                  <p className="text-[10px] md:text-xs text-body-desc">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          </li>
        ))}
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section
      className="py-10 md:py-24 overflow-hidden"
      aria-labelledby="user-feedback-title"
    >
      <div className="container px-4 md:px-8 max-w-6xl mb-6 md:mb-12">
        <h2 id="user-feedback-title" className="text-xl md:text-3xl font-bold text-title text-center mb-2 md:mb-3">
          What Users Say
        </h2>
        <p className="text-sm md:text-base text-body-desc text-center max-w-lg mx-auto">
          Sample feedback from users who tried Rita's free AI background remover.
        </p>
      </div>

      <div className="space-y-3 md:space-y-5">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>
    </section>
  );
}
