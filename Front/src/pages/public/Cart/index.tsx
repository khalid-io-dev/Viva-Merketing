import DisplayProductCart from "../../../components/cart/displayProductCart";
import {Link} from "react-router-dom";
export default function Cart (){
    return (
        <section className="bg-gray-50 py-8 antialiased">
            <div className="mx-auto max-w-screen-xl px-4">
                <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Shopping Cart</h2>

                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                    {/* Liste des produits */}
                    <div className="mx-auto w-full flex-none lg:m   ax-w-2xl xl:max-w-4xl space-y-6">

                        {/* Liste Produits */}
                        <DisplayProductCart  image="../../../../favicon.ico" name="truc" price="100"/>

                        {/* Répéter pour chaque produit */}
                    </div>

                    {/* Résumé de commande */}
                    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <p className="text-xl font-semibold text-gray-900">Order summary</p>
                            <div className="space-y-4">
                                <div className="flex justify-between text-gray-500">
                                    <span>Original price</span>
                                    <span className="text-gray-900 font-medium">$7 592.00</span>
                                </div>
                                <div className="flex justify-between text-gray-500">
                                    <span>Savings</span>
                                    <span className="text-green-600 font-medium">−$299.00</span>
                                </div>
                                {/* ... autres lignes ... */}
                                <div className="flex justify-between border-t border-gray-200 pt-2">
                                    <span className="font-bold text-gray-900">Total</span>
                                    <span className="font-bold text-gray-900">$8 191.00</span>
                                </div>
                            </div>
                            <a
                                href="#"
                                className="flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-300 transition"
                            >
                                Proceed to Checkout
                            </a>
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-sm text-gray-500">or</span>
                                <Link to="/products">
                                <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 underline hover:no-underline">
                                    Continue Shopping
                                </a>
                                </Link>
                            </div>
                        </div>

                        {/* Code promo */}
                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <form className="space-y-4">
                                <label htmlFor="voucher" className="block text-sm font-medium text-gray-900">
                                    Do you have a voucher or gift card?
                                </label>
                                <input
                                    type="text"
                                    id="voucher"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-emerald-500 focus:ring-emerald-500"
                                    placeholder=""
                                    required
                                />
                                <button
                                    type="submit"
                                    className="flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-300 transition"
                                >
                                    Apply Code
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}