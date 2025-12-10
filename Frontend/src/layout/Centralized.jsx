
export default function Centralized(props) {
    return (
        <div style={{ ...CenterStyle, ...props.style }}>
            {props.children}
        </div>
    );
}

const CenterStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection:"column",
    gap:"1rem"
};