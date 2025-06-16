import newCustInpCss from './newCustInput.module.scss'
import type { NewCustInpType } from '../../types/types'

const NewCustInput = ({ customcls, label, inputType, nameType, inputPlaceHolder, inputErr, getInputValidation }: NewCustInpType) => {
    return (
        <div className={`${newCustInpCss['cust-dash__inputWrap']} ${newCustInpCss[`cust-dash__${customcls}`]}`}>
            <label htmlFor="" className={`${newCustInpCss['cust-dash__custLabel']}`}>{label}</label>
            <input type={inputType} name={nameType} className={`${newCustInpCss['cust-dash__custInp']}`} placeholder={inputPlaceHolder} autoComplete='off' onChange={getInputValidation} />
            {inputErr ? (<p className={`${newCustInpCss['cust-dash__inpErr']}`}>{inputErr}</p>) : ''}
        </div>
    )
}

export default NewCustInput