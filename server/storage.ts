
import { 
  vendors, products, sales, stalls, suppliers, purchaseOrders, purchaseOrderItems,
  qualityChecks, payments, expenses, staff, attendance, customers, orders, orderItems,
  type Vendor, type Product, type Sale, type Stall, type Supplier, type PurchaseOrder,
  type PurchaseOrderItem, type QualityCheck, type Payment, type Expense, type Staff,
  type Attendance, type Customer, type Order, type OrderItem,
  type InsertVendor, type InsertProduct, type InsertSale, type InsertStall,
  type InsertSupplier, type InsertPurchaseOrder, type InsertPurchaseOrderItem,
  type InsertQualityCheck, type InsertPayment, type InsertExpense, type InsertStaff,
  type InsertAttendance, type InsertCustomer, type InsertOrder, type InsertOrderItem
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

  // Suppliers
  getSuppliers(): Promise<Supplier[]>;
  getSupplier(id: number): Promise<Supplier | undefined>;
  createSupplier(supplier: InsertSupplier): Promise<Supplier>;
  updateSupplier(id: number, supplier: Partial<InsertSupplier>): Promise<Supplier | undefined>;

  // Purchase Orders
  getPurchaseOrders(): Promise<PurchaseOrder[]>;
  getPurchaseOrder(id: number): Promise<PurchaseOrder | undefined>;
  createPurchaseOrder(purchaseOrder: InsertPurchaseOrder): Promise<PurchaseOrder>;
  updatePurchaseOrder(id: number, purchaseOrder: Partial<InsertPurchaseOrder>): Promise<PurchaseOrder | undefined>;

  // Purchase Order Items
  getPurchaseOrderItems(): Promise<PurchaseOrderItem[]>;
  getPurchaseOrderItemsByOrder(purchaseOrderId: number): Promise<PurchaseOrderItem[]>;
  createPurchaseOrderItem(item: InsertPurchaseOrderItem): Promise<PurchaseOrderItem>;

  // Quality Checks
  getQualityChecks(): Promise<QualityCheck[]>;
  getQualityCheck(id: number): Promise<QualityCheck | undefined>;
  createQualityCheck(qualityCheck: InsertQualityCheck): Promise<QualityCheck>;

  // Payments
  getPayments(): Promise<Payment[]>;
  getPayment(id: number): Promise<Payment | undefined>;
  createPayment(payment: InsertPayment): Promise<Payment>;

  // Expenses
  getExpenses(): Promise<Expense[]>;
  getExpense(id: number): Promise<Expense | undefined>;
  createExpense(expense: InsertExpense): Promise<Expense>;

  // Staff
  getStaff(): Promise<Staff[]>;
  getStaffMember(id: number): Promise<Staff | undefined>;
  createStaff(staff: InsertStaff): Promise<Staff>;
  updateStaff(id: number, staff: Partial<InsertStaff>): Promise<Staff | undefined>;

  // Attendance
  getAttendance(): Promise<Attendance[]>;
  getAttendanceByStaff(staffId: number): Promise<Attendance[]>;
  getAttendanceByDate(date: Date): Promise<Attendance[]>;
  createAttendance(attendance: InsertAttendance): Promise<Attendance>;

  // Customers
  getCustomers(): Promise<Customer[]>;
  getCustomer(id: number): Promise<Customer | undefined>;
  createCustomer(customer: InsertCustomer): Promise<Customer>;
  updateCustomer(id: number, customer: Partial<InsertCustomer>): Promise<Customer | undefined>;

  // Orders
  getOrders(): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
  getOrdersByCustomer(customerId: number): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: number, order: Partial<InsertOrder>): Promise<Order | undefined>;

  // Order Items
  getOrderItems(): Promise<OrderItem[]>;
  getOrderItemsByOrder(orderId: number): Promise<OrderItem[]>;
  createOrderItem(item: InsertOrderItem): Promise<OrderItem>;
}

export class MemStorage implements IStorage {
  private vendors: Map<number, Vendor>;
  private products: Map<number, Product>;
  private sales: Map<number, Sale>;
  private stalls: Map<number, Stall>;
  private suppliers: Map<number, Supplier>;
  private purchaseOrders: Map<number, PurchaseOrder>;
  private purchaseOrderItems: Map<number, PurchaseOrderItem>;
  private qualityChecks: Map<number, QualityCheck>;
  private payments: Map<number, Payment>;
  private expenses: Map<number, Expense>;
  private staff: Map<number, Staff>;
  private attendance: Map<number, Attendance>;
  private customers: Map<number, Customer>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;

  private currentVendorId: number;
  private currentProductId: number;
  private currentSaleId: number;
  private currentStallId: number;
  private currentSupplierId: number;
  private currentPurchaseOrderId: number;
  private currentPurchaseOrderItemId: number;
  private currentQualityCheckId: number;
  private currentPaymentId: number;
  private currentExpenseId: number;
  private currentStaffId: number;
  private currentAttendanceId: number;
  private currentCustomerId: number;
  private currentOrderId: number;
  private currentOrderItemId: number;

  constructor() {
    this.vendors = new Map();
    this.products = new Map();
    this.sales = new Map();
    this.stalls = new Map();
    this.suppliers = new Map();
    this.purchaseOrders = new Map();
    this.purchaseOrderItems = new Map();
    this.qualityChecks = new Map();
    this.payments = new Map();
    this.expenses = new Map();
    this.staff = new Map();
    this.attendance = new Map();
    this.customers = new Map();
    this.orders = new Map();
    this.orderItems = new Map();

    this.currentVendorId = 1;
    this.currentProductId = 1;
    this.currentSaleId = 1;
    this.currentStallId = 1;
    this.currentSupplierId = 1;
    this.currentPurchaseOrderId = 1;
    this.currentPurchaseOrderItemId = 1;
    this.currentQualityCheckId = 1;
    this.currentPaymentId = 1;
    this.currentExpenseId = 1;
    this.currentStaffId = 1;
    this.currentAttendanceId = 1;
    this.currentCustomerId = 1;
    this.currentOrderId = 1;
    this.currentOrderItemId = 1;

    // Initialize with comprehensive sample data
    this.initializeAllData();
  }

  private initializeAllData() {
    this.initializeStalls();
    this.initializeVendors();
    this.initializeProducts();
    this.initializeSales();
    this.initializeSuppliers();
    this.initializePurchaseOrders();
    this.initializePurchaseOrderItems();
    this.initializeQualityChecks();
    this.initializePayments();
    this.initializeExpenses();
    this.initializeStaff();
    this.initializeAttendance();
    this.initializeCustomers();
    this.initializeOrders();
    this.initializeOrderItems();
  }

  private initializeStalls() {
    const stallsData = [
      { stallNumber: "A1", section: "Vegetables", monthlyRent: 2500, isOccupied: true, vendorId: null },
      { stallNumber: "A2", section: "Vegetables", monthlyRent: 2500, isOccupied: true, vendorId: null },
      { stallNumber: "A3", section: "Vegetables", monthlyRent: 2500, isOccupied: false, vendorId: null },
      { stallNumber: "A4", section: "Vegetables", monthlyRent: 2500, isOccupied: false, vendorId: null },
      { stallNumber: "B1", section: "Fruits", monthlyRent: 3000, isOccupied: true, vendorId: null },
      { stallNumber: "B2", section: "Fruits", monthlyRent: 3000, isOccupied: true, vendorId: null },
      { stallNumber: "B3", section: "Fruits", monthlyRent: 3000, isOccupied: false, vendorId: null },
      { stallNumber: "C1", section: "Grains", monthlyRent: 2000, isOccupied: true, vendorId: null },
      { stallNumber: "C2", section: "Grains", monthlyRent: 2000, isOccupied: false, vendorId: null },
      { stallNumber: "D1", section: "Dairy", monthlyRent: 3500, isOccupied: true, vendorId: null },
      { stallNumber: "D2", section: "Dairy", monthlyRent: 3500, isOccupied: false, vendorId: null },
      { stallNumber: "E1", section: "Meat", monthlyRent: 4000, isOccupied: true, vendorId: null },
      { stallNumber: "E2", section: "Meat", monthlyRent: 4000, isOccupied: false, vendorId: null },
      { stallNumber: "F1", section: "Spices", monthlyRent: 2200, isOccupied: true, vendorId: null },
      { stallNumber: "F2", section: "Spices", monthlyRent: 2200, isOccupied: false, vendorId: null },
    ];

    stallsData.forEach(stallData => {
      const stall: Stall = {
        id: this.currentStallId++,
        ...stallData,
      };
      this.stalls.set(stall.id, stall);
    });
  }

  private initializeVendors() {
    const vendorsData = [
      { name: "Rajesh Kumar", phone: "+91 98765 43210", category: "Vegetables", stallNumber: "A1", isActive: true },
      { name: "Priya Sharma", phone: "+91 87654 32109", category: "Fruits", stallNumber: "B1", isActive: true },
      { name: "Mohammed Ali", phone: "+91 76543 21098", category: "Grains", stallNumber: "C1", isActive: true },
      { name: "Sunita Devi", phone: "+91 65432 10987", category: "Vegetables", stallNumber: "A2", isActive: true },
      { name: "Rakesh Gupta", phone: "+91 54321 09876", category: "Dairy", stallNumber: "D1", isActive: true },
      { name: "Kavita Singh", phone: "+91 43210 98765", category: "Fruits", stallNumber: "B2", isActive: true },
      { name: "Arjun Patel", phone: "+91 32109 87654", category: "Meat", stallNumber: "E1", isActive: true },
      { name: "Meera Joshi", phone: "+91 21098 76543", category: "Spices", stallNumber: "F1", isActive: true },
      { name: "Suresh Yadav", phone: "+91 10987 65432", category: "Vegetables", stallNumber: null, isActive: false },
      { name: "Anita Reddy", phone: "+91 09876 54321", category: "Fruits", stallNumber: null, isActive: true },
    ];

    vendorsData.forEach(vendorData => {
      const vendor: Vendor = {
        id: this.currentVendorId++,
        ...vendorData,
        createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
      };
      this.vendors.set(vendor.id, vendor);

      // Update stall with vendor ID
      if (vendor.stallNumber) {
        const stall = Array.from(this.stalls.values()).find(s => s.stallNumber === vendor.stallNumber);
        if (stall) {
          this.stalls.set(stall.id, { ...stall, vendorId: vendor.id, isOccupied: true });
        }
      }
    });
  }

  private initializeProducts() {
    const productsData = [
      // Vegetables (Vendor 1 & 4)
      { name: "Tomatoes", category: "Vegetables", pricePerKg: 45, quantityInStock: 150, lowStockThreshold: 20, vendorId: 1, imageUrl: "/images/tomatoes.jpg" },
      { name: "Onions", category: "Vegetables", pricePerKg: 35, quantityInStock: 200, lowStockThreshold: 30, vendorId: 1, imageUrl: "/images/onions.jpg" },
      { name: "Potatoes", category: "Vegetables", pricePerKg: 25, quantityInStock: 300, lowStockThreshold: 50, vendorId: 1, imageUrl: "/images/potatoes.jpg" },
      { name: "Carrots", category: "Vegetables", pricePerKg: 40, quantityInStock: 80, lowStockThreshold: 15, vendorId: 4, imageUrl: "/images/carrots.jpg" },
      { name: "Spinach", category: "Vegetables", pricePerKg: 30, quantityInStock: 50, lowStockThreshold: 10, vendorId: 4, imageUrl: "/images/spinach.jpg" },
      { name: "Cabbage", category: "Vegetables", pricePerKg: 20, quantityInStock: 120, lowStockThreshold: 25, vendorId: 4, imageUrl: "/images/cabbage.jpg" },
      
      // Fruits (Vendor 2 & 6)
      { name: "Apples", category: "Fruits", pricePerKg: 120, quantityInStock: 100, lowStockThreshold: 20, vendorId: 2, imageUrl: "/images/apples.jpg" },
      { name: "Bananas", category: "Fruits", pricePerKg: 60, quantityInStock: 80, lowStockThreshold: 15, vendorId: 2, imageUrl: "/images/bananas.jpg" },
      { name: "Oranges", category: "Fruits", pricePerKg: 80, quantityInStock: 90, lowStockThreshold: 18, vendorId: 2, imageUrl: "/images/oranges.jpg" },
      { name: "Mangoes", category: "Fruits", pricePerKg: 150, quantityInStock: 60, lowStockThreshold: 12, vendorId: 6, imageUrl: "/images/mangoes.jpg" },
      { name: "Grapes", category: "Fruits", pricePerKg: 100, quantityInStock: 45, lowStockThreshold: 10, vendorId: 6, imageUrl: "/images/grapes.jpg" },
      { name: "Pomegranates", category: "Fruits", pricePerKg: 180, quantityInStock: 35, lowStockThreshold: 8, vendorId: 6, imageUrl: "/images/pomegranates.jpg" },
      
      // Grains (Vendor 3)
      { name: "Basmati Rice", category: "Grains", pricePerKg: 85, quantityInStock: 500, lowStockThreshold: 100, vendorId: 3, imageUrl: "/images/basmati-rice.jpg" },
      { name: "Wheat Flour", category: "Grains", pricePerKg: 45, quantityInStock: 400, lowStockThreshold: 80, vendorId: 3, imageUrl: "/images/wheat-flour.jpg" },
      { name: "Red Lentils", category: "Grains", pricePerKg: 95, quantityInStock: 200, lowStockThreshold: 40, vendorId: 3, imageUrl: "/images/red-lentils.jpg" },
      { name: "Chickpeas", category: "Grains", pricePerKg: 75, quantityInStock: 180, lowStockThreshold: 35, vendorId: 3, imageUrl: "/images/chickpeas.jpg" },
      
      // Dairy (Vendor 5)
      { name: "Fresh Milk", category: "Dairy", pricePerKg: 55, quantityInStock: 100, lowStockThreshold: 20, vendorId: 5, imageUrl: "/images/fresh-milk.jpg" },
      { name: "Paneer", category: "Dairy", pricePerKg: 320, quantityInStock: 25, lowStockThreshold: 5, vendorId: 5, imageUrl: "/images/paneer.jpg" },
      { name: "Yogurt", category: "Dairy", pricePerKg: 60, quantityInStock: 80, lowStockThreshold: 15, vendorId: 5, imageUrl: "/images/yogurt.jpg" },
      { name: "Butter", category: "Dairy", pricePerKg: 450, quantityInStock: 30, lowStockThreshold: 8, vendorId: 5, imageUrl: "/images/butter.jpg" },
      
      // Meat (Vendor 7)
      { name: "Chicken", category: "Meat", pricePerKg: 180, quantityInStock: 50, lowStockThreshold: 10, vendorId: 7, imageUrl: "/images/chicken.jpg" },
      { name: "Mutton", category: "Meat", pricePerKg: 550, quantityInStock: 25, lowStockThreshold: 5, vendorId: 7, imageUrl: "/images/mutton.jpg" },
      { name: "Fish", category: "Meat", pricePerKg: 220, quantityInStock: 35, lowStockThreshold: 8, vendorId: 7, imageUrl: "/images/fish.jpg" },
      
      // Spices (Vendor 8)
      { name: "Turmeric Powder", category: "Spices", pricePerKg: 180, quantityInStock: 40, lowStockThreshold: 8, vendorId: 8, imageUrl: "/images/turmeric.jpg" },
      { name: "Red Chili Powder", category: "Spices", pricePerKg: 220, quantityInStock: 35, lowStockThreshold: 7, vendorId: 8, imageUrl: "/images/chili-powder.jpg" },
      { name: "Cumin Seeds", category: "Spices", pricePerKg: 450, quantityInStock: 20, lowStockThreshold: 5, vendorId: 8, imageUrl: "/images/cumin-seeds.jpg" },
      { name: "Coriander Powder", category: "Spices", pricePerKg: 160, quantityInStock: 30, lowStockThreshold: 6, vendorId: 8, imageUrl: "/images/coriander-powder.jpg" },
    ];

    productsData.forEach(productData => {
      const product: Product = {
        id: this.currentProductId++,
        ...productData,
        createdAt: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000),
      };
      this.products.set(product.id, product);
    });
  }

  private initializeSales() {
    const salesData = [];
    const today = new Date();
    
    // Generate sales for the last 30 days
    for (let i = 0; i < 150; i++) {
      const randomDaysAgo = Math.floor(Math.random() * 30);
      const saleDate = new Date(today.getTime() - randomDaysAgo * 24 * 60 * 60 * 1000);
      
      const products = Array.from(this.products.values());
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.random() * 10 + 1; // 1-11 kg
      const totalAmount = quantity * randomProduct.pricePerKg;
      
      salesData.push({
        productId: randomProduct.id,
        vendorId: randomProduct.vendorId!,
        quantity: Math.round(quantity * 100) / 100,
        pricePerKg: randomProduct.pricePerKg,
        totalAmount: Math.round(totalAmount * 100) / 100,
        saleDate,
      });
    }

    salesData.forEach(saleData => {
      const sale: Sale = {
        id: this.currentSaleId++,
        ...saleData,
      };
      this.sales.set(sale.id, sale);
    });
  }

  private initializeSuppliers() {
    const suppliersData = [
      {
        name: "Green Valley Farms",
        contactPerson: "Ramesh Kumar",
        phone: "+91 99887 76655",
        email: "ramesh@greenvalley.com",
        address: "Village Khetpura, District Meerut, UP",
        supplierType: "farmer",
        paymentTerms: "cash",
        isActive: true,
      },
      {
        name: "Fresh Fruit Distributors",
        contactPerson: "Sita Patel",
        phone: "+91 88776 65544",
        email: "sita@freshfruits.com",
        address: "Fruit Market, Azadpur, Delhi",
        supplierType: "wholesaler",
        paymentTerms: "credit_15",
        isActive: true,
      },
      {
        name: "Organic Grains Co.",
        contactPerson: "Vikram Singh",
        phone: "+91 77665 54433",
        email: "vikram@organicgrains.com",
        address: "Grain Mandi, Karnal, Haryana",
        supplierType: "distributor",
        paymentTerms: "credit_30",
        isActive: true,
      },
      {
        name: "Mountain Dairy Farm",
        contactPerson: "Lakshmi Devi",
        phone: "+91 66554 43322",
        email: "lakshmi@mountaindairy.com",
        address: "Dairy Colony, Rishikesh, Uttarakhand",
        supplierType: "farmer",
        paymentTerms: "credit_7",
        isActive: true,
      },
      {
        name: "Spice Garden Exports",
        contactPerson: "Abdul Rahman",
        phone: "+91 55443 32211",
        email: "abdul@spicegarden.com",
        address: "Spice Market, Kochi, Kerala",
        supplierType: "distributor",
        paymentTerms: "credit_15",
        isActive: true,
      },
    ];

    suppliersData.forEach(supplierData => {
      const supplier: Supplier = {
        id: this.currentSupplierId++,
        ...supplierData,
        createdAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000),
      };
      this.suppliers.set(supplier.id, supplier);
    });
  }

  private initializePurchaseOrders() {
    const purchaseOrdersData = [
      {
        orderNumber: "PO-2024-001",
        supplierId: 1,
        expectedDeliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        status: "confirmed",
        totalAmount: 25000,
        paidAmount: 0,
        notes: "Regular weekly vegetable order",
        createdBy: "Market Manager",
      },
      {
        orderNumber: "PO-2024-002",
        supplierId: 2,
        expectedDeliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        actualDeliveryDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        status: "delivered",
        totalAmount: 18500,
        paidAmount: 18500,
        notes: "Seasonal fruit order",
        createdBy: "Procurement Head",
      },
      {
        orderNumber: "PO-2024-003",
        supplierId: 3,
        expectedDeliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: "pending",
        totalAmount: 45000,
        paidAmount: 0,
        notes: "Monthly grain stock replenishment",
        createdBy: "Market Manager",
      },
      {
        orderNumber: "PO-2024-004",
        supplierId: 4,
        expectedDeliveryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        status: "confirmed",
        totalAmount: 12000,
        paidAmount: 6000,
        notes: "Daily dairy products",
        createdBy: "Dairy Section Head",
      },
      {
        orderNumber: "PO-2024-005",
        supplierId: 5,
        expectedDeliveryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
        status: "confirmed",
        totalAmount: 8500,
        paidAmount: 0,
        notes: "Premium spice collection",
        createdBy: "Spice Section Head",
      },
    ];

    purchaseOrdersData.forEach(orderData => {
      const purchaseOrder: PurchaseOrder = {
        id: this.currentPurchaseOrderId++,
        ...orderData,
        orderDate: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000),
      };
      this.purchaseOrders.set(purchaseOrder.id, purchaseOrder);
    });
  }

  private initializePurchaseOrderItems() {
    const itemsData = [
      // PO-1 items
      { purchaseOrderId: 1, productName: "Tomatoes", category: "Vegetables", quantity: 100, unitPrice: 40, totalPrice: 4000, qualityGrade: "A", receivedQuantity: 0 },
      { purchaseOrderId: 1, productName: "Onions", category: "Vegetables", quantity: 150, unitPrice: 30, totalPrice: 4500, qualityGrade: "A", receivedQuantity: 0 },
      { purchaseOrderId: 1, productName: "Potatoes", category: "Vegetables", quantity: 200, unitPrice: 20, totalPrice: 4000, qualityGrade: "B", receivedQuantity: 0 },
      { purchaseOrderId: 1, productName: "Carrots", category: "Vegetables", quantity: 80, unitPrice: 35, totalPrice: 2800, qualityGrade: "A", receivedQuantity: 0 },
      { purchaseOrderId: 1, productName: "Spinach", category: "Vegetables", quantity: 60, unitPrice: 25, totalPrice: 1500, qualityGrade: "A", receivedQuantity: 0 },
      
      // PO-2 items
      { purchaseOrderId: 2, productName: "Apples", category: "Fruits", quantity: 50, unitPrice: 110, totalPrice: 5500, qualityGrade: "A", receivedQuantity: 50 },
      { purchaseOrderId: 2, productName: "Bananas", category: "Fruits", quantity: 40, unitPrice: 55, totalPrice: 2200, qualityGrade: "A", receivedQuantity: 40 },
      { purchaseOrderId: 2, productName: "Oranges", category: "Fruits", quantity: 60, unitPrice: 75, totalPrice: 4500, qualityGrade: "B", receivedQuantity: 60 },
      { purchaseOrderId: 2, productName: "Mangoes", category: "Fruits", quantity: 30, unitPrice: 140, totalPrice: 4200, qualityGrade: "A", receivedQuantity: 30 },
      { purchaseOrderId: 2, productName: "Grapes", category: "Fruits", quantity: 20, unitPrice: 95, totalPrice: 1900, qualityGrade: "A", receivedQuantity: 20 },
      
      // PO-3 items
      { purchaseOrderId: 3, productName: "Basmati Rice", category: "Grains", quantity: 300, unitPrice: 80, totalPrice: 24000, qualityGrade: "A", receivedQuantity: 0 },
      { purchaseOrderId: 3, productName: "Wheat Flour", category: "Grains", quantity: 250, unitPrice: 40, totalPrice: 10000, qualityGrade: "B", receivedQuantity: 0 },
      { purchaseOrderId: 3, productName: "Red Lentils", category: "Grains", quantity: 100, unitPrice: 90, totalPrice: 9000, qualityGrade: "A", receivedQuantity: 0 },
      
      // PO-4 items
      { purchaseOrderId: 4, productName: "Fresh Milk", category: "Dairy", quantity: 80, unitPrice: 50, totalPrice: 4000, qualityGrade: "A", receivedQuantity: 0 },
      { purchaseOrderId: 4, productName: "Paneer", category: "Dairy", quantity: 15, unitPrice: 300, totalPrice: 4500, qualityGrade: "A", receivedQuantity: 0 },
      { purchaseOrderId: 4, productName: "Yogurt", category: "Dairy", quantity: 50, unitPrice: 55, totalPrice: 2750, qualityGrade: "A", receivedQuantity: 0 },
      
      // PO-5 items
      { purchaseOrderId: 5, productName: "Turmeric Powder", category: "Spices", quantity: 25, unitPrice: 170, totalPrice: 4250, qualityGrade: "A", receivedQuantity: 0 },
      { purchaseOrderId: 5, productName: "Red Chili Powder", category: "Spices", quantity: 20, unitPrice: 210, totalPrice: 4200, qualityGrade: "A", receivedQuantity: 0 },
    ];

    itemsData.forEach(itemData => {
      const item: PurchaseOrderItem = {
        id: this.currentPurchaseOrderItemId++,
        ...itemData,
        notes: itemData.qualityGrade === "A" ? "Premium quality" : "Standard quality",
      };
      this.purchaseOrderItems.set(item.id, item);
    });
  }

  private initializeQualityChecks() {
    const qualityChecksData = [
      {
        purchaseOrderId: 2,
        productName: "Apples",
        checkedBy: "Quality Inspector - Raj",
        qualityGrade: "A",
        freshness: 9,
        appearance: 8,
        overallScore: 8,
        notes: "Excellent quality, good size and color",
        images: ["/quality/apples_check_1.jpg"],
        approved: true,
      },
      {
        purchaseOrderId: 2,
        productName: "Bananas",
        checkedBy: "Quality Inspector - Raj",
        qualityGrade: "A",
        freshness: 8,
        appearance: 9,
        overallScore: 8,
        notes: "Perfect ripeness, uniform color",
        images: ["/quality/bananas_check_1.jpg"],
        approved: true,
      },
      {
        purchaseOrderId: 2,
        productName: "Oranges",
        checkedBy: "Quality Inspector - Priya",
        qualityGrade: "B",
        freshness: 7,
        appearance: 6,
        overallScore: 6,
        notes: "Slightly overripe, some blemishes",
        images: ["/quality/oranges_check_1.jpg"],
        approved: true,
      },
      {
        purchaseOrderId: 2,
        productName: "Mangoes",
        checkedBy: "Quality Inspector - Raj",
        qualityGrade: "A",
        freshness: 9,
        appearance: 9,
        overallScore: 9,
        notes: "Premium Alphonso variety, perfect condition",
        images: ["/quality/mangoes_check_1.jpg", "/quality/mangoes_check_2.jpg"],
        approved: true,
      },
    ];

    qualityChecksData.forEach(checkData => {
      const qualityCheck: QualityCheck = {
        id: this.currentQualityCheckId++,
        ...checkData,
        checkDate: new Date(Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000),
      };
      this.qualityChecks.set(qualityCheck.id, qualityCheck);
    });
  }

  private initializePayments() {
    const paymentsData = [
      {
        paymentNumber: "PAY-2024-001",
        type: "purchase_payment",
        entityId: 2,
        entityType: "supplier",
        amount: 18500,
        paymentMethod: "bank_transfer",
        status: "completed",
        reference: "TXN123456789",
        description: "Payment for PO-2024-002 - Fresh Fruits",
        createdBy: "Finance Manager",
      },
      {
        paymentNumber: "PAY-2024-002",
        type: "vendor_payment",
        entityId: 1,
        entityType: "vendor",
        amount: 5000,
        paymentMethod: "cash",
        status: "completed",
        reference: "CASH001",
        description: "Commission payment to Rajesh Kumar",
        createdBy: "Market Manager",
      },
      {
        paymentNumber: "PAY-2024-003",
        type: "purchase_payment",
        entityId: 4,
        entityType: "supplier",
        amount: 6000,
        paymentMethod: "upi",
        status: "completed",
        reference: "UPI987654321",
        description: "Partial payment for PO-2024-004 - Dairy Products",
        createdBy: "Finance Manager",
      },
      {
        paymentNumber: "PAY-2024-004",
        type: "expense",
        entityId: null,
        entityType: "other",
        amount: 2500,
        paymentMethod: "cash",
        status: "completed",
        reference: "EXP001",
        description: "Monthly electricity bill",
        createdBy: "Admin Manager",
      },
      {
        paymentNumber: "PAY-2024-005",
        type: "income",
        entityId: null,
        entityType: "other",
        amount: 15000,
        paymentMethod: "bank_transfer",
        status: "completed",
        reference: "INC001",
        description: "Monthly stall rental income",
        createdBy: "Finance Manager",
      },
    ];

    paymentsData.forEach(paymentData => {
      const payment: Payment = {
        id: this.currentPaymentId++,
        ...paymentData,
        paymentDate: new Date(Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000),
        dueDate: paymentData.type === "purchase_payment" ? 
          new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000) : null,
      };
      this.payments.set(payment.id, payment);
    });
  }

  private initializeExpenses() {
    const expensesData = [
      {
        category: "utilities",
        subcategory: "electricity",
        amount: 2500,
        description: "Monthly electricity bill - December 2024",
        paymentMethod: "bank_transfer",
        vendor: "State Electricity Board",
        receipt: "/receipts/electricity_dec_2024.pdf",
        approvedBy: "Market Manager",
        createdBy: "Admin Manager",
      },
      {
        category: "transport",
        subcategory: "fuel",
        amount: 1200,
        description: "Fuel for market delivery vehicle",
        paymentMethod: "cash",
        vendor: "Bharat Petroleum",
        receipt: "/receipts/fuel_receipt_001.jpg",
        approvedBy: "Operations Head",
        createdBy: "Driver - Ram",
      },
      {
        category: "maintenance",
        subcategory: "cleaning",
        amount: 800,
        description: "Weekly cleaning supplies",
        paymentMethod: "cash",
        vendor: "Clean & Fresh Supplies",
        receipt: "/receipts/cleaning_supplies_001.jpg",
        approvedBy: "Market Manager",
        createdBy: "Maintenance Head",
      },
      {
        category: "staff",
        subcategory: "wages",
        amount: 15000,
        description: "Weekly wages for casual workers",
        paymentMethod: "cash",
        vendor: null,
        receipt: "/receipts/wages_week_48.pdf",
        approvedBy: "HR Manager",
        createdBy: "HR Manager",
      },
      {
        category: "marketing",
        subcategory: "advertising",
        amount: 3000,
        description: "Local newspaper advertisement",
        paymentMethod: "upi",
        vendor: "Daily News Agency",
        receipt: "/receipts/newspaper_ad_001.jpg",
        approvedBy: "Marketing Head",
        createdBy: "Marketing Head",
      },
      {
        category: "utilities",
        subcategory: "water",
        amount: 450,
        description: "Monthly water bill",
        paymentMethod: "bank_transfer",
        vendor: "Municipal Water Department",
        receipt: "/receipts/water_bill_dec_2024.pdf",
        approvedBy: "Market Manager",
        createdBy: "Admin Manager",
      },
    ];

    expensesData.forEach(expenseData => {
      const expense: Expense = {
        id: this.currentExpenseId++,
        ...expenseData,
        expenseDate: new Date(Date.now() - Math.random() * 20 * 24 * 60 * 60 * 1000),
      };
      this.expenses.set(expense.id, expense);
    });
  }

  private initializeStaff() {
    const staffData = [
      {
        employeeId: "EMP001",
        name: "Rajesh Sharma",
        phone: "+91 99999 11111",
        email: "rajesh.sharma@market.com",
        position: "manager",
        department: "admin",
        salary: 35000,
        isActive: true,
        address: "123 Manager Colony, City",
        emergencyContact: "+91 88888 22222",
        documents: ["aadhar_rajesh.pdf", "pan_rajesh.pdf"],
      },
      {
        employeeId: "EMP002",
        name: "Priya Singh",
        phone: "+91 88888 33333",
        email: "priya.singh@market.com",
        position: "supervisor",
        department: "operations",
        salary: 25000,
        isActive: true,
        address: "456 Supervisor Street, City",
        emergencyContact: "+91 77777 44444",
        documents: ["aadhar_priya.pdf", "pan_priya.pdf"],
      },
      {
        employeeId: "EMP003",
        name: "Mohammed Khan",
        phone: "+91 77777 55555",
        email: null,
        position: "security",
        department: "security",
        salary: 18000,
        isActive: true,
        address: "789 Security Lane, City",
        emergencyContact: "+91 66666 77777",
        documents: ["aadhar_mohammed.pdf"],
      },
      {
        employeeId: "EMP004",
        name: "Sunita Devi",
        phone: "+91 66666 88888",
        email: null,
        position: "cleaner",
        department: "maintenance",
        salary: 12000,
        isActive: true,
        address: "321 Worker Colony, City",
        emergencyContact: "+91 55555 99999",
        documents: ["aadhar_sunita.pdf"],
      },
      {
        employeeId: "EMP005",
        name: "Vikram Gupta",
        phone: "+91 55555 00000",
        email: "vikram.gupta@market.com",
        position: "worker",
        department: "operations",
        salary: 15000,
        isActive: true,
        address: "654 Worker Street, City",
        emergencyContact: "+91 44444 11111",
        documents: ["aadhar_vikram.pdf", "pan_vikram.pdf"],
      },
      {
        employeeId: "EMP006",
        name: "Kavita Reddy",
        phone: "+91 44444 22222",
        email: "kavita.reddy@market.com",
        position: "supervisor",
        department: "operations",
        salary: 22000,
        isActive: true,
        address: "987 Supervisor Colony, City",
        emergencyContact: "+91 33333 44444",
        documents: ["aadhar_kavita.pdf", "pan_kavita.pdf"],
      },
      {
        employeeId: "EMP007",
        name: "Ravi Kumar",
        phone: "+91 33333 55555",
        email: null,
        position: "security",
        department: "security",
        salary: 18000,
        isActive: false,
        address: "147 Security Road, City",
        emergencyContact: "+91 22222 66666",
        documents: ["aadhar_ravi.pdf"],
      },
    ];

    staffData.forEach(staffMemberData => {
      const staffMember: Staff = {
        id: this.currentStaffId++,
        ...staffMemberData,
        joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
      };
      this.staff.set(staffMember.id, staffMember);
    });
  }

  private initializeAttendance() {
    const attendanceData = [];
    const today = new Date();
    
    // Generate attendance for active staff for the last 30 days
    const activeStaff = Array.from(this.staff.values()).filter(s => s.isActive);
    
    for (let dayOffset = 0; dayOffset < 30; dayOffset++) {
      const attendanceDate = new Date(today.getTime() - dayOffset * 24 * 60 * 60 * 1000);
      
      activeStaff.forEach(staffMember => {
        const random = Math.random();
        let status: string;
        let checkIn: Date | null = null;
        let checkOut: Date | null = null;
        let hoursWorked: number | null = null;
        
        if (random < 0.85) { // 85% present
          status = "present";
          const checkInHour = 8 + Math.random() * 2; // 8-10 AM
          const checkOutHour = 17 + Math.random() * 2; // 5-7 PM
          
          checkIn = new Date(attendanceDate);
          checkIn.setHours(Math.floor(checkInHour), Math.floor((checkInHour % 1) * 60));
          
          checkOut = new Date(attendanceDate);
          checkOut.setHours(Math.floor(checkOutHour), Math.floor((checkOutHour % 1) * 60));
          
          hoursWorked = (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60);
          hoursWorked = Math.round(hoursWorked * 100) / 100;
          
          if (checkInHour > 9) {
            status = "late";
          }
        } else if (random < 0.92) { // 7% half day
          status = "half_day";
          const checkInHour = 8 + Math.random() * 2;
          
          checkIn = new Date(attendanceDate);
          checkIn.setHours(Math.floor(checkInHour), Math.floor((checkInHour % 1) * 60));
          
          checkOut = new Date(attendanceDate);
          checkOut.setHours(13, 0); // Half day till 1 PM
          
          hoursWorked = 4;
        } else { // 8% absent
          status = "absent";
        }
        
        attendanceData.push({
          staffId: staffMember.id,
          date: new Date(attendanceDate),
          checkIn,
          checkOut,
          hoursWorked,
          status,
          notes: status === "late" ? "Traffic delay" : 
                 status === "half_day" ? "Personal work" :
                 status === "absent" ? "Sick leave" : null,
        });
      });
    }

    attendanceData.forEach(attendanceRecord => {
      const attendance: Attendance = {
        id: this.currentAttendanceId++,
        ...attendanceRecord,
      };
      this.attendance.set(attendance.id, attendance);
    });
  }

  private initializeCustomers() {
    const customersData = [
      {
        name: "Rajesh Restaurant",
        phone: "+91 98765 43210",
        email: "rajesh@restaurant.com",
        address: "123 Restaurant Street, Commercial Area, City",
        customerType: "restaurant",
        creditLimit: 50000,
        outstandingAmount: 0,
        totalPurchases: 125000,
        isActive: true,
      },
      {
        name: "Priya Sharma",
        phone: "+91 87654 32109",
        email: "priya@email.com",
        address: "456 Home Garden, Residential Colony, City",
        customerType: "retail",
        creditLimit: 5000,
        outstandingAmount: 0,
        totalPurchases: 8500,
        isActive: true,
      },
      {
        name: "Metro Hotel",
        phone: "+91 76543 21098",
        email: "orders@metrohotel.com",
        address: "789 Hotel Complex, Business District, City",
        customerType: "wholesale",
        creditLimit: 100000,
        outstandingAmount: 2500,
        totalPurchases: 89000,
        isActive: true,
      },
      {
        name: "Green Grocery Store",
        phone: "+91 65432 10987",
        email: "manager@greengrocery.com",
        address: "321 Market Road, Shopping Complex, City",
        customerType: "wholesale",
        creditLimit: 75000,
        outstandingAmount: 5000,
        totalPurchases: 156000,
        isActive: true,
      },
      {
        name: "Anita Reddy",
        phone: "+91 54321 09876",
        email: "anita.reddy@gmail.com",
        address: "654 Apartment Complex, Suburb Area, City",
        customerType: "retail",
        creditLimit: 3000,
        outstandingAmount: 0,
        totalPurchases: 12500,
        isActive: true,
      },
      {
        name: "Spice Palace Restaurant",
        phone: "+91 43210 98765",
        email: "orders@spicepalace.com",
        address: "987 Food Street, Restaurant Zone, City",
        customerType: "restaurant",
        creditLimit: 60000,
        outstandingAmount: 8500,
        totalPurchases: 98000,
        isActive: true,
      },
      {
        name: "Wellness Cafe",
        phone: "+91 32109 87654",
        email: "procurement@wellnesscafe.com",
        address: "147 Health Street, Wellness District, City",
        customerType: "restaurant",
        creditLimit: 25000,
        outstandingAmount: 0,
        totalPurchases: 45000,
        isActive: true,
      },
      {
        name: "Bulk Buyers Co-op",
        phone: "+91 21098 76543",
        email: "bulk@buyerscoop.com",
        address: "258 Wholesale Market, Industrial Area, City",
        customerType: "wholesale",
        creditLimit: 150000,
        outstandingAmount: 12000,
        totalPurchases: 234000,
        isActive: true,
      },
    ];

    customersData.forEach(customerData => {
      const customer: Customer = {
        id: this.currentCustomerId++,
        ...customerData,
        createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
      };
      this.customers.set(customer.id, customer);
    });
  }

  private initializeOrders() {
    const ordersData = [
      {
        orderNumber: "ORD-2024-001",
        customerId: 1,
        customerName: "Rajesh Restaurant",
        customerPhone: "+91 98765 43210",
        deliveryAddress: "123 Restaurant Street, Commercial Area, City",
        deliveryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        status: "confirmed",
        totalAmount: 4500,
        deliveryCharge: 100,
        discount: 200,
        paymentMethod: "cash_on_delivery",
        paymentStatus: "pending",
        notes: "Deliver before 10 AM",
      },
      {
        orderNumber: "ORD-2024-002",
        customerId: 2,
        customerName: "Priya Sharma",
        customerPhone: "+91 87654 32109",
        deliveryAddress: "456 Home Garden, Residential Colony, City",
        deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        status: "packed",
        totalAmount: 1250,
        deliveryCharge: 50,
        discount: 0,
        paymentMethod: "upi",
        paymentStatus: "paid",
        notes: "Call before delivery",
      },
      {
        orderNumber: "ORD-2024-003",
        customerId: 3,
        customerName: "Metro Hotel",
        customerPhone: "+91 76543 21098",
        deliveryAddress: "789 Hotel Complex, Business District, City",
        deliveryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        status: "out_for_delivery",
        totalAmount: 8900,
        deliveryCharge: 200,
        discount: 500,
        paymentMethod: "cash_on_delivery",
        paymentStatus: "pending",
        notes: "Bulk order - use large vehicle",
      },
      {
        orderNumber: "ORD-2024-004",
        customerId: 4,
        customerName: "Green Grocery Store",
        customerPhone: "+91 65432 10987",
        deliveryAddress: "321 Market Road, Shopping Complex, City",
        deliveryDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        status: "delivered",
        totalAmount: 12500,
        deliveryCharge: 300,
        discount: 1000,
        paymentMethod: "online",
        paymentStatus: "paid",
        notes: "Weekly order completed",
      },
      {
        orderNumber: "ORD-2024-005",
        customerId: 5,
        customerName: "Anita Reddy",
        customerPhone: "+91 54321 09876",
        deliveryAddress: "654 Apartment Complex, Suburb Area, City",
        deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        status: "pending",
        totalAmount: 850,
        deliveryCharge: 40,
        discount: 50,
        paymentMethod: "cash_on_delivery",
        paymentStatus: "pending",
        notes: "Weekend delivery preferred",
      },
      {
        orderNumber: "ORD-2024-006",
        customerId: 6,
        customerName: "Spice Palace Restaurant",
        customerPhone: "+91 43210 98765",
        deliveryAddress: "987 Food Street, Restaurant Zone, City",
        deliveryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        status: "confirmed",
        totalAmount: 6750,
        deliveryCharge: 150,
        discount: 300,
        paymentMethod: "upi",
        paymentStatus: "paid",
        notes: "Priority delivery for restaurant",
      },
      {
        orderNumber: "ORD-2024-007",
        customerId: 7,
        customerName: "Wellness Cafe",
        customerPhone: "+91 32109 87654",
        deliveryAddress: "147 Health Street, Wellness District, City",
        deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        status: "pending",
        totalAmount: 2350,
        deliveryCharge: 75,
        discount: 100,
        paymentMethod: "online",
        paymentStatus: "pending",
        notes: "Organic products only",
      },
      {
        orderNumber: "ORD-2024-008",
        customerId: 8,
        customerName: "Bulk Buyers Co-op",
        customerPhone: "+91 21098 76543",
        deliveryAddress: "258 Wholesale Market, Industrial Area, City",
        deliveryDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        status: "delivered",
        totalAmount: 18500,
        deliveryCharge: 500,
        discount: 1500,
        paymentMethod: "cash_on_delivery",
        paymentStatus: "paid",
        notes: "Monthly bulk order completed",
      },
    ];

    ordersData.forEach(orderData => {
      const order: Order = {
        id: this.currentOrderId++,
        ...orderData,
        orderDate: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000),
      };
      this.orders.set(order.id, order);
    });
  }

  private initializeOrderItems() {
    const orderItemsData = [
      // Order 1 items (Restaurant)
      { orderId: 1, productId: 1, quantity: 20, unitPrice: 45, totalPrice: 900 }, // Tomatoes
      { orderId: 1, productId: 2, quantity: 15, unitPrice: 35, totalPrice: 525 }, // Onions
      { orderId: 1, productId: 3, quantity: 25, unitPrice: 25, totalPrice: 625 }, // Potatoes
      { orderId: 1, productId: 4, quantity: 10, unitPrice: 40, totalPrice: 400 }, // Carrots
      { orderId: 1, productId: 5, quantity: 8, unitPrice: 30, totalPrice: 240 }, // Spinach
      { orderId: 1, productId: 7, quantity: 5, unitPrice: 120, totalPrice: 600 }, // Apples
      { orderId: 1, productId: 8, quantity: 10, unitPrice: 60, totalPrice: 600 }, // Bananas
      { orderId: 1, productId: 17, quantity: 8, unitPrice: 55, totalPrice: 440 }, // Milk
      { orderId: 1, productId: 21, quantity: 3, unitPrice: 180, totalPrice: 540 }, // Chicken

      // Order 2 items (Retail customer)
      { orderId: 2, productId: 1, quantity: 3, unitPrice: 45, totalPrice: 135 }, // Tomatoes
      { orderId: 2, productId: 7, quantity: 2, unitPrice: 120, totalPrice: 240 }, // Apples
      { orderId: 2, productId: 8, quantity: 3, unitPrice: 60, totalPrice: 180 }, // Bananas
      { orderId: 2, productId: 17, quantity: 4, unitPrice: 55, totalPrice: 220 }, // Milk
      { orderId: 2, productId: 19, quantity: 2, unitPrice: 60, totalPrice: 120 }, // Yogurt
      { orderId: 2, productId: 13, quantity: 5, unitPrice: 85, totalPrice: 425 }, // Rice

      // Order 3 items (Hotel - bulk)
      { orderId: 3, productId: 1, quantity: 40, unitPrice: 45, totalPrice: 1800 }, // Tomatoes
      { orderId: 3, productId: 2, quantity: 30, unitPrice: 35, totalPrice: 1050 }, // Onions
      { orderId: 3, productId: 3, quantity: 50, unitPrice: 25, totalPrice: 1250 }, // Potatoes
      { orderId: 3, productId: 7, quantity: 15, unitPrice: 120, totalPrice: 1800 }, // Apples
      { orderId: 3, productId: 8, quantity: 20, unitPrice: 60, totalPrice: 1200 }, // Bananas
      { orderId: 3, productId: 21, quantity: 10, unitPrice: 180, totalPrice: 1800 }, // Chicken

      // Order 4 items (Grocery store)
      { orderId: 4, productId: 13, quantity: 50, unitPrice: 85, totalPrice: 4250 }, // Rice
      { orderId: 4, productId: 14, quantity: 40, unitPrice: 45, totalPrice: 1800 }, // Wheat flour
      { orderId: 4, productId: 15, quantity: 20, unitPrice: 95, totalPrice: 1900 }, // Lentils
      { orderId: 4, productId: 1, quantity: 30, unitPrice: 45, totalPrice: 1350 }, // Tomatoes
      { orderId: 4, productId: 2, quantity: 25, unitPrice: 35, totalPrice: 875 }, // Onions
      { orderId: 4, productId: 7, quantity: 20, unitPrice: 120, totalPrice: 2400 }, // Apples

      // Order 5 items (Retail customer)
      { orderId: 5, productId: 9, quantity: 2, unitPrice: 80, totalPrice: 160 }, // Oranges
      { orderId: 5, productId: 10, quantity: 1.5, unitPrice: 150, totalPrice: 225 }, // Mangoes
      { orderId: 5, productId: 17, quantity: 2, unitPrice: 55, totalPrice: 110 }, // Milk
      { orderId: 5, productId: 24, quantity: 0.5, unitPrice: 180, totalPrice: 90 }, // Turmeric
      { orderId: 5, productId: 25, quantity: 0.5, unitPrice: 220, totalPrice: 110 }, // Chili powder

      // Order 6 items (Restaurant)
      { orderId: 6, productId: 24, quantity: 2, unitPrice: 180, totalPrice: 360 }, // Turmeric
      { orderId: 6, productId: 25, quantity: 2, unitPrice: 220, totalPrice: 440 }, // Chili powder
      { orderId: 6, productId: 26, quantity: 1, unitPrice: 450, totalPrice: 450 }, // Cumin seeds
      { orderId: 6, productId: 27, quantity: 2, unitPrice: 160, totalPrice: 320 }, // Coriander powder
      { orderId: 6, productId: 1, quantity: 25, unitPrice: 45, totalPrice: 1125 }, // Tomatoes
      { orderId: 6, productId: 2, quantity: 20, unitPrice: 35, totalPrice: 700 }, // Onions
      { orderId: 6, productId: 21, quantity: 8, unitPrice: 180, totalPrice: 1440 }, // Chicken
      { orderId: 6, productId: 17, quantity: 10, unitPrice: 55, totalPrice: 550 }, // Milk

      // Order 7 items (Wellness Cafe - organic focus)
      { orderId: 7, productId: 5, quantity: 5, unitPrice: 30, totalPrice: 150 }, // Spinach
      { orderId: 7, productId: 4, quantity: 8, unitPrice: 40, totalPrice: 320 }, // Carrots
      { orderId: 7, productId: 7, quantity: 10, unitPrice: 120, totalPrice: 1200 }, // Apples
      { orderId: 7, productId: 10, quantity: 3, unitPrice: 150, totalPrice: 450 }, // Mangoes
      { orderId: 7, productId: 17, quantity: 5, unitPrice: 55, totalPrice: 275 }, // Milk

      // Order 8 items (Bulk buyer)
      { orderId: 8, productId: 13, quantity: 100, unitPrice: 85, totalPrice: 8500 }, // Rice
      { orderId: 8, productId: 14, quantity: 80, unitPrice: 45, totalPrice: 3600 }, // Wheat flour
      { orderId: 8, productId: 15, quantity: 50, unitPrice: 95, totalPrice: 4750 }, // Lentils
      { orderId: 8, productId: 1, quantity: 60, unitPrice: 45, totalPrice: 2700 }, // Tomatoes
      { orderId: 8, productId: 2, quantity: 50, unitPrice: 35, totalPrice: 1750 }, // Onions
      { orderId: 8, productId: 3, quantity: 80, unitPrice: 25, totalPrice: 2000 }, // Potatoes
    ];

    orderItemsData.forEach(itemData => {
      const orderItem: OrderItem = {
        id: this.currentOrderItemId++,
        ...itemData,
      };
      this.orderItems.set(orderItem.id, orderItem);
    });
  }

  // Vendor methods
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

  // Product methods
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

  // Sales methods
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

  // Stall methods
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

  // Supplier methods
  async getSuppliers(): Promise<Supplier[]> {
    return Array.from(this.suppliers.values());
  }

  async getSupplier(id: number): Promise<Supplier | undefined> {
    return this.suppliers.get(id);
  }

  async createSupplier(insertSupplier: InsertSupplier): Promise<Supplier> {
    const supplier: Supplier = {
      id: this.currentSupplierId++,
      ...insertSupplier,
      isActive: insertSupplier.isActive ?? true,
      createdAt: new Date(),
    };
    this.suppliers.set(supplier.id, supplier);
    return supplier;
  }

  async updateSupplier(id: number, supplierData: Partial<InsertSupplier>): Promise<Supplier | undefined> {
    const existing = this.suppliers.get(id);
    if (!existing) return undefined;

    const updated: Supplier = { ...existing, ...supplierData };
    this.suppliers.set(id, updated);
    return updated;
  }

  // Purchase Order methods
  async getPurchaseOrders(): Promise<PurchaseOrder[]> {
    return Array.from(this.purchaseOrders.values());
  }

  async getPurchaseOrder(id: number): Promise<PurchaseOrder | undefined> {
    return this.purchaseOrders.get(id);
  }

  async createPurchaseOrder(insertPurchaseOrder: InsertPurchaseOrder): Promise<PurchaseOrder> {
    const purchaseOrder: PurchaseOrder = {
      id: this.currentPurchaseOrderId++,
      ...insertPurchaseOrder,
      orderDate: new Date(),
    };
    this.purchaseOrders.set(purchaseOrder.id, purchaseOrder);
    return purchaseOrder;
  }

  async updatePurchaseOrder(id: number, purchaseOrderData: Partial<InsertPurchaseOrder>): Promise<PurchaseOrder | undefined> {
    const existing = this.purchaseOrders.get(id);
    if (!existing) return undefined;

    const updated: PurchaseOrder = { ...existing, ...purchaseOrderData };
    this.purchaseOrders.set(id, updated);
    return updated;
  }

  // Purchase Order Item methods
  async getPurchaseOrderItems(): Promise<PurchaseOrderItem[]> {
    return Array.from(this.purchaseOrderItems.values());
  }

  async getPurchaseOrderItemsByOrder(purchaseOrderId: number): Promise<PurchaseOrderItem[]> {
    return Array.from(this.purchaseOrderItems.values()).filter(item => item.purchaseOrderId === purchaseOrderId);
  }

  async createPurchaseOrderItem(insertItem: InsertPurchaseOrderItem): Promise<PurchaseOrderItem> {
    const item: PurchaseOrderItem = {
      id: this.currentPurchaseOrderItemId++,
      ...insertItem,
      receivedQuantity: insertItem.receivedQuantity || 0,
    };
    this.purchaseOrderItems.set(item.id, item);
    return item;
  }

  // Quality Check methods
  async getQualityChecks(): Promise<QualityCheck[]> {
    return Array.from(this.qualityChecks.values());
  }

  async getQualityCheck(id: number): Promise<QualityCheck | undefined> {
    return this.qualityChecks.get(id);
  }

  async createQualityCheck(insertQualityCheck: InsertQualityCheck): Promise<QualityCheck> {
    const qualityCheck: QualityCheck = {
      id: this.currentQualityCheckId++,
      ...insertQualityCheck,
      checkDate: new Date(),
      approved: insertQualityCheck.approved ?? false,
    };
    this.qualityChecks.set(qualityCheck.id, qualityCheck);
    return qualityCheck;
  }

  // Payment methods
  async getPayments(): Promise<Payment[]> {
    return Array.from(this.payments.values());
  }

  async getPayment(id: number): Promise<Payment | undefined> {
    return this.payments.get(id);
  }

  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const payment: Payment = {
      id: this.currentPaymentId++,
      ...insertPayment,
      paymentDate: new Date(),
    };
    this.payments.set(payment.id, payment);
    return payment;
  }

  // Expense methods
  async getExpenses(): Promise<Expense[]> {
    return Array.from(this.expenses.values());
  }

  async getExpense(id: number): Promise<Expense | undefined> {
    return this.expenses.get(id);
  }

  async createExpense(insertExpense: InsertExpense): Promise<Expense> {
    const expense: Expense = {
      id: this.currentExpenseId++,
      ...insertExpense,
      expenseDate: new Date(),
    };
    this.expenses.set(expense.id, expense);
    return expense;
  }

  // Staff methods
  async getStaff(): Promise<Staff[]> {
    return Array.from(this.staff.values());
  }

  async getStaffMember(id: number): Promise<Staff | undefined> {
    return this.staff.get(id);
  }

  async createStaff(insertStaff: InsertStaff): Promise<Staff> {
    const staffMember: Staff = {
      id: this.currentStaffId++,
      ...insertStaff,
      isActive: insertStaff.isActive ?? true,
      joinDate: new Date(),
    };
    this.staff.set(staffMember.id, staffMember);
    return staffMember;
  }

  async updateStaff(id: number, staffData: Partial<InsertStaff>): Promise<Staff | undefined> {
    const existing = this.staff.get(id);
    if (!existing) return undefined;

    const updated: Staff = { ...existing, ...staffData };
    this.staff.set(id, updated);
    return updated;
  }

  // Attendance methods
  async getAttendance(): Promise<Attendance[]> {
    return Array.from(this.attendance.values());
  }

  async getAttendanceByStaff(staffId: number): Promise<Attendance[]> {
    return Array.from(this.attendance.values()).filter(att => att.staffId === staffId);
  }

  async getAttendanceByDate(date: Date): Promise<Attendance[]> {
    return Array.from(this.attendance.values()).filter(att => {
      const attDate = new Date(att.date);
      return attDate.toDateString() === date.toDateString();
    });
  }

  async createAttendance(insertAttendance: InsertAttendance): Promise<Attendance> {
    const attendance: Attendance = {
      id: this.currentAttendanceId++,
      ...insertAttendance,
    };
    this.attendance.set(attendance.id, attendance);
    return attendance;
  }

  // Customer methods
  async getCustomers(): Promise<Customer[]> {
    return Array.from(this.customers.values());
  }

  async getCustomer(id: number): Promise<Customer | undefined> {
    return this.customers.get(id);
  }

  async createCustomer(insertCustomer: InsertCustomer): Promise<Customer> {
    const customer: Customer = {
      id: this.currentCustomerId++,
      ...insertCustomer,
      creditLimit: insertCustomer.creditLimit || 0,
      outstandingAmount: insertCustomer.outstandingAmount || 0,
      totalPurchases: insertCustomer.totalPurchases || 0,
      isActive: insertCustomer.isActive ?? true,
      createdAt: new Date(),
    };
    this.customers.set(customer.id, customer);
    return customer;
  }

  async updateCustomer(id: number, customerData: Partial<InsertCustomer>): Promise<Customer | undefined> {
    const existing = this.customers.get(id);
    if (!existing) return undefined;

    const updated: Customer = { ...existing, ...customerData };
    this.customers.set(id, updated);
    return updated;
  }

  // Order methods
  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getOrdersByCustomer(customerId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(order => order.customerId === customerId);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const order: Order = {
      id: this.currentOrderId++,
      ...insertOrder,
      orderDate: new Date(),
    };
    this.orders.set(order.id, order);
    return order;
  }

  async updateOrder(id: number, orderData: Partial<InsertOrder>): Promise<Order | undefined> {
    const existing = this.orders.get(id);
    if (!existing) return undefined;

    const updated: Order = { ...existing, ...orderData };
    this.orders.set(id, updated);
    return updated;
  }

  // Order Item methods
  async getOrderItems(): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values());
  }

  async getOrderItemsByOrder(orderId: number): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values()).filter(item => item.orderId === orderId);
  }

  async createOrderItem(insertItem: InsertOrderItem): Promise<OrderItem> {
    const orderItem: OrderItem = {
      id: this.currentOrderItemId++,
      ...insertItem,
    };
    this.orderItems.set(orderItem.id, orderItem);
    return orderItem;
  }
}

export const storage = new MemStorage();
