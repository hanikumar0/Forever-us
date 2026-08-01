"use client";

import React from "react";
import Proposal from "../../components/Proposal";
import { useAppNavigation } from "../../components/NavigationProvider";
import configData from "../../data/config.json";
import { AppConfig } from "../../types/config";

const config = configData as AppConfig;

export default function ProposalPage() {
  const { navigateTo } = useAppNavigation();

  return (
    <Proposal
      data={config.proposal}
      onAccept={() => navigateTo("/finale")}
    />
  );
}
