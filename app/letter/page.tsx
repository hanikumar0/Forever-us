"use client";

import React from "react";
import LoveLetterSection from "../../sections/LoveLetter";
import { useAppNavigation } from "../../components/NavigationProvider";
import configData from "../../data/config.json";
import { AppConfig } from "../../types/config";

const config = configData as AppConfig;

export default function LetterPage() {
  const { navigateNext } = useAppNavigation();

  return (
    <LoveLetterSection
      data={config.loveLetter}
      onNext={navigateNext}
    />
  );
}
