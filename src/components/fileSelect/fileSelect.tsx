import fileSelectCss from './fileSelect.module.scss'
import type { FileSelectType } from '../../types/types'

const FileSelect = ({ customcls, label, nameType, inputErr, getInputValidation }: FileSelectType) => {
    return (
        <div className={`${fileSelectCss['cust-dash__inputWrap']} ${fileSelectCss[`cust-dash__${customcls}`]}`}>
            <label htmlFor="" className={`${fileSelectCss['cust-dash__custLabel']}`}>{label}</label>
            <input type='file' name={nameType} className={`${fileSelectCss['cust-dash__custInp']}`} autoComplete='off' onChange={getInputValidation} />
            {inputErr ? (<p className={`${fileSelectCss['cust-dash__inpErr']}`}>{inputErr}</p>) : ''}
        </div>
    )
}

export default FileSelect