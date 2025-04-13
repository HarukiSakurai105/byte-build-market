import { ProductCardProps } from "../components/ProductCard";

export const products: ProductCardProps[] = [
  {
    id: 1,
    name: "TechForce Gaming PC RTX 4070",
    category: "Gaming PC",
    price: 2499.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    isNew: true,
    isFeatured: true,
    specs: {
      processor: "Intel Core i9-13900K",
      memory: ["16GB DDR5", "32GB DDR5", "64GB DDR5"],
      storage: ["512GB NVMe SSD", "1TB NVMe SSD", "2TB NVMe SSD"],
      graphics: "NVIDIA RTX 4070"
    }
  },
  {
    id: 2,
    name: "CyberBook Pro 16",
    category: "Laptop",
    price: 1799.99,
    oldPrice: 1999.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    isFeatured: true,
    specs: {
      processor: "AMD Ryzen 9 7950X",
      memory: ["8GB DDR5", "16GB DDR5", "32GB DDR5"],
      storage: ["256GB NVMe SSD", "512GB NVMe SSD", "1TB NVMe SSD"],
      graphics: "AMD Radeon Graphics",
      display: "16-inch Retina Display"
    }
  },
  {
    id: 3,
    name: "ShadowBlade Gaming PC RTX 4060",
    category: "Gaming PC",
    price: 1599.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    isFeatured: true,
    specs: {
      processor: "Intel Core i7-13700K",
      memory: ["16GB DDR4", "32GB DDR4"],
      storage: ["1TB NVMe SSD", "2TB NVMe SSD"],
      graphics: "NVIDIA RTX 4060"
    }
  },
  {
    id: 4,
    name: "TechElite Workstation PC",
    category: "Workstation",
    price: 3299.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    isNew: true,
    specs: {
      processor: "AMD Threadripper PRO 5995WX",
      memory: ["64GB DDR5", "128GB DDR5"],
      storage: ["2TB NVMe SSD", "4TB NVMe SSD"],
      graphics: "NVIDIA RTX A6000"
    }
  },
  {
    id: 5,
    name: "UltraGaming RTX 4080 PC",
    category: "Gaming PC",
    price: 2999.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    isFeatured: true,
    specs: {
      processor: "Intel Core i9-13900KS",
      memory: ["32GB DDR5", "64GB DDR5"],
      storage: ["2TB NVMe SSD", "4TB NVMe SSD"],
      graphics: "NVIDIA RTX 4080"
    }
  },
  {
    id: 6,
    name: "GamerBook 15.6\" RTX 4060",
    category: "Gaming Laptop",
    price: 1699.99,
    oldPrice: 1899.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 7,
    name: "NovaTech Creator PC",
    category: "Creator PC",
    price: 2399.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 8,
    name: "PowerBook 14\" Ultra",
    category: "Laptop",
    price: 1299.99,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    isNew: true
  },
  {
    id: 9,
    name: "Titan X Gaming PC RTX 4090",
    category: "Gaming PC",
    price: 3999.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    isNew: true,
    specs: {
      processor: "Intel Core i9-13900K",
      memory: ["16GB DDR5", "32GB DDR5", "64GB DDR5"],
      storage: ["512GB NVMe SSD", "1TB NVMe SSD", "2TB NVMe SSD"],
      graphics: "NVIDIA RTX 4090"
    }
  },
  {
    id: 10,
    name: "Stealth Gaming PC RTX 4070 Ti",
    category: "Gaming PC",
    price: 2699.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    specs: {
      processor: "Intel Core i7-13700K",
      memory: ["16GB DDR4", "32GB DDR4"],
      storage: ["1TB NVMe SSD", "2TB NVMe SSD"],
      graphics: "NVIDIA RTX 4070 Ti"
    }
  },
  {
    id: 11,
    name: "Horizon Gaming PC RTX 4060 Ti",
    category: "Gaming PC",
    price: 1899.99,
    oldPrice: 2099.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    specs: {
      processor: "Intel Core i7-13700K",
      memory: ["16GB DDR4", "32GB DDR4"],
      storage: ["1TB NVMe SSD", "2TB NVMe SSD"],
      graphics: "NVIDIA RTX 4060 Ti"
    }
  },
  {
    id: 12,
    name: "Eclipse Gaming PC RTX 4070",
    category: "Gaming PC",
    price: 2299.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    specs: {
      processor: "Intel Core i9-13900K",
      memory: ["16GB DDR5", "32GB DDR5", "64GB DDR5"],
      storage: ["512GB NVMe SSD", "1TB NVMe SSD", "2TB NVMe SSD"],
      graphics: "NVIDIA RTX 4070"
    }
  }
];

export const getFeaturedProducts = () => products.filter(product => product.isFeatured);

export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category.toLowerCase().includes(category.toLowerCase()));
};

export const getProductById = (id: number) => {
  return products.find(product => product.id === id);
};

export const getGamingPCs = () => getProductsByCategory("Gaming PC");
export const getLaptops = () => getProductsByCategory("Laptop");
