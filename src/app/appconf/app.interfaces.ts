export interface LocalUser {
    bankAccountName: string,
    bankName: string,

    city: string,
    cmpanyLastName: string,
    companyFirstName: string,
    companyMobileNumber:string | number,
    companyName:string
    email: string,
    familyName: string,
    files: any,
    firstName: string,
    ibanNumber: null|number,
    lang: string | number,
    lat: string | number,
    logo: string | null,
    name: string,
    numberOfRoutes: number,
    numberOfTickets: number,
    phoneNumber: number | string,
    roles:any,
    sessid: string,
    session_name: string,
    token: string,
    uid: number

}