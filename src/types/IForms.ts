import {InputType} from '@/enums/InputType.ts'
import {ComparisonOperator, MathOperator} from "@/enums/ComparisonOperator.ts";

export type FormType = {
    name: string
    type: string | undefined
    groupLabel?: string
    id?: string
    label?: string
    placeholder?: string
    help?: string
    questionChoices?: []
    inputs?: FormType[]
    validation?: string
    'validation-visibility'?: string
    'validation-messages'?: {}
}

export type IPriceModifier = {
    applicationRules: IFormRule<any>[]
    priceModifier: IModifier
}

export type FormSectionType = {
    id: string,
    title: string,
    description?: string,
    items: FormElementType[]
    color?: string,
}

export type FormElementType = {
    id: string,
    question: QuestionType,
    title?: string,
    placeholder?: string,
    description?: string,
    validation?: FormElementValidation,
    visibilityRules?: FormElementVisibilitySetup,
}

export type QuestionType =
    | { [InputType.SELECT]: SelectQuestion }
    | { [InputType.FILE]: FileQuestion }
    | { [InputType.TEXT]: TextQuestion }
    | { [InputType.NUMBER]: NumberQuestion }
    | { [InputType.EMAIL]: {} }
    | { [InputType.URL]: {} }
    | { [InputType.DATE]: {} }
    | { [InputType.TIME]: {} }

export type SelectQuestion = {
    type: 'checkbox' | 'radio' | 'select',
    questionChoices: string[] | { value: any, label: string }[],
    requireOne?: boolean
}

export type FileQuestion = {
    type: 'document' | 'image'
}

export type TextQuestion = {
    paragraph: boolean
}

type NumberQuestion = {
    min?: string,
    max?: string,
    float?: boolean
}

export type FormElementValidation = {
    required: boolean,
    confirm?: string
}

export type FormElementVisibilitySetup = {
    connector: 'OR' | 'AND', rules: IFormRule<string | number | boolean>[]
}

export type IFormRule<T> = {
    id?: string
    targetId: string,
    comparisonOperator: ComparisonOperator,
    value: T
}

export type IModifier = {
    id?: string
    field: string | null
    mathOperator: MathOperator
    value: string
}