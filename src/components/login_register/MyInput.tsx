import { ChangeEvent } from "react";

type TRegisterInput = {
    name_id_htmlFor: string;
    inputType: "text" | "password" | "email";
    placeholder: string;
    labelText: string;
    handleRegisterInput?: (param: ChangeEvent<HTMLInputElement>) => void;
    handleLoginInput?: (param:ChangeEvent<HTMLInputElement>) => void
};

export const MyInput = ({ name_id_htmlFor, inputType, placeholder, labelText, handleRegisterInput, handleLoginInput }: TRegisterInput) => {

    if(handleLoginInput){

        return (
            <>
            <label htmlFor={name_id_htmlFor} className="label">
                <span className="text-neutral">{labelText}</span>
            </label>
            <input id={name_id_htmlFor} name={name_id_htmlFor} type={inputType} className="input" placeholder={placeholder} onChange={handleLoginInput} />
        </>
    );
}
return (
    <>
    <label htmlFor={name_id_htmlFor} className="label">
        <span className="text-neutral">{labelText}</span>
    </label>
    <input id={name_id_htmlFor} name={name_id_htmlFor} type={inputType} className="input" placeholder={placeholder} onChange={handleRegisterInput} />
</>
);
};
