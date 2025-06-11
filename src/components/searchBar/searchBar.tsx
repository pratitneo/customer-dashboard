import searchCss from './searchBar.module.scss'
import type { SearchBarType } from '../../types/types'
import { CiSearch } from 'react-icons/ci'

const Searchbar = ({ inputType, inputname, inputPlaceHolder, searchFn }: SearchBarType) => {
  return (
    <div className={`${searchCss['cust-dash__search']}`}>
      <input
        type={inputType}
        name={inputname}
        placeholder={inputPlaceHolder}
        className={`${searchCss['cust-dash__search-input']}`}
        onChange={(e) => searchFn(e.currentTarget.value)}
      />
      <CiSearch className={`${searchCss['cust-dash__search-icon']}`} />
    </div>
  )
}

export default Searchbar