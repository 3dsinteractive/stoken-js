# Javascript library for SToken payment on website

## How to use

`

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Webpack template</title>
  </head>
  <body>
    <h1>Test SToken payment</h1>
    <button id="payWithMetamask" onclick="showPayment()">
      Pay with Metamask
    </button>
    <script type="text/javascript" src="public/stoken.js"></script>
    <script type="text/javascript">
      function showPayment() {
        var orderNumber = '12345678'
        var amountUSD = '100'
        var amountWei = `${100 * 10 ** 18}`
        var merchantAddr = '0x42AEfFFBCA547c06e1e23Fe8DED1cC82f7231e3f'

        const { SToken } = window.SToken
        var stoken = new SToken()
        stoken.showPaymentDialog(
          orderNumber,
          amountUSD,
          amountWei,
          merchantAddr,
        )
      }
    </script>

  </body>
</html>
`