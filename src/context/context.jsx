import { createContext, useState } from "react";
import run from "../config/gemini"

export const Context = createContext();

const ContextProvider = (props) => {

    const [input,setInput] = useState("");
    const [recentPrompt,setRecentPrompt] = useState("");
    const [prevPrompts,setPrevPrompts] = useState([]);
    const [showResult,setShowResult] = useState(false);
    const [loading,setloading] = useState(false);
    const [resultData, setResultData] = useState("");


    const delaypara = (index, nextWord) =>{
        setTimeout(function(){
            setResultData(prev=>prev+nextWord);
        },75*index)

    }
    const newchat = () =>{
        setloading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {


        setResultData("")
        setloading(true)
        setShowResult(true)
        let response;
        if(prompt !== undefined){
            response  = await run(prompt);
            setRecentPrompt(prompt)
        }
        else{
            setPrevPrompts(prev=>[...prev,input])
            setRecentPrompt(input)
            response = await run(input)
        }
        setRecentPrompt(input)
        setPrevPrompts(prev=>[...prev,input])
        
        let responsearray = response.split("**");
        let newresponse ="" ;
        for(let i = 0; i< responsearray.length;i++){
            if(i==0 || i%2 !== 1){
                newresponse += responsearray[i];
            }
            else{
                newresponse += "<b>" +responsearray[i]+"</b>";
            }
        }
        let newresponse2 = newresponse.split("*").join("</br>")
        let newresponsearray = newresponse2.split(" ");
        for(let i =0; i<newresponsearray.length; i++){
            const nextWord = newresponsearray[i];
            delaypara(i,nextWord+" ")
        }
        setloading(false)
        setInput("")

    }

    
    const ContextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newchat
    }

    return (
        <Context.Provider value={ContextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider