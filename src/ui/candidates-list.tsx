"use client";

import {
  CandidateDTO,
  addCandidate,
  deleteCandidate,
  updateCandidate,
} from "@/lib/actions";
import CandidateCard from "./candidate-card";
import CandidateModal, { CandidateModalProps } from "./candidate-modal";
import { useState } from "react";
import EmptyPlate from "./empty-plate";

export type CandidatesListProps = {
  candidates: CandidateDTO[];
};

export default function CandidatesList({ candidates }: CandidatesListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateDTO>();

  const handleSubmit: CandidateModalProps["onSubmit"] = (values) => {
    if (selectedCandidate) {
      console.log("updateCandidate", { id: selectedCandidate.id, ...values });
      updateCandidate({ id: selectedCandidate.id, ...values });
      setSelectedCandidate(undefined);
    } else {
      console.log("addCandidate", values);
      addCandidate(values);
    }

    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedCandidate(undefined);
  };

  return (
    <>
      <button
        className="block ml-auto mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsOpen(true)}
      >
        Добавить кандидата
      </button>

      {candidates.length === 0 && <EmptyPlate />}

      <div className="grid grid-cols-3 gap-4">
        {candidates.map((candidate) => (
          <CandidateCard
            name={candidate.name}
            surname={candidate.surname}
            speciality={candidate.speciality}
            experience={candidate.experience}
            key={candidate.id}
            onClick={() => {
              setSelectedCandidate(candidate);
              setIsOpen(true);
            }}
            onDelete={() => deleteCandidate(candidate.id)}
          />
        ))}
      </div>

      <CandidateModal
        isOpen={isOpen}
        initialValue={selectedCandidate}
        onSubmit={handleSubmit}
        onClose={handleClose}
      />
    </>
  );
}
