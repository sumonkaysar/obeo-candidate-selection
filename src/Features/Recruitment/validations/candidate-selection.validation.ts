import z from "zod";

export const candidateSelectionZodSchema = z.object({
  candidate: z
    .string("Candidate must be a string")
    .nonempty("Candidate can't be blank"),
  employeeId: z
    .string("Employee ID must be a string")
    .nonempty("Employee ID can't be blank"),
  selectionTerms: z
    .string("Selection terms must be a string")
    .nonempty("Selection terms can't be blank"),
});

export const candidateSelectionUpdateZodSchema = z.object({
  employeeId: z
    .string("Employee ID must be a string")
    .nonempty("Employee ID can't be blank")
    .optional(),
  selectionTerms: z
    .string("Selection terms must be a string")
    .nonempty("Selection terms can't be blank")
    .optional(),
});
