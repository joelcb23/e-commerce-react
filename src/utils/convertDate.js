// Función para convertir la fecha en formato yyyy-mm-dd a ISO 8601 (que es el formato aceptado por Prisma)
export const convertDateToISO = (dateString) => {
  // Formato yyyy-mm-dd === example: 2022-01-01
  const [year, month, day] = dateString.split("-");
  return new Date(`${year}-${month}-${day}T00:00:00.000Z`); // Fecha en formato ISO con hora a medianoche (UTC)
};
