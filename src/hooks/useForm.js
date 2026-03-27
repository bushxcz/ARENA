import { useState } from 'react'

function useForm(initialValues, validate, onSubmit) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length) {
      return false
    }

    await onSubmit(values)
    return true
  }

  return { values, errors, handleChange, handleSubmit, setValues }
}

export default useForm
