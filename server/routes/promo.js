import express from 'express';
import Promo from '../models/Promo.js';

const router = express.Router();

// POST /promo/validate - Validate promo codes
router.post('/validate', async (req, res) => {
  try {
    const { code, amount } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Promo code is required' });
    }

    const promo = await Promo.findOne({ 
      code: code.toUpperCase().trim(),
      isActive: true
    });

    if (!promo) {
      return res.status(404).json({ 
        valid: false,
        error: 'Invalid or inactive promo code' 
      });
    }

    // Check validity dates
    const now = new Date();
    if (now < promo.validFrom || now > promo.validUntil) {
      return res.status(400).json({ 
        valid: false,
        error: 'Promo code is not valid at this time' 
      });
    }

    // Check usage limit
    if (promo.usageLimit && promo.usedCount >= promo.usageLimit) {
      return res.status(400).json({ 
        valid: false,
        error: 'Promo code has reached its usage limit' 
      });
    }

    // Check minimum amount
    if (amount && promo.minAmount && amount < promo.minAmount) {
      return res.status(400).json({ 
        valid: false,
        error: `Minimum purchase of ₹${promo.minAmount} required for this promo code` 
      });
    }

    // Calculate discount
    let discount = 0;
    if (amount) {
      if (promo.discountType === 'percentage') {
        discount = (amount * promo.discountValue) / 100;
        if (promo.maxDiscount) {
          discount = Math.min(discount, promo.maxDiscount);
        }
      } else {
        discount = Math.min(promo.discountValue, amount);
      }
    }

    res.json({
      valid: true,
      code: promo.code,
      discountType: promo.discountType,
      discountValue: promo.discountValue,
      discount: discount,
      message: 'Promo code is valid'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;


