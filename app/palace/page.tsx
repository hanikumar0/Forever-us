"use client";

import React from "react";
import RoyalPalace from "../../sections/RoyalPalace";
import { useAppNavigation } from "../../components/NavigationProvider";
import configData from "../../data/config.json";
import { AppConfig } from "../../types/config";

const config = configData as AppConfig;

export default function PalacePage() {
  const { navigateNext } = useAppNavigation();

  return (
    <RoyalPalace
      girlfriendName={config.girlfriendName}
      onNext={navigateNext}
    />
  );
}
