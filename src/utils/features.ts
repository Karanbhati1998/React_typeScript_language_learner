import axios from "axios";
import {generate} from 'random-words'
import _ from 'lodash'
const rapidApi=import.meta.env.VITE_RAPID_API
const generateMcq=(word:{
  Text:string
}[],idx:number):string[]=>{
const correctAns=word[idx].Text
const incorrectAnsExceptCorrectAns=word.filter(i=>i.Text!==correctAns)
const incorrectOption:string[]=_.sampleSize(
  incorrectAnsExceptCorrectAns
  ,3).map(i=>(
  i.Text
))
const mcqOption=_.shuffle([...incorrectOption,correctAns])
return mcqOption
}



export const translateWords=async(params:LangType):Promise<WordType[]>=>{
  const url="https://microsoft-translator-text.p.rapidapi.com/translate"
try {
  const words=  generate(8) as string[]
  const word=words.map(i=>({
    Text:i
  }))
  const response=await axios.post(url,word, {
        params: {
          "to[0]": params,
          "api-version": "3.0",
          profanityAction: "NoAction",
          textType: "plain",
        },

        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": rapidApi,
          "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
        },
      })
        
      const receive:FetchDataType[]=response.data

      const arr:WordType[]= receive.map((i,idx)=>{
      const options:string[]=generateMcq(word,idx)
        return {
            word:i.translations[0].text,
            meaning:word[idx].Text,
            options:options
        }
    })
    return arr
} catch (error) {
    console.log(error);
    throw new Error(`Some thhing went wrong ${error}`)
}
}


export const countMatchingFunc=(corrArr:string[],incorArray:string[]):number=>{

  if(corrArr.length!==incorArray.length) throw new Error("Array are not equal")
let matchingCount=0;
for (let i = 0; i < corrArr.length; i++) {
  if(corrArr[i]===incorArray[i]){
    matchingCount++
  }
}

  return matchingCount
}


export const fetchAudio =async(text:string,language:LangType):Promise<string>=>{
  const key=import.meta.env.VITE_TEXT_TO_SPEECH_API
const encodedParams=new URLSearchParams({
  src:text,
  r:"0",
  c:"mp3",
  f: "8khz_8bit_mono",
 b64: "true",
})
if (language === "ja") encodedParams.set("hl", "ja-jp");
else if (language === "es") encodedParams.set("hl", "es-es");
else if (language === "fr") encodedParams.set("hl", "fr-fr");
else encodedParams.set("hl", "hi-in");
const {data}:{data:string}=await axios.post(   "https://voicerss-text-to-speech.p.rapidapi.com/",
encodedParams,   {
  params: { key },
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "X-RapidAPI-Key":rapidApi ,
    "X-RapidAPI-Host": "voicerss-text-to-speech.p.rapidapi.com",
  },
}
)
  return data
}