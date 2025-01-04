import TopicCard from "./components/TopicCard"
import { useEffect, useRef, useState } from "react"
import ChatWidget from "./components/ChatWidget";
import "./css/ChatWidget.css"
import axios from "axios";

export default function Home() {
    const [topicId, setTopicId] = useState("");
    const chatWidgetRef = useRef(null);    
    const chatBoxRef = useRef(null);
    const [message, setMessage] = useState("");
    const [isApiCalled, setIsApiCalled] = useState(false);
    const [topics, setTopics] = useState({});
    const [open, setOpen] = useState(false);

    const scrollBottom = (reference)=>{
        reference.current.scrollTop=reference.current.scrollHeight;
    }

    const fetchAllTopics = async()=>{
        let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/topics/fetch`);
        if(res?.data?.status?.toLowerCase() === "success"){
            let allTopics = res?.data?.data || [];
            let formattedTopics = allTopics.reduce((accumulator, data)=>{
                if(accumulator[data?.topic]){
                    accumulator[data?.topic].push(data)
                }
                else{
                    accumulator[data?.topic] = [data];
                }
                return accumulator;
            },{})
            setTopics(formattedTopics || {});
        }
        else{
            console.log(res?.data?.message || "Error occurred while fetching topics")
        }
    }

    const startChat=async()=>{
        console.log("hello")
        setIsApiCalled(true);
        let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/rag/query`,{query:message,topic_id:topicId})
            .finally(()=>{
                setIsApiCalled(false);
            });
        setMessage("")
        if(res?.data?.status.toLowerCase() === "success"){
            chatBoxRef.current.appendChild(botMessage(res?.data?.data))
            scrollBottom(chatBoxRef)
        }
        else{
            console.log("error occurred")
        }
    }

    useEffect(()=>{
        console.log(topicId)
        if(topicId && !open){
            setOpen(true);
            chatWidgetRef.current.classList.remove("hide")
            chatWidgetRef.current.classList.add("show")
            chatBoxRef.current.appendChild(botMessage('Hello! How can I assist you today?'))                
        }

    },[topicId])

    const userMessage = ()=>{
        let div = document.createElement("div");
        div.style.width = "100%";
        div.style.display = "flex";
        div.style.flexDirection = "row-reverse";
        div.style.alignItems="flex-start";
        div.style.columnGap="10px"
        div.style.paddingBottom = "10px"
        div.style.paddingLeft = "50px";
        div.innerHTML = `<img src='user.png' style='width:20px;height:20px;'/> <p >${message}</p>`
        return div;
    }

    const botMessage = (response)=>{
        let div = document.createElement("div");
        div.style.width = "100%";
        div.style.display = "flex";
        div.style.flexDirection = "row";
        div.style.alignItems="flex-start";
        div.style.columnGap="10px"        
        div.style.paddingBottom = "10px";
        div.style.paddingRight = "50px";
        div.innerHTML = `<img src='chat-bot.png' style='width:20px;height:20px;'/> <p>${response}</p>`
        return div;
    }    

    useEffect(()=>{
        if(message){
            chatBoxRef.current.appendChild(userMessage())
            scrollBottom(chatBoxRef)
            startChat()         
        }
    },[message])

    useEffect(()=>{
        if(open){
            //nothing
        }
        else{
            if(chatBoxRef.current.innerHTML){
                chatWidgetRef.current.classList.remove("show")
                chatWidgetRef.current.classList.add("hide")              
                chatBoxRef.current.innerHTML = "";
            }
        }
    },[open])

    useEffect(()=>{
        fetchAllTopics()
    },[])

    return (
        <>
            <ChatWidget isApiCalled={isApiCalled} setOpen={setOpen} chatWidgetRef={chatWidgetRef} chatBoxRef={chatBoxRef} setMessage={setMessage}/>           
            <div className="z-10 bg-black pl-4 pt-4 pb-4 w-full text-white flex flex-row items-center space-x-3">
                <img src='logo.png' style={{width:"40px",height:"40px"}}/><p className="text-white text-2xl font-medium">WeChat</p>
            </div>
            {Object.entries(topics).map(([topicName, categorizedTopics])=>{
                    return(
                        <div className="p-4">   
            <div className="flex flex-row items-center space-x-5    "><hr style={{border:"1px solid #0003"}} className="flex-1"></hr><p className="text-black font-bold text-2xl">{topicName}</p><hr style={{border:"1px solid #0003"}} className="flex-1"/></div>                              
            <div className="w-full flex flex-col items-center space-x-0 md:flex-row md:space-x-8 space-y-5 md:space-y-0 pt-4 flex-wrap">
                {categorizedTopics.map((data)=>{
                    return(
                        <>
                            <TopicCard setTopicId={setTopicId} topic={data}/>
                        </>
                    )
                })}
            </div>
            </div>
            )
            })}               
        </>
    )
}