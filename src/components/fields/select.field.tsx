import { useFormContext, Controller } from "react-hook-form"
import type { IconType } from "react-icons/lib"
import { type LucideProps } from "lucide-react"
import type { HTMLInputTypeAttribute } from "react"
import { FieldWrapper } from "./base.field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { IoMdMale } from "react-icons/io"

export function SelectField({
  label,
  name,
  placeholder,
  Icon,
  data,
}: {
  label: string
  name: string
  placeholder: string
  type?: HTMLInputTypeAttribute
  Icon: IconType | React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >
  data: { label: string; value: string }[]
}) {
  const { control } = useFormContext()

  return (
    <FieldWrapper {...{ label, name, Icon }}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {data.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </FieldWrapper>
  )
}

export const GenderField = ({ name = 'gender'}: { name?: string; }) => SelectField({
    Icon: IoMdMale, label: 'Gender', name, placeholder: 'Select Gender',
    data: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Non Binary', value: 'other' },
    ]
});