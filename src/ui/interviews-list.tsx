import { InterviewDTO } from "@/lib/actions";
import InterviewCard from "./interview-card";

export type InterviewsListProps = {
  interviews: InterviewDTO[];
};

export default function InterviewsList({ interviews }: InterviewsListProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {interviews.map((interview) => (
        <InterviewCard
          candidateFIO={
            interview.candidate.surname + " " + interview.candidate.name
          }
          date={interview.date}
          status={interview.status}
          key={interview.id}
        />
      ))}
    </div>
  );
}
