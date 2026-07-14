import { useLocation } from "react-router-dom";
import { useTransition } from "../../context/TransitionContext";
import { useDevice } from "../../context/DeviceProvider";

export default function TransitionLink({ to, children, className, onClick, ...props }) {
  const { transitionToDekstop, transitionToMobile } = useTransition();
  const location = useLocation();
  const { isMobile } = useDevice();

  const handleClick = (e) => {
    // Abaikan klik tombol spesial browser
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    e.preventDefault();
    if (location.pathname === to) return;

    // Jalankan onClick eksternal jika ada (misal: untuk mencatat elemen ikon)
    if (onClick) onClick(e);

    // Picu alur transisi global
    if (!isMobile) {
      transitionToDekstop(to);
    } else {
      transitionToMobile(to);
    }
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
