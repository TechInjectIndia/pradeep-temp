import type React from "react";
import { notFound } from "next/navigation";
import Physics9Ch1Preview from "@/components/flowcharts/preview-flowcharts/phy-9-ch1-preview";
import MotionFlowchart from "@/components/flowcharts/physics-9-ch1";
import ForcesAndLawsFlowchart from "@/components/flowcharts/phy-9-ch2";
import WorkEnergySimpleMachinesFlowchart from "@/components/flowcharts/phy-9-ch3";
import SoundFlowchart from "@/components/flowcharts/phy-9-ch4";
import EarthAsASystemFlowchart from "@/components/flowcharts/phy-9-ch5";
import CellFlowchart from "@/components/flowcharts/bio-9-ch1";
import Bio9Ch1Preview from "@/components/flowcharts/preview-flowcharts/bio-9-ch1-preview";
import TissuesFlowchart from "@/components/flowcharts/bio-9-ch2";
import ReproductionFlowchart from "@/components/flowcharts/bio-9-ch3";
import BiodiversityClassificationFlowchart from "@/components/flowcharts/bio-9-ch4";
import Chem9Ch1Flowchart from "@/components/flowcharts/chem-9-ch1";
import Chem9Ch1Preview from "@/components/flowcharts/preview-flowcharts/chem-9-ch1-preview";
import StructureOfAtomFlowchart from "@/components/flowcharts/chem-9-ch2";
import AtomsAndMoleculesFlowchart from "@/components/flowcharts/chem-9-ch3";
import LightReflectionRefractionFlowchart from "@/components/flowcharts/physics-10-ch1";
import HumanEyeFlowchart from "@/components/flowcharts/physics-10-ch2";
import ElectricityFlowchart from "@/components/flowcharts/physics-10-ch3";
import MagneticEffectsFlowchart from "@/components/flowcharts/physics-10-ch4";
import LifeProcessesFlowchart from "@/components/flowcharts/bio-10-ch1";
import ControlCoordinationFlowchart from "@/components/flowcharts/bio-10-ch2";
import ReproductionFlowchart10 from "@/components/flowcharts/bio-10-ch3";
import HeredityFlowchart from "@/components/flowcharts/bio-10-ch4";
import OurEnvironmentFlowchart from "@/components/flowcharts/bio-10-ch5";
import ChemicalReactionsFlowchart from "@/components/flowcharts/chem-10-ch1";
import AcidsBasesAndSaltsFlowchart from "@/components/flowcharts/chem-10-ch2";
import MetalsNonMetalsFlowchart from "@/components/flowcharts/chem-10-ch3";
import CarbonCompoundsFlowchart from "@/components/flowcharts/chem-10-ch4";

const CHAPTER_NAMES = [
  "physics-9-ch1",
  "phy-9-ch2",
  "phy-9-ch3",
  "phy-9-ch4",
  "phy-9-ch5",
  "bio-9-ch1",
  "bio-9-ch2",
  "bio-9-ch3",
  "bio-9-ch4",
  "chem-9-ch1",
  "chem-9-ch2",
  "chem-9-ch3",
  "physics-10-ch1",
  "physics-10-ch2",
  "physics-10-ch3",
  "physics-10-ch4",
  "bio-10-ch1",
  "bio-10-ch2",
  "bio-10-ch3",
  "bio-10-ch4",
  "bio-10-ch5",
  "chem-10-ch1",
  "chem-10-ch2",
  "chem-10-ch3",
  "chem-10-ch4",
] as const;

type Chapter = (typeof CHAPTER_NAMES)[number];

export const FLOWCHARTS: Record<Chapter, React.ComponentType> = {
  "physics-9-ch1": MotionFlowchart,
  "phy-9-ch2": ForcesAndLawsFlowchart,
  "phy-9-ch3": WorkEnergySimpleMachinesFlowchart,
  "phy-9-ch4": SoundFlowchart,
  "phy-9-ch5": EarthAsASystemFlowchart,
  "bio-9-ch1": CellFlowchart,
  "bio-9-ch2": TissuesFlowchart,
  "bio-9-ch3": ReproductionFlowchart,
  "bio-9-ch4": BiodiversityClassificationFlowchart,
  "chem-9-ch1": Chem9Ch1Flowchart,
  "chem-9-ch2": StructureOfAtomFlowchart,
  "chem-9-ch3": AtomsAndMoleculesFlowchart,
  "physics-10-ch1": LightReflectionRefractionFlowchart,
  "physics-10-ch2": HumanEyeFlowchart,
  "physics-10-ch3": ElectricityFlowchart,
  "physics-10-ch4": MagneticEffectsFlowchart,
  "bio-10-ch1": LifeProcessesFlowchart,
  "bio-10-ch2": ControlCoordinationFlowchart,
  "bio-10-ch3": ReproductionFlowchart10,
  "bio-10-ch4": HeredityFlowchart,
  "bio-10-ch5": OurEnvironmentFlowchart,
  "chem-10-ch1": ChemicalReactionsFlowchart,
  "chem-10-ch2": AcidsBasesAndSaltsFlowchart,
  "chem-10-ch3": MetalsNonMetalsFlowchart,
  "chem-10-ch4": CarbonCompoundsFlowchart,
};

export const PREVIEW_FLOWCHARTS: Partial<Record<Chapter, React.ComponentType>> = {
  "physics-9-ch1": Physics9Ch1Preview,
  "bio-9-ch1": Bio9Ch1Preview,
  "chem-9-ch1": Chem9Ch1Preview,
};

export function generateStaticParams() {
  return CHAPTER_NAMES.map((chapter) => ({ chapter }));
}

type FlowchartPageProps = {
  params: Promise<{ chapter: Chapter }>;
};

export default async function FlowchartChapterPage({
  params,
}: FlowchartPageProps) {
  const { chapter } = await params;
  const Component = FLOWCHARTS[chapter];
  if (!Component) notFound();
  return <Component />;
}
