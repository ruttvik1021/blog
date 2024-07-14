import { Field } from "formik";
import moment from "moment";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const textAreaMax = 10000;

interface ITextField {
  type: fieldTypeEnums;
  required?: boolean;
  label?: string;
  name: string;
  placeholder: string;
  disabled?: boolean;
  maxLength?: number;
  autoFocus?: boolean;
  className?: string;
  errorMessage?: boolean;
}

export enum fieldTypeEnums {
  TEXT = "text",
  PASSWORD = "password",
  TEXTAREA = "textarea",
  NUMBER = "number",
  MOBILENUMBER = "mobileNumber",
  DATE = "date",
}

const TextField = ({
  type,
  required,
  label,
  name,
  placeholder,
  disabled,
  className,
  maxLength,
  autoFocus,
  errorMessage = true,
}: ITextField) => {
  return (
    <>
      {type === fieldTypeEnums.TEXTAREA && (
        <Field name={name}>
          {({ field }: any) => (
            <div className="my-2">
              {label && <Label htmlFor={type}>{label}</Label>}
              {required && label && (
                <span className="text-red-600 ml-1">*</span>
              )}
              <Textarea
                {...field}
                disabled={disabled}
                maxLength={textAreaMax}
                className={`border border-black ${className}`}
                rows={5}
                autoComplete="false"
                placeholder={placeholder}
              />
              <p className="text-gray-400">{`${
                field.value?.length || 0
              }/${textAreaMax}`}</p>
            </div>
          )}
        </Field>
      )}
      {(type === fieldTypeEnums.TEXT ||
        type === fieldTypeEnums.PASSWORD ||
        type === fieldTypeEnums.NUMBER) && (
        <Field name={name}>
          {({ field, meta }: any) => (
            <div className="my-2">
              {label && <Label htmlFor={type}>{label}</Label>}
              {required && label && (
                <span className="text-red-600 ml-1">*</span>
              )}
              <Input
                type={type}
                {...field}
                disabled={disabled}
                maxLength={maxLength}
                autoFocus={autoFocus}
                className={`border border-black ${className}`}
                autoComplete="false"
                placeholder={placeholder}
              />
              {meta.touched && meta.error && errorMessage && (
                <div className="text-sm text-red-600">{meta.error}</div>
              )}
            </div>
          )}
        </Field>
      )}
      {type === fieldTypeEnums.DATE && (
        <Field name={name}>
          {({ field, meta, form }: any) => (
            <div className="my-2">
              {label && <Label htmlFor={type}>{label}</Label>}
              {required && label && (
                <span className="text-red-600 ml-1">*</span>
              )}
              <Input
                type={fieldTypeEnums.DATE}
                {...field}
                value={moment(field.value, "DD/MM/YYYY").format("YYYY-MM-DD")}
                onChange={(e) => {
                  const input = e.target.value;
                  form.setFieldValue(
                    name,
                    moment(input, "YYYY-MM-DD").format("DD/MM/YYYY")
                  );
                }}
                disabled={disabled}
                maxLength={maxLength}
                autoFocus={autoFocus}
                className={`border border-black ${className}`}
                autoComplete="false"
                placeholder={placeholder}
              />
              {meta.touched && meta.error && errorMessage && (
                <div className="text-sm text-red-600">{meta.error}</div>
              )}
            </div>
          )}
        </Field>
      )}
    </>
  );
};

export default TextField;
