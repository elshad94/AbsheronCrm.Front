interface TerminalItem {
    orderId: number,
    orderNo: string,
    date: Date,
    amount: number,
    orderStatus: {
        statusId: number,
        statusText: string
    },
    paymentMethod: string,
    paymentStatus: string
}

export default TerminalItem;
