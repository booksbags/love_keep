import { isJson } from "./isJson";

const config = {
    url:"https://gitee.com/api/v5/repos",
    owner:"qianyuzhu",
    repo: "wx_data_keep",
    Authorization:"bd42cb1d54bc1ce2095b7dc95e31caa3"
}
/**
 * 
 * @returns 文件名称
 */
function createFileName(){
    const now = Date.now();
    const fileName = `st_${now}.txt`;
    return fileName;
}

export interface IFileContent{
    content:string|Object,
    sha:string,
    path:string,
    name:string
}

/**
 * 获取文件内容
 * @param path 路径
 */
export function getFileContent(path:string):Promise<IFileContent>{
    const fullPath = `${config.url}/${config.owner}/${config.repo}/contents/${path}`
    return fetch(fullPath,{
        method:"GET",
        headers:{
            Authorization:config.Authorization
        }
    }).then((response)=>{
        return response.json().then((data)=>{
            let fileContent = atob(data.content);
            if(isJson(data.name)){
                fileContent = JSON.parse(fileContent);
            }
            return {
                content:fileContent,
                sha:data.sha,
                path:data.path,
                name:data.name
            }
        });
    })
}

export function submitBook(content:string){
    const fileName = createFileName();
    const path = `/book/${fileName}`;
    const fullPath = `${config.url}/${config.owner}/${config.repo}/contents/${path}`;
    const body = {
            "access_token":config.Authorization,
            content: btoa(content),
            message: Date.now()
        }
    return fetch(fullPath, {
        method: "POST",
        headers:{
            Authorization:config.Authorization,
            "content-type":"application/json"
        },
        body: JSON.stringify(body)
    })
}

export async function changeBookConfig(){
    const file = await getFileContent("book/detail.json");
    const data = file.content as any[];
    const sha = file.sha;
    data.push({name:createFileName()});
    const fullPath = `${config.url}/${config.owner}/${config.repo}/contents/book/detail.json`
    const body = {
        access_token:config.Authorization,
        content: btoa(JSON.stringify(data)),
        message:"添加内容",
        sha
    }
    return fetch(fullPath, {
        headers:{
            Authorization:config.Authorization,
            "content-type":"application/json"
        },
        method:"PUT",
        body:JSON.stringify(body)
    })
}