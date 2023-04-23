import { Schedule } from "@cd/data-access"

const parseDaysFromSchedule = (days: number) => String(days).split("").map(Number)

function checkDispensaryIsOpen (schedule: Schedule) {
    try {
        const now = new Date()

        const { openAt, closeAt } = schedule
        if (!openAt || !closeAt) {
            return null
        }

        const openTime = new Date();
        openTime.setHours(openAt)

        const closeTime = new Date();
        closeTime.setHours(closeAt)

        const days = parseDaysFromSchedule(schedule.days)
        const result = days.includes(now.getDay()) && now > openTime && now < closeTime

        return result ? 'open now' : 'closed';

    } catch (error) {
        return null
    }
}

export {
    checkDispensaryIsOpen
}
