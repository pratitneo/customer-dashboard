import { useState } from 'react'
import NewCustInput from '../newCustInput/newCustInput'
import newCustCss from './newCustomer.module.scss'
import Button from '../button/button'
import { MdAddCircleOutline } from 'react-icons/md'
import type { ErrorsType, FormDataType, NewCustomerType } from '../../types/types'

const NewCustomer = ({ sendNewCustomer }: NewCustomerType) => {
    // 1. setup state for form fields
    const [formData, setFormData] = useState<FormDataType>({ name: '', country: '', mobile: '', email: '', company: '', status: true })
    // 2. state for errors
    const [errors, setErrors] = useState<ErrorsType>({ name: '', country: '', mobile: '', email: '', company: '' })

    // 3. get input name & value
    const handleInputValue = (inputEvent: any) => {
        const { name, value } = inputEvent.target
        setFormData((prevData: typeof formData): typeof formData => ({ ...prevData, [name]: value }))
    }
    // 4, validation fn
    const validateInput = () => {
        const newErrors = { name: '', country: '', mobile: '', email: '', company: '' }
        if (!formData.name) {
            newErrors.name = 'full name is required'
        }
        if (!formData.country) {
            newErrors.country = 'country is required'
        }
        if (!formData.mobile) {
            newErrors.mobile = 'contact number is required'
        }
        else if (formData.mobile.length === 10) {
            newErrors.mobile = 'contact number should be 10 digits'
        }
        if (!formData.email) {
            newErrors.email = 'email is required'
        }
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'email is not valid'
        }
        if (!formData.company) {
            newErrors.company = 'company name is required'
        }
        return newErrors
    }
    // 5. handle on add
    const sendErrors = (errorsEvent: any) => {
        errorsEvent.preventDefault()
        const validationErrors = validateInput()
        if (Object.values(validationErrors).some(Boolean)) {
            setErrors(validationErrors)
        }
        else {
            console.log(formData, 'formData')
            setErrors({ name: '', country: '', mobile: '', email: '', company: '' });
            sendNewCustomer(formData)

        }

    }

    return (
        <div className={`${newCustCss['cust-dash__modal']}`} onClick={e => e.stopPropagation()}>
            <p className={`${newCustCss['cust-dash__newCustHead']}`}>add a new customer</p>
            <NewCustInput label='full name' inputType='text' nameType='name' inputPlaceHolder='eg: rahul sharma' getInputValidation={handleInputValue} inputErr={errors?.name} />
            <NewCustInput label='country' inputType='text' nameType='country' inputPlaceHolder='eg: india' getInputValidation={handleInputValue} inputErr={errors?.country} />
            <NewCustInput label='contact number' inputType='number' nameType='mobile' inputPlaceHolder='eg: 9827483833' getInputValidation={handleInputValue} inputErr={errors?.mobile} />
            <NewCustInput label='email' inputType='text' nameType='email' inputPlaceHolder='eg: rahulsharma@gmail.com' getInputValidation={handleInputValue} inputErr={errors?.email} />
            <NewCustInput label='company name' inputType='text' nameType='company' inputPlaceHolder='eg: reliance' getInputValidation={handleInputValue} inputErr={errors?.company} />
            <Button isTrailingIcon={<MdAddCircleOutline />} buttonText='add' location='modal' color='blue' handleNewCustomer={sendErrors} />
        </div>
    )
}

export default NewCustomer