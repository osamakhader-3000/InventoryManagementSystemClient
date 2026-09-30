import React, { forwardRef, useRef, useEffect, useState, useImperativeHandle } from "react";
import textBoxStyles from './TextBox.module.css'
import searchBoxStyles from './SearchBox.module.css'

interface SearchBoxProps {
  placeholder: string;
  keyUpFunc?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  textInputStyle?: string;
  textInputType?: string;
  innerDivStyle?: string;
  innerDivStyleActive?: string;
  outerDivStyle?: string;
}


export interface SearchBoxRef {
  getValue: () => string | undefined;
  setValue: (value: string) => void;
}

const SearchBox = forwardRef<SearchBoxRef, SearchBoxProps>(
  ({  
  placeholder,
  keyUpFunc,
  textInputType,
  textInputStyle,
  innerDivStyle,
  innerDivStyleActive,
  outerDivStyle
}, ref) => {
  const localRef = useRef<HTMLInputElement>(null);

  const [isActive, setIsActive] = useState(false);

  // Expose getValue and setValue to parent via ref
  useImperativeHandle(ref, () => ({
    getValue: () => localRef.current?.value,
    setValue: (value: string) => {
      if (localRef.current) {
        localRef.current.value = value;
      }
    },
  }));

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        localRef.current &&
        event.target instanceof Node &&
        !localRef.current.contains(event.target)
      ) {
        setIsActive(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [localRef]);

  const handleInsideClick = () => {
    setIsActive(true);
    localRef.current?.focus();
  };

  return (
    <div onClick={handleInsideClick} className={outerDivStyle??textBoxStyles.outerDivTextbox} >
      <div className={isActive ?  innerDivStyleActive??searchBoxStyles.divTextboxActive  :  innerDivStyle??searchBoxStyles.divTextbox }>

        <svg
          className="h-5 w-5 text-gray-400"          
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          aria-invalid="false"
          onKeyUp={keyUpFunc}
          placeholder={placeholder}
          type={textInputType || "text"}
          className={ textInputStyle??textBoxStyles.inputTextbox }
          ref={localRef}
        />
      </div>
    </div>
  );
});
export default SearchBox;
