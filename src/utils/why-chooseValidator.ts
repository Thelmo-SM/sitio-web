// src/features/admin/utils/why-choose.validator.ts
import { WhyChooseUs } from "@/types/content";

export type SingleBenefitError = Partial<Record<keyof WhyChooseUs, string>>;

export interface BenefitErrors {
  [benefitId: string]: SingleBenefitError;
}

export const validateBenefits = (benefits: WhyChooseUs[]) => {
  const allErrors: BenefitErrors = {};

  benefits.forEach((item) => {
    const itemErrors: SingleBenefitError = {};

    if (!item.title?.trim()) itemErrors.title = "El título es obligatorio";
    if (!item.description?.trim()) itemErrors.description = "La descripción es necesaria";
    if (!item.icon?.trim()) itemErrors.icon = "Falta el icono";

    if (Object.keys(itemErrors).length > 0 && item.id) {
      allErrors[item.id] = itemErrors;
    }
  });

  return {
    errors: allErrors,
    isValid: Object.keys(allErrors).length === 0,
  };
};