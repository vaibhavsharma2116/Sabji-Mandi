import { pgTable, text, serial, integer, real, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const vendors = pgTable("vendors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  category: text("category").notNull(),
  stallNumber: text("stall_number"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  pricePerKg: real("price_per_kg").notNull(),
  quantityInStock: real("quantity_in_stock").default(0),
  lowStockThreshold: real("low_stock_threshold").default(10),
  vendorId: integer("vendor_id").references(() => vendors.id),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const sales = pgTable("sales", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").references(() => products.id).notNull(),
  vendorId: integer("vendor_id").references(() => vendors.id).notNull(),
  quantity: real("quantity").notNull(),
  pricePerKg: real("price_per_kg").notNull(),
  totalAmount: real("total_amount").notNull(),
  saleDate: timestamp("sale_date").defaultNow(),
});

export const stalls = pgTable("stalls", {
  id: serial("id").primaryKey(),
  stallNumber: text("stall_number").notNull().unique(),
  section: text("section").notNull(),
  isOccupied: boolean("is_occupied").default(false),
  vendorId: integer("vendor_id").references(() => vendors.id),
  monthlyRent: real("monthly_rent").notNull(),
});

// Procurement Management
export const suppliers = pgTable("suppliers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  contactPerson: text("contact_person").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  address: text("address"),
  supplierType: text("supplier_type").notNull(), // farmer, wholesaler, distributor
  paymentTerms: text("payment_terms"), // cash, credit_7, credit_15, credit_30
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const purchaseOrders = pgTable("purchase_orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  supplierId: integer("supplier_id").references(() => suppliers.id).notNull(),
  orderDate: timestamp("order_date").defaultNow(),
  expectedDeliveryDate: timestamp("expected_delivery_date"),
  actualDeliveryDate: timestamp("actual_delivery_date"),
  status: text("status").default("pending"), // pending, confirmed, delivered, cancelled
  totalAmount: real("total_amount").default(0),
  paidAmount: real("paid_amount").default(0),
  notes: text("notes"),
  createdBy: text("created_by").notNull(),
});

export const purchaseOrderItems = pgTable("purchase_order_items", {
  id: serial("id").primaryKey(),
  purchaseOrderId: integer("purchase_order_id").references(() => purchaseOrders.id).notNull(),
  productName: text("product_name").notNull(),
  category: text("category").notNull(),
  quantity: real("quantity").notNull(),
  unitPrice: real("unit_price").notNull(),
  totalPrice: real("total_price").notNull(),
  qualityGrade: text("quality_grade"), // A, B, C
  receivedQuantity: real("received_quantity").default(0),
  notes: text("notes"),
});

// Quality Control
export const qualityChecks = pgTable("quality_checks", {
  id: serial("id").primaryKey(),
  purchaseOrderId: integer("purchase_order_id").references(() => purchaseOrders.id),
  productName: text("product_name").notNull(),
  checkedBy: text("checked_by").notNull(),
  checkDate: timestamp("check_date").defaultNow(),
  qualityGrade: text("quality_grade").notNull(), // A, B, C, Rejected
  freshness: integer("freshness"), // 1-10 scale
  appearance: integer("appearance"), // 1-10 scale
  overallScore: integer("overall_score"), // 1-10 scale
  notes: text("notes"),
  images: text("images").array(),
  approved: boolean("approved").default(false),
});

// Finance Management
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  paymentNumber: text("payment_number").notNull().unique(),
  type: text("type").notNull(), // purchase_payment, vendor_payment, expense, income
  entityId: integer("entity_id"), // supplier_id or vendor_id
  entityType: text("entity_type"), // supplier, vendor, other
  amount: real("amount").notNull(),
  paymentMethod: text("payment_method").notNull(), // cash, bank_transfer, upi, card
  paymentDate: timestamp("payment_date").defaultNow(),
  dueDate: timestamp("due_date"),
  status: text("status").default("completed"), // pending, completed, failed
  reference: text("reference"), // transaction id, check number, etc
  description: text("description"),
  createdBy: text("created_by").notNull(),
});

export const expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(), // transport, utilities, maintenance, staff, marketing
  subcategory: text("subcategory"),
  amount: real("amount").notNull(),
  description: text("description").notNull(),
  expenseDate: timestamp("expense_date").defaultNow(),
  paymentMethod: text("payment_method").notNull(),
  vendor: text("vendor"),
  receipt: text("receipt"), // receipt image/document url
  approvedBy: text("approved_by"),
  createdBy: text("created_by").notNull(),
});

// Staff Management
export const staff = pgTable("staff", {
  id: serial("id").primaryKey(),
  employeeId: text("employee_id").notNull().unique(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  position: text("position").notNull(), // manager, supervisor, worker, security, cleaner
  department: text("department").notNull(), // admin, operations, security, maintenance
  salary: real("salary"),
  joinDate: timestamp("join_date").defaultNow(),
  isActive: boolean("is_active").default(true),
  address: text("address"),
  emergencyContact: text("emergency_contact"),
  documents: text("documents").array(), // id_proof, address_proof, etc
});

export const attendance = pgTable("attendance", {
  id: serial("id").primaryKey(),
  staffId: integer("staff_id").references(() => staff.id).notNull(),
  date: timestamp("date").notNull(),
  checkIn: timestamp("check_in"),
  checkOut: timestamp("check_out"),
  hoursWorked: real("hours_worked"),
  status: text("status").notNull(), // present, absent, half_day, late
  notes: text("notes"),
});

// Customer Management
export const customers = pgTable("customers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull().unique(),
  email: text("email"),
  address: text("address"),
  customerType: text("customer_type").notNull(), // retail, wholesale, restaurant, online
  creditLimit: real("credit_limit").default(0),
  outstandingAmount: real("outstanding_amount").default(0),
  totalPurchases: real("total_purchases").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Online Orders
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  customerId: integer("customer_id").references(() => customers.id),
  customerName: text("customer_name"),
  customerPhone: text("customer_phone"),
  deliveryAddress: text("delivery_address"),
  orderDate: timestamp("order_date").defaultNow(),
  deliveryDate: timestamp("delivery_date"),
  status: text("status").default("pending"), // pending, confirmed, packed, out_for_delivery, delivered, cancelled
  totalAmount: real("total_amount").notNull(),
  deliveryCharge: real("delivery_charge").default(0),
  discount: real("discount").default(0),
  paymentMethod: text("payment_method"), // cash_on_delivery, online, upi
  paymentStatus: text("payment_status").default("pending"), // pending, paid, failed
  notes: text("notes"),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").references(() => orders.id).notNull(),
  productId: integer("product_id").references(() => products.id).notNull(),
  quantity: real("quantity").notNull(),
  unitPrice: real("unit_price").notNull(),
  totalPrice: real("total_price").notNull(),
});

export const insertVendorSchema = createInsertSchema(vendors).omit({
  id: true,
  createdAt: true,
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
});

export const insertSaleSchema = createInsertSchema(sales).omit({
  id: true,
  saleDate: true,
});

export const insertStallSchema = createInsertSchema(stalls).omit({
  id: true,
});

// Insert schemas for new tables
export const insertSupplierSchema = createInsertSchema(suppliers).omit({
  id: true,
  createdAt: true,
});

export const insertPurchaseOrderSchema = createInsertSchema(purchaseOrders).omit({
  id: true,
  orderDate: true,
});

export const insertPurchaseOrderItemSchema = createInsertSchema(purchaseOrderItems).omit({
  id: true,
});

export const insertQualityCheckSchema = createInsertSchema(qualityChecks).omit({
  id: true,
  checkDate: true,
});

export const insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
  paymentDate: true,
});

export const insertExpenseSchema = createInsertSchema(expenses).omit({
  id: true,
  expenseDate: true,
});

export const insertStaffSchema = createInsertSchema(staff).omit({
  id: true,
  joinDate: true,
});

export const insertAttendanceSchema = createInsertSchema(attendance).omit({
  id: true,
});

export const insertCustomerSchema = createInsertSchema(customers).omit({
  id: true,
  createdAt: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  orderDate: true,
});

export const insertOrderItemSchema = createInsertSchema(orderItems).omit({
  id: true,
});

// Insert types
export type InsertVendor = z.infer<typeof insertVendorSchema>;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type InsertSale = z.infer<typeof insertSaleSchema>;
export type InsertStall = z.infer<typeof insertStallSchema>;
export type InsertSupplier = z.infer<typeof insertSupplierSchema>;
export type InsertPurchaseOrder = z.infer<typeof insertPurchaseOrderSchema>;
export type InsertPurchaseOrderItem = z.infer<typeof insertPurchaseOrderItemSchema>;
export type InsertQualityCheck = z.infer<typeof insertQualityCheckSchema>;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type InsertExpense = z.infer<typeof insertExpenseSchema>;
export type InsertStaff = z.infer<typeof insertStaffSchema>;
export type InsertAttendance = z.infer<typeof insertAttendanceSchema>;
export type InsertCustomer = z.infer<typeof insertCustomerSchema>;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;

// Select types
export type Vendor = typeof vendors.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Sale = typeof sales.$inferSelect;
export type Stall = typeof stalls.$inferSelect;
export type Supplier = typeof suppliers.$inferSelect;
export type PurchaseOrder = typeof purchaseOrders.$inferSelect;
export type PurchaseOrderItem = typeof purchaseOrderItems.$inferSelect;
export type QualityCheck = typeof qualityChecks.$inferSelect;
export type Payment = typeof payments.$inferSelect;
export type Expense = typeof expenses.$inferSelect;
export type Staff = typeof staff.$inferSelect;
export type Attendance = typeof attendance.$inferSelect;
export type Customer = typeof customers.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
