"use client";

import React from "react";
import LovePromise from "../../sections/LovePromise";
import { useAppNavigation } from "../../components/NavigationProvider";
import configData from "../../data/config.json";
import { AppConfig } from "../../types/config";

const config = configData as AppConfig;

export default function PromisePage() {
  const { navigateNext } = useAppNavigation();

  return (
    <LovePromise
      promises={config.promises}
      onNext={navigateNext}
    />
  );
}
