import { DependencyContext } from '../../../context/DependencyContext';
import { useContext, useEffect, useRef, useState } from 'react';
import {ErrorMessageBox} from '../GeneralComponents/ErrorMessageBox';


export function ErrorMessageListener() {

    const [err, setErr] = useState<string | undefined>(undefined);
    const [showError, setShowError] = useState(false);
    const errorBoxWrapperRef = useRef<HTMLDivElement>(null);
    const {errorHandlingBus} = useContext(DependencyContext);

    errorHandlingBus.Subscribe((message:string) => {
        setErr(message);
        setShowError(true);
    });


    useEffect(() => {
        if (!showError) return;
    
        const onPointerDown = (e:Event) => {
          const target = e.target as Node;
    
          if (errorBoxWrapperRef.current?.contains(target)) return;
          setShowError(false);
        };
    
        document.addEventListener("click", onPointerDown, true);
        return () => document.removeEventListener("click", onPointerDown, true);
      }, [showError]);
      
    return (
        <span ref={errorBoxWrapperRef}>
            <ErrorMessageBox message={err} showError={showError}></ErrorMessageBox>
        </span>
    );
}