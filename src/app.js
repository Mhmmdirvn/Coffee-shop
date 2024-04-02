document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      {
        id: 1,
        name: "Robusta Brazil",
        img: "robusta-brazil.jpg",
        price: 20000,
      },
      {
        id: 2,
        name: "Arabica Blend",
        img: "arabica-blend.jpg",
        price: 25000,
      },
      {
        id: 3,
        name: "Primo Passo",
        img: "primo-passo.jpg",
        price: 30000,
      },
      {
        id: 4,
        name: "Aceh Gayo",
        img: "aceh-gayo.jpg",
        price: 35000,
      },
      {
        id: 5,
        name: "Sumatra Mandheling",
        img: "sumatra-mandheling.jpg",
        price: 40000,
      },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // Cek apakah ada barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // jika belum ada
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // Jika barang sudah ada, cek apakah barang beda atau sama
        this.items = this.items.map((item) => {
          // jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika barang sudah ada, tambah quantity, dan subtotalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id){
        // ambil item yang akan di remove berdasarkan id
        const cartItem = this.items.find((item) => item.id === id)

        // jika item lebih dari 1
        if (cartItem.quantity > 1){
            // telusuri 1 1
            this.items = this.items.map((item) => {
                // jika bukan barang yang di klik
                if (item.id !== id) {
                    return item;
                } else {
                    item.quantity--;
                    item.total = item.price * item.quantity;
                    this.quantity--;
                    this.total -= item.price;
                    return item;
                }
            })
        } else  if (cartItem.quantity === 1) {
            this.items = this.items.filter((item) => item.id !== id);
            this.quantity--;
            this.total -= cartItem.price;
            
        }
    }
  });
});

// Konversi mata uang Rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
