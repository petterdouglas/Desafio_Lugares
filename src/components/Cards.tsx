import { ComponentProps } from "react"

type CardsContainerProps = ComponentProps<'div'>

export function CardsContainer(props: CardsContainerProps){
    return(
        <div
            {...props}
        />
    )
}

