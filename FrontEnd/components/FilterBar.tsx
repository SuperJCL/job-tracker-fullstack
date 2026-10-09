"use client";

import type { ApplicationStatusFilter } from "@/types/application";
import { isApplicationStatus } from "@/types/application";

import "./FilterBar.scss";

type Props = {
  filter: ApplicationStatusFilter;
  onChange: (value: ApplicationStatusFilter) => void;
};

export default function FilterBar({ filter, onChange }: Props) {
  return (
    <div className="filter-bar">
      <label htmlFor="application-status-filter" className="filter-bar__label">
        Status
      </label>

      <select
        id="application-status-filter"
        value={filter}
        onChange={(e) => {
          const value = e.target.value;

          if (value === "All" || isApplicationStatus(value)) {
            onChange(value);
          }
        }}
        className="filter-bar__select"
      >
        <option value="All">All statuses</option>
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
