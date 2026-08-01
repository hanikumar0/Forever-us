"use client";

import React from "react";
import MemoryGallery from "../../sections/MemoryGallery";
import { useAppNavigation } from "../../components/NavigationProvider";
import configData from "../../data/config.json";
import { AppConfig } from "../../types/config";

const config = configData as AppConfig;

export default function GalleryPage() {
  const { navigateNext } = useAppNavigation();

  return (
    <MemoryGallery
      gallery={config.gallery}
      onNext={navigateNext}
    />
  );
}
