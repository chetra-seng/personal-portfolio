import React, { FC } from "react";
import { useFormStatus } from "react-dom";
import { FaPaperPlane } from "react-icons/fa6";

const SubmitButton: FC = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="group flex items-center justify-center gap-2 h-[3rem] w-[10rem] bg-gray-900 text-white rounded-full outline-none transition-all hover:scale-110 focus:scale-110 active:scale-105 hover:bg-gray-950 dark:bg-white dark:bg-opacity-10"
      disabled={pending}
    >
      {pending ? (
        <>
          <div className="h-5 w-5 border-b-2 border-white rounded-full animate-spin" />
          Submitting
        </>
      ) : (
        <>
          <FaPaperPlane className="text-lg opacity-70 transition-all group-hover:-translate-y-1 group-hover:translate-x-1" />{" "}
          Submit
        </>
      )}
    </button>
  );
};

export default SubmitButton;
