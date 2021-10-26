# Javascript library for SToken payment on website

## How to use

```javascript
function showPayment() {
  var orderNumber = '12345678'
  var amountUSD = '100'
  var amountWei = `${100 * 10 ** 18}`
  var merchantAddr = '0x42AEfFFBCA547c06e1e23Fe8DED1cC82f7231e3f'

  const { SToken } = window.SToken
  var stoken = new SToken()
  stoken.showPaymentDialog(orderNumber, amountUSD, amountWei, merchantAddr)
}
```
