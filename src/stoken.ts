import Swal from 'sweetalert2'
import QRCode from 'qrcode'
import { Network } from './consts'
import { ERC20TokenModel } from './models'
import BN from 'bn.js'

import '../css/styles.scss'

export default class SToken {
  private network: Network
  private merchantAddr: string

  constructor(network: Network, merchantAddr: string) {
    this.network = network
    this.merchantAddr = merchantAddr
  }

  showPaymentDialog(
    orderNumber: number,
    amountUSD: number,
    amountToken: number,
  ): void {
    const paymentFormId = this.getRandomId()
    const qrcodeFormId = this.getRandomId()
    const qrcodeId = this.getRandomId()
    const symbolId = this.getRandomId()
    const paywithBUSDId = this.getRandomId()
    const paywithUSDTId = this.getRandomId()
    const paywithUSDCId = this.getRandomId()
    const paywithDAIId = this.getRandomId()
    const paywithSBUSDId = this.getRandomId()
    const paywithSUSDTId = this.getRandomId()
    const paywithSUSDCId = this.getRandomId()
    const paywithSDAIId = this.getRandomId()
    const paynowButtonId = this.getRandomId()
    const backButtonId = this.getRandomId()
    const weiFactor = new BN('18')
    const amountWei = new BN(amountToken).mul(new BN('10').pow(weiFactor))
    const amountWithOrderWei = amountWei.add(new BN(orderNumber))

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
      paywithSBUSDId,
      paywithSUSDTId,
      paywithSUSDCId,
      paywithSDAIId,
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
              this.BUSD,
              amountWithOrderWei,
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
              this.USDT,
              amountWithOrderWei,
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
              this.USDC,
              amountWithOrderWei,
            )
          })
        document.getElementById(paywithDAIId)?.addEventListener('click', () => {
          this.showQR(
            paymentFormId,
            qrcodeFormId,
            qrcodeId,
            symbolId,
            paynowButtonId,
            this.DAI,
            amountWithOrderWei,
          )
        })

        document
          .getElementById(paywithSBUSDId)
          ?.addEventListener('click', () => {
            this.showQR(
              paymentFormId,
              qrcodeFormId,
              qrcodeId,
              symbolId,
              paynowButtonId,
              this.SBUSD,
              amountWithOrderWei,
            )
          })
        document
          .getElementById(paywithSUSDTId)
          ?.addEventListener('click', () => {
            this.showQR(
              paymentFormId,
              qrcodeFormId,
              qrcodeId,
              symbolId,
              paynowButtonId,
              this.SUSDT,
              amountWithOrderWei,
            )
          })
        document
          .getElementById(paywithSUSDCId)
          ?.addEventListener('click', () => {
            this.showQR(
              paymentFormId,
              qrcodeFormId,
              qrcodeId,
              symbolId,
              paynowButtonId,
              this.SUSDC,
              amountWithOrderWei,
            )
          })
        document
          .getElementById(paywithSDAIId)
          ?.addEventListener('click', () => {
            this.showQR(
              paymentFormId,
              qrcodeFormId,
              qrcodeId,
              symbolId,
              paynowButtonId,
              this.SDAI,
              amountWithOrderWei,
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
    erc20Contract: ERC20TokenModel,
    amountWei: BN,
  ) {
    const paymentURL = this.buildPaymentURL(erc20Contract.Address, amountWei)
    const canvas = document.getElementById(qrcodeId)
    QRCode.toCanvas(canvas, paymentURL, (error) => {
      if (error) {
        // TODO: Clear canvas
      }
    })

    const paynowBtn = document.getElementById(paynowButtonId)
    if (paynowBtn) {
      paynowBtn.setAttribute('href', paymentURL)
    }

    const symbol = document.getElementById(symbolId)
    if (symbol) {
      symbol.innerHTML = erc20Contract.Symbol
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
    paywithSBUSDId: string,
    paywithSUSDTId: string,
    paywithSUSDCId: string,
    paywithSDAIId: string,
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
            <a id="${paynowButtonId}" href="javascript:void(0)" target="_blank">Open Metamask</a>
          </div>
          <h2>Click to open Metamask</h2>
        </div>
        <div class="stoken-payment-submit-close">
          <a id="${backButtonId}" href="javascript:void(0)">Back</a>
        </div>
      </div>
    </div>`
  }

  private buildPaymentURL(erc20ContractAddr: string, amountWei: BN): string {
    const paymentURL =
      'https://metamask.app.link/send/' +
      erc20ContractAddr +
      '@' +
      this.ChainId +
      '/transfer?address=' +
      this.merchantAddr +
      '&uint256=' +
      amountWei.toString()
    return paymentURL
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
          Address: '',
          Symbol: 'MPOINT',
        }
      case Network.BSCTest:
        return {
          Address: '0x794729b785d83b91f3f7fda06cf216ce609b0d4f',
          Symbol: 'MPOINT',
        }
    }
  }

  get CPOINT(): ERC20TokenModel {
    switch (this.network) {
      case Network.BSC:
        return {
          Address: '',
          Symbol: 'CPOINT',
        }
      case Network.BSCTest:
        return {
          Address: '0x380d840af588d279a0460fd695c4a2c8378e5d2d',
          Symbol: 'CPOINT',
        }
    }
  }

  get SDAI(): ERC20TokenModel {
    switch (this.network) {
      case Network.BSC:
        return {
          Address: '',
          Symbol: 'SUSDT',
        }
      case Network.BSCTest:
        return {
          Address: '0xe7b4ce0792fb8c959f966331d8d11d3ed448cc5b',
          Symbol: 'SUSDT',
        }
    }
  }

  get SUSDC(): ERC20TokenModel {
    switch (this.network) {
      case Network.BSC:
        return {
          Address: '',
          Symbol: 'SUSDC',
        }
      case Network.BSCTest:
        return {
          Address: '0xe7b4ce0792fb8c959f966331d8d11d3ed448cc5b',
          Symbol: 'SUSDC',
        }
    }
  }

  get SUSDT(): ERC20TokenModel {
    switch (this.network) {
      case Network.BSC:
        return {
          Address: '',
          Symbol: 'SUSDT',
        }
      case Network.BSCTest:
        return {
          Address: '0xe7b4ce0792fb8c959f966331d8d11d3ed448cc5b',
          Symbol: 'SUSDT',
        }
    }
  }

  get SBUSD(): ERC20TokenModel {
    switch (this.network) {
      case Network.BSC:
        return {
          Address: '',
          Symbol: 'SBUSD',
        }
      case Network.BSCTest:
        return {
          Address: '0xe7b4ce0792fb8c959f966331d8d11d3ed448cc5b',
          Symbol: 'SBUSD',
        }
    }
  }

  get DAI(): ERC20TokenModel {
    switch (this.network) {
      case Network.BSC:
        return {
          Address: '',
          Symbol: 'DAI',
        }
      case Network.BSCTest:
        return {
          Address: '0xd9cb59029d2e17d7867ad0ccbd4798fe023bac21',
          Symbol: 'DAI',
        }
    }
  }

  get USDC(): ERC20TokenModel {
    switch (this.network) {
      case Network.BSC:
        return {
          Address: '',
          Symbol: 'USDC',
        }
      case Network.BSCTest:
        return {
          Address: '0xd9cb59029d2e17d7867ad0ccbd4798fe023bac21',
          Symbol: 'USDC',
        }
    }
  }

  get USDT(): ERC20TokenModel {
    switch (this.network) {
      case Network.BSC:
        return {
          Address: '',
          Symbol: 'USDT',
        }
      case Network.BSCTest:
        return {
          Address: '0xd9cb59029d2e17d7867ad0ccbd4798fe023bac21',
          Symbol: 'USDT',
        }
    }
  }

  get BUSD(): ERC20TokenModel {
    switch (this.network) {
      case Network.BSC:
        return {
          Address: '',
          Symbol: 'BUSD',
        }
      case Network.BSCTest:
        return {
          Address: '0xd9cb59029d2e17d7867ad0ccbd4798fe023bac21',
          Symbol: 'BUSD',
        }
    }
  }

  get ChainId(): string {
    switch (this.network) {
      case Network.BSC:
        return '56'
      case Network.BSCTest:
        return '97'
    }
  }
}
