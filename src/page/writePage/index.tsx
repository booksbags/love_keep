import { useEffect, useState } from "react"
import "./index.css"
import { getFileContent, type IFileContent } from "../../utils/request";
import { useNavigate } from "react-router";
export function WritePage(){
    const [books, setBooks] = useState<any[]>([]);
    const navigater = useNavigate();
    async function getBookData(){
        const data = await getFileContent("book/detail.json");
        setBooks(data.content as any[]);
    }
    useEffect(()=>{
        getBookData()
    },[]);
    return(
        <div
            className="writeContainer"
        >
            {
                books.map((item)=>{
                    let [title, time] = item.name.split("_");
                    time = time.split(".")[0];
                    return (
                        <div className="writeItem"
                            onClick={()=>{
                                navigater(`/bookDetail/${item.name}`)
                            }}
                        >
                            <h5>{title}</h5>
                            <span>{new Date(Number(time)).toLocaleString()}</span>
                        </div>
                    )
                })
            }
            {/* <form>
                <div className="write">
                    <textarea maxLength={500} minLength={300}/>
                </div>
                <button>提交</button>
            </form> */}
        </div>
    )
}