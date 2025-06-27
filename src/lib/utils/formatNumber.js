export const formatNumber = (value) => {
    if (value == null || value === '' || value == 0) return '-'; 
    return Number(value).toLocaleString();
};


// export const formatCompactNumber = (num) => {
//     if (num >= 1000000) {
//         return (num / 1000000).toFixed(1) + 'M';
//     } else if (num >= 1000) {
//         return (num / 1000).toFixed(1) + 'K';
//     } else {
//         return num.toString();
//     }
export const formatCompactNumber = (number) => {
    const formatter = Intl.NumberFormat("en", { notation: "compact" });
    return formatter.format(number || 0);
}