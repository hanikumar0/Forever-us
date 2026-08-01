"use client";

import React from "react";
import MusicStageSection from "../../sections/MusicStageSection";
import { useAppNavigation } from "../../components/NavigationProvider";

export default function MusicPage() {
  const { navigateNext } = useAppNavigation();

  return (
    <MusicStageSection
      onNext={navigateNext}
    />
  );
}
