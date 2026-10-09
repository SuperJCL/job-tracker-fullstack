import type { Application } from "@/types/application";
import "./ApplicationCard.scss";

type Props = {
  app: Application;
  onDelete: (id: string) => void;
};

const statusClasses: Record<Application["status"], string> = {
  Wishlist: "application-card__status--wishlist",
  Applied: "application-card__status--applied",
  Interview: "application-card__status--interview",
  Offer: "application-card__status--offer",
  Rejected: "application-card__status--rejected",
  Unknown: "application-card__status--unknown",
  OA: "application-card__status--oa",
};

export default function ApplicationCard({ app, onDelete }: Props) {
  return (
    <article className="application-card">
      <div className="application-card__avatar" aria-hidden="true">
        {app.company.slice(0, 1).toUpperCase()}
      </div>

      <div className="application-card__info">
        <h2 className="application-card__company">{app.company}</h2>
        <p className="application-card__role">{app.role}</p>
      </div>

      <span className={`application-card__status ${statusClasses[app.status]}`}>
        {app.status}
      </span>

      <button
        type="button"
        className="application-card__delete"
        aria-label={`Delete ${app.company} ${app.role} application`}
        onClick={() => onDelete(app.id)}
      >
        Delete
      </button>
    </article>
  );
}
