function formatCurrency(value) {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
}

function formatPercentage(value) {
    return `${value.toFixed(2)}%`;
}



module.exports = { formatCurrency, formatPercentage, };
