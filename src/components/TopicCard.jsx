export default function TopicCard({topic, setTopicId}){



    return(
        <div className="flex flex-col w-72 border-2 rounded-md pb-3">
            <img src={topic?.poster} className="rounded-t-md h-48"/>
            <div className="p-2 space-y-2">
                <p className="text-xl font-bold">{topic?.title}</p>
                <div className="text-sm h-48 overflow-y-scroll">
                    <p>{topic?.description}</p>
                </div>
            </div>
            <div className="flex flex-row items-center justify-center">
                <button className="pt-2 pb-2 pl-4 pr-5 bg-black text-white w-max rounded-md" onClick={()=>setTopicId(topic?.topicId)}>chat with me</button>
            </div>
        </div>
    )
}