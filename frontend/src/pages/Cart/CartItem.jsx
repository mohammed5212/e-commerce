import React from 'react';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
    // Ensure item has required properties: id, name, price, quantity, and optionally image
    const { id, name, price, quantity, imageUrl } = item; 

    // Handle quantity change from input
    const handleChange = (e) => {
        const newQty = parseInt(e.target.value, 10);
        // Only call update if newQty is a valid number
        if (!isNaN(newQty)) {
            onUpdateQuantity(id, newQty);
        }
    };

    return (
        <div className="cart-item">
            {/* You would typically use an actual Image component/tag here */}
            {imageUrl && (
                <img src={imageUrl} alt={name} className="item-image" />
            )}

            <div className="item-details">
                <h3>{name}</h3>
                <p>Price: **${price.toFixed(2)}**</p>
                <p>Item Total: **${(price * quantity).toFixed(2)}**</p>
            </div>

            <div className="item-controls">
                <div className="quantity-control">
                    <button onClick={() => onUpdateQuantity(id, quantity - 1)}>-</button>
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={handleChange}
                        className="quantity-input"
                    />
                    <button onClick={() => onUpdateQuantity(id, quantity + 1)}>+</button>
                </div>
                
                <button 
                    className="remove-button" 
                    onClick={() => onRemove(id)}
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default CartItem;