export type SearchBarType = {
    inputType?: string
    inputname?: string
    inputPlaceHolder?: string
    searchFn: (value: string) => void
}
export type HeadingType = {
    headName: string
}
export type ButtonType = {
    isLeadingIcon?: any
    buttonText?: string
    isTrailingIcon?: any
    location: string
    color: string
    handleNewCustomer: (event: any) => void
}
export type QuickCardType = {
    iconName: any
    head: string
    total: string | number | undefined
}
export type User = {
    name: string;
    country: string;
    mobile: string;
    email: string;
    status: 'Active' | 'Inactive'; // restrict to specific strings
    company: string;
    avatar: string
}
export type CustomersDataType = {
    totalCustomers: string | number | undefined;
    activeCustomers: string | number | undefined;
    inactiveCustomers: string | number | undefined;
    contactsLogIn: string | number | undefined;
    customers: User[];
}
export type CustomerCardType = {
    customersData: CustomersDataType | null
    updateStatus: (name: any, index: number) => void
    getDeleteFn: (customer: FormDataType, index: number) => void
}
export type ThemeType = {
    theme: 'light' | 'dark'
}
export type ThemeContextType = {
    theme: ThemeType,
    toggleTheme: () => void
}
export type OverlayType = {
    getModalCloseFn: () => void
    children?: React.ReactNode
}
export type NewCustInpType = {
    customcls?: string
    label?: string
    inputType?: string
    nameType?: string
    inputPlaceHolder?: string
    inputErr?: string
    getInputValidation?: (inputEvent: any) => void
}
export type FileSelectType = {
    customcls?: string
    label?: string
    nameType?: string
    inputErr?: string
    getInputValidation?: (selectEvent: any) => void
}
export type ErrorsType = {
    name: string
    country: string
    mobile: string
    email: string
    company: string
    avatar?: string
}
export type FormDataType = {
    name: string
    country: string
    mobile: string
    email: string
    company: string
    status: boolean
    avatar?: string
}
export type NewCustomerType = {
    sendNewCustomer: (customer: ErrorsType) => void
} 
