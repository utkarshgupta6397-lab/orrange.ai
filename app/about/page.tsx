import CinematicAboutWrapper from "@/components/about/CinematicAboutWrapper";
import AboutHero from "@/components/about/AboutHero";
import FounderTimeline from "@/components/about/FounderTimeline";
import MeetTheFounders from "@/components/about/MeetTheFounders";
import WhyWeStarted from "@/components/about/WhyWeStarted";
import WhatWeBelieve from "@/components/about/WhatWeBelieve";
import StoryProgress from "@/components/about/StoryProgress";
import CTABanner from "@/components/sections/CTABanner";

export const metadata = {
  title: "About | XYZ Labs",
  description: "The story behind XYZ Labs and the systems we build.",
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
