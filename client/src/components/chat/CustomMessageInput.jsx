import { MessageInput } from "stream-chat-react";
import { useEffect, useRef } from "react";

const CustomMessageInput = ({ ...props }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const handleViewportChange = () => {
      if (inputRef.current) {
        inputRef.current.blur();
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      }
    };

    window.addEventListener("resize", handleViewportChange);

    return () => {
      window.removeEventListener("resize", handleViewportChange);
    };
  }, []);

  return (
    <div className="relative">
      <MessageInput
        {...props}
        ref={inputRef}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        inputMode="text"
      />
    </div>
  );
};

export default CustomMessageInput;
