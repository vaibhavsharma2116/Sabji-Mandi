import { 
  vendors, products, sales, stalls,
  type Vendor, type Product, type Sale, type Stall,
  type InsertVendor, type InsertProduct, type InsertSale, type InsertStall
} from "@shared/schema";

export interface IStorage {
  // Vendors
  getVendors(): Promise<Vendor[]>;
  getVendor(id: number): Promise<Vendor | undefined>;
  createVendor(vendor: InsertVendor): Promise<Vendor>;
  updateVendor(id: number, vendor: Partial<InsertVendor>): Promise<Vendor | undefined>;
  deleteVendor(id: number): Promise<boolean>;

  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByVendor(vendorId: number): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;

  // Sales
  getSales(): Promise<Sale[]>;
  getSale(id: number): Promise<Sale | undefined>;
  getSalesByDate(date: Date): Promise<Sale[]>;
  getSalesByVendor(vendorId: number): Promise<Sale[]>;
  createSale(sale: InsertSale): Promise<Sale>;

  // Stalls
  getStalls(): Promise<Stall[]>;
  getStall(id: number): Promise<Stall | undefined>;
  getAvailableStalls(): Promise<Stall[]>;
  createStall(stall: InsertStall): Promise<Stall>;
  updateStall(id: number, stall: Partial<InsertStall>): Promise<Stall | undefined>;
  assignStallToVendor(stallId: number, vendorId: number): Promise<boolean>;
  releaseStall(stallId: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private vendors: Map<number, Vendor>;
  private products: Map<number, Product>;
  private sales: Map<number, Sale>;
  private stalls: Map<number, Stall>;
  private currentVendorId: number;
  private currentProductId: number;
  private currentSaleId: number;
  private currentStallId: number;

  constructor() {
    this.vendors = new Map();
    this.products = new Map();
    this.sales = new Map();
    this.stalls = new Map();
    this.currentVendorId = 1;
    this.currentProductId = 1;
    this.currentSaleId = 1;
    this.currentStallId = 1;

    // Initialize with some sample stalls
    this.initializeStalls();
  }

  private initializeStalls() {
    const stallsData = [
      { stallNumber: "A1", section: "Vegetables", monthlyRent: 2500, isOccupied: false },
      { stallNumber: "A2", section: "Vegetables", monthlyRent: 2500, isOccupied: false },
      { stallNumber: "A3", section: "Vegetables", monthlyRent: 2500, isOccupied: false },
      { stallNumber: "B1", section: "Fruits", monthlyRent: 3000, isOccupied: false },
      { stallNumber: "B2", section: "Fruits", monthlyRent: 3000, isOccupied: false },
      { stallNumber: "C1", section: "Grains", monthlyRent: 2000, isOccupied: false },
      { stallNumber: "C2", section: "Grains", monthlyRent: 2000, isOccupied: false },
    ];

    stallsData.forEach(stallData => {
      const stall: Stall = {
        id: this.currentStallId++,
        ...stallData,
        vendorId: null,
      };
      this.stalls.set(stall.id, stall);
    });
  }

  // Vendors
  async getVendors(): Promise<Vendor[]> {
    return Array.from(this.vendors.values());
  }

  async getVendor(id: number): Promise<Vendor | undefined> {
    return this.vendors.get(id);
  }

  async createVendor(insertVendor: InsertVendor): Promise<Vendor> {
    const vendor: Vendor = {
      id: this.currentVendorId++,
      ...insertVendor,
      stallNumber: insertVendor.stallNumber || null,
      isActive: insertVendor.isActive ?? true,
      createdAt: new Date(),
    };
    this.vendors.set(vendor.id, vendor);
    return vendor;
  }

  async updateVendor(id: number, vendorData: Partial<InsertVendor>): Promise<Vendor | undefined> {
    const existing = this.vendors.get(id);
    if (!existing) return undefined;

    const updated: Vendor = { ...existing, ...vendorData };
    this.vendors.set(id, updated);
    return updated;
  }

  async deleteVendor(id: number): Promise<boolean> {
    return this.vendors.delete(id);
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByVendor(vendorId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.vendorId === vendorId);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const product: Product = {
      id: this.currentProductId++,
      ...insertProduct,
      vendorId: insertProduct.vendorId || null,
      quantityInStock: insertProduct.quantityInStock || 0,
      lowStockThreshold: insertProduct.lowStockThreshold || 10,
      imageUrl: insertProduct.imageUrl || null,
      createdAt: new Date(),
    };
    this.products.set(product.id, product);
    return product;
  }

  async updateProduct(id: number, productData: Partial<InsertProduct>): Promise<Product | undefined> {
    const existing = this.products.get(id);
    if (!existing) return undefined;

    const updated: Product = { ...existing, ...productData };
    this.products.set(id, updated);
    return updated;
  }

  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }

  // Sales
  async getSales(): Promise<Sale[]> {
    return Array.from(this.sales.values());
  }

  async getSale(id: number): Promise<Sale | undefined> {
    return this.sales.get(id);
  }

  async getSalesByDate(date: Date): Promise<Sale[]> {
    return Array.from(this.sales.values()).filter(sale => {
      const saleDate = new Date(sale.saleDate!);
      return saleDate.toDateString() === date.toDateString();
    });
  }

  async getSalesByVendor(vendorId: number): Promise<Sale[]> {
    return Array.from(this.sales.values()).filter(sale => sale.vendorId === vendorId);
  }

  async createSale(insertSale: InsertSale): Promise<Sale> {
    const sale: Sale = {
      id: this.currentSaleId++,
      ...insertSale,
      saleDate: new Date(),
    };
    this.sales.set(sale.id, sale);

    // Update product stock
    const product = this.products.get(insertSale.productId);
    if (product) {
      const updatedProduct = {
        ...product,
        quantityInStock: (product.quantityInStock || 0) - insertSale.quantity
      };
      this.products.set(product.id, updatedProduct);
    }

    return sale;
  }

  // Stalls
  async getStalls(): Promise<Stall[]> {
    return Array.from(this.stalls.values());
  }

  async getStall(id: number): Promise<Stall | undefined> {
    return this.stalls.get(id);
  }

  async getAvailableStalls(): Promise<Stall[]> {
    return Array.from(this.stalls.values()).filter(stall => !stall.isOccupied);
  }

  async createStall(insertStall: InsertStall): Promise<Stall> {
    const stall: Stall = {
      id: this.currentStallId++,
      ...insertStall,
      isOccupied: insertStall.isOccupied ?? false,
      vendorId: insertStall.vendorId || null,
    };
    this.stalls.set(stall.id, stall);
    return stall;
  }

  async updateStall(id: number, stallData: Partial<InsertStall>): Promise<Stall | undefined> {
    const existing = this.stalls.get(id);
    if (!existing) return undefined;

    const updated: Stall = { ...existing, ...stallData };
    this.stalls.set(id, updated);
    return updated;
  }

  async assignStallToVendor(stallId: number, vendorId: number): Promise<boolean> {
    const stall = this.stalls.get(stallId);
    if (!stall || stall.isOccupied) return false;

    const updatedStall: Stall = {
      ...stall,
      isOccupied: true,
      vendorId
    };
    this.stalls.set(stallId, updatedStall);

    // Update vendor's stall number
    const vendor = this.vendors.get(vendorId);
    if (vendor) {
      const updatedVendor: Vendor = {
        ...vendor,
        stallNumber: stall.stallNumber
      };
      this.vendors.set(vendorId, updatedVendor);
    }

    return true;
  }

  async releaseStall(stallId: number): Promise<boolean> {
    const stall = this.stalls.get(stallId);
    if (!stall) return false;

    const updatedStall: Stall = {
      ...stall,
      isOccupied: false,
      vendorId: null
    };
    this.stalls.set(stallId, updatedStall);

    // Update vendor's stall number to null
    if (stall.vendorId) {
      const vendor = this.vendors.get(stall.vendorId);
      if (vendor) {
        const updatedVendor: Vendor = {
          ...vendor,
          stallNumber: null
        };
        this.vendors.set(stall.vendorId, updatedVendor);
      }
    }

    return true;
  }
}

export const storage = new MemStorage();
