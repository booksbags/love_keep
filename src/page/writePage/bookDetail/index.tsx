import { useEffect, useState } from "react";
import { getFileContent, type IFileContent } from "../../../utils/request";
import { useParams } from "react-router";
import "./index.css"

function getDate(name:string){
    return new Date(Number(name.split("_")[1].split(".")[0])).toLocaleString()
}

export function BookDetail(){
    const params = useParams();
    const [bookConten, setBookContent] = useState<IFileContent>();
    async function getData(){
        if(!params.path)return;
        const data = await getFileContent(`book/${params.path}`);
        setBookContent(data);
    }
    useEffect(()=>{
        getData();
    },[])
    return <div className="bookDetail">
        <div className="content">
            {bookConten?.content as String}
        </div>
        <div>{bookConten && getDate(bookConten!.name)}</div>
    </div>
}