"use client";

import React from "react";
import ReasonsList from "../../sections/ReasonsList";
import { useAppNavigation } from "../../components/NavigationProvider";
import configData from "../../data/config.json";
import { AppConfig } from "../../types/config";

const config = configData as AppConfig;

export default function ReasonsPage() {
  const { navigateNext } = useAppNavigation();

  return (
    <ReasonsList
      reasons={config.reasons}
      onNext={navigateNext}
    />
  );
}
