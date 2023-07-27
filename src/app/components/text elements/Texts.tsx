
import { FC } from 'react'

interface Props {
  content: string;
}


export const Paragraph:FC<Props> = (props) => {
  return (
    <p className="text-sm">{props.content}</p>
  )
}

export const SmallText:FC<Props> = (props) => {
  return (
    <p className="text-xs">{props.content}</p>
  )
}
