import { type InputHTMLAttributes, type Ref } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  ref?: Ref<HTMLInputElement>;
}

const Input = ({ error, label, name, ref, ...rest }: InputProps) => {
  return (
    <div className="inline-flex flex-col">
      <label
        className={`inline-block h-4 text-xs mb-1 ${error && "error-label"}`}
        htmlFor={name}
      >
        {error || label}
      </label>
      <input className="w-[400px]" id={name} name={name} ref={ref} {...rest} />
    </div>
  );
};

export default Input;
