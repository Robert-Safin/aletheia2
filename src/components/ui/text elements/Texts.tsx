
import { FC } from 'react'

interface Props {
  content: string;
}


export const Paragraph:FC<Props> = (props) => {
  return (
    <p className="text-sm text-white">{props.content}</p>
  )
}

export const SmallText:FC<Props> = (props) => {
  return (
    <p className="text-xs text-white">{props.content}</p>
  )
}
