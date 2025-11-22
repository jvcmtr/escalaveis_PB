import React, { useEffect, useState } from "react";
import { useREST } from "../services/API/RESTContext";
import BoxButton from "./base/BoxButton";

export default function EntityTable(props) {

    if(!props.metadata){
        return <span>Incapaz de carregar os dados</span>
    }

    const entityMeta = props.metadata.entities.find((e) => e.name === props.entity);
    const fields = [...props.metadata.baseFields, ...entityMeta.fields];
    const entityfields = entityMeta.listDisplayFields? fields.filter(f => entityMeta.listDisplayFields.includes(f.name) ) :  fields;

    console.log(entityMeta)

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {entityfields.map(f => (
                            <th key={f.name}>{f.verbose || f.name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((item) => (
                        <tr key={item.id} onClick={() => props.onRowSelect && props.onRowSelect(item.id)}>
                            {entityfields.map(f => (
                                <td key={f.name}>
                                    {String(item[f.name])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
