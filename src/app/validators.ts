import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { validate_cpf, validate_cnpj } from "js-brasil/dist/src/validate";

export function createPasswordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if (!value) {
            return null;
        }

        const hasUpperCase = /[A-Z]+/.test(value);

        const hasLowerCase = /[a-z]+/.test(value);

        const hasNumeric = /[0-9]+/.test(value);

        const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

        return !passwordValid ? {passwordStrength:true}: null;
    }
}

export function createDateRangeValidator(): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {

        const start:Date = form.get("startAt")?.value;

        const end:Date = form.get("endAt")?.value;

        if (start && end) {
            const isRangeValid = (end.getTime() - start.getTime() > 0);

            return isRangeValid ? null : {dateRange:true};
        }

        return null;
    }
}

export function createCPFValidator() : ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if (!value) {
            return null;
        }

        const isCpf = validate_cpf(value);
        return isCpf ? null : {cpfValidator: true}
    }
}

export function createCNPJValidator() : ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if (!value) {
            return null;
        }

        const isCNPJ = validate_cnpj(value);
        return isCNPJ ? null : {cnpjValidator: true}
    }
}