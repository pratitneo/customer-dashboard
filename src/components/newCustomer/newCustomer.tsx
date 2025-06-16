import { useState } from 'react'
import NewCustInput from '../newCustInput/newCustInput'
import newCustCss from './newCustomer.module.scss'
import Button from '../button/button'
import { MdAddCircleOutline } from 'react-icons/md'
import type { ErrorsType, FormDataType, NewCustomerType } from '../../types/types'
import FileSelect from '../fileSelect/fileSelect'

const NewCustomer = ({ sendNewCustomer }: NewCustomerType) => {
    const [_profileImgUrl, setProfileImgUrl] = useState('')
    // 1. setup state for form fields
    const [formData, setFormData] = useState<FormDataType>({ name: '', country: '', mobile: '', email: '', company: '', status: true, avatar: '' })
    // 2. state for errors
    const [errors, setErrors] = useState<ErrorsType>({ name: '', country: '', mobile: '', email: '', company: '', avatar: '' })

    // 3. get input name & value
    const handleInputValue = (inputEvent: any) => {
        const { name, value, type, files } = inputEvent.target;
        if (type === 'file') {
            const file = files && files[0];
            if (file) {
                const url = URL.createObjectURL(file);
                setProfileImgUrl(url);
                setFormData((prevData: typeof formData): typeof formData => ({
                    ...prevData,
                    [name]: url
                }));
            }
        } else {
            setFormData((prevData: typeof formData): typeof formData => ({
                ...prevData,
                [name]: value
            }));
        }
    }
    // 4, validation fn
    const validateInput = () => {
        const newErrors = { name: '', country: '', mobile: '', email: '', company: '', avatar: '' }
        if (!formData.name) {
            newErrors.name = 'full name is required'
        }
        if (!formData.country) {
            newErrors.country = 'country is required'
        }
        if (!formData.mobile) {
            newErrors.mobile = 'contact number is required'
        }
        else if (formData?.mobile?.length < 10) {
            newErrors.mobile = 'number should be atleast 10 digits'
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
        if (!formData.avatar) {
            newErrors.avatar = 'please select a photo'
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
            <NewCustInput label='email' inputType='email' nameType='email' inputPlaceHolder='eg: rahulsharma@gmail.com' getInputValidation={handleInputValue} inputErr={errors?.email} />
            <NewCustInput label='company name' inputType='text' nameType='company' inputPlaceHolder='eg: reliance' getInputValidation={handleInputValue} inputErr={errors?.company} />
            <FileSelect label='select a photo for your profile card' nameType='avatar' customcls='file-select' getInputValidation={handleInputValue} inputErr={errors?.avatar} />
            <Button isTrailingIcon={<MdAddCircleOutline />} buttonText='add' location='modal' color='blue' handleNewCustomer={sendErrors} />
        </div>
    )
}

export default NewCustomer