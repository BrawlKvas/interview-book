import InterviewCard from "./interview-card";

export type InterviewsListProps = {
  interviews: { id: string; date: string; status: string }[]; // TODO
};

export default function InterviewsList({ interviews }: InterviewsListProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {interviews.map((interview) => (
        <InterviewCard
          candidateFIO="Романов Леонид"
          date={interview.date}
          status={interview.status}
          key={interview.id}
        />
      ))}
    </div>
  );
}
