import NotificationPopup from "../components/NotificationPopup";
import { useNotification } from "../services/NotificationService";


export default function NotificationColumn(props) {
    const {messages} = useNotification()

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
                <NotificationPopup notification={m} style={{pointerEvents:"auto"}}/>
            )
        })
      }
    </div>
  );
}