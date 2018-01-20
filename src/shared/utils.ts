export  class Utils{
    static getHostnameFromUrl(url:string):string{
        try{
            return (new URL(url)).hostname.replace("www.","");
        }
        catch(e){
            return "";
        }
    }
}