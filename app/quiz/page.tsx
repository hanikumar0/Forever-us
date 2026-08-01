"use client";

import React from "react";
import LoveQuiz from "../../sections/LoveQuiz";
import { useAppNavigation } from "../../components/NavigationProvider";
import configData from "../../data/config.json";
import { AppConfig } from "../../types/config";

const config = configData as AppConfig;

export default function QuizPage() {
  const { navigateNext } = useAppNavigation();

  return (
    <LoveQuiz
      quiz={config.quiz}
      onNext={navigateNext}
    />
  );
}
