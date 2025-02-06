import moment from "moment";
import { getOsAndDevice } from "../utilities/osAndDevice.js";

// Calculate clicks by date for the last 7 days
export const calculateClicksByDate = (analytics) => {
  const today = moment().startOf("day");
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = today.clone().subtract(i, "days").format("YYYY-MM-DD");
    return { date, clicks: 0 };
  }).reverse();

  analytics.forEach(({ timestamp }) => {
    const formattedDate = moment(timestamp).format("YYYY-MM-DD");
    const dateEntry = last7Days.find((d) => d.date === formattedDate);
    if (dateEntry) dateEntry.clicks += 1;
  });

  return last7Days;
};


// Calculate OS and device analytics
export const calculateOsAndDeviceAnalytics = (analytics) => {
  const osAnalytics = {};
  const deviceAnalytics = {};

  analytics.forEach(({ userAgent, ipAddress }) => {
    const { os, device } = getOsAndDevice(userAgent);

    if (!osAnalytics[os])
      osAnalytics[os] = { uniqueClicks: 0, uniqueUsers: new Set() };
    osAnalytics[os].uniqueClicks += 1;
    osAnalytics[os].uniqueUsers.add(ipAddress);

    if (!deviceAnalytics[device])
      deviceAnalytics[device] = { uniqueClicks: 0, uniqueUsers: new Set() };
    deviceAnalytics[device].uniqueClicks += 1;
    deviceAnalytics[device].uniqueUsers.add(ipAddress);
  });

  return {
    osType: Object.entries(osAnalytics).map(([osName, data]) => ({
      osName,
      uniqueClicks: data.uniqueClicks,
      uniqueUsers: data.uniqueUsers.size,
    })),
    deviceType: Object.entries(deviceAnalytics).map(([deviceName, data]) => ({
      deviceName,
      uniqueClicks: data.uniqueClicks,
      uniqueUsers: data.uniqueUsers.size,
    })),
  };
};
