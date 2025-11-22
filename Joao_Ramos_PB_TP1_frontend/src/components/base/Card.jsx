import { COLORS } from "../../services/StyleService"



export default function Card(props){
    return(
        <div style={{ ...style, ...props.style}} >
            {props.children}
        </div>
    )
}

const style = {
    backgroundColor: COLORS.bg,
    color: COLORS.txt,
    boxShadow : "0 4px 12px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    border: `1px solid ${COLORS.bg2Dim}`,
    borderRadius: `0.2rem`,
    padding: "2rem",
    margin: "0.5em",
}