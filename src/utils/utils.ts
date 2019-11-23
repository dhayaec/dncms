import { validateOrReject, ValidatorOptions } from "class-validator";

export async function validateOrRejectExample(
  input: Object,
  validatorOptions?: ValidatorOptions | undefined
) {
  try {
    await validateOrReject(input, validatorOptions);
  } catch (errors) {
    console.log(
      "Caught promise rejection (validation failed). Errors: ",
      errors
    );
  }
}
