import { isJson } from "./isJson";

const config = {
    url:"https://gitee.com/api/v5/repos",
    owner:"qianyuzhu",
    repo: "wx_data_keep",
    Authorization:"bd42cb1d54bc1ce2095b7dc95e31caa3"
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