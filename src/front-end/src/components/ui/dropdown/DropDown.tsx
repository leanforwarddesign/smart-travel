import { NativeSelect } from "@chakra-ui/react"
import React from "react"

export interface DropDownProps {
  options: { label: string; value: string }[]
  placeholder?: string
  value?: string
  onChange?: (value: string) => void,
  size?: "sm" | "md" | "lg"
}

export const DropDown: React.FC<DropDownProps> = ({
  options,
  placeholder,
  value,
  onChange,
  size = "md"
}: DropDownProps) => {
  return (
    <NativeSelect.Root size={size}>
      <NativeSelect.Field 
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
  )
}   
