<script>
    import { writable } from 'svelte/store';

    const cart = writable([]);
    let items = 0;

    $: {
        items = $cart.reduce((total,item) => total + item.quantity, 0);
    }

    let headline = "Handmade Sweetness, Straight from Our Kitchen!";
    let subtext = "Freshly baked cupcakes, soft cinnamon rolls, melt-in-your-mouth Gulab Jamun, and crispy palm tree leaf pastries—made with love and the finest ingredients.";
    export let data;

    let selectedOptions = {};
    let selectedQuantities = {};

    data.products.forEach( product => {
        const firsOption = Object.keys(product.pricing)[0];
        selectedOptions[product.id] = firsOption;
        selectedQuantities[product.id] = 1;
    });

    function getPrice(product){
        const option = selectedOptions[product.id];
        return product.pricing[option].toFixed(2);
    }

    function getOptionLabel(option) {
        if (option.includes('g')) {
            return option.replace('option_', '').replace('g', ' g');
        } else if (option.includes('Kg')) {
            return option.replace('option_', '');
        } else {
            return option.replace('option_', '') + ' pieces';
        }
    }
    
    // Add item to cart
    function handleAdd(product) {
        const option = selectedOptions[product.id];
        const price = product.pricing[option];
        const quantity = selectedQuantities[product.id];
        
        cart.update(items => {
            // Check if product with same option exists
            const existingItem = items.find(item => 
                item.productId === product.id && item.option === option
            );
            
            if (existingItem) {
                // Update quantity if already in cart
                return items.map(item => 
                    (item.productId === product.id && item.option === option)
                        ? {...item, quantity: item.quantity + quantity}
                        : item
                );
            } else {
                // Add new item
                return [...items, {
                    productId: product.id,
                    name: product.name,
                    option: option,
                    optionLabel: getOptionLabel(option),
                    price: price,
                    quantity: quantity
                }];
            }
        });
    }
</script>

<div class="min-h-screen flex flex-col bg-[#F5E6D3] text-[#333333]">
    <!-- Header -->
    <header class="top-0 bg-white shadow-sm z-50 py-4">
        <div class="container h-25 mx-auto p-4 flex justify-between items-center">
            <a href="/" class="text-xl font-bold text-[#8B4513]">SweetBakes</a>
            <a href="/cart" class="flex items-center gap-2 text-[#8B4513] hover:text-[#FF6B6B] transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                <span id="cartCount" class="font-semibold">{items}</span>
            </a>
        </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 container mx-auto px-4 py-8">
        <!-- Hero Section -->
        <section class="h-[600px] bg-[#8B4513] rounded-xl p-8 mb-12 text-center flex flex-col justify-center">
            <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">{headline}</h1>
            <p class="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">{subtext}</p>
        </section>

        <!-- Products Grid -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold text-center mb-8">Our Homemade Delights</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {#each data.products as product}
                    <div class="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
                        <div class="aspect-square">
                            <img src={product.image} alt={product.name} class="w-full h-full object-cover">
                        </div>   
                        <div class="p-4 text-center">
                            <h3 class="text-xl font-semibold mb-2">{product.name}</h3>
                            <p class="text-2xl text-[#FF6B6B] font-bold mb-4">€{getPrice(product)}</p>
                            <div class="flex flex-col sm:flex-row items-center gap-2">
                                <select class="select px-3 py-2 rounded-full text-center w-full sm:w-[120px]" bind:value={selectedOptions[product.id]}>
                                    {#each Object.entries(product.pricing) as [option, price]}
                                        <option value={option}>{getOptionLabel(option)} - €{price.toFixed(2)}</option>
                                    {/each}
                                </select>
                                <div class="flex items-center gap-2 w-full sm:w-auto flex justify-center">
                                    <button class="bg-[#8B4513] text-white px-3 py-2 rounded-full"on:click={() => selectedQuantities[product.id] = Math.max(1, selectedQuantities[product.id] - 1)}>-</button>
                                    <span class="w-8 text-center">{selectedQuantities[product.id]}</span>
                                    <button class="bg-[#8B4513] text-white px-3 py-2 rounded-full" on:click={() => selectedQuantities[product.id] += 1}>+</button>
                                </div>
                                <button on:click={() => handleAdd(product)} class="bg-[#FF6B6B] text-white px-4 py-2 rounded-full hover:bg-[#FF8C8C] w-full sm:w-auto mt-2 sm:mt-0">Add</button>
                            </div>
                        </div>
                </div>
                {/each}
            </div>
        </section>

        <!-- CTA Section -->
        <section class="bg-white rounded-xl p-8 text-center shadow-lg mb-12">
            <h3 class="text-2xl font-bold mb-6">Ready to Treat Yourself?</h3>
            <button class="bg-[#8B4513] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#6B4226] transition-colors">
                Proceed to Checkout with MB WAY
            </button>
        </section>
    </main>

    <!-- Footer -->
    <footer class="bg-[#8B4513] text-white py-6">
        <div class="container mx-auto px-4 text-center">
            <p class="mb-2">© 2025 SweetBakes. All rights reserved.</p>
            <div class="flex justify-center gap-4">
                <a href="#" class="hover:text-[#FF6B6B] transition-colors">Instagram</a>
                <a href="#" class="hover:text-[#FF6B6B] transition-colors">Contact</a>
            </div>
        </div>
    </footer>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;700&family=Open+Sans:wght@400;600;700&display=swap');
    
    h1, h2, h3 {
        font-family: 'Dancing Script', cursive;
    }
    
    body, p, button, input {
        font-family: 'Open Sans', sans-serif;
    }
</style>