const formatCurrency = (value) => {
  value = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);

  return value;
};

function formatValue(value) {
  if (!value) return;
  const firstValue = value
    .replace(/R\$ /g, "")
    .replace(/\./g, "")
    .replace(/,/g, ".");
  const finalValue = parseFloat(firstValue);

  return finalValue;
}

export { formatCurrency, formatValue };
