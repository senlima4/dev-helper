import * as React from "react"
import { useForm, RegisterOptions } from "react-hook-form"
import {
  Flex,
  Input,
  Select,
  Textarea,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react"

type FieldOption = {
  name: string
  label: string
  options?: RegisterOptions
  component:
    | {
        type: "text"
      }
    | {
        type: "textarea"
        rows?: number
      }
    | {
        type: "select"
        options: { name: string; value: string }[]
      }
  isDisabled?: boolean
  isReadonly?: boolean
}

type FormProps = {
  fields: FieldOption[]
  submitBtnText?: string
  resetAfterSubmit?: boolean
  onSubmit: (data: any) => void
}

// For facing usual form data structure only
// If data is more complicate. For maintain cost, build another one
const Form: React.FC<FormProps> = ({
  fields,
  submitBtnText = "Submit",
  resetAfterSubmit = false,
  onSubmit,
}) => {
  const {
    reset,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm()

  const handleFormSubmit = React.useCallback(
    async (formData: any) => {
      await onSubmit(formData)
      if (resetAfterSubmit) reset()
    },
    [onSubmit]
  )

  return (
    <Flex as="form" flexDir="column" onSubmit={handleSubmit(handleFormSubmit)}>
      {fields.map(
        ({
          name,
          label,
          options,
          component,
          isReadonly = false,
          isDisabled = false,
        }) => {
          return (
            <FormControl key={name} mb={2} isInvalid={Boolean(errors[name])}>
              <FormLabel htmlFor={name}>{label}</FormLabel>

              {component.type === "text" && (
                <Input
                  id={name}
                  size="sm"
                  disabled={isDisabled}
                  readOnly={isReadonly}
                  {...register(name, options)}
                />
              )}

              {component.type === "textarea" && (
                <Textarea
                  id={name}
                  size="sm"
                  rows={component.rows ?? 3}
                  disabled={isDisabled}
                  readOnly={isReadonly}
                  {...register(name, options)}
                />
              )}

              {component.type === "select" && (
                <Select
                  id={name}
                  size="sm"
                  disabled={isDisabled}
                  {...register(name, options)}>
                  {component.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </Select>
              )}
            </FormControl>
          )
        }
      )}

      <Button size="sm" type="submit" isLoading={isSubmitting}>
        {submitBtnText}
      </Button>
    </Flex>
  )
}

export default React.memo(Form)
