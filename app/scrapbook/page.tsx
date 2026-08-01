"use client";

import React from "react";
import Scrapbook from "../../sections/Scrapbook";
import { useAppNavigation } from "../../components/NavigationProvider";
import configData from "../../data/config.json";
import { AppConfig } from "../../types/config";

const config = configData as AppConfig;

export default function ScrapbookPage() {
  const { navigateNext } = useAppNavigation();

  return (
    <Scrapbook
      scrapbook={config.scrapbook}
      onNext={navigateNext}
    />
  );
}
