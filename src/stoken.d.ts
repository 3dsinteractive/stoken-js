import { Network } from './consts';
import { ERC20TokenModel } from './models';
import '../css/styles.scss';
export default class SToken {
    private network;
    private merchantAddr;
    constructor(network: Network, merchantAddr: string);
    showPaymentDialog(orderNumber: string, amountUSD: number): void;
    private showQR;
    private hideQR;
    private getDialogHTML;
    private buildDesktopPaymentURL;
    private buildMobilePaymentURL;
    private getRandomId;
    get MPOINT(): ERC20TokenModel;
    get CPOINT(): ERC20TokenModel;
    get SUSD(): ERC20TokenModel;
    get DAI(): ERC20TokenModel;
    get USDC(): ERC20TokenModel;
    get USDT(): ERC20TokenModel;
    get BUSD(): ERC20TokenModel;
    get chainId(): string;
}
