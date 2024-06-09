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
import ConfirmationModal from "@/ui/confirmation-modal";

export type CandidatesListProps = {
  candidates: CandidateDTO[];
};

export default function CandidatesList({ candidates }: CandidatesListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [currentCandidate, setCurrentCandidate] = useState<number | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateDTO>();

  const handleSubmit: CandidateModalProps["onSubmit"] = (values) => {
    if (selectedCandidate) {
      updateCandidate({ id: selectedCandidate.id, ...values });
      setSelectedCandidate(undefined);
    } else {
      addCandidate(values);
    }

    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedCandidate(undefined);
  };

  const handleDelete = (id: number) => {
    setCurrentCandidate(id);
    setIsConfirmOpen(true);
  };

  const handleCancel = () => {
    setIsConfirmOpen(false);
    setCurrentCandidate(null);
  };

  const handleConfirm = () => {
    if (currentCandidate) {
      deleteCandidate(currentCandidate);
    }

    setIsConfirmOpen(false);
    setCurrentCandidate(null);
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
            specialty={candidate.specialty}
            experience={candidate.experience}
            grade={candidate.grade}
            key={candidate.id}
            onClick={() => {
              setSelectedCandidate(candidate);
              setIsOpen(true);
            }}
            onDelete={() => handleDelete(candidate.id)}
          />
        ))}
      </div>

      <CandidateModal
        isOpen={isOpen}
        initialValue={selectedCandidate}
        onSubmit={handleSubmit}
        onClose={handleClose}
      />

      <ConfirmationModal
        isOpen={isConfirmOpen}
        title="Удалить кандидата?"
        message="Удаление кандидата повлечет за собой удаление всех связанных с ним интервью"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}
