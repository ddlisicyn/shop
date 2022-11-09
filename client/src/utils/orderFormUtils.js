function formatSurnameAndName(value) {
    return value.replace(/\d+/g, '');
}

function formatPhoneNumber(value) {
    if (!value) return value;
    
    const phoneNumber = value.replace(/[^\d]/g, '');
    
    const phoneNumberLength = phoneNumber.length;
    
    if (phoneNumberLength <= 3) return `(${phoneNumber})`;

    if (phoneNumberLength <= 6) {
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
        3,
        6
    )}-${phoneNumber.slice(6, 10)}`;
}

export { formatPhoneNumber, formatSurnameAndName };