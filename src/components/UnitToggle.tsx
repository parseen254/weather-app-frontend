import React from "react";
import { UNITS, type UnitSystem } from "@/constants";

interface UnitToggleProps {
  value: UnitSystem;
  onChange: (unit: UnitSystem) => void;
}

export default function UnitToggle({ value, onChange }: UnitToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        className={`btn btn-sm ${
          value === UNITS.METRIC ? "btn-primary" : "btn-ghost"
        } rounded-none`}
        onClick={() => onChange(UNITS.METRIC)}
      >
        °C
      </button>
      <button
        className={`btn btn-sm ${
          value === UNITS.IMPERIAL ? "btn-primary" : "btn-ghost"
        } rounded-none`}
        onClick={() => onChange(UNITS.IMPERIAL)}
      >
        °F
      </button>
    </div>
  );
}
