"use client";

import { CandidateDTO, deleteCandidate } from "@/lib/actions";
import CandidateCard from "./candidate-card";

export type CandidatesListProps = {
  candidates: CandidateDTO[];
};

export default function CandidatesList({ candidates }: CandidatesListProps) {
  return (
    <>
      <button className="block ml-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Добавить кандидата
      </button>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {candidates.map((candidate) => (
          <CandidateCard
            name={candidate.name}
            surname={candidate.surname}
            specialty={candidate.specialty}
            experience={candidate.experience}
            key={candidate.id}
            onClick={() => {}}
            onDelete={() => deleteCandidate(candidate.id)}
          />
        ))}
      </div>
    </>
  );
}
