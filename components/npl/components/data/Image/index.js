import { useState } from "react";

function Image({ src, alt = "", className = "", fallbackSrc = "/placeholder.png" }) {
  const [hasError, setHasError] = useState(false);

  return (
    <img
      src={hasError ? fallbackSrc : src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      loading="lazy" // for better performance
      decoding="async"
    />
  );
}

export default Image;
