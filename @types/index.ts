export interface TechniqueSequence {
  action: "inhale" | "hold" | "exhale";
  duration: number;
}

export interface BreathingTechnique {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  sequence: TechniqueSequence[];
}
