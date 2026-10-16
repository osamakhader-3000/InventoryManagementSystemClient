import React, { useEffect, useRef } from "react";
import formTextBoxStyles from './FormTextBox.module.css';

interface FormTextBoxProps {
  placeholder?: string;
  keyUpFunc?: (inputText: string) => void;
  onClick?: () => void;
  onUnClick?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  textInputStyle?: string;
  textInputType?: string;
  value?: string;
  isValid?: boolean;
  onBlur?: () => void;
  maxLength?: number;
  min?: number;
}

export function TextBox({
  placeholder,
  keyUpFunc,
  onClick,
  onUnClick,
  onChange,
  textInputType,
  textInputStyle,
  value,
  isValid,
  onBlur,
  maxLength,
  min,
}: FormTextBoxProps) {

  const localRef = useRef<HTMLInputElement>(null);

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
    <div className={formTextBoxStyles.outerDivStyle}>
    <input
      name="testtextbox"
      onClick={handleInsideClick}
      value={value ?? ""}
      aria-invalid={isValid === false}
      onKeyUp={(e) => keyUpFunc?.((e.target as HTMLInputElement).value)}
      onChange={onChange}
      placeholder={placeholder || ""}
      type={textInputType || "text"}
      className={`
        ${formTextBoxStyles.textbox}
        ${isValid === false ? formTextBoxStyles.invalid : ''}
        ${textInputStyle || ''}
      `.trim()}
      ref={localRef}
      onBlur={onBlur}
      maxLength={maxLength}
      min={min}
    /></div>
  );
}