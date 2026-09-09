from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.deps import get_current_user
from app.database.session import get_db
from app.modules.addresses.controller import AddressController
from app.modules.addresses.schemas import AddressCreateSchema, AddressResponseSchema, AddressUpdateSchema
from app.modules.auth.models import User

router = APIRouter()


@router.get("/", response_model=dict, summary="List my saved addresses")
async def list_addresses(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    addresses = await AddressController.list_addresses(db, current_user.id)
    return {
        "success": True,
        "message": "Addresses retrieved",
        "data": [AddressResponseSchema.model_validate(a) for a in addresses],
    }


@router.post("/", response_model=dict, summary="Add a new address")
async def create_address(
    payload: AddressCreateSchema, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)
):
    address = await AddressController.create_address(db, current_user.id, payload.model_dump())
    return {"success": True, "message": "Address added", "data": AddressResponseSchema.model_validate(address)}


@router.put("/{address_id}", response_model=dict, summary="Update an address")
async def update_address(
    address_id: str,
    payload: AddressUpdateSchema,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        address = await AddressController.update_address(
            db, current_user.id, address_id, payload.model_dump(exclude_unset=True)
        )
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    return {"success": True, "message": "Address updated", "data": AddressResponseSchema.model_validate(address)}


@router.delete("/{address_id}", response_model=dict, summary="Delete an address")
async def delete_address(
    address_id: str, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)
):
    try:
        await AddressController.delete_address(db, current_user.id, address_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    return {"success": True, "message": "Address deleted"}


@router.post("/{address_id}/default", response_model=dict, summary="Set default address")
async def set_default_address(
    address_id: str, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)
):
    try:
        address = await AddressController.set_default(db, current_user.id, address_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    return {
        "success": True,
        "message": "Default address updated",
        "data": AddressResponseSchema.model_validate(address),
    }
