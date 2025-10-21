"use client"

import { InfoCircledIcon } from "@radix-ui/react-icons"
import { Callout, Card } from "@radix-ui/themes"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

export default function CallOutMessage({ message }: { message: string }) {
  const [isVisible, setIsVisible] = useState(false)

  

  useEffect(() => {

    if (!message?.trim()) {
      console.log("in callout", message);
      setIsVisible(false)
      return
    }

    setIsVisible(true)
    // after 5sec visible become false
    const timer = setTimeout(() => {
       
      setIsVisible(false)
     
    }, 5000)

    return () => clearTimeout(timer)
  }, [message])

  if (!isVisible) return null

  return createPortal(
    <Card
      className="!fixed !top-15 !right-5 !z-[9999] !text-xs !scale-90 md:!scale-100 md:!text-lg md:!min-w-[300px] md:!max-w-[400px] !p-4 !rounded-lg
       !ring-2 !font-bold !font-mono  !text-emerald-600 animate-slideIn bg-white shadow-xl " >
      <Callout.Root className=" !gap-2 !rounded-2xl" >
        <Callout.Icon className=" !my-auto !mx-3">
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text > {message} </Callout.Text>
      </Callout.Root>
    </Card>
    ,
    document.body
  )
}
