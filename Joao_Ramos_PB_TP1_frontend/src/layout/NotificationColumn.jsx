import NotificationPopup from "../components/NotificationPopup";
import { useNotification } from "../services/NotificationService";


export default function NotificationColumn(props) {
    const {messages} = useNotification()
    // const messages = [1, 2, 3, 4, 5, 6, 7]
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column-reverse",
        alignContent: "center",
        gap: "2vh",
        position: "fixed",
        left: '74vw',
        bottom: '1vh',
        width: "25vw",
        height: "100vh",
        overflowY: "auto",
        zIndex: "99999",
        background: "transparent",
        pointerEvents: "none",
        ...props.style,
      }}
    >
      {
        messages.map(m => {
            return (
                // <div style={{height:"100px", width:"100px", backgroundColor:"#ff0000"}}/>
                <NotificationPopup notification={m} style={{pointerEvents:"auto"}}/>
            )
        })
      }
    </div>
  );
}