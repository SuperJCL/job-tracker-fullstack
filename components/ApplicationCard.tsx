import type { Application } from "@/types/application";

type Props = {
  app: Application;
  onDelete: (id: string) => void;
};

export default function ApplicationCard({ app, onDelete }: Props) {
  return (
    <div className="flex items-start justify-between rounded-lg border p-4">
      <div>
        <h2 className="text-lg font-semibold">{app.company}</h2>
        <p>{app.role}</p>
        <p className="text-sm text-gray-500">{app.status}</p>
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