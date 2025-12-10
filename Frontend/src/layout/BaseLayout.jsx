import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../services/UserContext";
import { COLORS } from "../services/StyleService";
import { useNotification } from '../services/NotificationService';
import InlineButton from "../components/base/InlineButton";
import BoxButton from "../components/base/BoxButton";
import NotificationColumn from "./NotificationColumn";
import Card from "../components/base/Card";
import Centralized from "./Centralized";
import Breadcrumb from "../components/base/BreadCrum";


export default function BaseLayout({ children }) {
  const navigate = useNavigate()
  const messages = useNotification()
  const { user, logout } = useAuth()

  return (
    <div style={{backgroundColor:COLORS.bgDim, minHeight:'100vh'}}>
      <header style={{ padding: "0.5rem", background: COLORS.bg2 , display:"flex", justifyContent:"space-between"}}>
        <BoxButton onClick={() => navigate("/", {replace:true})}>⬅ HOME</BoxButton>
        
        { user && (
            <span style={{color:COLORS.txt2, textAlign:"center"}}>
                Bem vindo,<br/>
                <b>{user.username}</b>
            </span>
        )}
        
        {user ? 
            (<InlineButton style={{ marginLeft: 10 }} onClick={logout}> Logout </InlineButton>) 
            
            : (<InlineButton style={{ marginLeft: 10 }} onClick={()=>navigate("/login", { replace: true }) }> 
                Login 
                </InlineButton>
            )
        }

      </header>
      
      <Centralized style={{padding:'2rem'}}>
        <Card style={{maxWidth:'90vw', minWidth:'50vw', backgroundColor:COLORS.bg}}>
          <Breadcrumb/>
          <Outlet />
        </Card>
      </Centralized>

      <NotificationColumn/>
    </div>
  );
}
