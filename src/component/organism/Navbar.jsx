import { useDevice } from "../../context/DeviceProvider";
import ButtonDesktop from "../molecules/NavbarButton/ButtonDekstop";
import ButtonMobile from "../molecules/NavbarButton/ButtonMobile";

function Navbar() {
  const { isMobile } = useDevice();

  return isMobile ? <ButtonMobile /> : <ButtonDesktop />;
}

export default Navbar;
