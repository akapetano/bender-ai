"use client";

import { Button } from "@/components/atoms/Button/Button";
import { UserIcon } from "@/components/atoms/icons/UserIcon/UserIcon";
import { SendIcon } from "@/components/atoms/icons/SendIcon/SendIcon";
import { MimirIcon } from "@/components/atoms/icons/MimirIcon/MimirIcon";
import { useChat } from "@/hooks/useChat";
import { LoadingChatLine } from "../ChatLine/LoadingChatLine/LoadingChatLine";
import { ChatLine } from "../ChatLine/ChatLine";

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
    messages,
  } = useChat({ currentModel });

  return (
    <div className="flex flex-col justify-between h-[100dvh] w-full p-5">
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

        <div>
          {messages?.map(({ content, role }, index) => (
            <ChatLine key={index} role={role} content={content} />
          ))}

          {isLoading && <LoadingChatLine />}
        </div>
      </div>

      <div className="w-full md:max-w-[900px] flex flex-col gap-10 self-center mb-5">
        <div className="w-full p-2.5 shadow-md rounded-lg bg-emerald-200 flex flex-col justify-between">
          <form
            onSubmit={handleSubmit}
            className="relative w-full flex flex-col gap-5"
          >
            <input
              id="question"
              name="question"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Learn with MimirAI"
              className={`w-full p-5 rounded-lg outline-emerald-600 pr-14`}
            />
            <Button
              label=""
              iconOnly
              icon={<SendIcon width="20" height="20" />}
              type="submit"
              disabled={btnDisabled}
              variant="primary"
              className="absolute top-3 right-2"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
