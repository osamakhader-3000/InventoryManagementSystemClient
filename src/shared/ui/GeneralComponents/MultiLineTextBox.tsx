import React, { useEffect, useRef } from "react";
import style from './FormTextBox.module.css';

interface FormTextBoxProps {
  placeholder?: string;
  keyUpFunc?: (inputText: string) => void;
  onClick?: () => void;
  onUnClick?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  cssClass?: string;
  value?: string;
  isValid?: boolean;
  onBlur?: () => void;
    rows?: number;
}

export function MultiLineTextBox({
  placeholder,
  keyUpFunc,
  onClick,
  onUnClick,
  onChange,
  cssClass: cssclass,
  value,
  isValid,
  onBlur,
    rows
}: FormTextBoxProps) {

  const localRef = useRef<HTMLTextAreaElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
      if (localRef.current && !localRef.current.contains(event.target as Node)) {        
        onUnClick?.();
      }
    };
  useEffect(() => {
    

    
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [onUnClick]);

  const handleInsideClick = () => {
    document.addEventListener("click", handleOutsideClick);
    localRef.current?.focus();
    onClick?.();
  };

  return (
    <div className={style.outerDivStyle}>
    <textarea
      name="testtextbox"
      onClick={handleInsideClick}
      value={value ?? ""}
      aria-invalid={isValid === false}
      onKeyUp={(e) => keyUpFunc?.((e.target as HTMLTextAreaElement).value)}
      onChange={onChange}
      placeholder={placeholder || ""}
      className={`
        ${style.textbox} ${style.multiline}
        ${isValid === false ? style.invalid : ''}
        ${cssclass || ''}
      `.trim()}
      ref={localRef}
      onBlur={onBlur}
      rows={rows}

    /></div>
  );
}