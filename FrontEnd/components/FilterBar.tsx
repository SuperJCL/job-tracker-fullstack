"use client";

import type { ApplicationStatusFilter } from "@/types/application";
import { isApplicationStatus } from "@/types/application";

type Props = {
  filter: ApplicationStatusFilter;
  onChange: (value: ApplicationStatusFilter) => void;
};

export default function FilterBar({ filter, onChange }: Props) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="text-sm font-medium">Filter:</span>

      <select
        value={filter}
        onChange={(e) => {
          const value = e.target.value;

          if (value === "All" || isApplicationStatus(value)) {
            onChange(value);
          }
        }}
        className="rounded border p-2"
      >
        <option value="All">All</option>
        <option value="Wishlist">Wishlist</option>
        <option value="Applied">Applied</option>
        <option value="OA">OA</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
        <option value="Unknown">Unknown</option>
      </select>
    </div>
  );
}
