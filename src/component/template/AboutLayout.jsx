import HeroAbout from "../organism/About/HeroAbout";
import HowIThink from "../organism/About/HowIThink";
import MyStory from "../organism/About/MyStory";
import PreContact from "../organism/PreContact";

function AboutLayout() {
  return (
    <>
      <HeroAbout />
      <HowIThink />
      <MyStory />
      <PreContact />
    </>
  );
}

export default AboutLayout;
