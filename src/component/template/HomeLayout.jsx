import AboutMe from "../organism/LandingPages/AboutMe";
import Hero from "../organism/LandingPages/Hero";
import MyServices from "../organism/LandingPages/MyServices";
import SelectedProjects from "../organism/LandingPages/SelectedProjects";
import PreContact from "../organism/PreContact";

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
