import CinematicAboutWrapper from "@/components/about/CinematicAboutWrapper";
import AboutHero from "@/components/about/AboutHero";
import FounderTimeline from "@/components/about/FounderTimeline";
import MeetTheFounders from "@/components/about/MeetTheFounders";
import WhyWeStarted from "@/components/about/WhyWeStarted";
import StoryProgress from "@/components/about/StoryProgress";
import CTABanner from "@/components/sections/CTABanner";

export const metadata = {
  title: "About | orrange.ai",
  description: "The story behind orrange.ai and the systems we build.",
};

export default function AboutPage() {
  return (
    <CinematicAboutWrapper>
      <StoryProgress />
      <AboutHero />
      <FounderTimeline />
      <MeetTheFounders />
      <WhyWeStarted />
      <CTABanner />
    </CinematicAboutWrapper>
  );
}
