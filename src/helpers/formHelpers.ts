import {InputType} from '../enums/InputType.ts'
import {ComparisonOperator} from '../enums/ComparisonOperator.ts'
import type {FormElementType, FormSectionType, IFormRule, IModifier, QuestionType} from "../types/IForms.ts";
import {FormElementVisibilitySetup} from "../types/IForms.ts";

export const comparisonOperatorConverter = {
    [ComparisonOperator.NotEqual]: '!=',
    [ComparisonOperator.Equal]: '==',
    [ComparisonOperator.GreaterEqual]: '>=',
    [ComparisonOperator.LessEqual]: '<=',
    [ComparisonOperator.LessThan]: '<',
    [ComparisonOperator.GreaterThan]: '>',
}

//@ts-ignore
export const getTitles = (formList: IForm[]) => {
    let titles: { id: string; title: string }[] = []

    for (const element of formList) {
        if (
            element.type.value === InputType.SECTION
        ) {
            if (
                element.items &&
                element.items.length > 0
            ) {

                const subTitles = getTitles(element.items)
                const formTitle = element.title
                titles = titles.concat(
                    subTitles.map((subTitle) => ({
                        title: `${formTitle}: ${subTitle.title}`,
                        id: subTitle.id,
                    }))
                )
            }
        } else {
            titles.push({title: element.title, id: element.id})
        }
    }

    return titles
}

export const castNumber = (node: any): any => {
    node.hook.input((value: string, next: any) => {
        if (value === '' || Number.isNaN(value)) return
        return next(Number(value))
    })
}

export const generateUniqueId = () => {
    const timestamp = Date.now().toString(36)
    const randomString = Math.random().toString(36).substring(2, 10)
    return `${timestamp}_${randomString}`
}

export const getUrl = (file: File | undefined) => {
    if (!file) return
    return URL.createObjectURL(file)
}

export const transformFormPriceModifiers = (priceModifiers: (IFormRule<any> | IModifier)[]) => {
    const modifiers = []
    let lastModifier: any = undefined

    for (let modifier of priceModifiers) {
        if ('comparisonOperator' in modifier) {
            if (!lastModifier) {
                lastModifier = {
                    conditions: [] as any
                }
            }

            if (modifier.targetId) {
                lastModifier.conditions.push({
                    conector: 'AND',
                    isNegation: false,
                    name: modifier.targetId,
                    operator: modifier.comparisonOperator,
                    value: String(modifier.value)
                })
            }
        }

        if ('mathOperator' in modifier) {
            if (!lastModifier) {
                lastModifier = {
                    conditions: []
                }
            }
            if (modifier.field) {
                lastModifier.field = modifier.field
                lastModifier.operator = modifier.mathOperator
                lastModifier.value = String(modifier.value)

                modifiers.push(lastModifier)
            }
            lastModifier = undefined
        }
    }

    return modifiers
}

export const transformFormElements = (formElements: ((FormElementType) | (FormSectionType))[]) => {
    const sections: any[] = []
    let unnamedSection: any = undefined

    for (let element of formElements) {
        if ('items' in element) {
            unnamedSection && sections.push(unnamedSection)
            unnamedSection = undefined

            sections.push({
                title: element.title,
                fields: element.items.map(item => adjustElement(item))
            })

        } else {
            if (!unnamedSection) {
                unnamedSection = {
                    title: '',
                    fields: []
                }
            }

            unnamedSection.fields.push(adjustElement(element))
        }
    }
    unnamedSection && sections.push(unnamedSection)
    return sections
}

const adjustElement = (element: FormElementType) => {
    return {
        label: element.title,
        name: element.id,
        description: element.description,
        ...defineQuestion(element.question),
        conditions: defineConditions(element.visibilityRules),
        validation: defineValidation(element)
    }
}

const defineValidation = (element: FormElementType) => {
    let validation: any = {}

    if (InputType.NUMBER in element.question) {
        if (element.question.number.max) {
            validation.max = Number(element.question.number.max)
        }

        if (element.question.number.min) {
            validation.min = Number(element.question.number.min)
        }

        if (!element.question.number.float) {
            validation.is = element.question.number.float ? 'float' : 'integer'
        }
    }

    validation.required = element.validation?.required
    validation.confirm = element.validation?.confirm

    return validation
}

const defineQuestion = (question: QuestionType): { type: string, options?: any[] } => {
    if (InputType.SELECT in question) {
        return {
            type: question[InputType.SELECT].type,
            options: question[InputType.SELECT].questionChoices.map((value, index) => ({key: String(index), value}))
        }
    } else if (InputType.FILE in question) {
        return {
            type: `file_${question[InputType.FILE].type}`
        }
    } else if (InputType.TEXT in question) {
        return {
            type: question.text.paragraph ? 'textarea' : 'text'
        }
    } else {
        return {
            type: Object.keys(question)[0]
        }
    }
}

const defineConditions = (conditions?: FormElementVisibilitySetup) => {
    if (!conditions) return []
    const connector = conditions.connector
    return conditions.rules.flatMap(rule => (rule.targetId ? {
        conector: connector,
        isNegation: false,
        name: rule.targetId,
        operator: rule.comparisonOperator,
        value: String(rule.value)
    } : []))
}