"use client";

import React from "react";
import FloatingMemories from "../../sections/FloatingMemories";
import { useAppNavigation } from "../../components/NavigationProvider";
import configData from "../../data/config.json";
import { AppConfig } from "../../types/config";

const config = configData as AppConfig;

export default function MemoriesPage() {
  const { navigateNext } = useAppNavigation();

  return (
    <FloatingMemories
      memories={config.floatingMemories}
      onNext={navigateNext}
    />
  );
}
