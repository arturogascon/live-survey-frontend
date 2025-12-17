import { type ChangeEventHandler, type Ref } from "react";

type Props = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  error?: string;
  ref?: Ref<HTMLInputElement>;
};

const Input = ({
  value,
  onChange,
  type = "text",
  name,
  label,
  placeholder,
  error,
  ref,
}: Props) => {
  return (
    <div className="inline-flex flex-col">
      <label
        className={`inline-block h-4 text-xs mb-1 ${
          error && "visible error-label"
        } ${label && "visible"}`}
        htmlFor={name}
      >
        {error || label}
      </label>
      <input
        className="w-[400px]"
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        required
        ref={ref}
      />
    </div>
  );
};

export default Input;
