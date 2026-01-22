import { useRef } from "react"
import "./index.css"
import { changeBookConfig, submitBook } from "../../../utils/request";
import { useNavigate } from "react-router";
export function AddBook(){
    const ref = useRef<HTMLTextAreaElement>(null);
    const navigater = useNavigate();
    async function submit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const content = ref.current?.value;
        if(content){
            await submitBook(content);
            await changeBookConfig()
            navigater(-1);
        }
    }
    return (
        <div className="addBook">
            <form onSubmit={submit}>
                <div className="write">
                    <textarea placeholder="请输入您的检讨" ref={ref} maxLength={500} minLength={10}/>
                </div>
                <button>提交</button>
            </form>
        </div>
    )
}