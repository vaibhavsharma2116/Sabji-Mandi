import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertVendorSchema, insertProductSchema, insertSaleSchema, insertStallSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Vendors endpoints
  app.get("/api/vendors", async (req, res) => {
    try {
      const vendors = await storage.getVendors();
      res.json(vendors);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vendors" });
    }
  });

  app.get("/api/vendors/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const vendor = await storage.getVendor(id);
      if (!vendor) {
        return res.status(404).json({ message: "Vendor not found" });
      }
      res.json(vendor);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vendor" });
    }
  });

  app.post("/api/vendors", async (req, res) => {
    try {
      const validatedData = insertVendorSchema.parse(req.body);
      const vendor = await storage.createVendor(validatedData);
      res.status(201).json(vendor);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid vendor data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create vendor" });
    }
  });

  app.put("/api/vendors/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertVendorSchema.partial().parse(req.body);
      const vendor = await storage.updateVendor(id, validatedData);
      if (!vendor) {
        return res.status(404).json({ message: "Vendor not found" });
      }
      res.json(vendor);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid vendor data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update vendor" });
    }
  });

  app.delete("/api/vendors/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteVendor(id);
      if (!deleted) {
        return res.status(404).json({ message: "Vendor not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete vendor" });
    }
  });

  // Products endpoints
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.get("/api/products/vendor/:vendorId", async (req, res) => {
    try {
      const vendorId = parseInt(req.params.vendorId);
      const products = await storage.getProductsByVendor(vendorId);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vendor products" });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedData);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create product" });
    }
  });

  app.put("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(id, validatedData);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update product" });
    }
  });

  app.delete("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteProduct(id);
      if (!deleted) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete product" });
    }
  });

  // Sales endpoints
  app.get("/api/sales", async (req, res) => {
    try {
      const sales = await storage.getSales();
      res.json(sales);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sales" });
    }
  });

  app.get("/api/sales/today", async (req, res) => {
    try {
      const today = new Date();
      const sales = await storage.getSalesByDate(today);
      res.json(sales);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch today's sales" });
    }
  });

  app.get("/api/sales/vendor/:vendorId", async (req, res) => {
    try {
      const vendorId = parseInt(req.params.vendorId);
      const sales = await storage.getSalesByVendor(vendorId);
      res.json(sales);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vendor sales" });
    }
  });

  app.post("/api/sales", async (req, res) => {
    try {
      const validatedData = insertSaleSchema.parse(req.body);
      const sale = await storage.createSale(validatedData);
      res.status(201).json(sale);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid sale data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to record sale" });
    }
  });

  // Stalls endpoints
  app.get("/api/stalls", async (req, res) => {
    try {
      const stalls = await storage.getStalls();
      res.json(stalls);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stalls" });
    }
  });

  app.get("/api/stalls/available", async (req, res) => {
    try {
      const stalls = await storage.getAvailableStalls();
      res.json(stalls);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch available stalls" });
    }
  });

  app.post("/api/stalls", async (req, res) => {
    try {
      const validatedData = insertStallSchema.parse(req.body);
      const stall = await storage.createStall(validatedData);
      res.status(201).json(stall);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid stall data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create stall" });
    }
  });

  app.post("/api/stalls/:stallId/assign/:vendorId", async (req, res) => {
    try {
      const stallId = parseInt(req.params.stallId);
      const vendorId = parseInt(req.params.vendorId);
      const success = await storage.assignStallToVendor(stallId, vendorId);
      if (!success) {
        return res.status(400).json({ message: "Failed to assign stall - stall may already be occupied" });
      }
      res.json({ message: "Stall assigned successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to assign stall" });
    }
  });

  app.post("/api/stalls/:stallId/release", async (req, res) => {
    try {
      const stallId = parseInt(req.params.stallId);
      const success = await storage.releaseStall(stallId);
      if (!success) {
        return res.status(404).json({ message: "Stall not found" });
      }
      res.json({ message: "Stall released successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to release stall" });
    }
  });

  // Dashboard stats endpoint
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const vendors = await storage.getVendors();
      const products = await storage.getProducts();
      const stalls = await storage.getStalls();
      const today = new Date();
      const todaySales = await storage.getSalesByDate(today);

      const totalVendors = vendors.length;
      const activeVendors = vendors.filter(v => v.isActive).length;
      const totalStalls = stalls.length;
      const occupiedStalls = stalls.filter(s => s.isOccupied).length;
      const availableStalls = totalStalls - occupiedStalls;
      const lowStockProducts = products.filter(p => (p.quantityInStock || 0) <= (p.lowStockThreshold || 10)).length;
      const todayRevenue = todaySales.reduce((sum, sale) => sum + sale.totalAmount, 0);

      res.json({
        totalVendors,
        activeVendors,
        totalStalls,
        occupiedStalls,
        availableStalls,
        lowStockProducts,
        todayRevenue,
        todaySalesCount: todaySales.length
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
