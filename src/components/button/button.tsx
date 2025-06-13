import type { ButtonType } from "../../types/types";
import buttonCss from "./button.module.scss";

const Button = ({ isLeadingIcon, buttonText, isTrailingIcon, location, color, handleNewCustomer }: ButtonType) => {
    return (
        <div className={`${buttonCss[`cust-dash__button-${location}`]} ${buttonCss[`cust-dash__button--${color}`]}`} onClick={handleNewCustomer}>
            {isLeadingIcon && <span className={`${buttonCss['cust-dash__icon']}`}>{isLeadingIcon}</span>}
            {buttonText && (
                <span className={`${buttonCss[`cust-dash__button-text`]}`}>
                    {buttonText}
                </span>
            )}
            {isTrailingIcon && <span className={`${buttonCss['cust-dash__icon']}`}>{isTrailingIcon}</span>}
        </div>
    );
};

export default Button;
