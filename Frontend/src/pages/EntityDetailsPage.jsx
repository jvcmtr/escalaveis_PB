import React, { useState, useCallback} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useREST } from '../services/API/RESTContext';
import { useAuth } from '../services/UserContext';


import EntityForm from '../components/EntityForm';
import Loadable from '../components/Loadable';
import BoxButton from '../components/base/BoxButton';
import ConfirmButton from '../components/base/ConfirmButton';
import { useNotification } from '../services/NotificationService';

export default function EntityDetailsPage(props){
    const { entity, id } = useParams()  
    const notification = useNotification()
    const {api, metadata} = useREST()
    const { user } = useAuth()
    const navigate = useNavigate()
    
    const [data, setData] = useState({})
    const getData = useCallback(() => api.get(entity, id), [api, entity, id]);

    const back = (ev) => navigate(`/admin/${entity}`)
    const del = async(ev) => { 
        try{
            await api.delete(entity, id, user)
            notification.success(`Deletado com sucesso`)
            back(ev) 
        }
        catch (e){
            console.log(e)
            notification.error("Falha ao deletar a entidade", e.message)
        }
    }

    const edit = async (ev) => { 
        try{
            let resp = await api.update(entity, id, user, data ) 
            notification.success(`Atualizado com sucesso`)
        }
        catch (e){
            notification.error("Falha ao atyalizar entidade", e.message)
        }

    }  

    return(
        <div>
            <h2>Editar {entity} {id} </h2>
            <Loadable getData={getData}>
                <EntityForm entity={entity} id={id} metadata={metadata} onChange={setData}/>
            </Loadable>
            
            <div style={{display:"flex", gap:"1rem", justifyContent:"flex-end"}}>
                <BoxButton onClick={edit}> Salvar </BoxButton>
                <ConfirmButton onClick={del} message="Tem certeza que deseja deletar este item?"> Deletar </ConfirmButton>
                <BoxButton onClick={back}> Voltar </BoxButton>
            </div>
        </div>
    )
}