// features/contact/contact.validation.ts

import { ContactFormValues } from "@/types/ContactFormTypes"

export type ContactErrors = Partial<Record<keyof ContactFormValues, string>>

export function validateContactForm(
  values: ContactFormValues
): ContactErrors {
  const errors: ContactErrors = {}

  if (!values.name.trim()) {
    errors.name = 'El nombre es obligatorio'
  }

  if (!values.email.trim()) {
    errors.email = 'El correo es obligatorio'
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = 'Correo inválido'
  }

  if (!values.message.trim()) {
    errors.message = 'El mensaje es obligatorio'
  } else if (values.message.length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres'
  }

  return errors
}
