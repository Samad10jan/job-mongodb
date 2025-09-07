"use client"

import { InfoCircledIcon } from "@radix-ui/react-icons"
import { Callout } from "@radix-ui/themes"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"

export default function CallOutMessage({ message }: { message: string }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!message?.trim()) {
      setIsVisible(false)
      return
    }

    setIsVisible(true)

    const timer = setTimeout(() => setIsVisible(false), 5000)

    return () => clearTimeout(timer)
  }, [message])

  if (!isVisible) return null

  return createPortal(
    <div
      className="
    fixed top-15 right-5 z-[9999] 
    min-w-[300px] max-w-[400px] 
    p-4 rounded-lg 
    ring-2  
  ring-emerald-600 bg-white text-emerald-600
    animate-slideIn
  ">
      <Callout.Root className=" p-5 gap-2 rounded-2xl" >
        <Callout.Icon className=" my-auto mx-3">
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text > {message} </Callout.Text>
      </Callout.Root>
    </div>
    ,
    document.body
  )
}
