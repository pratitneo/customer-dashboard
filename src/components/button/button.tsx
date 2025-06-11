import type { ButtonType } from "../../types/types";
import buttonCss from "./button.module.scss";

const Button = ({ isLeadingIcon, buttonText, isTrailingIcon, location, color }: ButtonType) => {
    return (
        <div className={`${buttonCss[`cust-dash__button-${location}`]} ${buttonCss[`cust-dash__button--${color}`]}`}>
            {isLeadingIcon && <span className={`${buttonCss['cust-dash__icon']}`}>{isLeadingIcon}</span>}
            {buttonText && (
                <span className={`${buttonCss[`cust-dash__button-text`]}`}>
                    {buttonText}
                </span>
            )}
            {isTrailingIcon && <span>{isTrailingIcon}</span>}
        </div>
    );
};

export default Button;
