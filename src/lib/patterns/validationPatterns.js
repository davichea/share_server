export const interestRatePattern = /^[0-9]{1,3}(\.[0-9]{0,2})?$/;
export const emptyValues = [
    'nan--',
    'na',
    'NA',
    'N/A',
    'N/a',
    'n/a',
    null,
    '',
    ' ',
    0,
    undefined,
    '9999-12-31'
]
export const emptyDate = [
    null,
    '',
    '9999-12-31'
]
export const isEmpty = (value) => {
    const stringValue = value?.toString().replace(/\s+/g, '').toLowerCase();
    return emptyValues.includes(stringValue);
};

export const isEmptyDate = (value) => {
    return emptyDate.includes(value) ? '-' : value;
};

export const isEmptyRow = (value) => {
    return emptyValues.includes(value) ? '-' : value;
};