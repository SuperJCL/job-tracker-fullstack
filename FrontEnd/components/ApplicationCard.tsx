import type { Application } from "@/types/application";

type Props = {
  app: Application;
  onDelete: (id: string) => void;
};

const statusStyles: Record<Application["status"], string> = {
  Wishlist: "bg-gray-100 text-gray-700",
  Applied: "bg-blue-100 text-blue-700",
  Interview: "bg-yellow-100 text-yellow-700",
  Offer: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
  Unknown: "bg-gray-100 text-gray-700",
  OA: "bg-purple-100 text-purple-700",
};

export default function ApplicationCard({ app, onDelete }: Props) {
  return (
    <div className="flex items-start justify-between rounded-lg border p-4">
      <div>
        <h2 className="text-lg font-semibold">{app.company}</h2>
        <p>{app.role}</p>
        <span
          className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-medium ${
            statusStyles[app.status]
          }`}
        >
          {app.status}
        </span>
      </div>

      <button
        onClick={() => onDelete(app.id)}
        className="rounded border px-3 py-1 text-sm"
      >
        Delete
      </button>
    </div>
  );
}
