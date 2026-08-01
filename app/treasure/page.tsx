"use client";

import React from "react";
import HiddenTreasure from "../../sections/HiddenTreasure";
import { useAppNavigation } from "../../components/NavigationProvider";
import configData from "../../data/config.json";
import { AppConfig } from "../../types/config";

const config = configData as AppConfig;

export default function TreasurePage() {
  const { navigateNext } = useAppNavigation();

  return (
    <HiddenTreasure
      secrets={config.secretMessages}
      onNext={navigateNext}
    />
  );
}
