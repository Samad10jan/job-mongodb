"use client"
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { Heading, Text } from "@radix-ui/themes";

export default function NotFoundComponent({message}:{message:string}){
    return(
        <div className="max-w-2xl mx-auto mt-20 text-center">
        <div className="p-8">
          <CrossCircledIcon className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <Heading size="6" className="mb-2 text-xl font-semibold">
           {message}
          </Heading>
          <Text size="3" className="text-gray-500">
            The resource you're looking for doesn't exist or you don't have
            permission to view this resource.
          </Text>
        </div>
      </div>
    )
}