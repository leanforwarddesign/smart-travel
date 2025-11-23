import * as React from "react";
import { Input as ChakraInput } from "@chakra-ui/react";
import type { InputProps as ChakraInputProps } from "@chakra-ui/react";
import { cn } from "../lib/utils";

export interface InputProps extends ChakraInputProps {
    className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
        return (
            <ChakraInput
                ref={ref}
                className={cn(className)}
                {...props}
            />
        );
    },
);
Input.displayName = "Input";

export { Input };
