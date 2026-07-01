import AboutMe from "../organism/LandingPages/AboutMe";
import Hero from "../organism/LandingPages/Hero";
import SelectedProjects from "../organism/LandingPages/SelectedProjects";

function HomeLayout() {
  return (
    <>
      <Hero />
      <AboutMe />
      <SelectedProjects />
    </>
  );
}

export default HomeLayout;
