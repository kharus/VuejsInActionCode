interface Product {
    id: number,
    title: string,
    description: string,
    price: number,
    image: string,
    availableInventory: number,
    rating: number
}

export const dummyProduct: Product = {
    id: 0,
    title: "",
    description: "",
    price: 0,
    image: "",
    availableInventory: 0,
    rating: 0
};