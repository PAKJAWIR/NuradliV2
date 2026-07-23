import AboutMe from "../organism/LandingPages/AboutMe";
import Hero from "../organism/LandingPages/Hero";
import MyServices from "../organism/LandingPages/MyServices";
import PreContact from "../organism/LandingPages/PreContact";
import SelectedProjects from "../organism/LandingPages/SelectedProjects";

function HomeLayout() {
  return (
    <>
      <Hero />
      <AboutMe />
      <SelectedProjects />
      <MyServices />
      <PreContact />
    </>
  );
}

export default HomeLayout;
