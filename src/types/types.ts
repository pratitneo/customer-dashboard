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
}