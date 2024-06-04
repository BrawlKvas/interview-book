"use client";

import { useRouter } from "next/navigation";
import InterviewCard from "./interview-card";
import { InterviewStatus } from "@/lib/types";
import routes from "@/constants/routes";
import { InterviewDTO } from "@/lib/actions";

export type InterviewsListProps = {
  interviews: Omit<InterviewDTO, 'result' | 'isResultPublished'>[];
};

export default function InterviewsList({ interviews }: InterviewsListProps) {
  const { push } = useRouter();

  return (
    <div className="grid grid-cols-3 gap-4">
      {interviews.map((interview) => (
        <InterviewCard
          candidateFIO={`${interview.candidate.surname} ${interview.candidate.name}`}
          templateName={interview.template.name}
          date={interview.date}
          status={interview.status}
          key={interview.id}
          onClick={() => push(routes.interviews + "/" + interview.id)}
        />
      ))}
    </div>
  );
}
