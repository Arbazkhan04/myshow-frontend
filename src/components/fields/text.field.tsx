import { Input } from "../ui/input";
import { useFormContext } from "react-hook-form";
import type { IconType } from "react-icons/lib";
import { FieldWrapper } from "./base.field";
import { Mail, User, type LucideProps } from "lucide-react";
import type { HTMLInputTypeAttribute } from "react";

export function TextField({
    label,
    name,
    type = "text",
    placeholder,
    Icon
}: {
    label: string;
    name: string;
    placeholder: string;
    type?: HTMLInputTypeAttribute;
    Icon: IconType | React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
}) {
    const { register } = useFormContext();
    return (
        <FieldWrapper {...{ label, name, Icon}}>
            <Input
                id={name}
                type={type}
                placeholder={placeholder}
                className=""
                {...register(name)}
            />
        </FieldWrapper>
    )
}

export const CharacterNameField = ({ name = 'characterName' }: { name?: string; }) => TextField({
    Icon: User, label: "Character Name", name, placeholder: "Enter Character Name"
});

export const EmailField = ({ name = 'email' }: { name?: string; }) => TextField({
    Icon: Mail, label: "Email", name, placeholder: "Enter your email"
});

export const FullNameField = ({ name = 'fullName' }: { name?: string; }) => TextField({
    Icon: User, label: "Full Name", name, placeholder: "Enter Full Name"
});