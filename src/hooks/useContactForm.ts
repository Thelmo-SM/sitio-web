'use client'

import { useState } from 'react'
import {
  ContactErrors,
  validateContactForm,
} from '../features/validateContactForm'
import { ContactFormValues } from '@/types/ContactFormTypes'

const initialValues: ContactFormValues = {
  name: '',
  email: '',
  message: '',
}

type FormStatus =
  | null
  | { type: 'success' | 'error'; message: string }

export function useContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<FormStatus>(null)

  const isValid =
    values.name.trim() !== '' &&
    values.email.trim() !== '' &&
    values.message.trim() !== ''

  const clearStatusWithDelay = (delay = 4000) => {
    setTimeout(() => {
      setStatus(null)
    }, delay)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    setValues(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
    setStatus(null)
  }

  const handleSubmit = async () => {
    if (!isValid) return

    const validationErrors = validateContactForm(values)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)

    try {
      console.log('FORM DATA:', values)

      setValues(initialValues)
      setStatus({
        type: 'success',
        message: 'Mensaje enviado correctamente. Te responderemos pronto.',
      })

      clearStatusWithDelay()
    } catch {
      setStatus({
        type: 'error',
        message: 'Ocurrió un error. Intenta nuevamente.',
      })

      clearStatusWithDelay()
    } finally {
      setLoading(false)
    }
  }

  return {
    values,
    errors,
    loading,
    status,
    isValid,
    handleChange,
    handleSubmit,
  }
}
