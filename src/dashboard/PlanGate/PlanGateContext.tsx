import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type PlanId = 'free' | 'pro' | 'business';

interface PlanState {
  planId: PlanId | null;
  trialStart: number | null;
}

interface PlanGateContextValue {
  plan: PlanState;
  choosePlan: (id: PlanId) => void;
  isTrialExpired: boolean;
  needsGate: boolean;
}

const STORAGE_KEY = 'nemvol_plan';
const TRIAL_DAYS = 5;

const PlanGateContext = createContext<PlanGateContextValue | null>(null);

export function PlanGateProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlanState>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : { planId: null, trialStart: null };
    } catch {
      return { planId: null, trialStart: null };
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
  }, [plan]);

  const isTrialExpired =
    plan.planId === 'free' &&
    plan.trialStart !== null &&
    Date.now() - plan.trialStart > TRIAL_DAYS * 24 * 60 * 60 * 1000;

  const needsGate = plan.planId === null || isTrialExpired;

  function choosePlan(id: PlanId) {
    setPlan({ planId: id, trialStart: id === 'free' ? Date.now() : null });
  }

  return (
    <PlanGateContext.Provider value={{ plan, choosePlan, isTrialExpired, needsGate }}>
      {children}
    </PlanGateContext.Provider>
  );
}

export function usePlanGate() {
  const ctx = useContext(PlanGateContext);
  if (!ctx) throw new Error('usePlanGate must be used inside PlanGateProvider');
  return ctx;
}
