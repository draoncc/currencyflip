const cors = `http://localhost:8080/`

export function currencyoverview () {
  return `${cors || ''}https://poe.ninja/api/data/currencyoverview?league=Delve&type=Currency`
}
