"use client";

import React from "react";
import FutureDreams from "../../sections/FutureDreams";
import { useAppNavigation } from "../../components/NavigationProvider";
import configData from "../../data/config.json";
import { AppConfig } from "../../types/config";

const config = configData as AppConfig;

export default function DreamsPage() {
  const { navigateNext } = useAppNavigation();

  return (
    <FutureDreams
      dreams={config.futureDreams}
      onNext={navigateNext}
    />
  );
}
