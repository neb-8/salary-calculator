import { Label } from '@/components/shadcn/label'
import { Input } from '@/components/shadcn/input'

const InputField = ({ inputId, inputType, onInputAction, placeholderText, label, value }) => {
  return (
    <>
      <Label htmlFor={inputId}>{label}</Label>
      <Input value={value} type={inputType} id={inputId} onInput={onInputAction} placeholder={placeholderText} />
    </>
  );
}

export default InputField;