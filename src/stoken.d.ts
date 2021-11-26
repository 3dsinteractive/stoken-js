import { Network } from './consts';
import { ERC20TokenModel } from './models';
import '../css/styles.scss';
export default class SToken {
    private network;
    private merchantAddr;
    constructor(network: Network, merchantAddr: string);
    showPaymentDialog(orderNumber: number, amountUSD: number, amountToken: number): void;
    private showQR;
    private hideQR;
    private getDialogHTML;
    private buildPaymentURL;
    private getRandomId;
    get MPOINT(): ERC20TokenModel;
    get CPOINT(): ERC20TokenModel;
    get SDAI(): ERC20TokenModel;
    get SUSDC(): ERC20TokenModel;
    get SUSDT(): ERC20TokenModel;
    get SBUSD(): ERC20TokenModel;
    get DAI(): ERC20TokenModel;
    get USDC(): ERC20TokenModel;
    get USDT(): ERC20TokenModel;
    get BUSD(): ERC20TokenModel;
    get ChainId(): string;
}
