import * as React from "react"
import { Button as ChakraButton } from "@chakra-ui/react"
import type { ButtonProps as ChakraButtonProps } from "@chakra-ui/react"
import { cn } from "../lib/utils"

export interface ButtonProps extends ChakraButtonProps {
  className?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }) => {
    return (
      <ChakraButton
        
        {...props}
      >
        {children}
      </ChakraButton>
    )
  }
)

Button.displayName = "Button"

export { Button }