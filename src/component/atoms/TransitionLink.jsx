import { useLocation } from "react-router-dom";
import { useTransition } from "../../context/TransitionContext";
import { useDevice } from "../../context/DeviceProvider";

export default function TransitionLink({ to, children, className, onClick, ...props }) {
  const { transitionToDesktop, transitionToMobile } = useTransition();
  const location = useLocation();
  const { isMobile } = useDevice();

  const handleClick = (e) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    e.preventDefault();

    if (onClick) onClick(e);

    if (location.pathname === to) return;

    if (!isMobile) {
      transitionToDesktop(to);
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
