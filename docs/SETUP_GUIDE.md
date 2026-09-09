# Enterprise-SmartShop Quick Setup Guide 🚀

## Prerequisites
- Node.js >= 20.x
- Python >= 3.11
- React Native CLI & Android Studio / Xcode

## How to Run Each Service

```bash
# 1. Run Customer Website (frontend-web)
cd Enterprise-SmartShop/frontend-web
npm install --legacy-peer-deps
npm run dev

# 2. Run Admin Control Portal (admin-portal)
cd Enterprise-SmartShop/admin-portal
npm install
npm run dev

# 3. Run Vendor Seller Portal (vendor-portal)
cd Enterprise-SmartShop/vendor-portal
npm install
npm run dev

# 4. Run Python FastAPI Backend API (backend-api)
cd Enterprise-SmartShop/backend-api
pip install -r requirements.txt
python main.py

# 5. Run Customer Mobile App (customer-mobile)
cd Enterprise-SmartShop/customer-mobile
npm install
npx react-native run-android # or run-ios

# 6. Run Vendor Mobile App (vendor-mobile)
cd Enterprise-SmartShop/vendor-mobile
npm install
npx react-native run-android # or run-ios
```
