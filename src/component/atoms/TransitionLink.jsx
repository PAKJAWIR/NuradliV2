import { useLocation } from "react-router-dom";
import { useTransition } from "../../context/TransitionContext";

export default function TransitionLink({ to, children, className, ...props }) {
  const { transitionTo } = useTransition();
  const location = useLocation();

  const handleClick = (e) => {
    // Biarkan browser menangani klik spesial
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }

    e.preventDefault();

    if (location.pathname === to) return;

    transitionTo(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
