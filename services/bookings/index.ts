import apiInstanceClient from "@/services/apiInstanceClient";
import { unwrapApiResponse, type ApiSuccessResponse } from "@/services/apiResponse";
import { servicePath } from "@/services/servicePath";
import type {
  BookingDetail,
  CancelBookingDto,
  CheckoutBookingDto,
  CreateBookingDto,
  CreateBookingResponse,
  GetBookingsParams,
  GetBookingsResponse,
  RescheduleBookingDto,
} from "./types";

export const BookingsService = {
  async create(payload: CreateBookingDto): Promise<CreateBookingResponse> {
    const response = await apiInstanceClient.post<
      ApiSuccessResponse<CreateBookingResponse> | CreateBookingResponse
    >(servicePath.bookings.create, payload);

    return unwrapApiResponse(response.data);
  },

  async getAll(params: GetBookingsParams = {}): Promise<GetBookingsResponse> {
    const response = await apiInstanceClient.get<
      ApiSuccessResponse<GetBookingsResponse> | GetBookingsResponse
    >(servicePath.bookings.getAll, { params });

    return unwrapApiResponse(response.data);
  },

  async getById(bookingId: string): Promise<BookingDetail> {
    const path = servicePath.bookings.getById.replace(":id", bookingId);
    const response = await apiInstanceClient.get<ApiSuccessResponse<BookingDetail> | BookingDetail>(
      path,
    );

    return unwrapApiResponse(response.data);
  },

  async checkout(bookingId: string, payload: CheckoutBookingDto) {
    const path = servicePath.bookings.checkout.replace(":id", bookingId);
    const response = await apiInstanceClient.post(path, payload);
    return unwrapApiResponse(response.data);
  },

  async cancel(bookingId: string, payload: CancelBookingDto) {
    const path = servicePath.bookings.cancel.replace(":id", bookingId);
    const response = await apiInstanceClient.patch(path, payload);
    return unwrapApiResponse(response.data);
  },

  async reschedule(bookingId: string, payload: RescheduleBookingDto) {
    const path = servicePath.bookings.reschedule.replace(":id", bookingId);
    const response = await apiInstanceClient.patch(path, payload);
    return unwrapApiResponse(response.data);
  },
};
