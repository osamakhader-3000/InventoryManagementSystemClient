import React, {  useEffect, useState, useRef,useMemo } from "react";
import formTextBoxStyles from './FormTextBox.module.css'
import { ValidationMessage } from "./ValidationMessage";

interface FormTextBoxProps {
  placeholder: string;
  keyUpFunc?: (intputText:string) => void;
  onClick?:()=>void;
  onUnClick?:()=>void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  textInputStyle?: string;
  textInputType?: string;
  innerDivStyle?: string;
  innerDivStyleActive?: string;
  outerDivStyle?: string;
  value?: string;
  isValid?: boolean;
  showValidationMessage?:boolean;
  children?: React.ReactNode;
  onBlur?: () => void;
  clearable?: boolean;
  onClear?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


export function FormTextBox 
  ({  
  placeholder,
  keyUpFunc,
  onClick,
  onUnClick,
  onChange,
  textInputType,
  textInputStyle,
  innerDivStyle,
  innerDivStyleActive,
  outerDivStyle,
  value,
  isValid = true,
  showValidationMessage = false,
  children,
  onBlur
}:FormTextBoxProps){

  const [isActive, setIsActive] = useState(false);
  const localRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

    const validationMessages = useMemo(
    () =>
      React.Children.toArray(children).filter((child) => {
        return React.isValidElement(child) && child.type === ValidationMessage;
      }),
    [children]
  );

const handleKeyUp= (event: React.KeyboardEvent<HTMLInputElement>) => {
  
  const target = event.target as HTMLInputElement;
    keyUpFunc?.(target.value);
}

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsActive(false);
        if(onUnClick)onUnClick();
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  });

  const handleInsideClick = () => {
    setIsActive(true);
    localRef.current?.focus();
    if(onClick)onClick();
  };

  return (
    <div className={`${formTextBoxStyles.outerContainerStyle}`}>
    <div ref={wrapperRef} onClick={handleInsideClick} className={outerDivStyle??formTextBoxStyles.outerDivStyle} >
      <div className={`${isActive ?  innerDivStyleActive??formTextBoxStyles.innerDivStyleActive : innerDivStyle??formTextBoxStyles.innerDivStyle} ${!isValid? formTextBoxStyles.innerDivStyleInvalid:''} `}>
        <input
          value={value}
          aria-invalid="false"
          onKeyUp={handleKeyUp}
          onChange={handleChange}
          placeholder={placeholder}
          type={textInputType || "text"}
          className={ textInputStyle??formTextBoxStyles.textInputStyle }
          ref={localRef}
          onBlur={onBlur}          
        />
      </div>   
    </div>      
      {(!isValid && showValidationMessage) ? (
        <div className={formTextBoxStyles.validMessageContainer}>
          <div className={formTextBoxStyles.validmessage}>
            {validationMessages}
          </div>
        </div>
      ) : null}
    </div>
  );
}

