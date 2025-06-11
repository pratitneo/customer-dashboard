import type { HeadingType } from "../../types/types"
import headCss from './heading.module.scss'

const Heading = ({headName}: HeadingType) => {
  return (
    <p className={`${headCss['cust-dash__head']}`}>{headName}</p>
  )
}

export default Heading