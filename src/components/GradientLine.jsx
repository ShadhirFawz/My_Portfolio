import { useEffect, useRef } from 'react';

const GradientUnderline = () => {
  const gradientRef = useRef(null);
  const startTime = useRef(null);
  const duration = 600; // seconds (10 minutes per cycle)

  useEffect(() => {
    const animate = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = (timestamp - startTime.current) / 1000;
      const progress = (elapsed % duration) / duration;
      
      if (gradientRef.current) {
        gradientRef.current.style.backgroundPositionX = `${progress * 500}%`;
      }
      
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="relative mt-[-30px] h-2 w-full max-w-[250px] md:max-w-[350px] rounded-full overflow-hidden brightness-85">
      <div 
        ref={gradientRef}
        className="absolute inset-0 w-full h-full"
        style={{
          background: "linear-gradient(90deg, #EE696B, #C35D8A, #90559F, #6C4C99, #523A78, #EE696B)",
          backgroundSize: "500% 100%",
          backgroundPositionX: "0%"
        }}
      />
    </div>
  );
};

export default GradientUnderline;