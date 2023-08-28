const html = `<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Dispensary Ecommerce</title>
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" type="text/css" href="./index.css" />
</head>
<script src="../widget.js"></script>
<script>
    GrasDeliveryWidget.mount({
        dispensaryId: '1',
        dispensaryName: 'Dispensary MD Baltimore',
        position: 'right',
    });
</script>
<body>
    <!--[if lt IE 7]>
        <p class="browsehappy">
            You are using an <strong>outdated</strong> browser. Please
            <a href="#">upgrade your browser</a> to improve your experience.
        </p>
    <![endif]-->
    <main class="flex flex-col min-h-screen">
        <nav>
            <div
                class="bg-primary text-light mx-auto px-6 py-2 flex justify-between items-center"
            >
                <a class="font-bold text-2xl lg:text-4xl" href="#">
                    NUGGET TOWN DISPENSARY
                </a>

                <div class="block lg:hidden">
                    <button
                        class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-800 hover:border-teal-500 appearance-none focus:outline-none"
                    >
                        <svg
                            class="fill-current h-3 w-3"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    </button>
                </div>

                <div class="lg:block">
                    <ul class="inline-flex pr-2">
                        <li><a href="index.html">Home</a></li>
                        <li>
                            <a
                                class="px-4 w-[100px] items-center flex flex-row border"
                                href="checkout.html"
                            >
                                Checkout
                                <span
                                    class="font-bold bg-light text-primary text-sm badge mr-2"
                                >
                                    4</span
                                ></a
                            >
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <div class="px-6 flex flex-col grow">
            <h1 class="font-bold text-2xl">Checkout</h1>

            <a href="index.html" class="cursor-pointer w-fit"
                ><button class="font-bold text-sm mx-2">< go back</button></a
            >

            <div class="m-auto space-y-2">
                <div
                    id="item-1"
                    data-item="cart-item"
                    class="h-[100px] border m-auto py-2 p-2 rounded flex justify-between items-center space-x-4"
                >
                    <image
                        data-item="cart-item-image"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBhGvpUDoO_kfqOvkoyDwjpoCTeb4cJxRCZA&usqp=CAU"
                        height="100px"
                        width="100px"
                    />
                    <div class="flex flex-col w-full">
                        <h1
                            data-item="cart-item-name"
                            class="font-bold text-lg flex grow"
                        >
                            Sour Deezel Flower
                        </h1>
                        <div class="flex flex-row justify-between w-full">
                            <p data-item="cart-item-price">$39.88</p>
                            <div class="flex">
                                <p data-item="cart-item-weight">3.5</p>
                                <p data-item="cart-item-unit">g</p>
                            </div>
                            <p data-item="cart-item-quantity">2</p>
                            in cart
                        </div>
                    </div>
                </div>

                <div
                    id="item-2"
                    data-item="cart-item"
                    class="h-[100px] m-auto py-2 p-2 rounded flex border justify-between items-center space-x-4"
                >
                    <image
                        data-item="cart-item-image"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBhGvpUDoO_kfqOvkoyDwjpoCTeb4cJxRCZA&usqp=CAU"
                        height="100px"
                        width="100px"
                    />
                    <div class="flex flex-col w-full">
                        <h1 data-item="cart-item-name" class="font-bold text-lg grow">
                            Girl Scout Cookie Flower
                        </h1>
                        <div class="flex flex-row justify-between w-full">
                            <p data-item="cart-item-price">$32.99</p>
                            <div class="flex">
                                <p data-item="cart-item-weight">3.5</p>
                                <p data-item="cart-item-unit">g</p>
                            </div>
                            <p data-item="cart-item-quantity">1</p>
                            in cart
                        </div>
                    </div>
                </div>

                <div
                    id="item-3"
                    data-item="cart-item"
                    class="h-[100px] border m-auto py-2 p-2 rounded flex justify-between items-center space-x-4"
                >
                    <image
                        data-item="cart-item-image"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBhGvpUDoO_kfqOvkoyDwjpoCTeb4cJxRCZA&usqp=CAU"
                        height="100px"
                        width="100px"
                    />
                    <div class="flex flex-col w-full">
                        <h1 data-item="cart-item-name" class="font-bold text-lg grow">
                            Stanka CBD oil
                        </h1>
                        <div class="flex flex-row justify-between w-full">
                            <p data-item="cart-item-price">$32.99</p>
                            <div class="flex">
                                <p data-item="cart-item-weight">3.5</p>
                                <p data-item="cart-item-unit">g</p>
                            </div>
                            <p data-item="cart-item-quantity">1</p>
                            in cart
                        </div>
                    </div>
                </div>

                <div
                    id="item-4"
                    data-item="cart-item"
                    class="h-[100px] border m-auto py-2 p-2 rounded flex justify-between items-center space-x-4"
                >
                    <image
                        data-item="cart-item-image"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBhGvpUDoO_kfqOvkoyDwjpoCTeb4cJxRCZA&usqp=CAU"
                        height="100px"
                        width="100px"
                    />
                    <div class="flex flex-col w-full">
                        <h1 data-item="cart-item-name" class="font-bold text-lg grow">
                            Grand master Flower
                        </h1>
                        <div class="flex flex-row justify-between w-full">
                            <p data-item="cart-item-price">$73.88</p>
                            <div class="flex">
                                <p data-item="cart-item-weight">7</p>
                                <p data-item="cart-item-unit">g</p>
                            </div>
                            <p data-item="cart-item-quantity">3</p>
                            in cart
                        </div>
                    </div>
                </div>

                <div class="flex justify-between pb-2">
                    <h1 class="font-bold text-xl">Total</h1>

                    <p data-item="cart-total" class="underline">$367.38</p>
                </div>
            </div>
        </div>

        <div class="bg-primary w-full p-12">
            <p>Nugget Town</p>
        </div>
    </main>
</body>
</html>`;

export { html };
