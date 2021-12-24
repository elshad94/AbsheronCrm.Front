interface TerminalItem {
    orderId: number,
    orderNo: string,
    date: Date,
    amount: number,
    orderStatus: {
        statusId: number,
        statusText: string
    }
}

export default TerminalItem;