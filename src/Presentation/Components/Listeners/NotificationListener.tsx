import { DependencyContext } from '../../../context/DependencyContext';
import { useContext, useEffect, useRef, useState } from 'react';
import {NotificationMessageBox} from '../../../shared/ui/GeneralComponents/NotificationMessageBox';


export function NotificationMessageListener() {

    const [messageText, setMessageText] = useState<string | undefined>(undefined);
    const [showNotification, setShowNotification] = useState(false);
    const notificationBoxWrapperRef = useRef<HTMLDivElement>(null);
    const {notificationHandlingBus} = useContext(DependencyContext);

    notificationHandlingBus.Subscribe((message:string) => {
        setMessageText(message);
        setShowNotification(true);
    });

   
    useEffect(() => {
        if (!showNotification) return;
    
        const onPointerDown = (e:Event) => {
          const target = e.target as Node;
    
          if (notificationBoxWrapperRef.current?.contains(target)) return;
          setShowNotification(false);
        };
    
        document.addEventListener("click", onPointerDown, true);
        return () => document.removeEventListener("click", onPointerDown, true);
      }, [showNotification]);
      
    return (
        <span ref={notificationBoxWrapperRef}>
            <NotificationMessageBox message={messageText} showNotification={showNotification}></NotificationMessageBox>
        </span>
    );
}