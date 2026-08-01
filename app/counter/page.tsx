"use client";

import React from "react";
import LoveCounter from "../../sections/LoveCounter";
import { useAppNavigation } from "../../components/NavigationProvider";
import configData from "../../data/config.json";
import { AppConfig } from "../../types/config";

const config = configData as AppConfig;

export default function CounterPage() {
  const { navigateNext } = useAppNavigation();

  return (
    <LoveCounter
      stages={config.loveCounter.stages}
      message={config.loveCounter.message}
      onNext={navigateNext}
    />
  );
}
