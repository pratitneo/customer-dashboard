
import type { QuickCardType } from '../../types/types';
import quickCss from './quickCard.module.scss'

const QuickCard = ({ iconName, head, total }: QuickCardType) => {
    return (
        <div className={`${quickCss['cust-dash__quickCard']}`}>
            <div className={`${quickCss['cust-dash__icon']}`}>{iconName}</div>
            <div className={`${quickCss['cust-dash__info']}`}>
                <p className={`${quickCss['cust-dash__info-head']}`}>{head}</p>
                <p className={`${quickCss['cust-dash__info-num']}`}>{total}</p>
            </div>
        </div>
    )
}

export default QuickCard