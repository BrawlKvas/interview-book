"use client";

import {
  InterviewDTO,
  addInterviewResult,
  getInterviewById,
  updateInterviewFinalFeedback,
  updateInterviewResult,
  updateInterviewStatus,
  updateInterviewVisibility,
} from "@/lib/actions";
import InterviewQuestion from "./interview-question";
import Tag from "./tag";
import { InterviewStatus } from "@/lib/types";
import { ChangeEventHandler, useEffect, useMemo, useState } from "react";
import { isRequestError } from "@/lib/utils";
import ClipboardIcon from "./icons/clipboard";
import clsx from "clsx";

type InterviewProps = {
  initInterviewData: InterviewDTO;
};

const STATUS_COLORS = {
  [InterviewStatus.Scheduled]: "gray",
  [InterviewStatus.InProgress]: "blue",
  [InterviewStatus.Completed]: "green",
} as const;

function getTotalResultEmodj(value: number) {
  if (value < 1) return "😕";

  if (value < 2) return "🤓";

  if (value < 2.5) return "🧐";

  return "😎";
}

export default function Interview({ initInterviewData }: InterviewProps) {
  const [isValid, setIsValid] = useState(true);
  const [interview, setInterview] = useState<InterviewDTO>(initInterviewData);

  const {
    id: interviewId,
    status,
    candidate,
    date: interviewDate,
    template: { questions: templateQuestions },
    result = [],
  } = interview;

  const questionsWithResult = useMemo(() => {
    return templateQuestions.map((q) => {
      const questionResult = result.find(
        (r) => r.question.id === q.question.id
      );
      return { ...q, result: questionResult || null };
    });
  }, [templateQuestions, result]);

  const totalResult = useMemo(() => {
    const filteredResult = result.filter((r) => r.rate !== -1);

    return (
      filteredResult.reduce(
        (acc, r) => (r.rate === -1 ? acc : r.rate + acc),
        0
      ) / (filteredResult.length || 1)
    );
  }, [result]);

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
          ...(prev.result || []),
          {
            id: "temp",
            question: question.question,
            rate,
            interviewNote: "",
          },
        ],
      }));

      await addInterviewResult({
        interviewId,
        questionId: question.question.id,
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
    } else {
      setInterview((prev) => ({
        ...prev,
        result: [
          ...prev.result,
          {
            id: "temp",
            question: question.question,
            rate: -1,
            interviewNote,
          },
        ],
      }));

      await addInterviewResult({
        interviewId,
        questionId: question.question.id,
        rate: -1,
        interviewNote,
      });
    }
  };

  const handleFinalFeedback: ChangeEventHandler<HTMLTextAreaElement> = async ({
    target,
  }) => {
    setInterview((prev) => ({
      ...prev,
      finalFeedback: target.value,
    }));
    await updateInterviewFinalFeedback(interview.id, target.value);
  };

  const handleShare = () => {
    updateInterviewVisibility(interview.id, true);

    navigator.clipboard.writeText(
      `${window.location.origin}/interviews/${interviewId}`
    );
  };

  return (
    <>
      <div className="mb-4 flex gap-4 items-center">
        <h1 className="text-2xl font-bold text-slate-700">
          Интервью - &quot;{candidate?.name} {candidate?.surname}&quot; (
          {interviewDate})
        </h1>
        <Tag text={status} color={STATUS_COLORS[status]} />

        {status === InterviewStatus.Completed && (
          <button
            className="flex gap-2 border-slate-400 hover:border-slate-500 border-2 py-2 px-4 rounded border-dashed"
            onClick={handleShare}
          >
            Поделиться интервью <ClipboardIcon />
          </button>
        )}

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
            rate={q.result?.rate === undefined ? -1 : q.result.rate}
            disabled={status !== InterviewStatus.InProgress}
            key={q.id}
            onInterviewNoteChange={(v) => handleChangeInterviewNote(q, v)}
            onRateChange={(v) => handleChangeRate(q, v)}
          />
        ))}
      </div>

      <div className="mt-4">
        Итоговая оценка: {totalResult} {getTotalResultEmodj(totalResult)}
      </div>

      <textarea
        className={clsx(
          "w-full mt-4 p-4 shadow-md rounded-md border-2 bg-white",
          status !== InterviewStatus.InProgress && "cursor-not-allowed"
        )}
        placeholder="Заключение"
        rows={4}
        value={interview.finalFeedback || ""}
        disabled={status !== InterviewStatus.InProgress}
        onChange={handleFinalFeedback}
      ></textarea>
    </>
  );
}
