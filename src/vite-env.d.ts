/// <reference types="vite/client" />

type LangType=string|"ja"|"hi"|"es"|"fr"
type WordType={
word:string,
meaning:string,
options:string[]
}

interface StateType {
    loading:boolean,
    word:WordType[]
    result:string[],
    error?:string
}

type FetchDataType={
    translations:{
        text:string,
        to:string
    }[]
}