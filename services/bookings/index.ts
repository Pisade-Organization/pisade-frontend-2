import apiInstanceClient from "@/services/apiInstanceClient";
import { resolveMediaUrl } from "@/lib/media";
import { unwrapApiResponse, type ApiSuccessResponse } from "@/services/apiResponse";
import { servicePath } from "@/services/servicePath";
import type {
  BookingDetail,
  BookingListItem,
  BookingCounterparty,
  CancelBookingDto,
  CheckoutBookingDto,
  CheckoutBookingResponse,
  CreateBookingDto,
  CreateBookingResponse,
  GetBookingsParams,
  GetBookingsResponse,
  RescheduleBookingDto,
} from "./types";

function mapCounterpartyMedia(
  counterparty: BookingCounterparty | undefined,
): BookingCounterparty | undefined {
  if (!counterparty) return counterparty;

  return {
    ...counterparty,
    avatarUrl: resolveMediaUrl(counterparty.avatarUrl) || null,
  };
}

function mapBookingListItemMedia(booking: BookingListItem): BookingListItem {
  return {
    ...booking,
    tutor: mapCounterpartyMedia(booking.tutor),
    student: mapCounterpartyMedia(booking.student),
  };
}

function mapBookingDetailMedia(booking: BookingDetail): BookingDetail {
  return {
    ...booking,
    tutor: {
      ...booking.tutor,
      avatarUrl: resolveMediaUrl(booking.tutor.avatarUrl) || null,
    },
  };
}

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

    const result = unwrapApiResponse(response.data);

    return {
      ...result,
      data: result.data.map(mapBookingListItemMedia),
    };
  },

  async getById(bookingId: string): Promise<BookingDetail> {
    const path = servicePath.bookings.getById.replace(":id", bookingId);
    const response = await apiInstanceClient.get<ApiSuccessResponse<BookingDetail> | BookingDetail>(
      path,
    );

    return mapBookingDetailMedia(unwrapApiResponse(response.data));
  },

  async checkout(
    bookingId: string,
    payload: CheckoutBookingDto,
  ): Promise<CheckoutBookingResponse> {
    const path = servicePath.bookings.checkout.replace(":id", bookingId);
    const response = await apiInstanceClient.post<
      ApiSuccessResponse<CheckoutBookingResponse> | CheckoutBookingResponse
    >(path, payload);
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
