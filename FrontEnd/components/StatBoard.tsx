import "./StatBoard.scss";

type Props = {
  label: string;
  value: number;
};

export default function StatBoard({ label, value }: Props) {
  return (
    <div className="stat-board">
      <p className="stat-board__label">{label}</p>
      <p className="stat-board__value">{value}</p>
    </div>
  );
}
