import Swal from 'sweetalert2'
import QRCode from 'qrcode'
import '../css/styles.scss'

export default class SToken {
  showPaymentDialog(
    orderNumber: string,
    amountUSD: string,
    amountWei: string,
    merchantAddr: string,
  ): void {
    // TESTNET
    // 	BUSD "0xd9cb59029d2e17d7867ad0ccbd4798fe023bac21"
    // 	CPOINT "0x380d840af588d279a0460fd695c4a2c8378e5d2d"
    // 	MPOINT "0x794729b785d83b91f3f7fda06cf216ce609b0d4f"
    // 	SBUSD "0xe7b4ce0792fb8c959f966331d8d11d3ed448cc5b"
    const contractAddr = '0xd9cb59029d2e17d7867ad0ccbd4798fe023bac21'
    // const sbusdAddress = '0xe7b4ce0792fb8c959f966331d8d11d3ed448cc5b'
    const chainId = '97'
    const paymentFormId = this.getRandomId()
    const qrcodeFormId = this.getRandomId()
    const qrcodeId = this.getRandomId()
    const paywithBUSDId = this.getRandomId()
    const paywithUSDTId = this.getRandomId()
    const paywithUSDCId = this.getRandomId()
    const paywithDAIId = this.getRandomId()
    const paywithSBUSDId = this.getRandomId()
    const paywithSUSDTId = this.getRandomId()
    const paywithSUSDCId = this.getRandomId()
    const paywithSDAIId = this.getRandomId()
    const backButtonId = this.getRandomId()
    const html = this.getDialogHTML(
      amountUSD,
      paymentFormId,
      qrcodeFormId,
      qrcodeId,
      paywithBUSDId,
      paywithUSDTId,
      paywithUSDCId,
      paywithDAIId,
      paywithSBUSDId,
      paywithSUSDTId,
      paywithSUSDCId,
      paywithSDAIId,
      backButtonId,
    )
    const paymentDeeplink =
      'https://metamask.app.link/send/' +
      contractAddr +
      '@' +
      chainId +
      '/transfer?address=' +
      merchantAddr +
      '&uint256=' +
      amountWei.toString()

    Swal.fire({
      title: '',
      html: html,
      showCloseButton: false,
      showConfirmButton: false,
      padding: '0px',
      background: 'transparent',
      didOpen: () => {
        const canvas = document.getElementById(qrcodeId)
        QRCode.toCanvas(canvas, paymentDeeplink, (error) => {
          if (error) console.error(error)
        })
        document
          .getElementById(paywithBUSDId)
          ?.addEventListener('click', () => {
            this.showQR(paymentFormId, qrcodeFormId)
          })
        document
          .getElementById(paywithUSDTId)
          ?.addEventListener('click', () => {
            this.showQR(paymentFormId, qrcodeFormId)
          })
        document
          .getElementById(paywithUSDCId)
          ?.addEventListener('click', () => {
            this.showQR(paymentFormId, qrcodeFormId)
          })
        document.getElementById(paywithDAIId)?.addEventListener('click', () => {
          this.showQR(paymentFormId, qrcodeFormId)
        })

        document
          .getElementById(paywithSBUSDId)
          ?.addEventListener('click', () => {
            this.showQR(paymentFormId, qrcodeFormId)
          })
        document
          .getElementById(paywithSUSDTId)
          ?.addEventListener('click', () => {
            this.showQR(paymentFormId, qrcodeFormId)
          })
        document
          .getElementById(paywithSUSDCId)
          ?.addEventListener('click', () => {
            this.showQR(paymentFormId, qrcodeFormId)
          })
        document
          .getElementById(paywithSDAIId)
          ?.addEventListener('click', () => {
            this.showQR(paymentFormId, qrcodeFormId)
          })

        document.getElementById(backButtonId)?.addEventListener('click', () => {
          this.hideQR(paymentFormId, qrcodeFormId)
        })
      },
    })
  }

  private showQR(paymentFormId: string, qrcodeFormId: string) {
    const paymentForm = document.getElementById(paymentFormId)
    const qrcodeForm = document.getElementById(qrcodeFormId)
    if (paymentForm) {
      paymentForm.style.display = 'none'
    }
    if (qrcodeForm) {
      qrcodeForm.style.display = 'flex'
    }
  }

  private hideQR(paymentFormId: string, qrcodeFormId: string) {
    const paymentForm = document.getElementById(paymentFormId)
    const qrcodeForm = document.getElementById(qrcodeFormId)
    if (paymentForm) {
      paymentForm.style.display = 'flex'
    }
    if (qrcodeForm) {
      qrcodeForm.style.display = 'none'
    }
  }

  private getDialogHTML(
    amountUSD: string,
    paymentFormId: string,
    qrcodeFormId: string,
    qrcodeId: string,
    paywithBUSDId: string,
    paywithUSDTId: string,
    paywithUSDCId: string,
    paywithDAIId: string,
    paywithSBUSDId: string,
    paywithSUSDTId: string,
    paywithSUSDCId: string,
    paywithSDAIId: string,
    backButtonId: string,
  ): string {
    return `<div class="stoken-payment-wrapper">
      <div id="${paymentFormId}" class="stoken-payment-form">
        <div class="stoken-payment-price">
          <h1>${amountUSD} $</h1>
          <h2>Total Price</h2>
        </div>
        <div class="stoken-payment-methods">
          <h2>Choose Currency</h2>
          <h3>Choose the digital currency to pay with</h3>
          <div class="stoken-payment-native">
            <ul>
              <li><a id="${paywithBUSDId}" href="javascript:void(0)">BUSD</a></li>
              <li><a id="${paywithUSDTId}" href="javascript:void(0)">USDT</a></li>
              <li><a id="${paywithUSDCId}" href="javascript:void(0)">USDC</a></li>
              <li><a id="${paywithDAIId}" href="javascript:void(0)">DAI</a></li>
              <li>
                <span>Super charge your stable coin to get cash back for every payment</span>
                <a href="javascript:void(0)">Get S Token</a>
              </li>
            </ul>
          </div>
          <div class="stoken-payment-super">
            <ul>
              <li><a id="${paywithSBUSDId}" href="javascript:void(0)">SBUSD</a></li>
              <li><a id="${paywithSUSDTId}" href="javascript:void(0)">SUSDT</a></li>
              <li><a id="${paywithSUSDCId}" href="javascript:void(0)">SUSDC</a></li>
              <li><a id="${paywithSDAIId}" href="javascript:void(0)">SDAI</a></li>
              <li>
                <span>Get cash back in CPOINT, if spend in S Token</span>
                <a href="javascript:void(0)">What is CPOINT?</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="stoken-payment-footer">
        </div>
      </div>
      <div id="${qrcodeFormId}" class="stoken-payment-submit">
        <div class="stoken-payment-price">
          <h1>${amountUSD} $</h1>
          <h2>Total Price</h2>
        </div>
        <div class="stoken-payment-qrcode-container">
          <h2>Pay with <span>SUSDT</span></h2>
          <h3>Get cash back in CPOINT after payment has done</h3>
          <h4>Scan to Pay</h4>
          <div class="stoken-payment-qrcode">
            <canvas id="${qrcodeId}"></canvas>
          </div>
        </div>
        <div class="stoken-payment-detail">
          <h1>Or</h1>
          <div class="stoken-payment-button">
            <a id="stoken-paynow" href="javascript:void(0)">Open Metamask</a>
          </div>
          <h2>Click to open Metamask</h2>
        </div>
        <div class="stoken-payment-submit-close">
          <a id="${backButtonId}" href="javascript:void(0)">Back</a>
        </div>
      </div>
    </div>`
  }

  private getRandomId() {
    let result = ''
    const length = 10
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }
}
