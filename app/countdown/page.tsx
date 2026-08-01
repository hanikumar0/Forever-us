"use client";

import React from "react";
import CountdownSection from "../../sections/CountdownSection";
import { useAppNavigation } from "../../components/NavigationProvider";
import configData from "../../data/config.json";
import { AppConfig } from "../../types/config";

const config = configData as AppConfig;

export default function CountdownPage() {
  const { navigateNext } = useAppNavigation();

  return (
    <CountdownSection
      countdown={config.countdown}
      onNext={navigateNext}
    />
  );
}
