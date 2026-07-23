import { useDevice } from "../../context/DeviceProvider";
import ButtonDesktop from "../molecules/NavbarButton/ButtonDekstop";
import BtnMobile from "../molecules/NavbarButton/BtnMobile";

function Navbar() {
  const { isMobile } = useDevice();

  return isMobile ? <BtnMobile /> : <ButtonDesktop />;
}

export default Navbar;
