import Bool "mo:base/Bool";
import Text "mo:base/Text";

import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Float "mo:base/Float";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";

actor {
    // Product type definition
    type Product = {
        id: Nat;
        name: Text;
        description: Text;
        price: Float;
        image: Text;
        inventory: Nat;
    };

    // Initialize products with some sample data
    private var products : [Product] = [
        {
            id = 1;
            name = "Raw Beef Blend";
            description = "Premium grass-fed beef with organic vegetables";
            price = 49.99;
            image = "https://images.unsplash.com/photo-1624926272725-02fbb4c89b65";
            inventory = 100;
        },
        {
            id = 2;
            name = "Chicken Supreme";
            description = "Free-range chicken with bone broth";
            price = 39.99;
            image = "https://images.unsplash.com/photo-1624926272725-02fbb4c89b65";
            inventory = 100;
        },
        {
            id = 3;
            name = "Wild Salmon Mix";
            description = "Wild-caught salmon with omega-3 supplements";
            price = 59.99;
            image = "https://images.unsplash.com/photo-1624926272725-02fbb4c89b65";
            inventory = 100;
        }
    ];

    // Shopping cart storage
    private stable var cart : [Nat] = [];

    // Query to get all products
    public query func getProducts() : async [Product] {
        return products;
    };

    // Add item to cart
    public func addToCart(productId : Nat) : async Bool {
        // Find the product
        let productOpt = Array.find<Product>(products, func(p) { p.id == productId });
        
        switch (productOpt) {
            case (null) {
                return false;
            };
            case (?product) {
                if (product.inventory > 0) {
                    // Add to cart
                    cart := Array.append<Nat>(cart, [productId]);
                    // Update inventory
                    products := Array.map<Product, Product>(products, func(p) {
                        if (p.id == productId) {
                            {
                                id = p.id;
                                name = p.name;
                                description = p.description;
                                price = p.price;
                                image = p.image;
                                inventory = p.inventory - 1;
                            }
                        } else {
                            p
                        }
                    });
                    return true;
                } else {
                    return false;
                };
            };
        };
    };

    // Remove item from cart
    public func removeFromCart(productId : Nat) : async Bool {
        let index = Array.indexOf<Nat>(productId, cart, Nat.equal);
        
        switch (index) {
            case (null) {
                return false;
            };
            case (?i) {
                // Remove from cart
                cart := Array.filter<Nat>(cart, func(id) { id != productId });
                // Update inventory
                products := Array.map<Product, Product>(products, func(p) {
                    if (p.id == productId) {
                        {
                            id = p.id;
                            name = p.name;
                            description = p.description;
                            price = p.price;
                            image = p.image;
                            inventory = p.inventory + 1;
                        }
                    } else {
                        p
                    }
                });
                return true;
            };
        };
    };

    // Checkout function
    public func checkout() : async Bool {
        if (cart.size() == 0) {
            return false;
        };
        
        // Clear the cart
        cart := [];
        return true;
    };

    // System functions for upgrades
    system func preupgrade() {
        // Cart data is already in stable storage
    };

    system func postupgrade() {
        // Cart data is already restored from stable storage
    };
}
