import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

export const Marquee = ({
  position = "left",
  duration = 50,
  children = [],
  gap = 16,
  className,
}) => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const ulElements = marqueeRef.current?.querySelectorAll("ul");
    if (!ulElements || ulElements.length === 0) return;

    const timelines = [];

    ulElements.forEach((ul) => {
      const timeline = gsap.timeline({ repeat: -1 });

      if (position === "left") {
        timeline
          .set(ul, { paddingRight: gap })
          .to(ul, {
            xPercent: -100,
            ease: "linear",
            duration,
          })
          .set(ul, { xPercent: 0 });
      } else {
        timeline
          .set(ul, { paddingLeft: gap })
          .set(ul, { xPercent: -100 })
          .to(ul, {
            xPercent: 0,
            ease: "linear",
            duration,
          });
      }

      timelines.push(timeline);
    });

    return () => {
      timelines.forEach((tl) => tl.kill());
    };
  }, [position, duration, gap]);

  return (
    <div
      ref={marqueeRef}
      className={cn(
        "relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,rgba(0,0,0,0),rgba(0,0,0,1)_10%,rgba(0,0,0,1)_90%,rgba(0,0,0,0))] py-5 md:[mask-image:linear-gradient(to_right,rgba(0,0,0,0),rgba(0,0,0,1)_20%,rgba(0,0,0,1)_80%,rgba(0,0,0,0))]",
        className,
      )}
    >
      {Array.from({ length: 2 }).map((_, i) => (
        <ul key={i} className="flex shrink-0" style={{ gap }}>
          {children}
        </ul>
      ))}
    </div>
  );
};

export const MarqueeItem = ({ className, children }) => {
  return <li className={cn(className)}>{children}</li>;
};
