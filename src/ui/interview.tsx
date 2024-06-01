"use client";

import {
  InterviewDTO,
  addInterviewResult,
  getInterviewById,
  updateInterviewResult,
  updateInterviewStatus,
} from "@/lib/actions";
import InterviewQuestion from "./interview-question";
import Tag from "./tag";
import { InterviewStatus } from "@/lib/types";
import { useEffect, useMemo, useState } from "react";
import { isRequestError } from "@/lib/utils";

type InterviewProps = {
  initInterviewData: InterviewDTO;
};

const STATUS_COLORS = {
  [InterviewStatus.Scheduled]: "gray",
  [InterviewStatus.InProgress]: "blue",
  [InterviewStatus.Completed]: "green",
} as const;

export default function Interview({ initInterviewData }: InterviewProps) {
  const [isValid, setIsValid] = useState(true);
  const [interview, setInterview] = useState<InterviewDTO>(initInterviewData);

  const {
    id: interviewId,
    status,
    candidate,
    date: interviewDate,
    template: { questions },
    result,
  } = interview;

  const questionsWithResult = useMemo(() => {
    return questions.map((question) => {
      const questionResult = result.find(
        (res) => res.question.id === question.id
      );
      return { ...question, result: questionResult || null };
    });
  }, [questions, result]);

  useEffect(() => {
    let flag = true;

    async function fetchData() {
      const res = await getInterviewById(interview.id);

      if (!flag) return;

      setIsValid(true);

      if (isRequestError(res)) return;

      setInterview(res);
    }

    if (!isValid) {
      fetchData();
    }

    return () => {
      flag = false;
    };
  }, [interview.id, isValid]);

  const handleChangeStatus = async () => {
    await updateInterviewStatus(
      interviewId,
      status === InterviewStatus.Scheduled
        ? InterviewStatus.InProgress
        : InterviewStatus.Completed
    );

    setIsValid(false);
  };

  const handleChangeRate = async (
    question: (typeof questionsWithResult)[0],
    rate: number
  ) => {
    if (question.result) {
      setInterview((prev) => ({
        ...prev,
        result: prev.result.map((res) =>
          res.id === question.result?.id ? { ...res, rate } : res
        ),
      }));

      await updateInterviewResult({
        id: question.result.id,
        rate,
        interviewNote: question.result.interviewNote,
      });

      setIsValid(false);
    } else {
      setInterview((prev) => ({
        ...prev,
        result: [
          ...prev.result,
          {
            id: "temp",
            question: question,
            rate,
            interviewNote: "",
          },
        ],
      }));

      await addInterviewResult({
        interviewId,
        questionId: question.id,
        rate,
        interviewNote: "",
      });

      setIsValid(false);
    }
  };

  const handleChangeInterviewNote = async (
    question: (typeof questionsWithResult)[0],
    interviewNote: string
  ) => {
    if (question.result) {
      setInterview((prev) => ({
        ...prev,
        result: prev.result.map((res) =>
          res.id === question.result?.id ? { ...res, interviewNote } : res
        ),
      }));

      await updateInterviewResult({
        id: question.result.id,
        rate: question.result.rate,
        interviewNote,
      });

      setIsValid(false);
    } else {
      setInterview((prev) => ({
        ...prev,
        result: [
          ...prev.result,
          {
            id: "temp",
            question: question,
            rate: 0,
            interviewNote,
          },
        ],
      }));

      await addInterviewResult({
        interviewId,
        questionId: question.id,
        rate: 0,
        interviewNote,
      });

      setIsValid(false);
    }
  };

  return (
    <>
      <div className="mb-4 flex gap-4 items-center">
        <h1 className="text-2xl font-bold text-slate-700">
          Интервью - &quot;{candidate.name} {candidate.surname}&quot; (
          {interviewDate})
        </h1>
        <Tag text={status} color={STATUS_COLORS[status]} />

        {status !== InterviewStatus.Completed && (
          <button
            className="ml-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleChangeStatus}
          >
            {status === InterviewStatus.Scheduled
              ? "Начать интервью"
              : "Завершить интервью"}
          </button>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {questionsWithResult.map((q) => (
          <InterviewQuestion
            question={{
              text: q.question.name,
              hint: q.question.hint,
            }}
            interviewNote={q.result?.interviewNote || ""}
            rate={q.result?.rate || 0}
            disabled={status !== InterviewStatus.InProgress}
            key={q.id}
            onInterviewNoteChange={(v) => handleChangeInterviewNote(q, v)}
            onRateChange={(v) => handleChangeRate(q, v)}
          />
        ))}
      </div>

      <textarea
        className="w-full mt-4 p-4 shadow-md rounded-md border-2"
        placeholder="Заключение"
        rows={4}
      ></textarea>
    </>
  );
}
