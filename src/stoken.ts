import Swal from 'sweetalert2'
import QRCode from 'qrcode'
import { BSCTestTokens, BSCTokens, Network } from './consts'
import { ERC20TokenModel } from './models'

import '../css/styles.scss'

export default class SToken {
  private network: Network
  private merchantAddr: string

  constructor(network: Network, merchantAddr: string) {
    this.network = network
    this.merchantAddr = merchantAddr
  }

  showPaymentDialog(orderNumber: string, amountUSD: number): void {
    const paymentFormId = this.getRandomId()
    const qrcodeFormId = this.getRandomId()
    const qrcodeId = this.getRandomId()
    const symbolId = this.getRandomId()
    const paywithBUSDId = this.getRandomId()
    const paywithUSDTId = this.getRandomId()
    const paywithUSDCId = this.getRandomId()
    const paywithDAIId = this.getRandomId()
    const paywithSUSDId = this.getRandomId()
    const paynowButtonId = this.getRandomId()
    const backButtonId = this.getRandomId()

    const html = this.getDialogHTML(
      amountUSD.toFixed(2),
      paymentFormId,
      qrcodeFormId,
      qrcodeId,
      symbolId,
      paywithBUSDId,
      paywithUSDTId,
      paywithUSDCId,
      paywithDAIId,
      paywithSUSDId,
      paynowButtonId,
      backButtonId,
    )

    Swal.fire({
      title: '',
      html: html,
      showCloseButton: false,
      showConfirmButton: false,
      padding: '0px',
      background: 'transparent',
      didOpen: () => {
        document
          .getElementById(paywithBUSDId)
          ?.addEventListener('click', () => {
            this.showQR(
              paymentFormId,
              qrcodeFormId,
              qrcodeId,
              symbolId,
              paynowButtonId,
              this.BUSD.Symbol,
              amountUSD,
              orderNumber,
            )
          })
        document
          .getElementById(paywithUSDTId)
          ?.addEventListener('click', () => {
            this.showQR(
              paymentFormId,
              qrcodeFormId,
              qrcodeId,
              symbolId,
              paynowButtonId,
              this.USDT.Symbol,
              amountUSD,
              orderNumber,
            )
          })
        document
          .getElementById(paywithUSDCId)
          ?.addEventListener('click', () => {
            this.showQR(
              paymentFormId,
              qrcodeFormId,
              qrcodeId,
              symbolId,
              paynowButtonId,
              this.USDC.Symbol,
              amountUSD,
              orderNumber,
            )
          })
        document.getElementById(paywithDAIId)?.addEventListener('click', () => {
          this.showQR(
            paymentFormId,
            qrcodeFormId,
            qrcodeId,
            symbolId,
            paynowButtonId,
            this.DAI.Symbol,
            amountUSD,
            orderNumber,
          )
        })

        document
          .getElementById(paywithSUSDId)
          ?.addEventListener('click', () => {
            this.showQR(
              paymentFormId,
              qrcodeFormId,
              qrcodeId,
              symbolId,
              paynowButtonId,
              this.SUSD.Symbol,
              amountUSD,
              orderNumber,
            )
          })

        document.getElementById(backButtonId)?.addEventListener('click', () => {
          this.hideQR(paymentFormId, qrcodeFormId)
        })
      },
    })
  }

  private showQR(
    paymentFormId: string,
    qrcodeFormId: string,
    qrcodeId: string,
    symbolId: string,
    paynowButtonId: string,
    payFromToken: string, // BUSD,USDT,USDC,DAI,SUSD
    amountUSD: number,
    orderNumber: string,
  ) {
    const mobilePaymentURL = this.buildMobilePaymentURL(
      payFromToken,
      amountUSD,
      orderNumber,
    )
    const desktopPaymentURL = this.buildDesktopPaymentURL(
      payFromToken,
      amountUSD,
      orderNumber,
    )
    const canvas = document.getElementById(qrcodeId)
    QRCode.toCanvas(canvas, mobilePaymentURL, (error) => {
      if (error) {
        // TODO: Clear canvas
      }
    })

    const paynowBtn = document.getElementById(paynowButtonId)
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    if (isMobile) {
      paynowBtn?.setAttribute('href', mobilePaymentURL)
    } else {
      paynowBtn?.setAttribute('href', desktopPaymentURL)
    }

    const symbol = document.getElementById(symbolId)
    if (symbol) {
      symbol.innerHTML = payFromToken
    }
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
    symbolId: string,
    paywithBUSDId: string,
    paywithUSDTId: string,
    paywithUSDCId: string,
    paywithDAIId: string,
    paywithSUSDId: string,
    paynowButtonId: string,
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
              <li><a id="${paywithSUSDId}" href="javascript:void(0)">SUSD</a></li>
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
          <h2>Pay with <span id="${symbolId}"></span></h2>
          <h3>Get cash back in CPOINT after payment has done</h3>
          <h4>Scan to Pay</h4>
          <div class="stoken-payment-qrcode">
            <canvas id="${qrcodeId}"></canvas>
          </div>
        </div>
        <div class="stoken-payment-detail">
          <h1>Or</h1>
          <div class="stoken-payment-button">
            <a id="${paynowButtonId}" href="javascript:void(0)" target="_blank">Pay with Metamask</a>
          </div>
          <h2>Use Metamask to make a payment</h2>
        </div>
        <div class="stoken-payment-submit-close">
          <a id="${backButtonId}" href="javascript:void(0)">Back</a>
        </div>
      </div>
    </div>`
  }

  // buildDesktopPaymentURL will redirect user to s-token payment page
  private buildDesktopPaymentURL(
    fromToken: string,
    amountUSD: number,
    orderNumber: string,
  ): string {
    // https://metamask.app.link/dapp/s-token.net/pay/0x61/0x59c4B1a0B22ccd24C7B919898edE83219C2bC6dB/01234567890/SUSD/5/
    // https://s-token.net/pay/0x61/0x59c4B1a0B22ccd24C7B919898edE83219C2bC6dB/01234567890/SUSD/5/
    return `https://s-token.net/pay/${this.chainId}/${this.merchantAddr}/${orderNumber}/${fromToken}/${amountUSD}/`
  }

  // buildMobilePaymentURL will deeplink user to Metamask browser that show s-token payment page
  private buildMobilePaymentURL(
    fromToken: string,
    amountUSD: number,
    orderNumber: string,
  ): string {
    // https://metamask.app.link/dapp/s-token.net/pay/0x61/0x59c4B1a0B22ccd24C7B919898edE83219C2bC6dB/01234567890/SUSD/5/
    // https://s-token.net/pay/0x61/0x59c4B1a0B22ccd24C7B919898edE83219C2bC6dB/01234567890/SUSD/5/
    return `https://metamask.app.link/dapp/s-token.net/pay/${this.chainId}/${this.merchantAddr}/${orderNumber}/${fromToken}/${amountUSD}/`
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

  get MPOINT(): ERC20TokenModel {
    switch (this.network) {
      case Network.BSC:
        return {
          Symbol: 'MPOINT',
        }
      case Network.BSCTest:
        return {
          Symbol: 'MPOINT',
        }
    }
  }

  get CPOINT(): ERC20TokenModel {
    switch (this.network) {
      case Network.BSC:
        return {
          Symbol: 'CPOINT',
        }
      case Network.BSCTest:
        return {
          Symbol: 'CPOINT',
        }
    }
  }

  get SUSD(): ERC20TokenModel {
    switch (this.network) {
      case Network.BSC:
        return {
          Symbol: 'SUSD',
        }
      case Network.BSCTest:
        return {
          Symbol: 'SUSD',
        }
    }
  }

  get DAI(): ERC20TokenModel {
    switch (this.network) {
      case Network.BSC:
        return {
          Symbol: 'DAI',
        }
      case Network.BSCTest:
        return {
          Symbol: 'DAI',
        }
    }
  }

  get USDC(): ERC20TokenModel {
    switch (this.network) {
      case Network.BSC:
        return {
          Symbol: 'USDC',
        }
      case Network.BSCTest:
        return {
          Symbol: 'USDC',
        }
    }
  }

  get USDT(): ERC20TokenModel {
    switch (this.network) {
      case Network.BSC:
        return {
          Symbol: 'USDT',
        }
      case Network.BSCTest:
        return {
          Symbol: 'USDT',
        }
    }
  }

  get BUSD(): ERC20TokenModel {
    switch (this.network) {
      case Network.BSC:
        return {
          Symbol: 'BUSD',
        }
      case Network.BSCTest:
        return {
          Symbol: 'BUSD',
        }
    }
  }

  get chainId(): string {
    switch (this.network) {
      case Network.BSC:
        return '0x38'
      case Network.BSCTest:
        return '0x61x'
    }
  }
}
