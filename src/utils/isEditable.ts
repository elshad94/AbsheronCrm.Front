function isEditable(orderStatus?: number): boolean {
  return orderStatus === undefined || orderStatus === 4;
}

export default isEditable;
