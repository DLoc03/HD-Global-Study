import { useState, useEffect } from "react";

function useResponsiveItems(config) {
  const [itemsPerSlide, setItemsPerSlide] = useState(config.base || 1);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024 && config.lg) setItemsPerSlide(config.lg);
      if (window.innerWidth >= 1400 && config.xl) setItemsPerSlide(config.xl);
      else if (window.innerWidth >= 768 && config.md)
        setItemsPerSlide(config.md);
      else setItemsPerSlide(config.base || 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [config]);

  return itemsPerSlide;
}

export default useResponsiveItems;
