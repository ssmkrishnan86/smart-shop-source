from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.addresses.models import Address


class AddressController:

    @staticmethod
    async def list_addresses(db: AsyncSession, user_id: str) -> list[Address]:
        result = await db.execute(
            select(Address)
            .where(Address.user_id == user_id, Address.is_deleted.is_(False))
            .order_by(Address.is_default.desc(), Address.created_at.desc())
        )
        return list(result.scalars().all())

    @staticmethod
    async def create_address(db: AsyncSession, user_id: str, data: dict) -> Address:
        if data.get("is_default"):
            await AddressController._clear_default(db, user_id)
        else:
            existing = await AddressController.list_addresses(db, user_id)
            if not existing:
                data["is_default"] = True  # first address for a user is default automatically

        address = Address(user_id=user_id, **data)
        db.add(address)
        await db.commit()
        await db.refresh(address)
        return address

    @staticmethod
    async def update_address(db: AsyncSession, user_id: str, address_id: str, data: dict) -> Address:
        address = await AddressController._get_owned(db, user_id, address_id)
        if data.get("is_default"):
            await AddressController._clear_default(db, user_id)
        for field, value in data.items():
            if value is not None:
                setattr(address, field, value)
        await db.commit()
        await db.refresh(address)
        return address

    @staticmethod
    async def delete_address(db: AsyncSession, user_id: str, address_id: str) -> None:
        address = await AddressController._get_owned(db, user_id, address_id)
        was_default = address.is_default
        address.is_deleted = True
        address.is_default = False
        await db.commit()
        if was_default:
            remaining = await AddressController.list_addresses(db, user_id)
            if remaining:
                remaining[0].is_default = True
                await db.commit()

    @staticmethod
    async def set_default(db: AsyncSession, user_id: str, address_id: str) -> Address:
        address = await AddressController._get_owned(db, user_id, address_id)
        await AddressController._clear_default(db, user_id)
        address.is_default = True
        await db.commit()
        await db.refresh(address)
        return address

    @staticmethod
    async def _get_owned(db: AsyncSession, user_id: str, address_id: str) -> Address:
        result = await db.execute(
            select(Address).where(
                Address.id == address_id, Address.user_id == user_id, Address.is_deleted.is_(False)
            )
        )
        address = result.scalar_one_or_none()
        if address is None:
            raise ValueError("Address not found.")
        return address

    @staticmethod
    async def _clear_default(db: AsyncSession, user_id: str) -> None:
        result = await db.execute(
            select(Address).where(
                Address.user_id == user_id, Address.is_default.is_(True), Address.is_deleted.is_(False)
            )
        )
        for addr in result.scalars().all():
            addr.is_default = False
