import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useREST } from '../services/API/RESTContext';
import { useAuth } from '../services/UserContext';

import Breadcrumb from '../components/base/BreadCrum';
import EntityForm from '../components/EntityForm';
import Centralized from '../layout/Centralized';
import BoxButton from '../components/base/BoxButton';

export default function EntityCreatePage(props){
    const navigate = useNavigate();
    const { entity } = useParams()  
    const { user } = useAuth()
    const { api, metadata} = useREST()
    
    const [data, setData] = useState({});

    const back = (ev) => navigate(`/admin/${entity}`)
    const save = async (ev) => {
        let response = await api.create(entity, user, data)

        if(response.id)
            navigate(`/admin/${entity}/${response.id}`)
        else
            navigate(`/admin/${entity}`)
    }

    return(
        <div style={{padding:"5vw"}}>
            <h2>Criar {entity} </h2>
            <EntityForm entity={entity} metadata={metadata} onChange={setData}/>
            
            <div style={{display:"flex", gap:"1rem", justifyContent:"flex-end"}}>
                <BoxButton onClick={save}> Salvar</BoxButton>
                <BoxButton onClick={back}> Voltar </BoxButton>
            </div>
        </div>
    )
}