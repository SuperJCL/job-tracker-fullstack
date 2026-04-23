"use client";

type Props = {
  filter: string;
  onChange: (value: string) => void;
};

export default function FilterBar({ filter, onChange }: Props) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="text-sm font-medium">Filter:</span>

      <select
        value={filter}
        onChange={(e) => onChange(e.target.value)}
        className="rounded border p-2"
      >
        <option value="All">All</option>
        <option value="Wishlist">Wishlist</option>
        <option value="Applied">Applied</option>
        <option value="OA">OA</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>
    </div>
  );
}