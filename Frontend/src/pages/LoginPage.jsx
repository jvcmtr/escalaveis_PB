import { useAuth } from "../services/UserContext";
import { useNavigate, Navigate, useLocation, useSearchParams } from "react-router-dom";
import { useState } from "react";
import BoxButton from "../components/base/BoxButton";
import TextInput from "../components/base/TextInput";
import Centralized from "../layout/Centralized";
import { useNotification } from "../services/NotificationService";

export default function LoginPage() {
  const message = useNotification()
  const [searchParams] = useSearchParams()
  const authService = useAuth()
  const navigate = useNavigate()
  
  const [username, setUsername] = useState("")
  const next = searchParams.get("next") || "/"
  
  const login = () => {
    authService.login({username}, "");
    message.success("Login bem suciedido", `bem vindo ${username}`)
    navigate(next);
  };

  if(authService.user){
    return <Navigate to={next} />;
  }

  return (
    <Centralized>

      <h1>Login</h1>
      <TextInput 
        value={username} 
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Digite um nome qualquer"
        />
      <BoxButton onClick={login}>Login</BoxButton>
    </Centralized>
  );
}
