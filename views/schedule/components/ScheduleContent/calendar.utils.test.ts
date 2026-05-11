// @ts-nocheck
import test from "node:test"
import assert from "node:assert/strict"

import type { BookingListItem } from "../../../../services/bookings/types.ts"
import {
  filterBookingsForVisibleRange,
  getFetchRange,
  getTimeGridColumnHeader,
  getTimeGridLoadingBlocks,
} from "./calendar.utils.ts"

function buildBooking(id: string, startTime: string): BookingListItem {
  const start = new Date(startTime)
  const end = new Date(start.getTime() + 50 * 60 * 1000)

  return {
    id,
    status: "CONFIRMED",
    schedule: {
      startTime: start.toISOString(),
      endTime: end.toISOString(),
    },
    pricing: {
      amount: 1000,
      currency: "THB",
    },
    payment: {
      status: "SUCCEEDED",
    },
    allowedActions: {
      pay: false,
      cancel: true,
      reschedule: true,
      join: false,
    },
    createdAt: start.toISOString(),
    updatedAt: start.toISOString(),
  }
}

test("getFetchRange pads the selected day to avoid dropping boundary bookings", () => {
  const selectedDate = new Date(2026, 4, 11, 15, 30)

  const range = getFetchRange(selectedDate, "day")

  assert.equal(range.from.toISOString(), "2026-05-09T17:00:00.000Z")
  assert.equal(range.to.toISOString(), "2026-05-12T16:59:59.999Z")
})

test("filterBookingsForVisibleRange keeps only bookings that belong to the selected day", () => {
  const selectedDate = new Date(2026, 4, 11, 15, 30)
  const bookings = [
    buildBooking("previous-day", "2026-05-10T09:00:00.000Z"),
    buildBooking("selected-day", "2026-05-11T09:00:00.000Z"),
    buildBooking("next-day", "2026-05-12T09:00:00.000Z"),
  ]

  const visibleBookings = filterBookingsForVisibleRange(bookings, selectedDate, "day")

  assert.deepEqual(visibleBookings.map((booking) => booking.id), ["selected-day"])
})

test("filterBookingsForVisibleRange keeps only bookings inside the selected week", () => {
  const selectedDate = new Date(2026, 4, 13, 15, 30)
  const bookings = [
    buildBooking("before-week", "2026-05-09T09:00:00.000Z"),
    buildBooking("inside-week", "2026-05-12T09:00:00.000Z"),
    buildBooking("after-week", "2026-05-18T09:00:00.000Z"),
  ]

  const visibleBookings = filterBookingsForVisibleRange(bookings, selectedDate, "week")

  assert.deepEqual(visibleBookings.map((booking) => booking.id), ["inside-week"])
})

test("getTimeGridColumnHeader hides the in-grid header in day view", () => {
  const selectedDate = new Date(2026, 4, 11, 15, 30)

  const header = getTimeGridColumnHeader(selectedDate, selectedDate, "day")

  assert.equal(header.weekdayLabel, "Mon")
  assert.equal(header.dayNumberLabel, "11")
  assert.equal(header.monthLabel, "May 2026")
  assert.equal(header.showHeader, false)
})

test("getTimeGridLoadingBlocks returns full-width placeholder cards for day view", () => {
  const blocks = getTimeGridLoadingBlocks("day")

  assert.deepEqual(blocks, [
    { dayIndex: 0, startMinutes: 480, durationMinutes: 90, lane: 0, laneCount: 1 },
    { dayIndex: 0, startMinutes: 690, durationMinutes: 60, lane: 0, laneCount: 1 },
    { dayIndex: 0, startMinutes: 840, durationMinutes: 120, lane: 0, laneCount: 1 },
  ])
})

test("getTimeGridLoadingBlocks spreads placeholder cards across the week view", () => {
  const blocks = getTimeGridLoadingBlocks("week")

  assert.deepEqual(blocks, [
    { dayIndex: 0, startMinutes: 540, durationMinutes: 60, lane: 0, laneCount: 1 },
    { dayIndex: 1, startMinutes: 630, durationMinutes: 90, lane: 0, laneCount: 1 },
    { dayIndex: 2, startMinutes: 780, durationMinutes: 60, lane: 0, laneCount: 1 },
    { dayIndex: 3, startMinutes: 900, durationMinutes: 120, lane: 0, laneCount: 1 },
    { dayIndex: 5, startMinutes: 660, durationMinutes: 60, lane: 0, laneCount: 1 },
  ])
})
