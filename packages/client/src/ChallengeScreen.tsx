import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { toast } from "react-toastify";
import { useMUD } from "./MUDContext";
import { challengeResult } from "./challengeResult";

type Props = {
  challengeName: string;
  challengeEmoji: string;
};

export const ChallengeScreen = ({ challengeName, challengeEmoji }: Props) => {
  const {
    systemCalls: { takeChallenge },
  } = useMUD();

  const [appear, setAppear] = useState(false);
  useEffect(() => {
    // sometimes the fade-in transition doesn't play, so a timeout is a hacky fix
    const timer = setTimeout(() => setAppear(true), 100);
    return () => clearTimeout(timer);
  }, []);
 
  return (
    <div
      className={twMerge(
        "flex flex-col gap-10 items-center justify-center bg-black text-white transition-opacity duration-1000",
        appear ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="text-8xl animate-bounce">{challengeEmoji}</div>
      <div>Choose the Correct Web3 Answer: </div>
      <div>Who is Satoshi Nakomoto?</div>
      
      <div>Difficulty level: {challengeName}</div>
      <div className="flex flex-col gap-2">
        <button
          type="button"
          className="bg-stone-600 hover:ring rounded-lg px-4 py-2"
          onClick={async () => {
            const toastId = toast.loading("Answering the Question...");
            const result = await takeChallenge(1);
            
            if (result === challengeResult.CorrectAnswer) {
              toast.update(toastId, {
                isLoading: false,
                type: "default",
                render: `Correct! You got the ${challengeName} answer correct!`,
                autoClose: 5000,
                closeButton: true,
              });
            } else if (result === challengeResult.IncorrectAnswer) {
              toast.update(toastId, {
                isLoading: false,
                type: "error",
                render: `Incorrect! You got the ${challengeName} answer incorrect!`,
                autoClose: 5000,
                closeButton: true,
              });
            } else {
              throw new Error(
                `Unexpected catch attempt result: ${challengeResult[result]}`
              );
            }
          }}
        >
          ✅ The Creator of Bitcoin
        </button>
        <button
          type="button"
          className="bg-stone-600 hover:ring rounded-lg px-4 py-2"
          onClick={async () => {
            const toastId = toast.loading("Answering the Question...");
            const result = await takeChallenge(0);
            
            if (result === challengeResult.CorrectAnswer) {
              toast.update(toastId, {
                isLoading: false,
                type: "default",
                render: `Correct! You got the ${challengeName} answer correct!`,
                autoClose: 5000,
                closeButton: true,
              });
            } else if (result === challengeResult.IncorrectAnswer) {
              toast.update(toastId, {
                isLoading: false,
                type: "error",
                render: `Incorrect! You got the ${challengeName} answer incorrect!`,
                autoClose: 5000,
                closeButton: true,
              });
            } else {
              throw new Error(
                `Unexpected catch attempt result: ${challengeResult[result]}`
              );
            }
          }}
        >
          ✅ Just some random guy
        </button>
        <button
          type="button"
          className="bg-stone-600 hover:ring rounded-lg px-4 py-2"
          onClick={async () => {
            const toastId = toast.loading("Answering the Question...");
            const result = await takeChallenge(1);
            
            if (result === challengeResult.CorrectAnswer) {
              toast.update(toastId, {
                isLoading: false,
                type: "default",
                render: `Correct! You got the ${challengeName} answer correct!`,
                autoClose: 5000,
                closeButton: true,
              });
            } else if (result === challengeResult.IncorrectAnswer) {
              toast.update(toastId, {
                isLoading: false,
                type: "error",
                render: `Incorrect! You got the ${challengeName} answer incorrect!`,
                autoClose: 5000,
                closeButton: true,
              });
            } else {
              throw new Error(
                `Unexpected catch attempt result: ${challengeResult[result]}`
              );
            }
          }}
        >
          ✅ Someone unimportant to the future of humanity.
        </button>
        <button
          type="button"
          className="bg-stone-600 hover:ring rounded-lg px-4 py-2"
          onClick={async () => {
            const toastId = toast.loading("Answering the Question...");
            const result = await takeChallenge(0);
            
            if (result === challengeResult.CorrectAnswer) {
              toast.update(toastId, {
                isLoading: false,
                type: "default",
                render: `Correct! You got the ${challengeName} answer correct!`,
                autoClose: 5000,
                closeButton: true,
              });
            } else if (result === challengeResult.IncorrectAnswer) {
              toast.update(toastId, {
                isLoading: false,
                type: "error",
                render: `Incorrect! You got the ${challengeName} answer incorrect!`,
                autoClose: 5000,
                closeButton: true,
              });
            } else {
              throw new Error(
                `Unexpected catch attempt result: ${challengeResult[result]}`
              );
            }
          }}
        >
          ✅ Someone not super smart
        </button>
       
      </div>
    </div>
  );
};
