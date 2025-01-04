import { LinearProgress } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';
import { useRef, useState } from "react"

export default function ChatWidget({chatWidgetRef, chatBoxRef, setMessage, isApiCalled, setOpen}){

    const [userQuery, setUserQuery] = useState("");

    function sendQuery(){
        setMessage(userQuery);
        setUserQuery("");
    }

    const keyPress = (event)=>{
        if(event.key=="Enter"){
            sendQuery()
        }
    }

    return(
        <div ref={chatWidgetRef} className="rounded-md z-20 zeroOpacity flex flex-col w-11/12 md:w-96" style={{position:"fixed",bottom:"20px",right:"20px",background:"white",boxShadow:"1px 1px 4px black"}}>

            <div className="w-full rounded-t-md p-5 bg-blue-600 ">
                <div className="w-full flex flex-row justify-between items-center">        
                    <div className="w-full text-white flex flex-row space-x-2 items-center justify-start">   
                        <p className="font-bold text-xl">WeChat Assistant</p>
                        <i class="fa fa-commenting-o text-2xl"></i>
                    </div>
                <i onClick={()=>setOpen(false)} className="cursor-pointer fa fa-times text text-white text-2xl font-thin" aria-hidden="true"></i>
                </div>                     
            </div>
            {isApiCalled && <LinearProgress/>}
            <div className="flex-1 rounded-md flex flex-col pt-2 justify-between">
                <div ref={chatBoxRef} style={{height:"300px"}} className="overflow-y-scroll pl-3 pr-3 pt-3">
                    
                </div>
                <div className="h-14 w-full flex flex-row items-center space-x-2 pl-2 pr-2 pb-5">
                    <input value={userQuery} onChange={(event)=>setUserQuery(event.target.value)} onKeyPress={(event)=>keyPress(event)} type="text" className="flex-1 h-full text-md p-3 pl-1 rounded-md border-2 outline-none"/>
                    <div onClick={sendQuery} className="cursor-pointer rounded-full bg-blue-600 text-white w-10 h-10 flex flex-row justify-center items-center"><i class="fa fa-paper-plane-o"></i></div>
                </div>
            </div>
        </div>
    )
}