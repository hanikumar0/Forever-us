"use client";

import React from "react";
import GrandFinale from "../../sections/GrandFinale";
import configData from "../../data/config.json";
import { AppConfig } from "../../types/config";

const config = configData as AppConfig;

export default function FinalePage() {
  return (
    <GrandFinale
      data={config.finale}
      girlfriendName={config.girlfriendName}
    />
  );
}
