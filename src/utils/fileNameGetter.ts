export function getFileName(str: string) { 
    return str.substr(str.lastIndexOf(";")).substr(1) 
}