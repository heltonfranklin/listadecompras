document.addEventListener('DOMContentLoaded', (event) => {
    const itemInput = document.getElementById('itemInput');
    const addButton = document.getElementById('addButton');
    const shoppingList = document.getElementById('shoppingList');
    const cartList = document.getElementById('cartList');
    const totalPriceElement = document.getElementById('totalPrice');
    const checkoutButton = document.getElementById('checkoutButton');
    const summary = document.getElementById('summary');
    const summaryList = document.getElementById('summaryList');
    const summaryTotalPrice = document.getElementById('summaryTotalPrice');

    let total = 0;

    addButton.addEventListener('click', () => {
        const itemText = itemInput.value.trim();
        if (itemText !== '') {
            addItemToList(itemText);
            itemInput.value = '';
            itemInput.focus();
        }
    });

    function addItemToList(text) {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        
        const itemText = document.createElement('span');
        itemText.textContent = text;
        
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = 1;
        quantityInput.className = 'form-control quantity-input';
        quantityInput.min = 1;

        const priceButton = document.createElement('button');
        priceButton.innerHTML = '<i class="fas fa-dollar-sign"></i>';
        priceButton.className = 'price-button btn';
        priceButton.addEventListener('click', () => {
            const price = prompt(`Insira o preço para ${text}`);
            if (price !== null && !isNaN(price) && price > 0) {
                addItemToCart(text, parseFloat(price), parseInt(quantityInput.value));
                shoppingList.removeChild(li);
                if (shoppingList.children.length === 0) {
                    checkoutButton.style.display = 'block';
                }
            }
        });

        li.appendChild(itemText);
        li.appendChild(quantityInput);
        li.appendChild(priceButton);
        shoppingList.appendChild(li);
    }

    function addItemToCart(text, price, quantity) {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        
        const itemText = document.createElement('span');
        const finalPrice = price * quantity;
        itemText.textContent = `${text} - R$ ${price.toFixed(2)} x ${quantity} = R$ ${finalPrice.toFixed(2)}`;
        
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.className = 'delete-button btn';
        deleteButton.addEventListener('click', () => {
            cartList.removeChild(li);
            updateTotal(-(finalPrice));
        });

        li.appendChild(itemText);
        li.appendChild(deleteButton);
        cartList.appendChild(li);
        updateTotal(finalPrice);
    }

    function updateTotal(amount) {
        total += amount;
        totalPriceElement.textContent = total.toFixed(2);
    }

    checkoutButton.addEventListener('click', () => {
        summaryList.innerHTML = '';
        cartList.childNodes.forEach((item) => {
            const summaryItem = document.createElement('li');
            summaryItem.className = 'list-group-item';
            summaryItem.textContent = item.firstChild.textContent;
            summaryList.appendChild(summaryItem);
        });
        summaryTotalPrice.textContent = total.toFixed(2);
        summary.style.display = 'block';
    });
});
