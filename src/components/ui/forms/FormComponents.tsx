import { FC } from "react"

interface LabelProps {
    title: string
}

export const FormLabel:FC<LabelProps> = (props) => {
    return (
        <label className="text-white">{props.title}</label>


    )
}

interface TextInputProps {
    defaultValue: string
}

export const FormTextInput:FC<TextInputProps> = (props) => {
  return (
      <input className="text-black rounded-md py-1 px-2" type="text" defaultValue={props.defaultValue}/>
  )
}
