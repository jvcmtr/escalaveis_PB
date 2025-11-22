import { createContext, useContext, useState, useEffect, useCallback } from "react";

export const ENotificationTypes = Object.freeze({
  WARNING: "ALERT",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
  INFO: "INFO",
});

const NotificationContext = createContext(null);

export function NotificationProvider(props) {
    const [messages, setMessages] = useState([])
    const [i, setI] = useState(0)

    const addMessage = (type, title, message) =>{
        setMessages(a => [ 
            {
                id : i, 
                dt: new Date(), 
                type: type, 
                title: title,
                message: message, 
            }, 
            ...a
        ] )
        setI(i+1)
    }

  return (
    <NotificationContext.Provider value={{
        warning : (t, m=null) => addMessage(ENotificationTypes.WARNING, t, m),     
        error : (t, m=null) => addMessage(ENotificationTypes.ERROR, t, m), 
        success : (t, m=null) => addMessage(ENotificationTypes.SUCCESS, t, m),     
        info : (t, m=null) => addMessage(ENotificationTypes.INFO, t, m),
        removeNotification: (n) => setMessages(a => a.filter(n2 => n2.id != n.id )),
        messages: messages
    }}>
      {props.children}
    </NotificationContext.Provider>
  );
}


export function useNotification() {
    return useContext(NotificationContext);
}
