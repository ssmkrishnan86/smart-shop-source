from sqlalchemy import Column, String, Numeric, Integer

from app.database.session import Base


class Product(Base):
    """Read-only mapping onto the existing `products` table.

    Used by the cart module to validate stock/price and snapshot product
    details when items are added to the cart. The products API itself
    still serves its catalogue from the in-memory MOCK_PRODUCTS list.
    """

    __tablename__ = "products"

    id = Column(String(50), primary_key=True)
    vendor_id = Column(String(50))
    vendor_name = Column(String(255))
    name = Column(String(255), nullable=False)
    category = Column(String(100))
    brand = Column(String(100))
    sku = Column(String(100))
    price = Column(Numeric(10, 2), nullable=False)
    original_price = Column(Numeric(10, 2))
    stock = Column(Integer, nullable=False, default=0)
    status = Column(String(50))
    approval_status = Column(String(50))
    thumbnail = Column(String(500))
