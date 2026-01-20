/**
 * 判断文件是否为json
 * @param name 文件名称
 * @returns boolean
 */
export function isJson(name:string){
    return /\.json$/.test(name)
}