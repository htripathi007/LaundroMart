using BookingApi.Model.Domain;

namespace BookingApi.Repositories.Interfaces
{
    public interface IBookingRepository
    {
        //interface ReservationOfype
        Task<IEnumerable<ReservationOfType>> GetReservatiosOfTypeAsync();
        Task<ReservationOfType> GetReservationOfTypeByIdAsync(int id);
        Task<ReservationOfType> AddReservationOfTypeAsync(ReservationOfType reservationOfType);
        Task<ReservationOfType> DeleteReservationOfTypeAsync(int id);
        Task<ReservationOfType> UpdateResevationOfTypeAsync(int id, ReservationOfType reservationOfType);

        //interface SlotBooking
        Task<IEnumerable<SlotBooking>> GetSlotBookingsAsync();
        Task<IEnumerable<SlotBooking>> GetSlotBookingByUserIdAsync(int id);
        Task<SlotBooking> AddSlotBookingAsync(SlotBooking slotBooking);
        Task<SlotBooking> DeleteSlotBookingAsync(int id);
        Task<SlotBooking> UpdateSlotBookingAsync(int id, SlotBooking slotBooking);
        Task<IEnumerable<SlotBooking>> GetSlotBookingsByShopIdAsync(int shopId, DateTime bookingStartTime);
        Task<SlotBooking> DeleteSlotBookingByMachineIdAsync(int id);
        Task<SlotBooking> DeleteSlotBookingByShopIdAsync(int id);

        //interface MachineSlotBooking
        Task<IEnumerable<MachineSlotDetail>> GetMachineSlotDetailsAsync();
        Task<MachineSlotDetail> GetMachineSlotDetailByIdAsync(int id);
        Task<MachineSlotDetail> AddMachineSlotDetailAsync(MachineSlotDetail machineSlotDetail);
        Task<MachineSlotDetail> DeleteMachineSlotDetailAsync(int id);
        Task<MachineSlotDetail> UpdateMachineSlotDetailAsync(int id, MachineSlotDetail machineSlotDetail);

    }
}
