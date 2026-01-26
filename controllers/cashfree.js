import got from "got";
import Decimal from "decimal.js-light";
import { customAlphabet } from "nanoid";
const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const nanoid_10 = customAlphabet(alphabet, 10);

class CashFreeController {
	constructor() {
		this.got = got.extend({
			prefixUrl: process.env.CASHFREE_URL,
			headers: {
				accept: "application/json",
				"content-type": "application/json",
				"x-api-version": "2023-08-01",
				"x-client-id": process.env.CASHFREE_API_KEY,
				"x-client-secret": process.env.CASHFREE_SECRET_KEY,
			},
		});
		this.notify_url = process.env.CASHFREE_NOTIFY_URL;
	}
	async createOrder({ user_id, user_email, mobile_no, plan_id, amount }) {
		try {
			amount = new Decimal(amount);
			const dataString = {
				order_note: `User:${user_id} Plan:${plan_id}`,
				customer_details: {
					customer_id: `${user_id}`,
					customer_email: user_email,
					customer_phone: mobile_no,
				},
				order_tags: {
					payment_for: "plan",
				},
				order_id: `cashfree_${nanoid_10()}`,
				order_currency: "INR",
				order_amount: amount.toNumber(),
			};

			const response = await this.got.post(`orders`, {
				responseType: "json",
				json: dataString,
			});
			return {
				body: response.body,
				order_id: dataString.order_id,
				amount: dataString.order_amount,
				tax_amount: null,
			};
		} catch (error) {
			console.log(error);
			console.error(`Error in CashFreeController.createOrder: ${error}`);
			throw new Error(error.message);
		}
	}
	async verifyOrder(order_id) {
		try {
			const response = await this.got.get(`orders/${order_id}`, {
				headers: this.headers,
				responseType: "json",
			});

			return response.body;
		} catch (error) {
			console.error(`Error in CashFreeController.createOrder: ${error.message}`);
			throw new Error(error.message);
		}
	}
}

export default CashFreeController;
