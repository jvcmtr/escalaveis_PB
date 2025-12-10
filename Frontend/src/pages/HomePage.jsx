import InlineButton from "../components/base/InlineButton";
import { useNavigate } from "react-router-dom";
import Centralized from "../layout/Centralized"
import { useREST } from "../services/API/RESTContext"
import { COLORS } from "../services/StyleService";


export default function HomePage() {
  const { api, metadata } = useREST();
  const navigate = useNavigate();

  const isLoading =
    !metadata ||
    !metadata.entities ||
    !Array.isArray(metadata.entities);

  if (isLoading) {
    return (
      <Centralized>
        <h1>Loading...</h1>
      </Centralized>
    );
  }

  return (
    <Centralized>
      <h1>HOME</h1>
      <div>
        <h3>Entidades do sistema:</h3>

        {metadata.entities.map(e => (
          <InlineButton key={e.name} onClick={() => navigate(`/admin/${e.name}`)}>
            <div style={{ width: '50vw', borderBottom: `1px solid ${COLORS.bgDim}` }}>
              {e.name}
            </div>
          </InlineButton>
        ))}
      </div>

    </Centralized>
  );
}
