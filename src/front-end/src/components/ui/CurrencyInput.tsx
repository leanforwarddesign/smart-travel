import React from 'react'
import { Input } from "@chakra-ui/react"

export interface CurrencyInputProps {
  value?: string | number
  defaultValue?: string | number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  disabled?: boolean
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  variant?: "outline" | "filled" | "flushed"
  type?: string
  className?: string
}

export const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      placeholder,
      disabled = false,
      size = "md",
      type = "number",
    },
 ) => {
    return (
      <Input
        type={type}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        size={size}
      />
    )
  }
)

CurrencyInput.displayName = "CurrencyInput"

export default CurrencyInput