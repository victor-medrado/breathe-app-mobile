import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BreathingTechnique } from "../@types";

interface BreathingState {
  isRunning: boolean;
  cycleCount: number;
  elapsedTime: number;
  currentStep: number;
  stepElapsed: number;
  technique: BreathingTechnique | null;
}

const initialState: BreathingState = {
  isRunning: false,
  cycleCount: 0,
  elapsedTime: 0,
  currentStep: 0,
  stepElapsed: 0,
  technique: null,
};

const breathingSlice = createSlice({
  name: "breathing",
  initialState,
  reducers: {
    setTechnique: (state, action: PayloadAction<BreathingTechnique>) => {
      state.technique = action.payload;
      state.currentStep = 0;
      state.cycleCount = 0;
      state.elapsedTime = 0;
      state.stepElapsed = 0;
      state.isRunning = true;
    },
    pause(state) {
      state.isRunning = false;
    },
    resume(state) {
      state.isRunning = true;
    },
    restart(state) {
      state.cycleCount = 0;
      state.elapsedTime = 0;
      state.currentStep = 0;
      state.isRunning = true;
    },
    nextStep(state) {
      if (!state.technique) return;

      if (state.currentStep < state.technique.sequence.length - 1) {
        state.currentStep += 1;
      } else {
        state.currentStep = 0;
        state.cycleCount += 1;
      }

      state.stepElapsed = 0;
    },
    incrementCycle: (state) => {
      state.cycleCount += 1;
    },
    tick: (state) => {
      if (!state.isRunning || !state.technique) return;

      state.elapsedTime += 1;
      state.stepElapsed += 1;

      const currentStepObj = state.technique.sequence[state.currentStep];

      if (state.stepElapsed >= currentStepObj.duration) {
        if (state.currentStep < state.technique.sequence.length - 1) {
          state.currentStep += 1;
        } else {
          state.currentStep = 0;
          state.cycleCount += 1;
        }
        state.stepElapsed = 0;
      }
    },
  },
});

export const {
  pause,
  resume,
  restart,
  nextStep,
  incrementCycle,
  tick,
  setTechnique,
} = breathingSlice.actions;

export default breathingSlice.reducer;
