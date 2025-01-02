import Notifier from "../../Components/Common/Notifier";

export const notifier = {
    success : (msg) =>{
        return (<Notifier type={"success"} msg ={msg}/>)
    } ,
    error : (msg) =>{
        return (<Notifier type={"error"} msg ={msg}/>)
    } 
}
