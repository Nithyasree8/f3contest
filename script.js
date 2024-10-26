


function getMenu() {
    fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json')
        .then(response => response.json())
        .then(data => {
            const menuContainer = document.getElementById('menu-container');
            data.forEach(item => {
                const menuItem = document.createElement('div');
                menuItem.innerHTML = `
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p>Price: ${item.price}</p>
                `;
                menuContainer.appendChild(menuItem);
            });
        })
        .catch(error => console.error('Error fetching menu:', error));
}


function takeOrder() {
    return new Promise(resolve => {
        setTimeout(() => {
            const burgers = [
                { name: 'Burger 1', price: 10.99 },
                { name: 'Burger 2', price: 12.99 },
                { name: 'Burger 3', price: 11.99 },
            ];
            resolve({ order: burgers, total: burgers.reduce((acc, curr) => acc + curr.price, 0) });
        }, 2500);
    });
}


function orderPrep(order) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ order_status: true, paid: false, order: order.order, total: order.total });
        }, 1500);
    });
}


function payOrder(order) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ order_status: true, paid: true, order: order.order, total: order.total });
        }, 1000);
    });
}


function thankyouFnc(order) {
    alert(`Thank you for eating with us today! Your total bill was $${order.total}.`);
}

async function handleOrder() {
    try {
        const order = await takeOrder();
        const preparedOrder = await orderPrep(order);
        const paidOrder = await payOrder(preparedOrder);
        thankyouFnc(paidOrder);
    } catch (error) {
        console.error('Error handling order:', error);
    }
}


getMenu();
handleOrder();


