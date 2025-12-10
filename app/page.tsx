import BackgroundContainer from "@/components/layout/BackgroundContainer";
import AnimatedHero from "@/components/animations/AnimatedHero";
import ParticleOverlay from "@/components/animations/ParticleOverlay";
import LightRays from "@/components/animations/LightRays";
import CustomCursor from "@/components/animations/CustomCursor";
import GeometricShapes from "@/components/animations/GeometricShapes";
import ScrollReveal from "@/components/animations/ScrollReveal";
import MusicPlayer from "@/components/animations/MusicPlayer";
import Navbar from "@/components/Navbar";
import WhatIsPlacePrep from "@/components/landing/WhatIsPlacePrep";
import Topics from "@/components/landing/Topics";

export default function Home() {
  return (
    <BackgroundContainer>
      {/* Transparent overlay animations */}
      <ParticleOverlay />
      <LightRays />
      <GeometricShapes />
      <CustomCursor />
      <MusicPlayer />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section with Animated Headline */}
      <AnimatedHero />

      {/* Content Sections with Scroll Reveals */}
      <ScrollReveal direction="up" delay={0}>
        <WhatIsPlacePrep />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1}>
        <Topics />
      </ScrollReveal>

      {/* Footer */}
      <footer className="relative z-20 py-12 border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container px-4 md:px-6 text-center text-gray-600">
          <p>&copy; 2024 PlacePrep. All rights reserved.</p>
        </div>
      </footer>
    </BackgroundContainer>
  );
}
