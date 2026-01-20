import writeIcon from "../../../public/icon/xiezuopingtai_xiezuobianji.svg"
import dateIcon from "../../../public/icon/jinianri.svg"
import "./index.css"
import { useNavigate } from "react-router";
const iconMap = {
    writeIcon:writeIcon,
    dateIcon: dateIcon
}
export interface IItem{
    icon:keyof typeof iconMap,
    text:string,
    path:string,
}
export function Item(props:IItem){
    const {
        icon, text,path
    } = props;
    const navigater = useNavigate();
    return (
        <div className="itemContainer"
            onClick={()=>{
                navigater(path);
            }}
        >
            <div className="itemTop">
                <img src={iconMap[icon]} alt="" />
            </div>
            <div className="itemBottom">{text}</div>
        </div>
    )
}