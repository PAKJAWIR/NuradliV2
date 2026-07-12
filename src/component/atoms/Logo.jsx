function Logo({
  className = "", // Target class untuk animasi GSAP pada elemen Img
  containerClassName = "", // Custom class tambahan untuk wrapper div luar
  containerWidth = "w-full", // Default width menggunakan utility Tailwind
  containerHeight = "h-full", // Default height menggunakan utility Tailwind
  ...props
}) {
  return (
    <div className={`${containerWidth} ${containerHeight} select-none pointer-events-none flex items-center justify-center ${containerClassName}`}>
      <img
        src="/Kura.svg"
        alt="Kura Logo"
        // w-full h-full di sini mengunci gambar agar selalu presisi mengikuti ukuran container-nya
        className={`w-full h-full object-contain will-change-transform ${className}`}
        {...props}
      />
    </div>
  );
}

export default Logo;
