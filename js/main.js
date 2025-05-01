// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Flying Pigeon Animation
function createRandomPigeon() {
    const pigeon = document.createElement('i');
    pigeon.classList.add('fas', 'fa-dove', 'random-pigeon');
    pigeon.style.position = 'fixed';
    pigeon.style.left = '-50px';
    pigeon.style.top = Math.random() * window.innerHeight + 'px';
    pigeon.style.color = '#fff';
    pigeon.style.fontSize = '24px';
    pigeon.style.zIndex = '999';
    
    document.body.appendChild(pigeon);

    const animation = pigeon.animate([
        { left: '-50px', transform: 'translateY(0)' },
        { left: '50%', transform: 'translateY(-20px)' },
        { left: '100vw', transform: 'translateY(0)' }
    ], {
        duration: 10000,
        easing: 'linear'
    });

    animation.onfinish = () => {
        pigeon.remove();
    };
}

// Create random pigeons periodically
setInterval(createRandomPigeon, 15000);

// Local Storage Management
const PigeonStorage = {
    saveOrder: function(order) {
        const orders = this.getOrders();
        orders.push({
            ...order,
            id: Date.now(),
            status: 'In Progress',
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('Pigeon_orders', JSON.stringify(orders));
    },

    getOrders: function() {
        return JSON.parse(localStorage.getItem('Pigeon_orders') || '[]');
    },

    updateOrderStatus: function(orderId, status) {
        const orders = this.getOrders();
        const orderIndex = orders.findIndex(order => order.id === orderId);
        if (orderIndex !== -1) {
            orders[orderIndex].status = status;
            localStorage.setItem('Pigeon_orders', JSON.stringify(orders));
        }
    }
};

// Add fade-in animation to elements when they come into view
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('.hero-content > *, .cta-button').forEach(el => {
        observer.observe(el);
    });
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    observeElements();
});
