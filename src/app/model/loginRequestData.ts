export default interface LoginRequestData {
    uEmail: string,
    uPassword: string
}

export default interface AsanLoginRequestData {
  phone : string,
  userId: string
}

export default interface AsanLoginResultData {
  transactionId  : string,
  certificate : string,
  challenge: string,
  verificationCode : string
}

