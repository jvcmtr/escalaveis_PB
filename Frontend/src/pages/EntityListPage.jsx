import React from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import { useREST } from '../services/API/RESTContext';

import EntityTable from '../components/EntityTable'
import Loadable from '../components/Loadable';
import BoxButton from '../components/base/BoxButton';

export default function EntityListPage(props){
    const { entity } = useParams();    
    const {api, metadata} = useREST()
    const navigate = useNavigate();

    const back = () => navigate(`/`)
    const create = () => navigate(`/admin/${entity}/create`)
    const details = ( id ) => navigate(`/admin/${entity}/${id}`)

    return(
        <div style={{padding:"5vw"}}>
            <BoxButton onClick={create}>+ Criar novo</BoxButton>
            
            <h2> {entity.toUpperCase()} </h2>
            <Loadable getData={()=>api.getAll(entity)}>
                <EntityTable entity={entity} onRowSelect={details} metadata={metadata}></EntityTable>
            </Loadable>

            
            <div style={{display:"flex", gap:"1rem", justifyContent:"flex-end"}}>
                <BoxButton onClick={back}> Voltar </BoxButton>
            </div>
        </div>
    )
}