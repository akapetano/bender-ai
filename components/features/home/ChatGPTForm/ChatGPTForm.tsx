"use client";

import { Button } from "@/components/atoms/Button/Button";
import { UserIcon } from "@/components/atoms/icons/UserIcon/UserIcon";
import { SendIcon } from "@/components/atoms/icons/SendIcon/SendIcon";
import { MimirIcon } from "@/components/atoms/icons/MimirIcon/MimirIcon";
import { useChat } from "@/hooks/useChat";

interface IChatGPTFormProps {
  currentModel: string;
}

export function ChatGPTForm({ currentModel }: IChatGPTFormProps) {
  const {
    inputValue,
    handleReset,
    btnDisabled,
    handleSubmit,
    isLoading,
    handleInputChange,
    response,
  } = useChat({ currentModel });

  return (
    <div className="flex flex-col justify-between h-[100vh] w-full p-5">
      <div className="w-full flex flex-col gap-10">
        <div className="mt-5 flex flex-col md:flex-row justify-end gap-5">
          <Button
            label="Clear History"
            type="reset"
            variant="ghost"
            onClick={handleReset}
            className="outline-emerald-600 w-full md:w-auto"
          />
        </div>
        <div className="self-center w-full md:max-w-[900px] mx-2 flex flex-col md:items-start gap-3 order-last md:order-none">
          {response.map((item: string, index: number) => {
            return (
              <div
                key={index}
                className={`${
                  index % 2 === 0
                    ? "bg-orange-600 text-white"
                    : "bg-slate-200 text-slate-500"
                } p-3 rounded-lg flex gap-2.5 items-center`}
              >
                {index % 2 === 0 ? <UserIcon /> : <MimirIcon />}
                <p>{item}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full md:max-w-[900px] flex flex-col gap-10 self-center mb-5">
        <div className="w-full pb-10 pt-5 px-5 shadow-md rounded-lg border bg-slate-200 flex flex-col justify-between">
          <form
            onSubmit={handleSubmit}
            className="relative w-full flex flex-col gap-5"
          >
            <input
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Learn with MimirAI"
              className={`w-full p-5 rounded-lg resize-none  outline-emerald-600 translate-y-1 `}
            />
            <Button
              label=""
              iconOnly
              icon={<SendIcon width="20" height="20" />}
              type="submit"
              disabled={btnDisabled}
              variant="primary"
              className="absolute top-4 right-2"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
