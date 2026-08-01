"use client";

import React from "react";
import RelationshipStats from "../../sections/RelationshipStats";
import { useAppNavigation } from "../../components/NavigationProvider";
import configData from "../../data/config.json";
import { AppConfig } from "../../types/config";

const config = configData as AppConfig;

export default function StatsPage() {
  const { navigateNext } = useAppNavigation();

  return (
    <RelationshipStats
      stats={config.relationshipStats}
      onNext={navigateNext}
    />
  );
}
